// const fs = require('fs');
// const mammoth = require('mammoth');

// // Read the Word (.docx) file
// const pathToWordFile = 'test.docx'; // Path to your Word file
// const outputHtmlFile = 'output.html'; // Path for the resulting HTML file

// // Convert the Word file to HTML
// mammoth.convertToHtml({path: pathToWordFile})
//     .then(function(result) {
//         const html = result.value; // The generated HTML
//         const messages = result.messages; // Any messages, e.g., warnings during conversion
        
//         // Write the HTML to a file
//         fs.writeFileSync(outputHtmlFile, html);
//         console.log('HTML file created successfully!');

//     })
//     .catch(function(err) {
//         console.error('Error during conversion:', err);
//     });


const fs = require('fs');
const WordToHtml = require('word-to-html');

const convertDocxToHtml = async (inputFilePath, outputFilePath) => {
    try {
        // Read the DOCX file
        const docxBuffer = fs.readFileSync(inputFilePath);
        
        // Convert to HTML
        const html = WordToHtml.fromBuffer(docxBuffer);

        // Write HTML to output file
        fs.writeFileSync(outputFilePath, html);
        console.log('Conversion successful! HTML saved to:', outputFilePath);
    } catch (error) {
        console.error('Error converting DOCX to HTML:', error);
    }
};

// Example usage
const inputFilePath = 'test.docx'; // Replace with your DOCX file path
const outputFilePath = 'output.html'; // Replace with desired HTML output path

convertDocxToHtml(inputFilePath, outputFilePath);



