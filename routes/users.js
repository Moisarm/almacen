const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const { createUser } = require('../controller/user/user');

/* GET users listing. */
router.get('/',async function(req, res){
    let render 
  try {
   
    await mostrarUser()

  }catch (error) {
    console.error(error)

  }
  res.render('content/users', render);
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


module.exports = router;
