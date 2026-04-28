// 1. Identificamos el botón de inventario y el contenedor del Excel
const btnInventario = document.getElementById('btnInventario');
const contenedorExcel = document.getElementById('contenedorExcel');

// 2. Función para que el botón de inventario muestre el Excel
btnInventario.addEventListener('click', function() {
    // Si el contenedor está oculto, lo mostramos
    if (contenedorExcel.style.display === "none") {
        contenedorExcel.style.display = "block";
        
        // Esto hace que la página baje suavemente hasta donde apareció el Excel
        contenedorExcel.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Si ya estaba a la vista, lo volvemos a ocultar
        contenedorExcel.style.display = "none";
    }
});

// 3. Función para el botón de "Cerrar Vista" que pusimos dentro del cuadro
function cerrarExcel() {
    contenedorExcel.style.display = "none";
    // Volver arriba de la página automáticamente
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
