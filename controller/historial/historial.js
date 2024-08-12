const Historial = require("../../models/historial");




let createHistorial = async(body)=>{
    
   try{

    console.log(body)
    console.log(`%%%%%%%%`)
       let historyOb = new Historial(body);//esta si valido antes

       let respCreateHistorial = await historyOb.save()
       .then(resp=>{
           console.log(resp)

           return true

           //true
       }).catch(err=>{
           console.error(err)
           return false
           ///false
       })
   

       return respCreateHistorial /// respuesta exitosa



   } catch (error) {
    console.log("Error en user controller");   
    console.log(error);   
   }

}

//Mostrar usuarios
let allHistorial = async (query={})=>{
    try {
        const objUser = await Historial
        .find(query)
        .lean()
        .select()
        
        .then(resultadoHistorial=>{
          console.log(`-----------------`)
          
          return resultadoHistorial
        })
      //   console.log(producto)
  
        return objUser


    } catch (error) {
        console.error(`Error: allHistorial`)
        console.error(error)
    }
}

let actualizarHistorial = async(query, body)=>{
    try {
        const updateUsers = await Historial.findOneAndUpdate(query, body)
        .then((ob)=>{
            console.log(`Actualizar Users :${JSON.stringify(ob)}`)

            return {
                status: 200,
                code: 2000,
                date: new Date(),
                info: "Users  guardada exitosamente",
                response:ob
                }
        })

        return{
            code: 4003,
            date: new Date(),
            info: "Error al guardar en BD", 
            response: updateUsers
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

    //response= updateUsers
}

let oneHistorial = async (query)=>{
    try {
        const objUser = await Historial
        .find(query)
        .lean()
        // .select('userName  role password')
        
        .then(resultadouser=>{
          console.log(`-----------------`)
          
          return resultadouser
        })
      //   console.log(producto)
  
        return objUser


    } catch (error) {
        console.error(`Error: oneHistorial`)
        console.error(error)
    }
}


module.exports={
    createHistorial,
    allHistorial,
    actualizarHistorial,
    oneHistorial,

};