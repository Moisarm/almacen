const express = require('express');
const { getProducto } = require('../controller/buscar');
const router = express.Router();
const createError = require('http-errors');
const mongoose= require('mongoose');
const Producto = require('../models/producto');
const { mostrarCategoria } = require('../controller/categoria/categoria');
const {mostrarProducto}=require('../controller/productos/productos');
const { verifyToken } = require('../controller/Login/login');

/* GET home page. */
router.get('/',  function(req, res, next) {


  res.render('content/index', { title: 'Express' , username:"Moises"});
});

/*Ruta de tablas Tablas */
router.get('/tablas/:nombreTabla/',verifyToken, async function (req, res, next) {

  try {
    console.log(`#Params: ${JSON.stringify(req.params)}`)
    console.log(`#query: ${JSON.stringify(req.query)}`)  ///// ?key=value&key2=vaule2
    //console.log(req.query)
    console.log(`#Body: ${JSON.stringify(req.body)}`)// METODOS : POST Y PUT
    console.log(`req otken :${req.tokenUser}`)
    let render

    /*Switch para identificar tabla*/
    switch (req.params.nombreTabla) {

      case "producto":
        //llama a la función del controller
        let resProducto = await mostrarProducto()
        let resCategoria = await mostrarCategoria()

        let mapCat = resCategoria.map(obj=>{

          return {
            [obj._id]:obj.categoria_nombre
          }
        })

       
        console.log(resProducto.length)
        console.log(resProducto)

        let Head=[]//le cambiaste el nombre!!!! 

        for (const key in resProducto[0]){
          Head.push(key)
        } 

        for (let i = 0; i < resProducto.length; i++) {
          resProducto[i].ultimo = true,
          delete resProducto[i].__v
        }
        
        render = { 
          isOk:true,

          title: 'TABLA DE MOI' , 
          nombreTabla:"producto",

          username:"Moises",
          tHead:Head,
          tBody:resProducto,

          categoria: mapCat,


        
        }

        break;
      case "tipo-producto":
          let resTipoProducto = await mostrarCategoria()

          console.log(resTipoProducto.length)
          console.log('--------------------------------')
          console.log(resTipoProducto)

          let tHead =[]

          for (const key in resTipoProducto[0]) {
            tHead.push(key)

          }

          // tHead.pop()

          for (let index = 0; index < resTipoProducto.length; index++) {
            // console.log(resTipoProducto)

            resTipoProducto[index].ultimo = true
            // resTipoProducto[index].createdAt = formatoFecha(resTipoProducto[index].createdAt)
            delete resTipoProducto[index].__v
            
          }





          // console.log([
          //   {
          //     _id: '66aebaadd51461b5d4e53cbe',
          //     categoria_nombre: 'Betico',
          //     isDelete: false,
          //     createdAt: "2024-08-03T23:18:06.046Z",
          //     updatedAt:" 2024-08-03T23:18:06.046Z",
          //     __v: 0,
          //     ultimo
          //   },
          //   {
          //     _id: '66b2056f30963dd4cfae358b',
          //     categoria_nombre: 'Chucherías',
          //     isDelete: false,
          //     createdAt: "2024-08-06T11:13:51.336Z",
          //     updatedAt:" 2024-08-06T11:13:51.336Z",
          //     __v: 0,
          //     ultimo
          //   }])

          render = { 
          isOk:true,

            title: 'TABLA DE MOI' , 
          nombreTabla:"TIpo-Producto",

            username:"Moises",
            tHead,
            tBody:resTipoProducto
            
          
          }

  
          break;
    
      default:

        render = { 
          title: 'TABLA DE MOI' , 
          nombreTabla:"No definida0",
          username:"Moises",
          tHead:[  ],
          tBody:[],
          isOk:false
        
        }
        break;
    }

    res.render('content/leerTabla', render);
    
  } catch (error) {
    next(createError(500));
    console.log("Error en index,js")
    console.log(error)
    
  }

});


/*router.get('/Users',async function(req, res, next){

  try {
      
      let consultaUser = await mostrarUser()
      if(consultaUser){
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
  res.render('/content/users', render);
})
*/

module.exports = router;
