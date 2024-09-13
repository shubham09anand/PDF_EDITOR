const puppeteer = require('puppeteer');

const generatePDF = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const rawHTML = req.body.htmlContent;

    const quillHtmlContent = `
                <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Assistant&family=Grey+Qo&family=Mea+Culpa&family=Playwrite+CU:wght@100..400&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

    ${rawHTML}
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
