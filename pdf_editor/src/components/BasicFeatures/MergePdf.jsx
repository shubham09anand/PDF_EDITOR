import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadFile from './Components/UploadFile';
import DownLoadEditedPDF from './Components/DownLoadEditedPDF';
import AboutFeature from './Components/AboutFeature';

const AddPageNumber = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blob, setBlog] = useState(null);

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    for (const file of fileList) {
      if (file.type !== 'application/pdf') {
        toast.error("Only PDF are allowed")
        return;
      }
    }
    setFiles(fileList);
  };

  const mergePDF = async () => {
    if (files.length === 0) {
      alert("Please select at least one PDF file.");
    }
    else {
      setLoading(true);

      try {

        // crating a null pdf
        const pdfDoc = await PDFDocument.create();

        //iterating over each pdf
        for (const file of files) {

          // convert whole pdf into array64bit format
          const fileBuffer = await file.arrayBuffer();

          //scanning each pdf
          const scanPdf = await PDFDocument.load(fileBuffer);

          const copiedPages = await pdfDoc.copyPages(scanPdf, scanPdf.getPageIndices());
          copiedPages.forEach((page) => {
            //adding pages of pdf in null pdf
            pdfDoc.addPage(page);
          });

        }

        const mergedPdfBytes = await pdfDoc.save();

        const blobUrl = URL.createObjectURL(new Blob([mergedPdfBytes]));

        setBlog(blobUrl);

      } catch (error) {
        console.error('Error merging PDFs:', error);
        alert('Error merging PDFs. Please try again.');
      } finally {
        setLoading(false);
      }
    }


  };

  return (
    <div className='w-full select-none'>
      <ToastContainer />

      <AboutFeature featureHeading={'Merge PDF Files'} featureDescription={"Combine PDF's in the order you want with the easiest PDF merger available."}/>

      {files.length === 0 && (
        <UploadFile handleFileChange={handleFileChange} multiple={true} />
      )}

      {files.length > 0 && blob === null && (
        <>
          <div className='gap-y-10 space-y-3 w-full sm:w-3/5 md:w-2/5 mx-auto flex-wrap sm:p-5 mt-0 sm:bg-[#f5f5fa] rounded-xl sm:border'>
            {files.map((fileObject, index) => (
              <div key={index} className="cursor-move mx-auto bg-white border-2 shadow-inner border-gray-200 rounded-lg overflow-hidden w-80 h-12 flex place-content-center items-center">
                <div className="flex space-x-4 h-full w-full">
                  <div className='bg-white border-r-2 border-black px-3 h-full my-auto flex place-content-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-pdf size-7" viewBox="0 0 16 16">
                      <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                      <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                    </svg>
                  </div>
                  <div className='flex place-content-center items-center pr-4'>
                    <div className="text-sm font-semibold text-center">{fileObject.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='bg-gradient-to-tr relative from-[#3d83ff] via-[#846be6] to-[#7656f5] rounded-xl cursor-pointer w-fit mt-5 text-white font-semibold text-2xl px-6 py-2 active:opacity-70 mx-auto' onClick={mergePDF} disabled={loading}>{loading ? 'Merging...' : 'Merge PDFs'}</div>
        </>
      )}


      <div>
        {blob && (
          <DownLoadEditedPDF blob={blob} />
        )}
      </div>

    </div>
  );
};

export default AddPageNumber;
