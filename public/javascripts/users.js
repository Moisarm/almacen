/*Codigos que le dan funcionalidad a las pantallas de Productos */

var idActualizarUsuarioGlobal = ''

            //Este aca nombre de boton
function changeIdActualizarUser(id, nombreTabla){
    console.log(`ESTO ES EL ID NUEVO: ${id} | nombreTabla: ${nombreTabla}`)

    idActualizarUsuarioGlobal = id
    
}
async function changeIdActualizarUser(){


    console.log(`id global: ${changeIdActualizarUser}`)
    console.log("Actualizar Producto")

    let nombre = document.getElementById('nombreUser').value
    let apellido = document.getElementById('apellido').value
    let rolesValidos = document.getElementById('role').value
    
    console.log(`***********************`)
    console.log({nombre, apellido, rolesValidos})
    console.log(`***********************`)
    
    console.log(`esto es actualizar`)
    console.log(`esto es actualizar3`)
    console.log(`esto es actualizar2`)
    //console.log(`eL ID ES: ${id}`)

  

    // FETCH QUE LLAME A LA API PARA ACTUALIZAR
    
    fetch('http://localhost:3000/producto/actualizar/'+changeIdActualizarUser,
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
       body:JSON.stringify( {nombre, apellido, rolesValidos}) //Aquí se envía
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





async function nuevoUser(){
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
}

async function actualizarUser(){

}

async function eliminarUser(){

}

