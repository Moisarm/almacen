const express = require('express');
const { getProducto } = require('../controller/buscar');
const router = express.Router();
const createError = require('http-errors');
const mongoose= require('mongoose');
const Categoria = require('../models/categoria');


//const Joi = require("joi"); //LIBRERIA QUE AYUDA A VALIDAR OBJETOS. BUSCAR COMO USARLA
const { postCategoria, mostrarCategoria, updateCategoria, mostrarCategoriaONE } = require('../controller/categoria/categoria');




router.post('/nuevo',async function(req, res, next) {

    try {


        //VALIDAR DATOS


        //CONDICIONAL SEGUN VALIDACION
            /// SI ES TRUE    
            let respCat = await postCategoria(req.body)
            //SI ES FALSE
        
            if(respCat){
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


router.get('/:_id',async function(req, res, next){

    try {
        //req.query
        //req.params
        console.log(`obtener una cat`)
        console.log(req.params)
        
        let respCatOne = await mostrarCategoriaONE({_id: req.params._id})
        console.log(respCatOne)
        if(respCatOne){
            res.status(200).json({
    
                status:200, 
                code:2000,
                date:new Date(),
                info:'ok',
                response:respCatOne[0]
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

router.put('/Actualizar_Categoria', async function (req, res, next) {
    try {
        let updateCategoria = await actualizarCategoria(req.query, req.body)
        if(updateCategoria){
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


  module.exports = router;