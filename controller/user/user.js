// const JWT = require('jsonwebtoken');
// const bcrypt= require('bcrypt-nodejs');
const bcrypt = require('bcrypt');
// const {JWT_EXPIRES, JWT_SECRET} = require('../../config/envConfig');
const Users = require('../../models/users');
const {valUserSchema} = require('../../controller/validacion/valUser');



let createUser = async(body)=>{
    
   try{
      
        const { error } =  valUserSchema.validate(body);
       
        if(error){
        console.log(`Validacion no pasada`)
        console.log(error)
        return false //DEBES CAMBIAR ESTO POR LO QUE VAS A DEVOLVER SI LA VALIDACION FALLA
        }
       
    // let pass = await bcrypt.hash(password,5)
    
    let pass = await bcrypt.hash(body.password, 10).then(function(hash) {
            // Store hash in your password DB.
  
        // Store hash in your password DB..

        console.log(hash)
        return hash
    });

    console.log(`clave :${body.password} | hash clave: ${pass}`)
        body.password = pass
       let user = new Users(body);//esta si valido antes
       
       let respCreateUser = await user.save()
       .then(resp=>{
           console.log(resp)

           return true

           //true
       }).catch(err=>{
           console.error(err)
           return false
           ///false
       })
   

       return respCreateUser /// respuesta exitosa



   } catch (error) {
    console.log("Error en user controller");   
    console.log(error);   
   }

}


//Mostrar usuarios
let allUser = async ()=>{
    try {
        const objUser = await Users
        .find({isDelete:false})
        .lean()
        .select('nombre apellido userName  role')
        
        .then(resultadouser=>{
          console.log(`-----------------`)
          
          return resultadouser
        })
      //   console.log(producto)
  
        return objUser


    } catch (error) {
        console.error(`Error: allUser`)
        console.error(error)
    }
}



let actualizarUser = async(query, body)=>{
    try {
        const updateUsers = await Users.findOneAndUpdate(query, body)
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

let oneUser = async (query)=>{
    try {
        const objUser = await Users
        .find(query)
        .lean()
        .select('userName  role password')
        
        .then(resultadouser=>{
          console.log(`-----------------`)
          
          return resultadouser
        })
      //   console.log(producto)
  
        return objUser


    } catch (error) {
        console.error(`Error: oneUser`)
        console.error(error)
    }
}


let comparePass = async (pass, hash)=>{
    return await bcrypt.compare(pass, hash).then(function(result) {
        // result == true
        return result
    });
}


let userPredeterminado = async ()=>{

    try {
        createUser({
            
    
                "nombre":"admin ",
                "apellido":"admin",
                "userName":"admin",
                "password":"admin",
                "role":"ADMIN"
            
        })
    } catch (error) {
        
    }
}


module.exports={
    createUser,
    allUser,
    actualizarUser,
    oneUser,
    comparePass,
    userPredeterminado

};