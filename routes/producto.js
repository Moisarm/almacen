
const express = require('express');
const { getProducto } = require('../controller/buscar');
const router = express.Router();
const createError = require('http-errors');
const mongoose= require('mongoose');
const Producto = require('../models/producto');

const {mostrarProducto, postProducto, actualizarProducto, mostrarProductOne }= require('../controller/productos/productos');
const { createHistorial } = require('../controller/historial/historial');

//Escribir (Agregar)
router.post('/nuevo',async function(req, res) {

    try {


        //VALIDAR DATOS

        console.log(`--------------------------------`)
        console.log(req.body)
        console.log(`--------------------------------`)

                //CONDICIONAL SEGUN VALIDACION
            /// SI ES TRUE    
            let respProducto = await postProducto(req.body)
            //SI ES FALSE

            console.log(respProducto)
        
            if(respProducto){


                createHistorial({
                    idProducto:respProducto._id,
                
                    idUser:null,
                
                    cantidad: req.body.stock,
                    estado:"nuevo",
                    fecha:new Date(),

                    // foto:{type, default:null},
                })
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

//Mostrar
router.get('/:nombre_categoria',async function(res){

    try {
        
        let consultaProducto = await mostrarProducto()
        if(consultaProducto){
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
    
})


router.get('/buscar/', async function (req, res, next) {

    try {
        console.log(`#query: ${JSON.stringify(req.query)}`)  ///// ?key=value&key2=vaule2
        //console.log(req.query)
        console.log(`req otken :${req.tokenUser}`)
        

                    
        const Query    = req.query
        console.log(Query)
        const Page  = parseInt(Query.page, 10) || 0
        const Limit = parseInt(Query.limit, 10) || 10

        let optionsPage ={
            page:Page,
            limit:Limit
        }
        let path={}
        let a = 'a'






        let render

        //llama a la función del controller
        let resProducto = await mostrarProducto({},optionsPage)
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

        username:"user",
        tHead:Head,
        tBody:resProducto,

        categoria: mapCat,



        }

      res.render('content/leerTabla', render);
      
    } catch (error) {
      next(createError(500));
      console.log("Error en index,js")
      console.log(error)
      
    }
  
  });



//Mostrar un sólo Producto
router.get('/:_id', async function (req, res) {
    try {

        console.log('----------------------------------------------')
        console.log("Se obtiene un Producto")
        console.log(req.params)

        let respProductOne = await mostrarProductOne({_id:req.params._id})
        console.log(respProductOne)

        if (respProductOne){
            res.status(200).json({
                status:200,
                code2000,
                date: new Date(),
                info: 'Todo Bien',
                response:respProductOne[0]
            })
        }else{
            res.status(400).json({
                status:400,
                code:4000,
                date: new Date(),
                info:'To Mal'
            })
        }
    } catch (error) {
        console.log("Erroooooorrr")
        console.error(error)

        res.status(500).json({
            status:500,
            code:5002,
            date: new Date(),
            info: 'OK??????',
            error

        })
    }
    
})

//Actualizar
router.put('/Actualizar/:_id', async function (req, res) {
    try {

        console.log("-----------------Actualizaar--------------------")
        console.log(req.params)
        console.log(req.body)
        let updateProducto = await actualizarProducto({_id:req.params._id}, req.body)
        if(updateProducto){

            // createHistorial({
            //     idProducto:req.params._id,
            
            //     idUser:null,
            
            //     cantidad: req.body.stock,
            //     estado:"nuevo",
            //     fecha:new Date(),

            //     // foto:{type, default:null},
            // })
            res.status(200).json({
                status:200,
                code:2000,
                date:new Date(),
                info:"ok"
            })
        }else{
            res.status(400).json({
                status:400,
                code:4000,
                date: new Date(),
                info:"No ok"
            })
        }   

        console.log(updateProducto)

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
//SUMAR O RESTAR PRODUCTOS
router.put('/Actualizar/stock/:_id', async function (req, res) {
    try {

        console.log("-----------------Actualizaar--------------------")
        console.log(req.params)
        console.log(req.body)

        let data

        let getProducto = await mostrarProductOne({_id:req.params._id})
        if(req.body.isUp){
            data = {
                stock:getProducto.stock + req.body.cantidad
            }
        }else{
            data = {
                stock:getProducto.stock - req.body.cantidad
            }

        }

        if(data.stock <0){
            res.status(400).json({
                status:400,
                code:4000,
                date: new Date(),
                info:"No se puede quitar mas productos de los que existen"
            })
        }else{

            let updateProducto = await actualizarProducto({_id:req.params._id}, data)
            if(updateProducto){
    
                createHistorial({
                    idProducto:req.params._id,
                
                    idUser:null,
                
                    cantidad: req.body.cantidad,
                    estado:req.body.isUp? "up":"down" ,
                    fecha:new Date(),
    
                    // foto:{type, default:null},
                })
                res.status(200).json({
                    status:200,
                    code:2000,
                    date:new Date(),
                    info:"ok"
                })
            }else{
                res.status(400).json({
                    status:400,
                    code:4000,
                    date: new Date(),
                    info:"No ok"
                })
            }
            console.log(updateProducto)
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