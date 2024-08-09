const User = require('../../models/user')
const {valUsuarioSchema}= require('../validacion/valUser')


//Escribir
let createUser = async (body)=>{
    try {
        console.log(`==========================`)
        console.log(body)
        console.log(`==========================`)

   
        const { error } =  valUsuarioSchema.validate(body);

        if(error){
            console.log(`Validacion no pasada`)
            console.log(error)
            return false //DEBES CAMBIAR ESTO POR LO QUE VAS A DEVOLVER SI LA VALIDACION FALLA
        }



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


//Leer
let mostrarUsuario = async ()=> {
    try {
      const objUser = await User.find().lean()
    //   console.log(producto)

      return objUser
    } catch (error) {
        console.log(error)
        console.log('Error en Mostrar Usuario/ User Controller')
    }
}


//Actualizar


    module.exports={createUser, mostrarUsuario}