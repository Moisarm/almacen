/*Codigos que le dan funcionalidad a las pantallas de Productos */

var idActualizarUsuarioGlobal = ''

            //Este aca nombre de boton
function changeIdActualizarUser(id){
    console.log(`ESTO ES EL ID NUEVO: ${id} `)

    idActualizarUsuarioGlobal = id
    
}

//Actualizar
async function ActualizarUsuario(){


    console.log(`id global: ${idActualizarUsuarioGlobal}`)
    console.log("Actualizar Producto")

    let nombre = document.getElementById('nombreUserUpdate').value
    let apellido = document.getElementById('apellidoUpdate').value
    let role = document.getElementById('roleUpdate').value
    
    console.log(`***********************`)
    console.log({nombre, apellido, role})
    console.log(`***********************`)
    
    console.log(`esto es actualizar`)
    console.log(`esto es actualizar3`)
    console.log(`esto es actualizar2`)
    //console.log(`eL ID ES: ${id}`)

  

    // FETCH QUE LLAME A LA API PARA ACTUALIZAR
    
    fetch('http://localhost:3000/users/actualizar/'+idActualizarUsuarioGlobal,
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
       body:JSON.stringify( {nombre, apellido, role}) //Aquí se envía
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





async function createUser(){
    let nombre = document.getElementById('nombreUser').value
    let apellido = document.getElementById('apellido').value
    let role = document.getElementById('role').value
    let userName = document.getElementById('username').value
    let password= document.getElementById('password').value
  
  
    console.log(`***********************`)
    console.log({nombre, apellido, role, userName, password})
    console.log(`***********************`)
    
   
   
   
    console.log(enviarNuevaProducto)
    // nombre = JSON.stringify(nombre);
    //  e.preventDefault()
    console.log({nombre})
    await fetch('http://localhost:3000/users/nuevo',  // fetch para enviar el dato
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
        body:JSON.stringify( {nombre, apellido, role, userName, password}) //Aquí se envía
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


async function eliminarUser(){
    console.log(`id global: ${idActualizarUsuarioGlobal}`)
    console.log("Actualizar Producto")

    let nombre = document.getElementById('nombreUserUpdate').value
    let apellido = document.getElementById('apellidoUpdate').value
    let role = document.getElementById('roleUpdate').value
    
    console.log(`***********************`)
    console.log({nombre, apellido, role})
    console.log(`***********************`)
    
    console.log(`esto es actualizar`)
    
    //console.log(`eL ID ES: ${id}`)

  

    // FETCH QUE LLAME A LA API PARA ACTUALIZAR
    
    fetch('http://localhost:3000/users/actualizar/'+idActualizarUsuarioGlobal,
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
       body:JSON.stringify( {nombre, apellido, role}) //Aquí se envía
   })
   .then(res => {res.json()
    location.reload();
   })
   .then(data => {
    console.log(data)
    console.log("Se está enviando la api")
    location.reload();

})
}

