import axios from 'axios';

export const getContent = async (docID) => {
     try {
          const res = await axios.post("http://127.0.0.1:3200/auth/getDocument", { docID: docID});
          return res
     } catch (error) {
          console.error(error);
          throw error;
     }
}

export const saveDoc = async (docId, docName, docAdmin, docContent) => {
     try {
          const res = await axios.post("http://127.0.0.1:3200/auth/createDoc", { docID: docId, docName: docName, docAdmin: docAdmin, docContent: docContent });
          console.log(res.status);
     } catch (error) {
          console.error(error);
          throw error;
     }
};

export const nameDoc = async (docId, newName) => {
     try {
          const res = await axios.post("http://127.0.0.1:3200/auth/updateDocName", { docID: docId, newName: newName });
          console.log(res.data);
          return res.data.status
     } catch (error) {
          console.error(error);
          throw error;
     }
};

export const projectStroage = async (projectId, projectStorageContent) => {
     try {
          const res = await axios.post("http://127.0.0.1:3200/auth/projectStroage", { projectId: projectId, projectStorageContent: projectStorageContent });
          console.log(res.data);
          return res
     } catch (error) {
          console.error(error);
          throw error;
     }
};

export const validateLink = async (docId) => {
     try {
          const res = await axios.post("http://127.0.0.1:3200/auth/validateLink", { docId: docId });
          return res
     } catch (error) {
          console.error(error);
          throw error;
     }
};