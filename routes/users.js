const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const mongoose = require('mongoose');
const { createUser, allUser, actualizarUser } = require('../controller/user/user');

/* GET users listing. */
router.get('/',async function(req, res){
    try {
        
        let render 
        console.log(`Otener datos para el view de user`)
      //llama a la función del controller
      let resUser = await allUser()

      console.log(resUser.length)
      console.log(resUser)

      let Head=[]//le cambiaste el nombre!!!! 

      for (const key in resUser[0]){
        Head.push(key)
      } 

      for (let i = 0; i < resUser.length; i++) {
        resUser[i].ultimo = true,
        delete resUser[i].__v
      }
      
      render = { 
        isOk:true,

        title: 'Usuarios' , 
        nombreTabla:"user",

        username:"Moises",
        tHead:Head,
        tBody:resUser,

        // categoria: mapCat,


      
      }

      res.render('content/users', render);

    

  }catch (error) {
    console.error(error)

  }
})


router.post('/nuevo',async function(req, res) {

  try {


      //VALIDAR DATOS

      console.log(`--------------------------------`)
      console.log(req.body)
      console.log(`--------------------------------`)

              //CONDICIONAL SEGUN VALIDACION
          /// SI ES TRUE    
          let saveUser = await createUser(req.body)
          //SI ES FALSE
      
          if(saveUser){
              res.status(200).json({
      
                  status:200, 
                  code:2000,
                  date:new Date(),
                  info:'ok'
              })

          }else{
              res.status(400).json({
      
                  status:400, 
                  code:4000,
                  date:new Date(),
                  info:'NO OK'
              })


          }

  } catch (error) {
      console.error(error)

      res.status(500).json({

          status:500, 
          code:5002,
          date:new Date(),
          info:'ok',
          error
      })
  }
  
});


router.put('/actualizar/:_id', async function (req, res, next) {
    try {

        console.log(`=====Actualizar User======`)
        console.log(req.params)
        console.log(req.body)


        let updateUser = await actualizarUser({_id:req.params._id}, req.body)
        if(updateUser){
            res.status(200).json({
    
                status:200, 
                code:2000,
                date:new Date(),
                info:'ok',
                response:updateUser

            })
    
        }else{
            res.status(400).json({
    
                status:400, 
                code:4000,
                date:new Date(),
                info:'NO OK'
            })
            }

    } catch (error) {
        console.error(error)

        res.status(500).json({

            status:500, 
            code:5002,
            date:new Date(),
            info:'ok',
            error
        })
    }
})
router.put('/eliminar/:_id', async function (req, res, next) {
    try {

        console.log(`=====Eliminar User======`)
        console.log(req.params)
        console.log(req.body)


        let updateUser = await actualizarUser({_id:req.params._id}, {isDelete:true})
        if(updateUser){
            res.status(200).json({
    
                status:200, 
                code:2000,
                date:new Date(),
                info:'ok',
                response:updateUser
            })
    
        }else{
            res.status(400).json({
    
                status:400, 
                code:4000,
                date:new Date(),
                info:'NO OK'
            })
            }

    } catch (error) {
        console.error(error)

        res.status(500).json({

            status:500, 
            code:5002,
            date:new Date(),
            info:'ok',
            error
        })
    }
})


module.exports = router;
