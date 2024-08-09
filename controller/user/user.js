const JWT = require('jsonwebtoken');
const bcrypt= require('bcrypt-nodejs');
const {JWT_EXPIRES, JWT_SECRET} = require('../../config/envConfig');
const User= require('../../models/user');
const {valUserSchema} = require('../../controller/validacion/valUser');


let roles = {
    values: [
        'ADMIN', 
        'Almacenista',
        'Reader'
    ],
    message: '{VALUE}, is no a valid role'
};

let createUser = async(body)=>{
    
   try{
      
        const { error } =  valUserSchema.validate(body);
       
        if(error){
        console.log(`Validacion no pasada`)
        console.log(error)
        return false //DEBES CAMBIAR ESTO POR LO QUE VAS A DEVOLVER SI LA VALIDACION FALLA
        }
       
    let pass = await bcrypt.hash(password,5)


       let user = new User(body);//esta si valido antes
       
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


module.exports={createUser};