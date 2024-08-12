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
    await fetch(`/producto/nuevo?token=${window.sessionStorage.getItem('token')}`,  // fetch para enviar el dato
    {
        method:"POST",
        headers:{
            'Content-Type':'application/json', 
            accept: 'application/json',
            'User-agent': 'learning app',
            //'User-id':window.sessionStorage.getItem('usernameId'),
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

function enviarNuevaCategoria(){

    console.log(`ESTO ES CATEGORIA`)
    var categoria_nombre = document.getElementById('nombre').value //Obtengo el valor del input nombre
    console.log(categoria_nombre)
    // nombre = JSON.stringify(nombre);
    // e.preventDefault()
    console.log({categoria_nombre})
    fetch('/categoria/nuevo',
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

   