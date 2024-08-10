//Funcion para crear una categoria


// enviarNuevaCategoria.addEventListener('click', async function(e){
//     //dinamico, debe detectar si es producot o catProduc




//Funcion para crear un producto

/*Funcion para Crear Producto */





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

// enviarNuevaProducto.addEventListener('click', async function(e){
   
// })

//Elimina Categoria
/*async function deleteCat(params) {
    console.log("--------------------------Elimar Categoria--------------------")
    console.log(`id global: ${idActualizarCategoriaGlobal}`)
    let borrarCat = document.getElementById('nombre_cat_actualizar').
}*/



async function acceder(){

    /// CAPTURAR EL USER Y PASSW

    let userName = document.getElementById('usuario').value
    let password = document.getElementById('clave').value


    fetch('http://localhost:3000/login/',
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
       body:JSON.stringify( {    
        userName,
        password
    }) //Aquí se envía
    })
    .then(res => res.json())
    .then(data => {
    console.log(data)


    window.sessionStorage.setItem(`token`, data.response.token)



    window.location.assign("/dashboard/?token="+window.sessionStorage.getItem("token"))

    })





}






async function accederProducto(){

    window.location.assign("/tablas/producto/?token="+window.sessionStorage.getItem("token"))
}
async function accedercategoria(){

    window.location.assign("/tablas/tipo-producto/?token="+window.sessionStorage.getItem("token"))
}
async function accederProducto(){

    window.location.assign("/tablas/producto/?token="+window.sessionStorage.getItem("token"))
}
