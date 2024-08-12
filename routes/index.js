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


  res.render('content/login', { title: 'Express' , username:"Moises"});
});

router.get('/dashboard', verifyToken,async function(req, res, next) {
  try {
    // Obtener la cantidad de productos por categoría
    const productosPorCategoria = await Producto.aggregate([
      { $match: { isDelete: false } },
      { $group: { _id: '$idCategoria', count: { $sum: 1 } } },
      { $lookup: {
        from: 'categorias',
        localField: '_id',
        foreignField: '_id',
        as: 'categoria'
      }},
      { $unwind: '$categoria' },
      { $project: { _id: 0, categoria_nombre: '$categoria.categoria_nombre', count: 1 } }
    ]);

    res.render('content/Dashboard', { data: productosPorCategoria });
  } catch (err) {
    res.status(500).send(err.message);
  }
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

    const Query    = req.query
    console.log(Query)
    const Page  = parseInt(Query.page, 10) || 0
    const Limit = parseInt(Query.limit, 10) || 5

    let optionsPage ={
        page:Page,
        limit:Limit
    }

    /*Switch para identificar tabla*/
    switch (req.params.nombreTabla) {

      case "producto":
        //llama a la función del controller
        let resProducto = await mostrarProducto({isDelete:false},optionsPage )
        let resCategoria = await mostrarCategoria({},{
          page:0,
          limit:400
      })
        console.log(resCategoria)

        let mapCat = resCategoria.data.map(obj=>{

          return {
            [obj._id]:obj.categoria_nombre
          }
        })


        let productosData = resProducto.data
        console.log(resProducto.length)
        console.log(resProducto)

        let Head=[]//le cambiaste el nombre!!!! 

        for (const key in productosData[0]){
          Head.push(key)
        } 

        for (let i = 0; i < productosData.length; i++) {
          productosData[i].ultimo = true,
          delete productosData[i].__v
        }
        
        render = { 
          isOk:true,

          title: 'TABLA DE MOI' , 
          nombreTabla:"producto",

          username:"user",
          tHead:Head,
          tBody:productosData,

          categoria: mapCat,
          objects: resProducto.objects,
        pages:resProducto.pages,
          current:resProducto.current


        
        }

        break;
      case "tipo-producto":
          let r2esTipoProducto2 = await mostrarCategoria({isDelete:false},optionsPage )
          let catData = r2esTipoProducto2.data

          console.log(catData.length)
          console.log('--------------------------------')
          console.log(catData)

          let tHead =[]

          for (const key in catData[0]) {
            tHead.push(key)

          }

          // tHead.pop()

          for (let index = 0; index < catData.length; index++) {
            // console.log(catData)

            catData[index].ultimo = true
            // catData[index].createdAt = formatoFecha(catData[index].createdAt)
            delete catData[index].__v
            
          }



          render = { 
          isOk:true,

            title: 'TABLA DE MOI' , 
          nombreTabla:"TIpo-Producto",

            username:"Moises",
            tHead,
            tBody:catData,
            
          objects: r2esTipoProducto2.objects,
          pages:r2esTipoProducto2.pages,
          current:r2esTipoProducto2.current
          
          }

  
          break;
    
      default:

        render = { 
          title: 'TABLA DE MOI' , 
          nombreTabla:"No definida0",
          username:"Moises",
          tHead:[  ],
          tBody:[],
          isOk:false,
        
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
