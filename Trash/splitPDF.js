const fs = require('fs').promises;
const { PDFDocument } = require('pdf-lib');

const mergeFiles = async () => {
    // Convert the PDFs into buffers
    const pdf1Bytes = await fs.readFile("./notes.pdf");

    // Load the buffers of the PDFs into PDFDocument objects
    const pdfDocument1 = await PDFDocument.load(pdf1Bytes);

    const split = [[5, 12], [4, 12], [2, 13]];

    for (const [index, e] of split.entries()) {
        // Create a new PDFDocument
        const pdfDoc = await PDFDocument.create();

        for (let i = e[0] - 1; i < e[1]; i++) {
            const [firstDonorPage1] = await pdfDoc.copyPages(pdfDocument1, [i]);
            // Insert the individual pages in the new PDF
            pdfDoc.addPage(firstDonorPage1);
        }

        const newPdfDocBytes = await pdfDoc.save();
        await fs.writeFile(`splitedPDF_${index}.pdf`, newPdfDocBytes);
    }
};

mergeFiles().catch(err => {
    console.error('Error merging PDFs:', err);
});
