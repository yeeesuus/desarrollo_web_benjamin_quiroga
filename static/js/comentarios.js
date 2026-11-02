const form = document.getElementById("form-comentario");
const listaComentarios = document.getElementById("lista-comentarios");
const mensajeValidacion = document.getElementById("mensaje-validacion");
const url = form.dataset.url;

const cargarComentarios = async () => {
    try {
        const respuesta = await fetch(url);
        const comentarios = await respuesta.json();

        listaComentarios.innerHTML = "";

        if (!respuesta.ok) {
            listaComentarios.textContent = comentarios.error;
            return;
        }

        if (comentarios.length === 0) {
            listaComentarios.textContent = "Todavía no hay comentarios.";
            return;
        }

        for (const comentario of comentarios) {
            const elemento = document.createElement("div");
            
            const nombre = document.createElement("h4");
            nombre.textContent = comentario.nombre;

            const texto = document.createElement("p");
            texto.textContent = comentario.texto;

            const fecha = document.createElement("small");
            fecha.textContent = comentario.fecha;

            elemento.append(nombre, texto, fecha);
            listaComentarios.append(elemento);
        }
    } catch (error) {
        listaComentarios.textContent = "Error al cargar los comentarios.";
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const texto = document.getElementById("texto").value.trim();

    const errores = [];

    if (nombre.length < 3 || nombre.length > 50) {
        errores.push("El nombre debe tener entre 3 y 50 caracteres.");
    }

    if (texto.length < 5) {
        errores.push("El comentario debe tener al menos 5 caracteres.");
    }

    if (errores.length > 0) {
        mensajeValidacion.innerHTML = "";

        for (const erorr of errores) {
            const elemento = document.createElement("p");
            elemento.textContent = error;
            mensajeValidacion.append(elemento);
        }

        mensajeValidacion.hidden = false;
        return;
    }

    try {
        const respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                texto: texto
            })
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            mensajeValidacion.textContent = resultado.errores.join(" ");
            mensajeValidacion.hidden = false;
            return;
        }

        mensajeValidacion.hidden = true;
        form.reset();

        await cargarComentarios();
    } catch (error) {
        mensajeValidacion.textContent = "No se pudo enviar el comentario.";
        mensajeValidacion.hidden = false;
    }
});

cargarComentarios();