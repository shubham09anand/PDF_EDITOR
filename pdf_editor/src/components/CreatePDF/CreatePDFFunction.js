import API from '../../Api/Api';

export const projectStroage = async (projectId, projectStorageContent) => {
     try {
          const res = await API.post("/projectStroage", { projectId: projectId, projectStorageContent: projectStorageContent });
          // console.log(res.data);
          return res
     } catch (error) {
          console.error(error);
     }
};

export const generateAiImage = async (userInput) => {
     try {
          const res = await API.post("/aiImage", { userInput: userInput });
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
 
         // Generate a static file name with the current time
         const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
         const fileName = `pdfCollbrator-${currentTime}.pdf`;
         link.setAttribute('download', fileName);
 
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
 
         return 1;
     } catch (error) {
         console.error('Failed to generate PDF:', error);
         return 0;
     }
 };
 

export const TextEditorOption = (buttonInfo) => {
     return {
          height: 700,
          padding: 20,
          readonly: false,
          placeholder: 'Type here...',
          spellcheck: true,
          buttons: [
               'bold', 'strikethrough', 'underline', 'italic', '|',
               'ul', 'ol', 'outdent', 'indent', 'align', '|',
               'font', 'fontsize', 'brush', 'paragraph', '|',
               'image', 'video', 'table', 'link', '|',
               'superscript', 'subscript', '|', 'spellcheck',
               'undo', 'redo', '|', 'speechRecognize', '|',
               'hr', 'eraser', 'copyformat', '|',
               'symbols', 'fullsize', 'find', 'selectall', '|',
               'source', '|', 'Know Options',
          ],
          uploader: {
               insertImageAsBase64URI: true,
          },
          toolbarButtonSize: 'middle',
          textIcons: buttonInfo,
          controls: {
               font: {
                    list: {
                         'Amatic SC, sans-serif': 'Amatic SC',
                         'Assistant, sans-serif': 'Assistant',
                         'Grey Qo, sans-serif': 'Grey Qo',
                         'Mea Culpa, cursive': 'Mea Culpa',
                         'Playwrite CU, sans-serif': 'Playwrite CU',
                         'Roboto, sans-serif': 'Roboto',
                         'Work Sans, sans-serif': 'Work Sans',
                         'Arial, sans-serif': 'Arial',
                         'Georgia, serif': 'Georgia',
                         'Impact, Charcoal, sans-serif': 'Impact',
                         'Tahoma, Geneva, sans-serif': 'Tahoma',
                         'Verdana, Geneva, sans-serif': 'Verdana',
                    },
               },
          },
     };
};
