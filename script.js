// --- 1. CONFIGURACIÓN DEL SISTEMA DE LOGIN ---
const URL_API = "https://script.google.com/macros/s/AKfycbzifh_OFapV6c7LAbHuN8_nhgXp04eg6PmnTzTeyQ3hfZ4d8sYhghDd69-R1DkDcnac/exec"; 

const seccionLogin = document.getElementById('seccion-login');
const seccionContenido = document.getElementById('contenido');
const btnIngresar = document.getElementById('btnIngresar');
const mensajeError = document.getElementById('mensajeError');

btnIngresar.addEventListener('click', function() {
    const usuarioIngresado = document.getElementById('inputUsuario').value.trim();
    const claveIngresada = document.getElementById('inputClave').value.trim();
    
    if (usuarioIngresado === "" || claveIngresada === "") {
        mostrarError("Por favor, completa todos los campos.");
        return;
    }
    
    btnIngresar.innerText = "Verificando...";
    btnIngresar.disabled = true;
    mensajeError.style.display = "none";

    // Consulta al Google Sheet en segundo plano
    fetch(URL_API)
        .then(response => response.json())
        .then(usuarios => {
            const usuarioValido = usuarios.find(u => 
                u.usuario.toLowerCase() === usuarioIngresado.toLowerCase() && 
                u.clave === claveIngresada && 
                u.estado.toLowerCase() === "activo"
            );

            if (usuarioValido) {
                // Acceso concedido: se oculta el login y aparece la botonera
                seccionLogin.style.display = "none";
                seccionContenido.style.display = "block";
            } else {
                mostrarError("Usuario/Clave incorrectos o cuenta inactiva.");
                reestablecerBoton();
            }
        })
        .catch(error => {
            console.error("Error conectando con la base de datos:", error);
            mostrarError("Error de conexión. Inténtalo de nuevo.");
            reestablecerBoton();
        });
});

function mostrarError(texto) {
    mensajeError.innerText = texto;
    mensajeError.style.display = "block";
}

function reestablecerBoton() {
    btnIngresar.innerText = "Ingresar";
    btnIngresar.disabled = false;
}


// --- 2. LÓGICA PARA VISOR DE INVENTARIO (ARCHIVO MAESTRO) ---
const botonInventario = document.getElementById('btnInventario');
const visor = document.getElementById('contenedorPDF');

botonInventario.addEventListener('click', function() {
    if (visor.style.display === "none") {
        visor.style.display = "block";
        visor.scrollIntoView({ behavior: 'smooth' });
    } else {
        visor.style.display = "none";
    }
});

function cerrarVisor() {
    document.getElementById('contenedorPDF').style.display = "none";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// --- 3. LÓGICA PARA VISOR DEL PLAN ANUAL ---
const btnPlan = document.getElementById('btnReportes');
const visorPlan = document.getElementById('contenedorPlan');

btnPlan.addEventListener('click', function() {
    if (visorPlan.style.display === "none") {
        visorPlan.style.display = "block";
        visorPlan.scrollIntoView({ behavior: 'smooth' });
    } else {
        visorPlan.style.display = "none";
    }
});

function cerrarPlan() {
    document.getElementById('contenedorPlan').style.display = "none";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
