const puppeteer = require('puppeteer');

const generatePDF = async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const rawHTML = req.body.htmlContent;

        const quillHtmlContent = `

        <style>
    
          a{
            text-decoration: none;
          }
          .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
            line-height: 1;
          } 
          h1  {
            font-weight: 100;
              font-size: 1.5em;
          }
          h2  {
            font-weight: 100;
              font-size: 1.2em;
          }
          h3  {
            font-weight: 100;
              font-size: 1em;
          }
          h4  {
            font-weight: 100;
              font-size: 0.8em;
          }
          h5  {
            font-weight: 100;
              font-size: 0.6em;
          }
          h6  {
            font-weight: 100;
              font-size: 0.5em;
          }
    
          .ql-font-serif {
            font-family: Georgia, Times New Roman, serif;
          }
          .ql-font-monospace {
            font-family: Monaco, Courier New, monospace;
          }
          .ql-size-small {
            font-size: 0.75em;
          }
          .ql-size-large {
            font-size: 1.5em;
          }
          .ql-size-huge {
            font-size: 2.5em;
          }
          .ql-direction-rtl {
            direction: rtl;
            text-align: inherit;
          }
          .ql-align-center {
            text-align: center;
          }
          .ql-align-justify {
            text-align: justify;
          }
          .ql-align-right {
            text-align: right;
          }
          
    
        </style>
         ​${rawHTML}
        `;


        await page.setContent(quillHtmlContent);

        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: {
                top: '1.9cm',
                left: '1.9cm',
                right: '1.32cm',
                bottom: '1.67cm'
            }
        });

        await browser.close();

        // Set headers for downloading the file
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="generated.pdf"',
            'Content-Length': pdfBuffer.length
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
};

module.exports = { generatePDF };
