const ILovePDFApi = require('@ilovepdf/ilovepdf-js-core/tasks/CompressTask'); // Ensure the correct package import
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize ILovePDF API instance
const instance = new ILovePDFApi(
  'project_public_342e74fa62b66664845c85e77ea438b7_5koZn06b7febc7b47c45a81b1222cfec9b68f',
  'secret_key_08c261b5a3ce0702f25ed550dce6675f_odWyuff754bbdecdb27e935b983e3e76863c3'
);

// Create a new compression task
const task = instance.newTask('compress');

// Start the task, add a file, process it with 'extreme' compression, and download the result
task.start()
  .then(() => {
    return task.addFile('./AI.pdf'); // Path to the PDF you want to compress
  })
  .then(() => {
    return task.process({ compression_level: 'extreme' }); // Adjust compression level as needed
  })
  .then(() => {
    return task.download();
  })
  .then((data) => {
    fs.writeFileSync('./compressed.pdf', data); // Write the compressed file to the file system
    console.log('File compressed and saved successfully.');
  })
  .catch((err) => {
    console.error("Error during the compression task:", err);
  });
