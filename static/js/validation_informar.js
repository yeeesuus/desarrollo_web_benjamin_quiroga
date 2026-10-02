const validateTipo = (tipo) => {
    if (!tipo) return false;
    let lengthValid = tipo.trim().length >= 4;
    return lengthValid;
};

const validateNombre = (nombre) => {
    if (!nombre) return false;
    let lengthValid = nombre.trim().length >= 4;
    return lengthValid;
};

const validateLugar = (lugar) => {
    if (!lugar) return false;
    let lengthValid = lugar.trim().length >= 8;
    return lengthValid;
};

const validateFecha = (fecha) => {
    if (!fecha) return false;

    let fechaAvistamiento = new Date(fecha);
    let fechaActual = new Date();

    let fechaMinima = new Date();
    fechaMinima.setFullYear(fechaActual.getFullYear() - 1);

    return fechaAvistamiento <= fechaActual && fechaAvistamiento >= fechaMinima;
};

const validateFiles = (files) => {
    if (!files) return false;
    
    // validamos numero de archivos
    let lengthValid = files.length >= 1;

    // validacion del tipo de archivo
    let typeValid = true;

    for (const file of files) {
        let fileFamily = file.type.split("/")[0];
        typeValid &&= (fileFamily == "image" || file.type == "video");
    }
    return lengthValid && typeValid;
};


const validateForm = () => {
    // obtener elementos del DOM del formulario de registro.html
    let myForm = document.forms["myForm"];
    let tipo = myForm["tipo"].value;
    let nombre = myForm["nombre"].value;
    let lugar = myForm["lugar"].value;
    let fecha = myForm["fecha"].value;
    let files = myForm["files"].files;

    // variables auxiliares de validacion
    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid &&= false;
    };

    // logica de la validacion
    if (!validateTipo(tipo)) {
        setInvalidInput("Tipo");
    }
    if (!validateNombre(nombre)) {
        setInvalidInput("Nombre");
    }
    if (!validateLugar(lugar)) {
        setInvalidInput("Lugar");
    }
    if (!validateFecha(fecha)) {
        setInvalidInput("Fecha");
    }
    if (!validateFiles(files)) {
        setInvalidInput("Foto o Vídeo");
    }

    // mostramos la validación
    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");

    if (!isValid) {
        validationListElem.textContent = "";
        // se agregan los elemntos inválidos a val-list
        for (const input of invalidInputs) {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }
        // establecemos val-msg
        validationMessageElem.innerText = "Los siguientes campos son inválidos:";

        // aplicamos el diseño del error
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44366";

        // hacemos visible el mensaje de validacion
        validationBox.hidden = false;
    } else{
        // ocultamos el formulario
        myForm.style.display = "none";

        // mensaje de éxito
        validationMessageElem.innerText = "¡Registro de avistamiento completado! Volviendo al inicio";
        validationListElem.textContent = "";

        // aplicamos diseño del éxito
        validationBox.style.backgroundColor = "#ddffdd";
        validationBox.style.borderLeftColor = "#4CAF50";

        // agregamos el boton para volver al inicio.html
        let returnButton = document.createElement("button");
        returnButton.innerText = "Volver";
        returnButton.addEventListener("click", () => {
            window.location.href = "inicio.html";
        });

        validationBox.appendChild(returnButton); //agregar boton de volver

        // hacemos visible el mensaje de validación
        validationBox.hidden = false;
    }  
};

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);