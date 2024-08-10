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


function acceder(){

    window.location.replace("/almacen")

}

window.sessionStorage.setItem("token", "valor")
