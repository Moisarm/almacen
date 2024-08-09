const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Client = require('../../models/client'); //clase del modelo de la taba de mongo
const app = express();

//Leer
let obtenerOperacion = async (query, select={}, optionsPage)=>{


    const findOperaciones = await 
                    Client //clase del modelo. 
                    .find(query)// busqueda, el query debe ser un JSON.
                    .lean()//---- simplifica el obj retornado, (se utiliza en base de datos GRANDES)
                    .select(select)// obtiene las columnas espesificadas. 
                    .sort({_id:-1}) //ordena la busqueda, de la mas nueva a la vieja.0
                    .skip(optionsPage.page * optionsPage.limit)// paginacion: salta los objetos segun el numero colocado. 
                    .limit(optionsPage.limit) ///paginacion: obtiene la cantidad de objetos indicada. 
                    .then(async (ob)=>{ //resolver promesa de forma exitosa, (no garantiza traer objetos.)

                        console.log(`Find audit Operaciones:${JSON.stringify(ob)}`) // muestra lo que trajo. 


                        const count = await 
                        Client //clase del modelo. 
                        .find(query)// busqueda, el query debe ser un JSON.
                        .lean()// simplifica el obj retornado, (se utiliza en base de datos GRANDES)
                        .countDocuments({})//cuenta la cantidad de objetos traidos en la busqueda. (total, sin paginacion.)
                        .sort({_id:-1}) //ordena la busqueda, de la mas nueva a la vieja.0
                    
                        let response = {
                            objects: count,//cantidad total
                            pages: Math.round(count/optionsPage.limit), //cantidad de paginas, es la division de objetos totales entre el limite
                            current: optionsPage.page+1, //pagina actual
                            data:ob// registros encontrados

                        }
            
                     return {
                         status: 200,
                         code: 2000,
                         date: new Date(),
                         info: "Homologacion encontrado",
                         response
                         }
             
                    })    
                    .catch((er)=>{// promesa no resuelta por algun error
                        console.error(er);
                        
                         return { status: 400,
                             code: 4003,
                             date: new Date(),
                             info: "Error al buscar en BD Homologacion", 
                             response:er
                             }
                    })
                        
    return  findOperaciones
}



// POST 
//Crear nuevmos documentos en la base de datos
let urlConfigSave = new Client({
    campaig_Name:"{type:String}",

    requestors:"{type:String}",
    description:"{type:String}",

    status: 1
})
    const urlConfigSaveRes = await urlConfigSave.save()
    .then((ob)=>{
        return {
            status: 200,
            code: 2000,
            date: new Date(),
            info: "url de cofiguracion guardada exitosamente",
            response:ob
            }

    })    
    .catch((er)=>{
        console.error(er);
        
            return { status: 400,
                code: 4003,
                date: new Date(),
                info: "Error al guardar en BD url de cofiguracion", 
                error:er
                }
    })
    response = urlConfigSaveRes

///////////////////////////////////////////////////////////////////
//PUT
//actualizar en la base de datos
    const updatePlanPago = await PlanPago.findOneAndUpdate(
        query,
        body
        
        )
    .then((ob)=>{
        console.log(`Update Plan de pago:${JSON.stringify(ob)}`)

        return {
            status: 200,
            code: 2000,
            date: new Date(),
            info: "plan de pago guardado exitosamente",
            response:ob
            }

    })    
    .catch((er)=>{
        console.error(er);
        
            return{ status: 400,
                code: 4003,
                date: new Date(),
                info: "Error al guardar en BD", 
                error:er
                }
    })
    response = updatePlanPago

module.exports = {
    obtenerOperacion
}