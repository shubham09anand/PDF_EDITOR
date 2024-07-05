import axios from 'axios';

export const getDocumentContent = async (docID , userId) => {
     try {
          const res = await axios.post("http://127.0.0.1:8080/auth/getDocumentData", { docID: docID , userId: userId});
          return res
     } catch (error) {
          console.error(error);
          throw error;
     }
}

export const saveDoc = async (docId, docName, docAdmin, docContent) => {
     try {
          const res = await axios.post("http://127.0.0.1:8080/auth/createDoc", { docID: docId, docName: docName, docAdmin: docAdmin, docContent: docContent });
          console.log(res.status);
     } catch (error) {
          console.error(error);
          throw error;
     }
};

export const nameDoc = async (docId, newName) => {
     try {
          const res = await axios.post("http://127.0.0.1:8080/auth/updateDocName", { docID: docId, newName: newName });
          // console.log(res.data);
          return res.data.status
     } catch (error) {
          console.error(error);
          throw error;
     }
};

export const projectStroage = async (projectId, projectStorageContent) => {
     try {
          const res = await axios.post("http://127.0.0.1:8080/auth/projectStroage", { projectId: projectId, projectStorageContent: projectStorageContent });
          // console.log(res.data);
          return res
     } catch (error) {
          console.error(error);
          throw error;
     }
};

export const validateLink = async (docId) => {
     try {
          const res = await axios.post("http://127.0.0.1:8080/auth/validateLink", { docId: docId });
          return res
     } catch (error) {
          console.error(error);
          throw error;
     }
};

export const generateAiImage = async (userInput) => {
     try {
          const res = await axios.post("http://127.0.0.1:8080/auth/aiImage", { userInput: userInput });
          return res
     } catch (error) {
          console.error(error);
          throw error;
     }
};

