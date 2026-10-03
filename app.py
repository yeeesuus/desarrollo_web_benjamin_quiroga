from flask import Flask, render_template
from sqlalchemy import create_engine, text

app = Flask(__name__)

DATABASE_URL = "mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2"

engine = create_engine(DATABASE_URL)

@app.route("/")
def inicio():
    return render_template("inicio.html")

@app.route("/registro")
def registro():
    return render_template("registro.html")

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