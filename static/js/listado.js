// Variables y constantes

let filtroTipo = document.getElementById("filtro-tipo");
let orden = document.getElementById("orden");
let avistamientosContainer = document.querySelector(".avistamientos");
let paginacion = document.querySelector(".paginación");
let avistamientos = Array.from(document.querySelectorAll(".avistamiento"));
let paginaActual = 1;
const avistamientosPorPagina = 1;
let avistamientosFiltrados = [...avistamientos];

// Filtrado y orden
const filtrarYOrdenar = () => {
    let tipoSeleccionado = filtroTipo.value;

    avistamientosFiltrados = avistamientos.filter((avistamiento) => {
        if (tipoSeleccionado === "todos") {
            return true;
        }
        return avistamiento.dataset.tipo === tipoSeleccionado;
    });
    // Filtro fecha
    if (orden.value === "fecha") {
        avistamientosFiltrados.sort((a,b) => {
            return new Date(b.dataset.fecha) - new Date(a.dataset.fecha);
        });
    }
    // Filtro lugar
    if (orden.value === "lugar") {
        avistamientosFiltrados.sort((a,b) => {
            return a.dataset.lugar.localeCompare(b.dataset.lugar);
        });
    }

    paginaActual = 1;
    mostrarPagina();
};

// Mostrar pagina
const mostrarPagina = () => {
    avistamientosContainer.textContent = "";

    let inicio = (paginaActual - 1) * avistamientosPorPagina;
    let fin = inicio + avistamientosPorPagina;

    let avistamientosPagina = avistamientosFiltrados.slice(inicio, fin);

    for (const avistamiento of avistamientosPagina) {
        avistamientosContainer.appendChild(avistamiento);
    }

    crearPaginacion();
};

// Crear paginación
const crearPaginacion = () => {
    paginacion.textContent = "";

    let cantidadPaginas = Math.ceil(avistamientosFiltrados.length / avistamientosPorPagina);

    let botonAnterior = document.createElement("button");
    botonAnterior.type = "button";
    botonAnterior.innerText = "<";
    botonAnterior.disabled = paginaActual === 1;

    botonAnterior.addEventListener("click", () => {
        paginaActual--;
        mostrarPagina();
    });

    paginacion.appendChild(botonAnterior);

    for (let i = 1; i <= cantidadPaginas; i++) {
        let boton = document.createElement("button");

        boton.type = "button";
        boton.innerText = i;

        boton.addEventListener("click", () => {
            paginaActual = i;
            mostrarPagina();
        });

        paginacion.appendChild(boton);
    }

    let botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.innerText = ">";
    botonSiguiente.disabled = paginaActual === cantidadPaginas;

    botonSiguiente.addEventListener("click", () => {
        paginaActual++;
        mostrarPagina();
    });

    paginacion.appendChild(botonSiguiente);
};

filtroTipo.addEventListener("change", filtrarYOrdenar);
orden.addEventListener("change", filtrarYOrdenar);

filtrarYOrdenar();