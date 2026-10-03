from flask import Flask, request, render_template
from sqlalchemy import create_engine, text

app = Flask(__name__)

DATABASE_URL = "mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2"

engine = create_engine(DATABASE_URL)

@app.route("/")
def inicio():
    return render_template("inicio.html")

@app.route("/registro", methods=["GET", "POST"])
def registro():
    if request.method == "POST":
        print(request.form)
        return "Formulario recibido"

    with engine.connect() as connection:
        resultado = connection.execute(
            text("SELECT id, nombre FROM region ORDER BY nombre")
        )
        regiones = resultado.fetchall()
    
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