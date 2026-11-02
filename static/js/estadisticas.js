$(document).ready(function () {
    fetch("/estadisticas/datos")
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("Error al obtener las estadísticas");
            }

            return respuesta.json();
        })
        .then(function (datos) {
            const datosDias = datos.avistamientos_dia.map(function (fila) {
                return [
                    new Date(fila.fecha).getTime(),
                    fila.cantidad
                ];
            });
            $.plot("#grafico-dias", [
                {
                    label: "Avistamientos",
                    data: datosDias,
                    lines: { show: true },
                    points: { show: true }
                }
            ], {
                xaxis: {
                    mode: "time",
                    timeformat: "%d/%m/%y"
                },
                yaxis: {
                    min: 0,
                    tickDecimals: 0
                },
                grid: {
                    hoverable: true
                }
            });

            const datosAve = datos.avistamientos_ave.map(function (fila) {
                return {
                    label: fila.ave,
                    data: fila.cantidad
                };
            });

            $.plot("#grafico-aves", datosAve, {
                series: {
                    pie: {
                        show: true,
                        label: {
                            show: false,
                        }
                    }
                },
                legend: {
                    show: true,
                    position: "e"
                }
            });

            const datosComunas = datos.voluntarios_comuna.map(function (fila, indice) {
                return [
                    indice,
                    fila.cantidad
                ];
            });

            $.plot("#grafico-comunas", [
                {
                    label: "Voluntarios",
                    data: datosComunas,
                    bars: {
                        show: true,
                        barWidth: 0.6,
                        align: "center"
                    }
                }
            ], {
                xaxis: {
                    ticks: datos.voluntarios_comuna.map(function (fila, indice) {
                        return [indice, fila.comuna];
                    })
                },
                yaxis: {
                    min: 0,
                    tickDecimals: 0
                }
            });
        })
        .catch(function (error) {
            console.error("Error al cargar los graficos:", error);
        });
});