const PDFDocument= require('pdfkit-table')


async function buildPDF(dataCallback, endCallback, datos) {
    try {
        const doc = new PDFDocument();
      
        doc.on("data", dataCallback);
        doc.on("end", endCallback);
      
        doc.fontSize(25).text("Tabla de Productos ordenada en base al Stock", {
            align: 'center',
            underline: true
        }).moveDown(1);

        let head = [];
        let body = [];

        for (const key in datos[0]) {
            if (key !== "_id") {
                head.push(key === "idCategoria" ? "Categoria" : key);
            }
        }

        datos.forEach((element) => {
            delete element._id;
            let row = [];
            for (const key in element) {
                row.push(element[key] || " ");
            }
            body.push(row);
        });

        console.log(head);

        const tableArray = {
            headers: head,
            rows: body,
        };

        await doc.table(tableArray, {
            width: 400,
            prepareHeader: () => doc.fontSize(12).font('Helvetica-Bold'),
            prepareRow: (row, i) => doc.fontSize(10).font('Helvetica'),
            headerBackground: '#f0f0f0',
            borderColor: '#000000',
            borderWidth: 1,
            rowHeight: 30,
            columnSpacing: 5,
            padding: 5,
        });

        doc.end();
    } catch (error) {
        console.log(`ERROR EN PDF`);
        console.log(error);
    }
}


module.exports = {buildPDF}