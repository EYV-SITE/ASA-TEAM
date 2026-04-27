// 1. Vinculamos los botones del HTML con el código JS
const botonBodega = document.getElementById('btnBodega');
const botonInventario = document.getElementById('btnInventario');

// 2. Definimos la FUNCIÓN (lo que pasará)
function manejarBodega() {
    // Por ahora, solo mostraremos un mensaje para probar
    alert("Abriendo el módulo de Ingreso y Egreso de Bodega...");
    
    // Aquí es donde después podrías:
    // - Redirigir a otra página: window.location.href = "bodega.html";
    // - Mostrar un formulario oculto.
    // - Conectar con una base de datos.
}

function manejarInventario() {
    alert("Cargando el Inventario actualizado...");
}

// 3. Asignamos el "Escuchador de eventos" (el Click)
botonBodega.addEventListener('click', manejarBodega);
botonInventario.addEventListener('click', manejarInventario);
