


let getProducto = async ( FILTROS )=>{
    try {

        return [{hola:"moises dice hola",
            chao:"moises no se despide",
            bey:"bay",
            ultimo:true
          },{hola:"moises dice hola",
            chao:"moises no se despide",
            bey:"bay",
            ultimo:true
          },{hola:"moises dice hola",
            chao:"moises no se despide",
            bey:"bay",
            ultimo:true
          },{hola:"moises dice hola",
            chao:"moises no se despide",
            bey:"bay",
            ultimo:true
          },]
        
    } catch (error) {
        console.error(`BuscarProducto`)
        console.error(error)
        return []
    }
}
let postProducto = async ()=>{
    try {
        
    } catch (error) {
        console.error(`NuevoProducto`)
        console.error(error)
    }
}

module.exports = {
    getProducto,
    postProducto
  }