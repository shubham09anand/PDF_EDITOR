import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadFile from './Components/UploadFile';
import DownLoadEditedPDF from './Components/DownLoadEditedPDF';
import AboutFeature from './Components/AboutFeature';
import LoadingPlaneAnimation from '../Animation/LoadingPlaneAnimation';

const AddPageNumber = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blob, setBlog] = useState(null);
  const [processStatus, setProcessStatus] = useState(false);

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
      setProcessStatus(true)
      setLoading(true);

      try {
        const pdfDoc = await PDFDocument.create();

        for (const file of files) {
          const fileBuffer = await file.arrayBuffer();
          const scanPdf = await PDFDocument.load(fileBuffer);
          const copiedPages = await pdfDoc.copyPages(scanPdf, scanPdf.getPageIndices());
          copiedPages.forEach((page) => {
            pdfDoc.addPage(page);
          });

        }

        const mergedPdfBytes = await pdfDoc.save();
        const blobUrl = URL.createObjectURL(new Blob([mergedPdfBytes]));
        setBlog(blobUrl);
        setProcessStatus(false)

      } catch (error) {
        console.error('Error merging PDFs:', error);
        alert('Error merging PDFs. Please try again.');
      } finally {
        setLoading(false);
        setProcessStatus(false)
      }
    }


  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    setFiles(newFiles);
  };

  const handleMoveDown = (index) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
    setFiles(newFiles);
  };

  const reupload = () => {
    setFiles([]);
    setBlog(null);
    setProcessStatus(false);
  }

  return (
    <div className='w-full select-none'>
      <ToastContainer />

      <AboutFeature featureHeading={'Merge PDF Files'} featureDescription={"Combine PDF's in the order you want with the easiest PDF merger available."} />

      {files.length === 0 && (
        <UploadFile handleFileChange={handleFileChange} multiple={true} />
      )}

      {files.length > 0 && blob === null && (
        <>
          <div className='gap-y-10 space-y-3 w-full sm:w-3/5 md:w-2/5 mx-auto flex-wrap sm:p-5 mt-0 sm:bg-[#f5f5fa] rounded-xl sm:border'>
            {files.map((fileObject, index) => (
              <div key={index} className="mx-auto bg-white border-2 shadow-inner border-gray-200 rounded-lg overflow-hidden w-96 h-12 flex place-content-center items-center">
                <div className="flex space-x-2 h-full w-full">
                  <div className='bg-white border-r-2 border-black px-3 h-full my-auto flex place-content-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-pdf size-7" viewBox="0 0 16 16">
                      <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                      <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                    </svg>
                  </div>
                  <div className='flex place-content-center items-center pr-4'>
                    <div className="text-sm font-semibold text-center w-56 truncate">{fileObject.name}</div>
                  </div>
                  {index === 0 && (
                    <svg onClick={() => handleMoveDown(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 mt-2.5 cursor-pointer hover:opacity-40 active:opacity-50 ${index === 0 ? 'rotate-0 duration-1000' : ''} ${index === files.length - 1 ? 'rotate-180 duration-1000' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  )}
                  {index === files.length - 1 && (
                    <svg onClick={() => handleMoveUp(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 mt-2.5 cursor-pointer hover:opacity-40 active:opacity-50 ${index === 0 ? 'rotate-0 duration-1000' : ''} ${index === files.length - 1 ? 'rotate-180 duration-1000' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  )}
                  {index !== 0 && index !== files.length - 1 && (
                    <>
                      <svg onClick={() => handleMoveDown(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 mt-2.5 cursor-pointer hover:opacity-40 active:opacity-50 rotate-0`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>

                      <svg onClick={() => handleMoveUp(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 mt-2.5 cursor-pointer hover:opacity-40 active:opacity-50 rotate-180`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </>
                  )}
                </div>
              </div>
            ))}

            {files.length !== 0 &&
              <div onClick={reupload} className="mx-auto flex h-full w-80 items-center place-content-center bg-gray-100 mt-5 md:mb-10 shadow-sm p-2 rounded-lg">
                <div className="bg-white md:bg-transparent cursor-pointer hover:opacity-75 active:opacity-50 px-3 h-full my-auto flex place-content-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strok-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
              </div>
            }
          </div>
          <div className='bg-gradient-to-tr relative from-[#3d83ff] via-[#846be6] to-[#7656f5] rounded-xl cursor-pointer w-fit mt-5 text-white font-semibold text-2xl px-6 py-2 active:opacity-70 mx-auto' onClick={mergePDF} disabled={loading}>{loading ? 'Merging...' : 'Merge PDFs'}</div>
        </>
      )}

      {processStatus && blob == null &&
        <div className='fixed top-0 z-20 w-screen h-screen flex place-content-center items-center backdrop-blur-[2px]'>
          <LoadingPlaneAnimation processType={'Making Your Shuffled PDF'} />
        </div>
      }

      {blob && (
        <DownLoadEditedPDF downloadMessage={"Your fies are merged. Now you can download it."} blob={blob} />
      )}

    </div>
  );
};

export default AddPageNumber;
