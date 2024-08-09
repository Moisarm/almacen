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

module.exports = router;