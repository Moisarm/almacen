const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Producto= require('../models/producto')
const PDFDocument= require('pdfkit-table');
const { buildPDF } = require('../lib/pdfkit');
const { mostrarProducto } = require('../controller/productos/productos');



router.get('/', async (req, res) =>{
    try {
        // const datos = await Producto.find(); // Obtener datos de la base de datos
        
        const datos = await mostrarProducto({},{page:0, limit:300},{stock:1},  'nombre precio stock', {precio:-1})
        const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=invoice.pdf",
          });

          let infoToSend = datos.data

          // console.log(datos)
          buildPDF(
            (data) => stream.write(data),
            () => stream.end(), infoToSend
          );





        // const doc = new PDFDocument();
    
        // // res.setHeader('Content-disposition', 'attachment; filename=archivo.pdf');
        // // res.setHeader('Content-type', 'application/pdf');
    
        // doc.pipe(res);
    
        // // Estilo de tabla
        // const tableTop = 100;
        // const itemHeight = 30;
        // const tableWidth = 500;
        // const columnWidths = {
        //   nombre: 200,
        //   precio: 100,
        //   stock: 100,
        // };
    
        // // Encabezado de la tabla
        // doc.fontSize(12).text('Producto', 50, tableTop);
        // doc.fontSize(12).text('Precio', 250, tableTop);
        // doc.fontSize(12).text('Stock', 350, tableTop);
    
        // let y = tableTop + itemHeight;
    
        // // datos.forEach(dato => {
        // //   doc.fontSize(10).text(dato.nombre, 50, y);
        // //   doc.fontSize(10).text(dato.precio.toFixed(2), 250, y);
        // //   doc.fontSize(10).text(dato.stock, 350, y);
        // //   y += itemHeight;
        // // });

        // let head

        // for (const key in datos[0]) {
        //     head.push(key)

        //   }

        // const tableArray = {
        //     headers: head,
        //     rows: [
        //       ["Switzerland", "12%", "+1.12%"],
        //       ["France", "67%", "-0.98%"],
        //       ["England", "33%", "+4.44%"],
        //     ],
        //   };
        //   await doc.table( tableArray, { width: 300 }); 
    
        // doc.end();
      } catch (error) {
        res.status(500).send('Error al generar el PDF');
      }
    
})



module.exports = router;