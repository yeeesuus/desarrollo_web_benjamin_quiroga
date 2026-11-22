const buscador = document.getElementById("buscador");
const resultados = document.getElementById("resultados");

function agregarTextoResaltado(elemento, texto, busqueda) {
    const textoMinuscula = texto.toLowerCase();
    const buscquedaMinuscula = busqueda.toLowerCase();

    let inicio = 0;
    let posicion = textoMinuscula.indexOf(buscquedaMinuscula, inicio);

    while (posicion !== -1) {
        elemento.appendChild(
            document.createTextNode(texto.substring(inicio, posicion))
        );

        const destacado = document.createElement("mask");
        destacado.textContent = texto.substring(
            posicion,
            posicion + busqueda.length
        );

        elemento.appendChild(destacado);

        inicio = posicion + busqueda.length;
        posicion = textoMinuscula.indexOf(buscquedaMinuscula, inicio);
    }
    elemento.appendChild(document.createTextNode(texto.substring(inicio)));
}

buscador.addEventListener("input", async () => {
    const texto = buscador.value.trim();

    resultados.innerHTML = "";

    if (texto.length === 0) {
        return;
    }

    try {
        const resupuesta = await fetch(
            `/buscar-avistamientos?texto=${encodeURIComponent(texto)}`
        );

        if (!resupuesta.ok) {
            throw new Error("Error al buscar avistamientos");
        }

        const avistamientos = await resupuesta.json();

        if (avistamientos.length === 0) {
            resultados.textContent = "No se encontraron avistamientos.";
            return;
        }

        avistamientos.forEach(avistamiento => {
            const elemento = document.createElement("div");

            const ave = document.createElement("p");
            ave.append("Ave: ");
            agregarTextoResaltado(ave, avistamiento.ave, texto);

            const voluntario = document.createElement("p");
            voluntario.append("Voluntario: ");
            agregarTextoResaltado(voluntario, avistamiento.voluntario, texto);

            const comuna = document.createElement("p");
            comuna.append("Comuna: ");
            agregarTextoResaltado(comuna, avistamiento.comuna, texto);

            const fecha = document.createElement("p");
            fecha.textContent = `Fecha: ${avistamiento.fecha}`;

            const nota = document.createElement("p");
            nota.textContent = `Nota: ${avistamiento.promedio}`;

            const selector = document.createElement("select");
            selector.appendChild(new Option("Seleccionar nota", ""));

            for (let i = 1; i <= 7; i++) {
                selector.appendChild(new Option(i, i));
            }

            const boton = document.createElement("button");
            boton.textContent = "Evaluar";

            boton.addEventListener("click", async () => {
                const valor = selector.value;

                if (valor === "") {
                    alert("Debes seleccionar una nota.");
                    return;
                }

                try {
                    const parametros = new URLSearchParams({
                        avistamientoId: avistamiento.id,
                        nota: valor
                    });
                    const resupuesta = await fetch(
                        `/evaluar-avistamiento?${parametros}`,
                        { method: "PATCH" }
                    );

                    if (!resupuesta.ok) {
                        throw new Error("No se pudo registrar la evaluación");
                    }

                    const datos = await resupuesta.json();

                    nota.textContent = `Nota: ${datos.promedio}`;

                    selector.value = "";
                    alert("Evalueción registrada correctamente.");
                } catch (error) {
                    console.error(error);
                    alert("Ocurrió un error al evaluar el avistamiento.");
                }
            });
            elemento.append(
                ave,
                voluntario,
                comuna,
                fecha,
                nota,
                selector,
                boton
            );
            resultados.appendChild(elemento);
        });
        
    } catch (error) {
        console.error(error);
        resultados.textContent = "Ocurrió un error al realizar la búsqueda.";
    }
});