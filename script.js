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


// --- 2. LÓGICA PARA NUEVO MENÚ DE INVENTARIO (VISTA PREVIA / PDF EN VIVO) ---
const botonInventario = document.getElementById('btnInventario');
const modalInventario = document.getElementById('modalInventario');
const btnOptEditable = document.getElementById('btnOptEditable');
const btnOptPDF = document.getElementById('btnOptPDF');
const btnCancelarModal = document.getElementById('btnCancelarModal');

const visor = document.getElementById('contenedorPDF');
const iframeInventario = document.getElementById('iframeInventario');

// Enlaces dinámicos construidos con tu ID de Google Drive y tu Hoja GID
const urlEditable = "https://docs.google.com/spreadsheets/d/1i_ZB-IuV3Pt1tiE4U8_9uEtLkNdRIZ3B2AXo_y5C6SM/preview?gid=951590461";
const urlPDFEnVivo = "https://docs.google.com/spreadsheets/d/1i_ZB-IuV3Pt1tiE4U8_9uEtLkNdRIZ3B2AXo_y5C6SM/export?format=pdf&gid=951590461";

// 1. Al presionar el botón principal del portal, abrimos el cuadro elegante
if (botonInventario) {
    botonInventario.addEventListener('click', function() {
        if (modalInventario) modalInventario.style.display = "flex";
    });
}

// 2. Si elige la versión Editable: Abre una pestaña nueva con el Google Sheet protegido
if (btnOptEditable) {
    btnOptEditable.addEventListener('click', function() {
        window.open(urlEditable, '_blank');
        if (modalInventario) modalInventario.style.display = "none";
    });
}

// 3. Si elige la versión PDF: Inyecta el PDF automático en vivo dentro de tu visor actual
if (btnOptPDF) {
    btnOptPDF.addEventListener('click', function() {
        if (iframeInventario) iframeInventario.src = urlPDFEnVivo;
        if (visor) visor.style.display = "block";
        if (modalInventario) modalInventario.style.display = "none";
        if (visor) visor.scrollIntoView({ behavior: 'smooth' });
    });
}

// 4. Opción para cancelar y cerrar el cuadro si el usuario cambia de opinión
if (btnCancelarModal) {
    btnCancelarModal.addEventListener('click', function(e) {
        e.preventDefault();
        if (modalInventario) modalInventario.style.display = "none";
    });
}

function cerrarVisor() {
    if (visor) visor.style.display = "none";
    if (iframeInventario) iframeInventario.src = "";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// --- 3. LÓGICA PARA VISOR DEL PLAN ANUAL ---
const btnPlan = document.getElementById('btnReportes');
const visorPlan = document.getElementById('contenedorPlan');

if (btnPlan) {
    btnPlan.addEventListener('click', function() {
        if (visorPlan) {
            if (visorPlan.style.display === "none" || visorPlan.style.display === "") {
                visorPlan.style.display = "block";
                visorPlan.scrollIntoView({ behavior: 'smooth' });
            } else {
                visorPlan.style.display = "none";
            }
        }
    });
}

function cerrarPlan() {
    const vp = document.getElementById('contenedorPlan');
    if (vp) vp.style.display = "none";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
