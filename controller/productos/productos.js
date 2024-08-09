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


let mostrarProducto = async ()=> {
    try {
      const objProducto = await Producto
      .find()
      .lean()
      .select('nombre precio codigo  stock')
      .populate({ path: 'idCategoria', select: 'categoria_nombre' })
      
      .then(resultadoProducto=>{
        console.log(`-----------------`)
        
        // console.log(ob)

        resultadoProducto.map(obj=>{

            obj.idCategoria = obj.idCategoria.categoria_nombre
        })

        return resultadoProducto
      })
    //   console.log(producto)

      return objProducto
    } catch (error) {
        
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