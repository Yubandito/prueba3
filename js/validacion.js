function validar() {
  // ========================================================Variables===============================================================
    var username = document.getElementById("input-username").value.trim();
    var password = document.getElementById("input-password").value;
    var confirmPassword = document.getElementById("input-confirm-password").value;
    var direccion = document.getElementById("input-direccion").value.trim();
    var comuna = document.getElementById("select-comuna").value;
    var fono = document.getElementById("input-fono").value.trim();
    var url = document.getElementById("input-url").value.trim();
    var hobbies = document.getElementById("lista-hobbies").getElementsByTagName("li").length;

 // =================================================LimpiaErrores=======================================================================
    document.getElementById("error-username").innerText = "";
    document.getElementById("error-password").innerText = "";
    document.getElementById("error-confirm-password").innerText = "";
    document.getElementById("error-direccion").innerText = "";
    document.getElementById("error-comuna").innerText = "";
    document.getElementById("error-fono").innerText = "";
    document.getElementById("error-url").innerText = "";
    document.getElementById("error-hobbies").innerText = "";

// =====================================================Validar======================================================================
    var valid = true;

    if (!validarNombreUsuario(username)) {
        document.getElementById("error-username").innerText = "El nombre de usuario debe comenzar con una letra, puede tener uno o más dígitos pero solo al final, y debe tener entre 5 y 10 caracteres.";
        return false;
    }

    if (password === "") {
        document.getElementById("error-password").innerText = "La contraseña es obligatoria.";
        valid = false;
    } else if (!validarFormatoContrasena(password, username)) {
        document.getElementById("error-password").innerText = "La contraseña debe tener de 3 a 6 caracteres y contener al menos un dígito y una letra. No puede contener el nombre de usuario.";
        valid = false;
    }

    if (confirmPassword !== password) {
        document.getElementById("error-confirm-password").innerText = "Las contraseñas no coinciden.";
        valid = false;
    }

    if (direccion === "") {
        document.getElementById("error-direccion").innerText = "La dirección es obligatoria.";
        valid = false;
    }

    if (comuna === "default") {
        document.getElementById("error-comuna").innerText = "Seleccione una comuna.";
        valid = false;
    }

    if (fono === "") {
        document.getElementById("error-fono").innerText = "El teléfono es obligatorio.";
        valid = false;
    } else if (!validarFormatoTelefono(fono)) {
        document.getElementById("error-fono").innerText = "El formato del teléfono es incorrecto.";
        valid = false;
    }

    if (url === "") {
        document.getElementById("error-url").innerText = "La URL es obligatoria.";
        valid = false;
    } else if (!validarFormatoURL(url)) {
        document.getElementById("error-url").innerText = "El formato de la URL es incorrecto.";
        valid = false;
    }

    if (hobbies === 0) {
        document.getElementById("error-hobbies").innerText = "Agregue al menos una afición o pasatiempo.";
        valid = false;
    }

    return valid;
}

 // ========================================FUNCIONES===================================================================
function agregarAficion() {
    var hobbyInput = document.getElementById("input-hobbies");
    var hobby = hobbyInput.value.trim();
    if (hobby !== "") {
        var lista = document.getElementById("lista-hobbies");
        var li = document.createElement("li");
        li.innerText = hobby;
        lista.appendChild(li);
        hobbyInput.value = "";
    }
}

function validarNombreUsuario(username) {
    // Comprueba la longitud del usaurio
    if (username.length < 5 || username.length > 10) {
        return false;
    }

    // Verifica que el primer caracter sea una letra
    if (!esLetra(username[0])) {
        return false;
    }

    // Comprueba si entre medio hay un numero
    for (var i = 1; i < username.length - 1; i++) {
        if (!esLetraONumero(username[i])) {
            return false;
        }
    }

    // Compruena si lo ultimo en digitar es un numero
    if (!esNumero(username[username.length - 1])) {
        return false;
    }

    return true;
}

function esLetra(char) {
    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
}

function esNumero(char) {
    return char >= '0' && char <= '9';
}

function esLetraONumero(char) {
    return esLetra(char) || esNumero(char);
}

function validarFormatoTelefono(fono) {

    // revisa que el teléfono comience con '+569' y tenga los 8 dígitos 
    if (fono.length !== 11 || !fono.startsWith("+569")) {
        return false;
    }

    // revisa si despues del +569 todo sea digito
    for (var i = 4; i < fono.length; i++) {
        if (!esNumero(fono[i])) {
            return false;
        }
    }

    return true;
}

function validarFormatoURL(url) {
    // revisa si al comienzo es "http://" o "https://"
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return false;
    }

    return true;
}

function validarFormatoContrasena(password, username) {
    // Comprueba el minimo y el maximo de la contraseña 3-6
    if (password.length < 3 || password.length > 6) {
        return false;
    }

    // Revisa que la contraseña tengo al menos un digito y una letra
    var tieneDigito = false;
    var tieneLetra = false;
    for (var i = 0; i < password.length; i++) {
        if (esNumero(password[i])) {
            tieneDigito = true;
        }
        if (esLetra(password[i])) {
            tieneLetra = true;
        }
    }
    if (!tieneDigito || !tieneLetra) {
        return false;
    }

    // revisa con el metodo includes si esta el nombre de usuario en la contraseña
    if (password.includes(username)) {
        return false;
    }

    return true;
}