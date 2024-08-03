var express = require('express');
const { getProducto } = require('../controller/buscar');
var router = express.Router();
var createError = require('http-errors');
const mongoose= require('mongoose')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('content/index', { title: 'Express' , username:"Moises"});
});
router.get('/tablas/:nombreTabla/', async function (req, res, next) {

  try {
    console.log(`#Params: ${JSON.stringify(req.params)}`)
    console.log(`#query: ${JSON.stringify(req.query)}`)  ///// ?key=value&key2=vaule2
    //console.log(req.query)
    console.log(`#Body: ${JSON.stringify(req.body)}`)// METODOS : POST Y PUT

    let render
    switch (req.params.nombreTabla) {
      case "producto":
        let resProducto = await getProducto(req.query)
        render = { 
          isOk:true,

          title: 'TABLA DE MOI' , 
          nombreTabla:"Producto",

          username:"Moises",
          tHead:["HOLA", "chao", "bey"  ],
          tBody:resProducto
        
        }

        break;
      case "tipo-producto":
          let resTipoProducto = await getProducto()

          render = { 
          isOk:true,

            title: 'TABLA DE MOI' , 
          nombreTabla:"TIpo-Producto",

            username:"Moises",
            tHead:["HOLA", "chao", "bey"  ],
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
    
  }

});



module.exports = router;
