from flask import Flask
from sqlalchemy import create_engine, text

app = Flask(__name__)

DATABASE_URL = "mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2"

engine = create_engine(DATABASE_URL)

@app.route("/")
def inicio():
    with engine.connect() as connection:
        resultado = connection.execute(text("SELECT COUNT(*) FROM ave"))
        cantidad = resultado.scalar()

    return f"Conexión exitosa. Hay {cantidad} aves =D"

if __name__ == "__main__":
    app.run(debug=True)