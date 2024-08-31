const { PDFDocument, StandardFonts, rgb, degrees } = require('pdf-lib');
const fs = require('fs');

const createPDF = async () => {
    try {
        // Create a new PDFDocument
        const pdfDoc = await PDFDocument.create();

        // Embed the Times Roman font
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        // Add a blank page to the document
        const page = pdfDoc.addPage();

        // Get the width and height of the page
        const { width, height } = page.getSize();

        // Define the text to be placed in the PDF
        const text = 'Centered Texwqsdwdwqdqwt';

        // Calculate the width and height of the text
        const fontSize = 60;
        const textWidth = timesRomanFont.widthOfTextAtSize(text, fontSize);
        const textHeight = timesRomanFont.heightAtSize(fontSize);

        // Calculate the x-coordinate to center the text horizontally
        const textX = (width - textWidth) / 2;

        // Calculate the y-coordinate to center the text vertically
        const textY = (height) / 1;

        // Draw centered text on the page
        page.drawText(text, {
            x: textX,
            y: textY,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.7),
            rotate: degrees(-45), // No rotation
            opacity: 0.2, // Set opacity to 50%
        });

        // Save the PDF document to a buffer
        const pdfBytes = await pdfDoc.save();

        // Write the buffer to a file
        fs.writeFileSync('text.pdf', pdfBytes);

        console.log('PDF created successfully!');
    } catch (error) {
        console.error('Error creating PDF:', error);
    }
};

createPDF();
