from flask import Flask, request, render_template
from sqlalchemy import create_engine, text
from utils import validations
from werkzeug.utils import secure_filename
import os
import uuid

app = Flask(__name__)

DATABASE_URL = "mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2"

engine = create_engine(DATABASE_URL)

UPLOAD_FOLDER = "static/uploads"

@app.route("/")
def inicio():
    return render_template("inicio.html")

@app.route("/registro", methods=["GET", "POST"])
def registro():

    with engine.connect() as connection:
            resultado = connection.execute(
                text("SELECT id, nombre FROM region ORDER BY nombre")
            )
            regiones = resultado.fetchall()

    if request.method == "POST":
        nombre = request.form.get("nombre", "").strip()
        rut = request.form.get("rut", "").strip()
        email = request.form.get("email", "").strip()
        telefono = request.form.get("telefono", "").strip()
        comuna_id = request.form.get("comuna", "").strip()
        calle = request.form.get("calle", "").strip()

        errores = []

        if not validations.validate_name(nombre):
            errores.append("El nombre debe tener como mínimo 4 caracteres.")

        if not validations.validate_rut(rut):
            errores.append("El RUT no es válido.")

        if not validations.validate_email(email):
            errores.append("El email no es válido.")

        if not validations.validate_telefono(telefono):
            errores.append("El teléfono no es válido.")

        if not validations.validate_comuna(comuna_id):
            errores.append("Tiene que seleccionar una comuna.")
        else:
            with engine.connect() as connection:
                resultado = connection.execute(
                    text("SELECT id FROM comuna WHERE id = :comuna_id"),
                    {"comuna_id": comuna_id}
                )
                comuna = resultado.fetchone()

            if comuna is None:
                errores.append("La comuna seleccionada no existe.")

        if not validations.validate_calle(calle):
            errores.append("La calle y el número deben tener mínimo 10 caracteres.")

        if errores:
            return render_template(
                "registro.html",
                regiones = regiones,
                errores = errores,
                nombre = nombre,
                rut = rut,
                email = email,
                telefono = telefono,
                comuna_id = comuna_id,
                calle = calle
            )

        with engine.begin() as connection:
            connection.execute(
                text("""
                    INSERT INTO voluntario
                        (nombre, email, telefono, fecha_registro, comuna_id)
                    VALUES
                        (:nombre, :email, :telefono, NOW(), :comuna_id)
                """),
                {
                    "nombre": nombre,
                    "email": email,
                    "telefono": telefono,
                    "comuna_id": comuna_id
                }
            )
        return render_template("registro_exitoso.html")

    return render_template("registro.html", regiones=regiones)

@app.route("/comunas/<int:region_id>")
def comunas(region_id):
    with engine.connect() as connection:
        resultado = connection.execute(
            text("""
                SELECT id, nombre
                FROM comuna
                WHERE region_id = :region_id
                ORDER BY nombre
            """),
            {"region_id": region_id}
        )
        comunas = resultado.fetchall()

    return [
        {"id": comuna.id, "nombre": comuna.nombre}
        for comuna in comunas
    ]

