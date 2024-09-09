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
        const text = 'ABCDEFGHIGHKLM';

        // Initial font size
        let fontSize = 40;

        // Calculate the diagonal length of the page
        const diagonalLength = Math.sqrt(width ** 2 + height ** 2);

        // Calculate the width of the text at the initial font size
        let textWidth = timesRomanFont.widthOfTextAtSize(text, fontSize);

        // Adjust font size to fit within the diagonal length of the page
        while (textWidth > diagonalLength - 40 && fontSize > 1) {  // 40 is some margin
            fontSize -= 1;
            textWidth = timesRomanFont.widthOfTextAtSize(text, fontSize);
        }

        // Calculate step sizes for positioning text instances
        const stepX = textWidth + 20;  // Horizontal step size including padding
        const stepY = fontSize * 1.5;  // Vertical step size (line height)
        const padding = 20;  // Padding between text instances

        // Draw multiple lines of text across the page
        for (let y = 0; y < height; y += stepY) {
            for (let x = -width; x < width + stepX; x += stepX) {
                page.drawText(text, {
                    x: x + padding,  // Apply padding to the x-coordinate
                    y: height - y - fontSize / 2, // Adjust y-coordinate to center vertically
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0.53, 0.7),
                    rotate: degrees(-45), // Apply a rotation if needed
                    opacity: 0.2,
                });
            }
        }

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
