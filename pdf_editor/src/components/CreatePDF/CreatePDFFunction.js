import axios from 'axios';
import API from '../../Api/Api';

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
          return res
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

export const handleGeneratePdf = async (rawHTML) => {
     try {
          const response = await API.post('/generate-pdf', { htmlContent: rawHTML }, { responseType: 'blob' });

          // Create a URL for the PDF and download it
          const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(pdfBlob);

          const link = document.createElement('a');
          link.href = pdfUrl;
          link.setAttribute('download', 'generated.pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

     } catch (error) {
          console.error('Failed to generate PDF:', error);
     }
};
