const pdf2pptx = require('pdf2pptx');
const fs = require('fs');

pdf2pptx.convertPdfToPptx('AI.pdf', 'output_pptx.pptx')
  .then(() => {
    console.log('PDF successfully converted to PPTX');
  })
  .catch(err => {
    console.error('Error during conversion:', err);
  });
