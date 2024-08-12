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
let mostrarHistorial = async (query={}, optionsPage, sort= {_id:-1} ,select = '', )=> {
    try {
      const objHistorial = await Historial
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
            Historial //clase del modelo. 
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
    mostrarHistorial,
    actualizarHistorial,
    oneHistorial,

};