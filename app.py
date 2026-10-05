from flask import Flask, request, render_template
from sqlalchemy import create_engine, text
from utils import validations

app = Flask(__name__)

DATABASE_URL = "mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2"

engine = create_engine(DATABASE_URL)

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

@app.route("/informar")
def informar():
    return render_template("informar.html")

@app.route("/listado")
def listado():
    return render_template("listado.html")

@app.route("/estadisticas")
def estadisticas():
    return render_template("estadisticas.html")

if __name__ == "__main__":
    app.run(debug=True)