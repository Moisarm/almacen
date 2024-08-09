let Paginacion = async()=>{

    let limit = 10;
    let inicio = 0;

    let paginas = resProducto.length/ limit

    let paginaActiva = 1

    let arreglo= resProducto.slice(inicio,limit)
}
module.exports={Paginacion} 