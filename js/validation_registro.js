const validateNombre = (nombre) => {
    if (!nombre) return false;
    let lengthValid = nombre.trim().length >= 4;
    return lengthValid;
};

const validateRUT = (rut) => {
    if (!rut) return false;
    let lengthValid = rut.length > 7;

    // se valida el formato del rut
    let re = /^0*(\d{1,3})\.(\d{3})\.(\d{3})-([\dkK])$/; // expresión regular para el rut con punto y guion
    let formatValid = re.test(rut);

    // validamos
    return lengthValid && formatValid;
};

const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length > 15;

    // se valida el formato del email
    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);

    // validamos
    return lengthValid && formatValid;
};

const validateTelefono = (telefono) => {
    if (!telefono) return false;
    let lengthValid = telefono.length >= 8;

    // se valida el formato del telefono
    let re = /^[0-9]+$/;
    let formatValid = re.test(telefono);

    // validamos
    return lengthValid && formatValid;
};

const validateSelect = (select) => {
    if (!select) return false;
    return true;
};

const validateComuna = (comuna) => {
    if (!comuna) return false;
    let lengthValid = comuna.trim().length >= 4;
    return lengthValid;
};

const validateCalle = (calle) => {
    if (!calle) return false;
    let lengthValid = calle.trim().length >= 10;
    return lengthValid;
};

const validateForm = () => {
    // obtener elementos del DOM del formulario de registro.html
    let myForm = document.forms["myForm"];
    let nombre = myForm["nombre"].value;
    let rut = myForm["rut"].value;
    let email = myForm["email"].value;
    let telefono = myForm["telefono"].value;
    let region = myForm["select-region"].value;
    let comuna = myForm["comuna"].value;
    let calle = myForm["calle"].value;

    // variables auxiliares de validacion
    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid &&= false;
    };

    // logica de la validacion
    if (!validateNombre(nombre)) {
        setInvalidInput("Nombre");
    }
    if (!validateRUT(rut)) {
        setInvalidInput("RUT");
    }
    if (!validateEmail(email)) {
        setInvalidInput("Email");
    }
    if (!validateTelefono(telefono)) {
        setInvalidInput("Teléfono");
    }
    if (!validateSelect(region)) {
        setInvalidInput("Región");
    }
    if (!validateComuna(comuna)) {
        setInvalidInput("Comuna");
    }
    if (!validateCalle(calle)) {
        setInvalidInput("Calle y número");
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
        validationMessageElem.innerText = "¡Registro válido! Volviendo al inicio";
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