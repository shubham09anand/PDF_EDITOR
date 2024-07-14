const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function addPageAtPosition(pdfPath, insertPageContent, insertPosition) {
  // Load the existing PDF
  const existingPdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Create a new page
  const newPage = pdfDoc.addPage();
  
  // Optionally add content to the new page
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const { width, height } = newPage.getSize();
  newPage.drawText(insertPageContent, {
    x: 50,
    y: height - 4 * 30,
    size: 30,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });

  // Get the existing pages
  const pages = pdfDoc.getPages();

  // Validate insert position
  if (insertPosition < 0 || insertPosition > pages.length) {
    throw new Error('Invalid insert position');
  }

  // Move subsequent pages down
  for (let i = pages.length - 1; i > insertPosition; i--) {
    pdfDoc.movePage(i, i + 1);
  }

  // Insert the new page at the desired position
  pdfDoc.insertPage(insertPosition, newPage);

  // Save the modified PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
}

addPageAtPosition('notes.pdf', 'This is the new page content', 4)
  .then(() => {
    console.log('New page added successfully!');
  })
  .catch(err => {
    console.error(err);
  });
