# Decisiones de diseño

## Buscador

Se implementó un buscador que permite encontrar avistamientos por nombre de ave, voluntario o comuna. Las coincidencias se resaltan en la página y, en caso de no encontrar resultados, se muestra un mensaje indicando que no existen coincidencias.

## Evaluaciones

Se agregó la tabla nota a la base de datos, relacionada con los avistamientos mediante una clave foránea. Cada evaluación corresponde a una nota entera entre 1 y 7. Además, se muestra el promedio de las evaluaciones de cada avistamiento, actualizándose sin necesidad de recargar la página.