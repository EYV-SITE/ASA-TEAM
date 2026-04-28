// 1. Identificamos el botón de inventario y el cuadro del visor
const botonInventario = document.getElementById('btnInventario');
const visor = document.getElementById('contenedorPDF');

// 2. Programamos qué pasa cuando haces clic en el botón
botonInventario.addEventListener('click', function() {
    // Si el visor está oculto (none), lo mostramos (block)
    if (visor.style.display === "none") {
        visor.style.display = "block";
        
        // Esto hace que la página baje suavemente hasta el PDF
        visor.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Si ya estaba abierto, lo volvemos a ocultar
        visor.style.display = "none";
    }
});

// 3. Función especial para el botón rojo de "Cerrar Visor"
function cerrarVisor() {
    document.getElementById('contenedorPDF').style.display = "none";
    
    // Al cerrar, volvemos automáticamente arriba de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
