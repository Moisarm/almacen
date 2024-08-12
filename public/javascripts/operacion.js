async function actualizarStock(isUp){


    console.log(`id global: ${idActualizarProductoGlobal}`)
    console.log("Actualizar Producto")

    let cantidad = document.getElementById('CAJA DE TEXTO DE CANTIDAD').value
    let idProducto = document.getElementById('idOptionProducto').value //Obtengo el valor del input nombre
    
    console.log(`***********************`)
    console.log({nombre, codigo, precio, stock, idCategoria})
    console.log(`***********************`)
    
    console.log(`esto es actualizar`)
    console.log(`esto es actualizar3`)
    console.log(`esto es actualizar2`)
    //console.log(`eL ID ES: ${id}`)

  

    // FETCH QUE LLAME A LA API PARA ACTUALIZAR
    
    fetch('/producto/actualizar/stock/'+idProducto,
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