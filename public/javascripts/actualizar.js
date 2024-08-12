/*Codigos que le dan funcionalidad a las pantallas de Productos */
var idActualizarCategoriaGlobal = ''
var idActualizarProductoGlobal = ''
var idActualizarUsuarioGlobal = ''


function changeIdActualizar(id, nombreTabla){
    console.log(`ESTO ES EL ID NUEVO: ${id} | nombreTabla: ${nombreTabla}`)

    if(nombreTabla==="producto"){

        idActualizarProductoGlobal = id

    }else if(nombreTabla==="tipo-producto"){

        idActualizarCategoriaGlobal = id
    }else{
        idActualizarUsuarioGlobal = id
    }
}

//Actualiza la Categoria
async function idCategoriaActualizar(){


    console.log(`id global: ${idActualizarCategoriaGlobal}`)
    console.log("Actualizar Producto")
    let categoria_nombre= document.getElementById('nombre_cat_actualizar').value
    console.log(`esto es actualizar`)
    console.log(`esto es actualizar3`)
    console.log(`esto es actualizar2`)
    //console.log(`eL ID ES: ${id}`)

  

    // FETCH QUE LLAME A LA API PARA ACTUALIZAR
    fetch('/categoria/actualizar/'+idActualizarCategoriaGlobal,
        // fetch para enviar el dato
   {
       method:"PUT",
       headers:{
           'Content-Type':'application/json', 
           accept: 'application/json',
           'User-agent': 'learning app',

           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "POST, GET, PUT",
           "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
       },
       body:JSON.stringify( {categoria_nombre}) //Aquí se envía
   })
   .then(res => {res.json()
    location.reload();
   })
   .then(data => {
    console.log(data)
    console.log("Se está enviando la api")
    location.reload();

})
    //.catch(er=> alert) // aquí lo muestro en la consola
}

async function idProductoActualizar(){


    console.log(`id global: ${idActualizarProductoGlobal}`)
    console.log("Actualizar Producto")

    let nombre = document.getElementById('productoNombre').value
    let codigo = document.getElementById('codigoProducto').value
    let precio = document.getElementById('precioProducto').value
    let stock = document.getElementById('stockProducto').value
    let idCategoria = document.getElementById('idCategoria').value
    
    console.log(`***********************`)
    console.log({nombre, codigo, precio, stock, idCategoria})
    console.log(`***********************`)
    
    console.log(`esto es actualizar`)
    console.log(`esto es actualizar3`)
    console.log(`esto es actualizar2`)
    //console.log(`eL ID ES: ${id}`)

  

    // FETCH QUE LLAME A LA API PARA ACTUALIZAR
    
    fetch('/producto/actualizar/'+idActualizarProductoGlobal,
        // fetch para enviar el dato
   {
       method:"PUT",
       headers:{
           'Content-Type':'application/json', 
           accept: 'application/json',
           'User-agent': 'learning app',

           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "POST, GET, PUT",
           "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
       },
       body:JSON.stringify( {nombre, codigo, precio, stock, idCategoria}) //Aquí se envía
   })
   .then(res => {res.json()
    location.reload();
   })
   .then(data => {
    console.log(data)
    console.log("Se está enviando la api")
    location.reload();

})
 
    //.catch(er=> alert) // aquí lo muestro en la consola
}

async function actualizarCategoria(){

    console.log(`ESTO ES CATEGORIA`)
    var codigo = document.getElementById('nombre').value //Obtengo el valor del input nombre
    console.log(codigo)
    // nombre = JSON.stringify(nombre);
    // e.preventDefault()
    console.log({codigo})

   await fetch('/categoria/nuevo',
         // fetch para enviar el dato
    {
        method:"POST",
        headers:{
            'Content-Type':'application/json', 
            accept: 'application/json',
            'User-agent': 'learning app',

            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
        body:JSON.stringify( {codigo}) //Aquí se envía
    })
    .then(res => res.json())
    .then(data => {
     console.log(data)
     location.reload();
    
    })
     //.catch(er=> alert) // aquí lo muestro en la consola
}
