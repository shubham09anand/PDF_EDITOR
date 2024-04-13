const fs = require('fs');
const pdfParse = require('pdf-parse');

async function extractWordsFromPdf(pdfFile) {
  const pdfBuffer = await fs.promises.readFile(pdfFile);
  const pdfText = await pdfParse(pdfBuffer);
  console.log(pdfText.info);

  console.log(pdfText.numpages);
  console.log(pdfText.text);
  fs.writeFile('articleData.docx', pdfText.text, (err) => {
    if (err) throw err;
    console.log('File has been saved!');
  });
  // return pdfText.text.split(/\s+/);
}

const pdfFile = 'AI.pdf';

extractWordsFromPdf(pdfFile);
