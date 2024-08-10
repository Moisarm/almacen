/*Codigos que le dan funcionalidad a las pantallas de Productos */
var idActualizarCategoriaGlobal = ''
var idActualizarProductoGlobal = ''


function changeIdActualizar(id, nombreTabla){
    console.log(`ESTO ES EL ID NUEVO: ${id} | nombreTabla: ${nombreTabla}`)

    if(nombreTabla==="producto"){

        idActualizarProductoGlobal = id

    }else{

        idActualizarCategoriaGlobal = id
    }
}

