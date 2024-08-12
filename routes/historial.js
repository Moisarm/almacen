const express = require('express');
/*const { getProducto } = require('../controller/buscar');*/
const router = express.Router();
const createError = require('http-errors');
const mongoose= require('mongoose');
const Historial = require('../models/historial');


router.post('/nuevo', async function (req,res,next) {

    try {
        console.log(`==========================`)
        console.log(req.body)
        console.log(`==========================`)

        /*let historial = new Historial({
            cantidad:req.body.cantidad,
            estado:req.body.estado,
            fecha:req.body.fecha,
            foto:req.body.foto,
            
        })*/

        Historial.save().then(resp=>{console.log(resp)}).catch(err=>{console.error(err)})

        res.status(200).json({
  
            status:200, 
            code:2000,
            date:new Date(),
            info:'ok'
        })
    } catch (error) {
        console.log("Error en historial Routes", error)
    }
})



router.get('/', async function (req, res, next) {

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
  

          let resProducto = await mostrarProducto({},optionsPage )
          let resCategoria = await mostrarCategoria()
  
          let mapCat = resCategoria.map(obj=>{
  
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
 
      res.render('content/leerTabla', render);
      
    } catch (error) {
      next(createError(500));
      console.log("Error en index,js")
      console.log(error)
      
    }
  
  });
  

module.exports = router;