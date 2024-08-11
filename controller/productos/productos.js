const mongoose = require('mongoose');
const Producto = require('../../models/producto');
const { valProductoSchema } = require('../validacion/valProducto');

let postProducto = async (body)=>{
    try {
        console.log(`==========================`)
        console.log(body)
        console.log(`==========================`)

   
        const { error } =  valProductoSchema.validate(body);

        if(error){
            console.log(`Validacion no pasada`)
            console.log(error)
            return false //DEBES CAMBIAR ESTO POR LO QUE VAS A DEVOLVER SI LA VALIDACION FALLA
        }



     let objProducto = new Producto(body);//esta si valido antes

    
        let respSaveProducto = await objProducto.save()
        .then(resp=>{
            console.log(resp)

            return true

            //true
        }).catch(err=>{
            console.error(err)
            return false
            ///false
        })
    

        return respSaveProducto /// respuesta exitosa
       
    } catch (error) {
        console.log("Error en postProducto controller");   
        console.log(error);   
    }

}


let mostrarProducto = async (query={}, optionsPage, sort= {_id:-1} ,select = 'nombre precio codigo  stock', )=> {
    try {
      const objProducto = await Producto
      .find(query)
      .lean()
      .sort(sort)
      .select(select)
      .skip(optionsPage.page * optionsPage.limit)
      .limit(optionsPage.limit)
      .populate({ path: 'idCategoria', select: 'categoria_nombre' })
      
      .then(async (resultadoProducto)=>{
        console.log(`-----------------`)

        // console.log(ob)

        resultadoProducto.map(obj=>{

            obj.idCategoria = obj.idCategoria.categoria_nombre
        })


            const count = await 
            Producto //clase del modelo. 
            .find(query)// busqueda, el query debe ser un JSON.
            .lean()// simplifica el obj retornado, (se utiliza en base de datos GRANDES)
            .countDocuments({})//cuenta la cantidad de objetos traidos en la busqueda. (total, sin paginacion.)
            .sort({_id:-1}) //ordena la busqueda, de la mas nueva a la vieja.0

            let response = {
                objects: count,//cantidad total
                pages: Math.round(count/optionsPage.limit), //cantidad de paginas, es la division de objetos totales entre el limite
                current: optionsPage.page+1, //pagina actual
                data:resultadoProducto// registros encontrados

            }


        return response
      })
    //   console.log(producto)

      return objProducto
    } catch (error) {

        console.error(error)
        console.log(`Error mostrar producto`)
        
    }
}

let mostrarProductOne =async (query)=>{
    try {
        
        query.isDelete =false
        const producto = await Producto.find(query)
        .lean()
        .select('idCategoria nombre precio codigo stock foto')
      
        console.log(producto)
      
    
        return producto

    } catch (error) {
        console.log("error al Mostrar el Producto")
        console.log(error)
    }
}

//Actualizar
let actualizarProducto = async(query, body)=>{
    try {
        // const updateProducto = await Producto.findOneAndUpdate(query, body)


        console.log(query)
        console.log(body)
        const updateProducto = await Producto.findOneAndUpdate(
            query, body
        )
        .then((ob)=>{
            console.log(`Actualizar Categoria: ${JSON.stringify(ob)}`)

            return {
                status: 200,
                code: 2000,
                date: new Date(),
                info: "Categoria guardada exitosamente",
                response:ob
                }
        })

        return{ status: 400,
            code: 4003,
            date: new Date(),
            info: "Error al guardar en BD", 
            response: updateProducto
            }

    } catch (error) {
        console.log(error);
        
            return{ status: 400,
                code: 4003,
                date: new Date(),
                info: "Error al guardar en BD", 
                error:er
                }
    }
}

module.exports= {
    postProducto,
    mostrarProducto,
    actualizarProducto,
    mostrarProductOne
} 