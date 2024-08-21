import axios from 'axios';
import API from '../../Api/Api';
import html2pdf from 'html2pdf.js';

export const getDocumentContent = async (docID, userId) => {
     try {
          const res = await API.post("/getDocumentData", { docID: docID, userId: userId });
          return res
     } catch (error) {
          console.error(error);
          return
     }
}

export const saveDoc = async (docId, docName, docAdmin, docContent) => {
     try {
          const res = await axios.post("http://127.0.0.1:8080/auth/createDoc", { docID: docId, docName: docName, docAdmin: docAdmin, docContent: docContent });
          console.log(res.status);
     } catch (error) {
          console.error(error);
     }
};

export const nameDoc = async (docId, newName) => {
     try {
          const res = await axios.post("http://127.0.0.1:8080/auth/updateDocName", { docID: docId, newName: newName });
          // console.log(res.data);
          return res.data.status
     } catch (error) {
          console.error(error);
     }
};

export const projectStroage = async (projectId, projectStorageContent) => {
     try {
          const res = await axios.post("http://127.0.0.1:8080/auth/projectStroage", { projectId: projectId, projectStorageContent: projectStorageContent });
          // console.log(res.data);
          return res
     } catch (error) {
          console.error(error);
     }
};

export const validateLink = async (docId) => {
     try {
          const res = await API.post("/validateLink", { docId: docId });
          return res
     } catch (error) {
          console.error(error);
     }
};

export const generateAiImage = async (userInput) => {
     try {
          const res = await axios.post("http://127.0.0.1:8080/auth/aiImage", { userInput: userInput });
          return res
     } catch (error) {
          console.error(error);
     }
};

export const generatePdf = async () => {
     const element = document.getElementById('container');

     // Define PDF options
     const options = {
         margin: [10, 10],
         filename: 'output.pdf',
         image: { type: 'jpeg', quality: 0.98 },
         html2canvas: { scale: 2 },
         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
     };
 
     // Generate PDF from HTML content
     html2pdf().from(element).set(options).save();
};
