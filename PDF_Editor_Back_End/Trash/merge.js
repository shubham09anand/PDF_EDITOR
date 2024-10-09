const ILovePDFApi = require('@ilovepdf/ilovepdf-nodejs');

const instance = new ILovePDFApi('project_public_342e74fa62b66664845c85e77ea438b7_5koZn06b7febc7b47c45a81b1222cfec9b68f', 'secret_key_08c261b5a3ce0702f25ed550dce6675f_odWyuff754bbdecdb27e935b983e3e76863c3');

const task = instance.newTask('merge');

// Promise-based way to use ILovePDFApi.
task.start()
.then(() => {
    return task.addFile('./AI.pdf');
})
.then(() => {
    return task.addFile('./2AI.pdf');
})
.then(() => {
    return task.process();
})
.then(() => {
    return task.download();
})
.then((data) => {
    console.log('DONE');
});