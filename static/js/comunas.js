const regionSelect = document.getElementById("select-region");
const comunaSelect = document.getElementById("comuna");

regionSelect.addEventListener("change", async () => {
    const regionId = regionSelect.value;

    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

    if (!regionId) {
        return;
    }

    const response = await fetch(`/comunas/${regionId}`);
    const comunas = await response.json();

    for (const comuna of comunas) {
        const option = document.createElement("option");
        option.value = comuna.id;
        option.textContent = comuna.nombre;
        comunaSelect.appendChild(option);
    }
});