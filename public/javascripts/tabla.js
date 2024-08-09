const { getProducto } = require('../../controller/buscar');


let tabla = async(req, params)=>{ 
    try {
        console.log(`#Params: ${JSON.stringify(req.params)}`)
        console.log(`#query: ${JSON.stringify(req.query)}`)  ///// ?key=value&key2=vaule2
        //console.log(req.query)
        console.log(`#Body: ${JSON.stringify(req.body)}`)// METODOS : POST Y PUT

        let render
        switch (req.params.nombreTabla) {
        case "producto":
            //llama a la función del controller
            let resProducto = await getProducto(req.query)
            render = { 
            isOk:true,

            title: 'TABLA DE MOI' , 
            nombreTabla:"producto",

            username:"Moises",
            tHead:["HOLA", "chao", "bey"  ],
            tBody:resProducto
            
            }

            break;
        case "tipo-producto":
            let resTipoProducto = await mostrarCategoria()

            console.log(resTipoProducto.length)

            let tHead =[]

            for (const key in resTipoProducto[0]) {
                tHead.push(key)

            }

            // tHead.pop()

            for (let index = 0; index < resTipoProducto.length; index++) {
                // console.log(resTipoProducto)

                resTipoProducto[index].ultimo = true
                // resTipoProducto[index].createdAt = formatoFecha(resTipoProducto[index].createdAt)
                delete resTipoProducto[index].__v

            }





          // console.log([
          //   {
          //     _id: '66aebaadd51461b5d4e53cbe',
          //     categoria_nombre: 'Betico',
          //     isDelete: false,
          //     createdAt: "2024-08-03T23:18:06.046Z",
          //     updatedAt:" 2024-08-03T23:18:06.046Z",
          //     __v: 0,
          //     ultimo
          //   },
          //   {
          //     _id: '66b2056f30963dd4cfae358b',
          //     categoria_nombre: 'Chucherías',
          //     isDelete: false,
          //     createdAt: "2024-08-06T11:13:51.336Z",
          //     updatedAt:" 2024-08-06T11:13:51.336Z",
          //     __v: 0,
          //     ultimo
          //   }])

          render = { 
          isOk:true,

            title: 'TABLA DE MOI' , 
          nombreTabla:"TIpo-Producto",

            username:"Moises",
            tHead,
            tBody:resTipoProducto
            
          
          }

  
          break;
    
      default:

        render = { 
          title: 'TABLA DE MOI' , 
          nombreTabla:"No definida0",
          username:"Moises",
          tHead:[  ],
          tBody:[],
          isOk:false
        
        }
        break;
    }

    res.render('content/leerTabla', render);
    
  } catch (error) {
    next(createError(500));
    console.log(error)
    console.log('Error en js de Tablas')
    
  }
}

module.exports={tabla} 