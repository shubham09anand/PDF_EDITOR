const puppeteer = require('puppeteer');

const generatePDF = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const rawHTML = req.body.htmlContent;

    const quillHtmlContent = `
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