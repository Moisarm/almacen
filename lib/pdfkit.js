const PDFDocument= require('pdfkit-table')


 async function buildPDF(dataCallback, endCallback, datos) {
    try {
        
        const doc = new PDFDocument();
      
        doc.on("data", dataCallback);
        doc.on("end", endCallback);
      
        doc.fontSize(25).text("TABLA DE PRODUCTOS ORDENADO POR MAYOR PRECIO");
      
      
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

                      if(element[key]){
                          body[i].push(element[key])

                      }else{
                          body[i].push(" ")

                      }
              
                      }
                  
              });
      
      
      
              console.log(head)
          const tableArray = {
              headers: head,
              rows: body,
              };
              await doc.table( tableArray, { width: 400 }); 
      
      
            //   doc.fontSize(
            //       10,
            //   ).text(
            //       'ESTO LO HIZO MOISES, NO ALBERTO, NI LO CONOZCO.',
            //       50,
            //       780,
            //       { align: 'center', width: 500 },
            //   );
          
        doc.end();
    } catch (error) {
        console.log(`ERROR EN PDF`)
        console.log(error)
    }




}

module.exports = {buildPDF}