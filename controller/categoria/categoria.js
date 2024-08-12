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
//Mostrar usuarios
let mostrarCategoria = async (query={}, optionsPage, sort= {_id:-1} ,select = 'categoria_nombre createdAt', )=> {
    try {
      const objHistorial = await Categoria
      .find(query)
      .lean()
      .sort(sort)
      .select(select)
      .skip(optionsPage.page * optionsPage.limit)
      .limit(optionsPage.limit)
      
      .then(async (resultadoProducto)=>{
        console.log(`-----------------`)

        // console.log(ob)

            const count = await 
            Categoria //clase del modelo. 
            .find(query)// busqueda, el query debe ser un JSON.
            .lean()// simplifica el obj retornado, (se utiliza en base de datos GRANDES)
            .countDocuments({})//cuenta la cantidad de objetos traidos en la busqueda. (total, sin paginacion.)
            .sort({_id:-1}) //ordena la busqueda, de la mas nueva a la vieja.0

            let response = {
                objects: count,//cantidad total
                pages: Math.round(count/optionsPage.limit), //cantidad de paginas, es la division de objetos totales entre el limite
                current: optionsPage.page, //pagina actual
                data:resultadoProducto// registros encontrados

            }


        return response
      })
    //   console.log(producto)

      return objHistorial
    } catch (error) {

        console.error(error)
        console.log(`Error mostrar producto`)
        
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