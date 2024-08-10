
const express = require('express');
const { getProducto } = require('../controller/buscar');
const router = express.Router();
const createError = require('http-errors');
const mongoose= require('mongoose');
const Producto = require('../models/producto');

const {mostrarProducto, postProducto, actualizarProducto, mostrarProductOne }= require('../controller/productos/productos')

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
        
            if(respProducto){
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
            res.status(200).json({
                status:200,
                code:2000,
                date:new Date(),
                info:"Webi Wabo"
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

  module.exports = router;