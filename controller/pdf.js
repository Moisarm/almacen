const {buildPDF} = require('../lib/pdfkit')
const Producto = require('../models/producto');

let pdf = async function (query) {
  
    let tableData = Producto.map(pb =>{
        return[Producto.nombre,
               Producto.precio,
               Producto.stock]
    });
  
}