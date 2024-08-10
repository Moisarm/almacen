





//Funcion para crear una categoria
function enviarNuevaCategoria(){

    console.log(`ESTO ES CATEGORIA`)
    var categoria_nombre = document.getElementById('nombre').value //Obtengo el valor del input nombre
    console.log(categoria_nombre)
    // nombre = JSON.stringify(nombre);
    // e.preventDefault()
    console.log({categoria_nombre})
    fetch('http://localhost:3000/categoria/nuevo',
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
        body:JSON.stringify( {categoria_nombre}) //Aquí se envía
    })
    .then(res => res.json())
    .then(data => {
     console.log(data)
     location.reload();})
     //.catch(er=> alert) // aquí lo muestro en la consola
}


// enviarNuevaCategoria.addEventListener('click', async function(e){
//     //dinamico, debe detectar si es producot o catProduc




//Funcion para crear un producto

/*Funcion para Crear Producto */
async function enviarNuevaProducto(e){
 //dinamico, debe detectar si es producot o catProduc

 let nombre = document.getElementById('producto').value //Obtengo el valor del input nombre
 let codigo = document.getElementById('codigo').value //Obtengo el valor del input nombre
 let precio = document.getElementById('precio').value //Obtengo el valor del input nombre
 let stock = document.getElementById('stock').value //Obtengo el valor del input nombre
 let idCategoria = document.getElementById('idCategoria').value //Obtengo el valor del input nombre



 console.log(enviarNuevaProducto)
 // nombre = JSON.stringify(nombre);
 //  e.preventDefault()
 console.log({nombre})
 await fetch('http://localhost:3000/producto/nuevo',  // fetch para enviar el dato
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
     body:JSON.stringify( {
        nombre,
        precio,
        stock,
        codigo,
        idCategoria
    
    }) //Aquí se envía
 })
 //Refresca La Pantalla
 .then(res => {
    res.json()
 })
 .then(data => {
    console.log(data)
    location.reload();

}) // aquí lo muestro en la consola

console.log('------------------------')
console.log(enviarNuevaProducto)
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
    fetch('http://localhost:3000/categoria/actualizar/'+idActualizarCategoriaGlobal,
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
    
    fetch('http://localhost:3000/producto/actualizar/'+idActualizarProductoGlobal,
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


//Muestra el Producto actual en el Modulo Actualizar
async function productoActual(Id) {

    console.log(productoActual)
    console.log("El id es: "+Id)

    //Consume La Api
    await fetch('http://localhost:3000/producto/'+Id,{

    }).then(res=>res.json)
    .then (data=>{
        
        //Muestra el valor actual del registro en el Formulario
        document.getElementById("producto").innerHTML = "anteriormente: "+data.response.nombre;
        document.getElementById("codigo").innerHTML = "anteriormente: "+data.response.codigo;
        document.getElementById("precio").innerHTML = "anteriormente: "+data.response.precio;
        document.getElementById("stock").innerHTML = "anteriormente: "+data.response.stock;
        //document.getElementById("labelNombreCat").innerHTML = "anteriormente: "+data.response.codigo;
       
        console.log("Datos despues de Consumida la API")
        console.log(data)
    })   
}


//Función Para actualizar categorias
async function actualizarCategoria(){

    console.log(`ESTO ES CATEGORIA`)
    var codigo = document.getElementById('nombre').value //Obtengo el valor del input nombre
    console.log(codigo)
    // nombre = JSON.stringify(nombre);
    // e.preventDefault()
    console.log({codigo})

   await fetch('http://localhost:3000/categoria/nuevo',
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

// enviarNuevaProducto.addEventListener('click', async function(e){
   
// })

//Elimina Categoria
/*async function deleteCat(params) {
    console.log("--------------------------Elimar Categoria--------------------")
    console.log(`id global: ${idActualizarCategoriaGlobal}`)
    let borrarCat = document.getElementById('nombre_cat_actualizar').
}*/