@app.route("/informar", methods=["GET", "POST"])
def informar():
    with engine.connect() as connection:
        resultado = connection.execute(
            text("SELECT id, nombre FROM voluntario ORDER BY nombre")
        )
        voluntarios = resultado.fetchall()

        resultado = connection.execute(
            text("SELECT id, nombre FROM ave ORDER BY nombre")
        )
        aves = resultado.fetchall()

    if request.method == "POST":
        voluntario_id =  request.form.get("voluntario", "").strip()
        ave_id =  request.form.get("nombre", "").strip()
        lugar =  request.form.get("lugar", "").strip()
        fecha =  request.form.get("fecha", "").strip()
        archivos = request.files.getlist("files")

        errores = []

        if not validations.validate_voluntario(voluntario_id):
            errores.append("Tiene que seleccionar un voluntario.")
        else:
            with engine.connect() as connection:
                resultado = connection.execute(
                    text("SELECT id FROM voluntario WHERE id = :voluntario_id"),
                    {"voluntario_id": voluntario_id}
                )
                voluntario = resultado.fetchone()

            if voluntario is None:
                errores.append("El voluntario seleccionado no existe.")

        if not validations.validate_ave(ave_id):
            errores.append("Tiene que seleccionar un ave.")
        else:
            with engine.connect() as connection:
                resultado = connection.execute(
                    text("SELECT id FROM ave WHERE id = :ave_id"),
                    {"ave_id": ave_id}
                )
                ave = resultado.fetchone()

            if ave is None:
                errores.append("El ave seleccionada no existe.")
        
        if not validations.validate_lugar(lugar):
                    errores.append("El lugar debe tener como mínimo 8 caracteres.")

        if not validations.validate_fecha(fecha):
                    errores.append("Tiene que ingresar una fecha y hora.")

        if not archivos or all(archivo.filename == "" for archivo in archivos):
                    errores.append("Tiene que seleccionar al menos un archivo.")

        if errores:
            return render_template(
                "informar.html",
                voluntarios = voluntarios,
                aves = aves,
                errores = errores,
                voluntario_id = voluntario_id,
                ave_id = ave_id,
                lugar = lugar,
                fecha = fecha
            )

        with engine.begin() as connection:
            resultado = connection.execute(
                text("""
                    INSERT INTO avistamiento
                        (voluntario_id, ave_id, fecha_hora, lugar, descripcion) 
                    VALUES
                        (:voluntario_id, :ave_id, :fecha, :lugar, NULL)
                """),
                {
                    "voluntario_id": voluntario_id,
                    "ave_id": ave_id,
                    "fecha": fecha,
                    "lugar": lugar
                }
            )

            avistamiento_id = resultado.lastrowid

            for archivo in archivos:
                nombre_og = secure_filename(archivo.filename)

                extension = os.path.splitext(nombre_og)[1]
                nombre_unico = f"{uuid.uuid4()}{extension}"

                ruta_archivo = os.path.join(UPLOAD_FOLDER, nombre_unico)

                archivo.save(ruta_archivo)

                connection.execute(
                        text("""
                            INSERT INTO registro
                                (ruta_archivo, nombre_archivo, avistamiento_id)
                            VALUES
                                (:ruta_archivo, :nombre_archivo, :avistamiento_id)
                        """),
                        {
                            "ruta_archivo": ruta_archivo,
                            "nombre_archivo": nombre_og,
                            "avistamiento_id": avistamiento_id
                        }
                    )

    return render_template("informar.html", voluntarios=voluntarios, aves=aves)

@app.route("/listado")
def listado():
    pagina = request.args.get("pagina", 1, type=int)

    if pagina < 1:
        pagina = 1

    por_pagina = 4
    offset = (pagina - 1) * por_pagina

    with engine.connect() as connection:
        resultado = connection.execute(
            text("""
                SELECT
                    avistamiento.id,
                    ave.nombre AS ave,
                    voluntario.nombre AS voluntario,
                    avistamiento.lugar,
                    avistamiento.fecha_hora
                FROM avistamiento
                JOIN ave
                    ON avistamiento.ave_id = ave.id
                JOIN voluntario
                    ON avistamiento.voluntario_id = voluntario_id
                ORDER BY avistamiento.fecha_hora DESC 
                LIMIT :por_pagina OFFSET :offset     
            """),
            {
                "por_pagina": por_pagina,
                "offset": offset
            }
        )

        avistamientos = resultado.fetchall()

    with engine.connect() as connection:
        resultado = connection.execute(
            text("SELECT COUNT(*) FROM avistamiento")
        )

        total = resultado.scalar()

    hay_siguiente = offset + por_pagina < total

    return render_template("listado.html", avistamientos=avistamientos, pagina=pagina, hay_siguiente=hay_siguiente)

@app.route("/avistamiento/<int:avistamiento_id>")
def detalle_avistamiento(avistamiento_id):
    with engine.connect() as connection:
        resultado = connection.execute(
            text("""
                SELECT
                    avistamiento.id,
                    ave.nombre AS ave,
                    voluntario.nombre AS voluntario,
                    avistamiento.lugar,
                    avistamiento.fecha_hora,
                    avistamiento.descripcion
                FROM avistamiento
                JOIN ave
                    ON avistamiento.ave_id = ave.id
                JOIN voluntario
                    ON avistamiento.voluntario_id = voluntario.id
                WHERE avistamiento.id = :avistamiento_id
            """),
            {"avistamiento_id": avistamiento_id}
        )

        avistamiento = resultado.fetchone()

        if avistamiento is None:
            return "Avistamiento no encontrado", 404

        resultado = connection.execute(
            text("""
                SELECT ruta_archivo, nombre_archivo
                FROM registro
                WHERE avistamiento_id = :avistamiento_id
                ORDER BY id
            """),
            {"avistamiento_id": avistamiento_id}
        )

        archivos = resultado.fetchall()
    
    return render_template("detalle.html", avistamiento=avistamiento, archivos=archivos)

@app.route("/estadisticas")
def estadisticas():
    return render_template("estadisticas.html")

if __name__ == "__main__":
    app.run(debug=True)