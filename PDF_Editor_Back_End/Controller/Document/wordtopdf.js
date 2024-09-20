const puppeteer = require('puppeteer');

const wordToPdf = async (req, res) => {

     console.log("Word TO PDF")

     try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();

          const wordHTML = req.body.wordHTML;

          const rawHTML = `
               <style>
                    table {
                    border-collapse: collapse;
                    width: 100%;
                    }

                    td, th {
                    border: 1px solid black;
                    padding: 8px;
                    }
               </style>
               ${wordHTML}
        `

          await page.setContent(rawHTML, { waitUntil: 'networkidle0' });

          const pdfBuffer = await page.pdf({
               format: 'A4',
               margin: {
                    top: '1.9cm',
                    left: '1.9cm',
                    right: '1.32cm',
                    bottom: '1.67cm',
               }
          });

          await browser.close();

          res.set({
               'Content-Type': 'application/pdf',
               'Content-Disposition': 'attachment; filename="generated.pdf"',
               'Content-Length': pdfBuffer.length,
          });

          // Send the buffer as a response
          res.send(pdfBuffer);

     } catch (error) {
          console.error(error);
          res.status(500).json({
               success: false,
               message: "Internal Server Error",
          });
     }
}

module.exports = { wordToPdf }