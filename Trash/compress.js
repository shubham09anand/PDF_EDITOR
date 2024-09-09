const { exec } = require('child_process');
const fs = require('fs');

// Specify the input and output file paths
const inputPath = 'input.pdf'; // Change this to your actual file path
const outputPath = 'compressed-output.pdf'; // Output path for the compressed file

// Ghostscript command to compress the PDF
const command = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dBATCH -sOutputFile=${outputPath} ${inputPath}`;

// Execute the Ghostscript command
exec(command, (err) => {
  if (err) {
    console.error(`Error compressing PDF: ${err.message}`);
    return;
  }

  console.log(`PDF compressed successfully and saved to ${outputPath}`);
});
