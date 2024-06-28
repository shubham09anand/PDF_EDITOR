const { PDFDocumentFactory, PDFDocumentWriter, drawText } = require('pdf-lib');
const fs = require('fs');

async function compressPDF(inputPath, outputPath) {
  // Read the existing PDF
  const pdfBytes = fs.readFileSync(inputPath);

  // Load the PDF
  const pdfDoc = await PDFDocumentFactory.load(pdfBytes);

  // Create a new PDF writer
  const pdfWriter = PDFDocumentWriter.create();

  // Add all pages to the new PDF
  pdfWriter.addPagesOf(pdfDoc);

  // Optimize and compress the PDF
  pdfWriter.compress();

  // Write the compressed PDF to a buffer
  const pdfBytesCompressed = await pdfWriter.saveAsBytes();

  // Write the buffer to the output file
  fs.writeFileSync(outputPath, pdfBytesCompressed);

  console.log(`PDF compressed and saved to ${outputPath}`);
}

// Usage example
const inputFilePath = 'test.pdf';
const outputFilePath = 'output_compressed.pdf';

compressPDF(inputFilePath, outputFilePath).catch((err) => {
  console.error('Error compressing PDF:', err);
});
