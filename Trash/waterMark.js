const { PDFDocument, StandardFonts, rgb, degrees, opacity } = require('pdf-lib');
const fs = require('fs').promises;

async function createPDF() {
  try {

    // Read the existing PDF file
    const existingPdfBytes = await fs.readFile('test copy.pdf');

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the PDF
    const firstPage = pdfDoc.getPage(0);

    // Add text to the first page
    firstPage.drawText("Water Msark", {
      x: firstPage.getWidth() / 3,
      y: firstPage.getHeight() / 2,
      size: 40,
      rotate: degrees(-45),
      font: helveticaFont,
      color: rgb(0, 0, 0, .2),
      opacity: .1,
    });

    // Create a new PDFDocument
    const newPdfDoc = await PDFDocument.create();

    // Add the modified page to the new document
    const [newPage] = await newPdfDoc.copyPages(pdfDoc, [0]);
    newPdfDoc.addPage(newPage);

    // Serialize the new PDFDocument to bytes
    const pdfBytes = await newPdfDoc.save();

    // Write the bytes to a new PDF file
    await fs.writeFile("outputPath.pdf", pdfBytes);

    console.log('PDF created successfully!');
  } catch (error) {
    console.error('Error creating PDF:', error);
  }
}

// Call the function to load, modify, and save the PDF
createPDF();
