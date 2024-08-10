const mongoose = require('mongoose');
const Categoria = require('../../models/categoria');
const  {valCategoriaSchema}= require('../validacion/valCategoria');
const Joi = require('joi')




let postCategoria = async (body)=>{
    try {
        console.log(`==========================`)
        console.log(body)
        console.log(`==========================`)

   
        const { error } =  valCategoriaSchema.validate(body);

        if(error){
            console.log(`Validacion no pasada`)
            console.log(error)
            return false //DEBES CAMBIAR ESTO POR LO QUE VAS A DEVOLVER SI LA VALIDACION FALLA
        }



     let objCategoria = new Categoria(body);//esta si valido antes

    
        let respSaveCategoria = await objCategoria.save()
        .then(resp=>{
            console.log(resp)

            return true

            //true
        }).catch(err=>{
            console.error(err)
            return false
            ///false
        })
    

        return respSaveCategoria /// respuesta exitosa
       
    } catch (error) {
        console.log("Error en PostCategoria controller");   
        console.log(error);   
    }

}

//Mostrar todas las categorias
let mostrarCategoria = async ()=> {
    try {
      const categorias = await Categoria.find({isDelete:false})
      .lean()
      .select('categoria_nombre createdAt')
    //   console.log(categorias)

      return categorias
    } catch (error) {
        console.log("Error al mostrar Categoria")
        console.log(error)
    }
}

//Mostrar una sola categoria
let mostrarCategoriaONE = async (query)=> {
    try {
        query.isDelete =false
      const categorias = await Categoria.find(query)
      .lean()
      .select('categoria_nombre')
    //   console.log(categorias)

      return categorias
    } catch (error) {
        console.log("Error al mostrar Categoria")
        console.log(error)
    }
}

//Actualizar

let actualizarCategoria = async(query, body)=>{
    try {
        const updateCategoria = await Categoria.findOneAndUpdate(query, body)
        .then((ob)=>{
            console.log(`Actualizar Categoria:${JSON.stringify(ob)}`)

            return {
                status: 200,
                code: 2000,
                date: new Date(),
                info: "Categoria guardada exitosamente",
                response:ob
                }
        })

        return{
            code: 4003,
            date: new Date(),
            info: "Error al guardar en BD", 
            response: updateCategoria
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

    //response= updateCategoria
}

let eliminarCat= async(id)=>{
    console.log("Se va a e")
    let deleteCat = await Categoria.findByIdAndDelete(req.params.id)
    console.log(deleteCat)
}


module.exports= {
    mostrarCategoria, 
    postCategoria, 
    actualizarCategoria,
    mostrarCategoriaONE,
    eliminarCat
}