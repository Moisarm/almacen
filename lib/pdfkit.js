const PDFDocument= require('pdfkit-table')
const Producto= require('../models/producto')


 async function buildPDF(dataCallback, endCallback, datos) {
  const doc = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.fontSize(25).text("Some title from PDF Kit");


    // console.log(datos)
        let head = []
        let body = []

    for (const key in datos[0]) {
        if(! (key==="_id")){

            if(key ==="idCategoria"){
                
                head.push("Categoria")
            }else{
                
                head.push(key)
            }
        }

        }


        datos.forEach((element, i )=> {
            delete element._id

            body.push([])

            for (const key in element) {
                
                body[i].push(element[key])
        
                }
            
        });



        console.log(head)
    const tableArray = {
        headers: head,
        rows: body,
        };
        await doc.table( tableArray, { width: 400 }); 


        doc.fontSize(
            10,
        ).text(
            'ESTO LO HIZO MOISES, NO ALBERTO, NI LO CONOZCO.',
            50,
            780,
            { align: 'center', width: 500 },
        );
    
  doc.end();




}

module.exports = {buildPDF}