const data = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "Libertador General Bernardo O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén del General Carlos Ibañez del Campo",
    "Magallanes y de la Antártica Chilena",
];

const poblarRegiones = () => {
    let regionesSelect = document.getElementById("select-region");
    for (const regiones of data) {
        let option = document.createElement("option");
        option.value = regiones;
        option.text = regiones;
        regionesSelect.appendChild(option);
    }
}

window.onload = () => {
    poblarRegiones();
}