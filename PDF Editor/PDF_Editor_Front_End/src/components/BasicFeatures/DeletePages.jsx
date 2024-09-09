import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import LoadingPages from '../Animation/LoadingPages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownLoadEditedPDF from './Components/DownLoadEditedPDF';
import UploadFile from './Components/UploadFile';
import AboutFeature from './Components/AboutFeature';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DeletePages = () => {

     const [selectedFiles, setSelectedFiles] = useState([]);
     const [images, setImages] = useState([]);
     const [pageDelete, setPageDelete] = useState([]);
     const [blob, setBlog] = useState(null)

     const handleFileChange = async (e) => {
          if (e.target.files[0].type !== 'application/pdf') {
               toast.error("Only PDF are allowed")
               return;
          }
          const files = (e.target.files);
          setSelectedFiles(files);
     };

     useEffect(() => {
          handleConversion();
          // eslint-disable-next-line
     }, [selectedFiles]);

     const convertToImage = async (file) => {
          const numPages = await getNumPages(file);
          const images = [];
          for (let i = 1; i <= numPages; i++) {
               const imageUrl = await getPageAsImage(file, i);
               images.push(imageUrl);
          }
          return images;
     };

     const getNumPages = async (file) => {
          const fileReader = new FileReader();
          return new Promise((resolve, reject) => {
               fileReader.onload = function () {
                    const typedArray = new Uint8Array(this.result);
                    pdfjs.getDocument({ data: typedArray }).promise.then((pdf) => {
                         resolve(pdf.numPages);
                    });
               };
               fileReader.onerror = reject;
               fileReader.readAsArrayBuffer(file);
          });
     };

     const getPageAsImage = async (file, pageNumber) => {
          const pageUrl = URL.createObjectURL(file);
          const pdf = await pdfjs.getDocument(pageUrl).promise;
          const page = await pdf.getPage(pageNumber);
          const scale = 2;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');
          await page.render({ canvasContext: context, viewport }).promise;
          const imageUrl = canvas.toDataURL();
          return imageUrl;
     };

     const handleConversion = async () => {
          const convertedImages = [];
          for (const file of selectedFiles) {
               const images = await convertToImage(file);
               convertedImages.push(...images);
          }
          setImages(convertedImages);
     };

     const handlePageSelection = (pageIndex, e) => {
          e.stopPropagation();
          const index = pageDelete.indexOf(pageIndex);
          if (index === -1) {
               setPageDelete([...pageDelete, pageIndex]);
          } else {
               const updatedPageDelete = [...pageDelete];
               updatedPageDelete.splice(index, 1);
               setPageDelete(updatedPageDelete);
          }
     };

     const removePages = async () => {
          if (selectedFiles.length === 0) {
               alert("Please select at least one PDF file.");
          }
          else {
               <div className='flex flex-wrap gap-5 h-[90vh] w-[95%] overflow-y-scroll mt-10 mr-5'>
                    {images.map((imageUrl, index) => (
                         <div key={index} onClick={(e) => handlePageSelection(index, e)} className={`p-8 border h-fit rounded-md border-red-500 hover:shadow-xl ${pageDelete.includes(index) ? 'opacity-40' : ''}`}>
                              <div className='mx-auto w-fit'>
                                   <img draggable={true} className='shadow-[1px_1px_10px_black] rounded-lg w-36 h-48 cursor-move' src={imageUrl} alt={`Page ${index + 1}`} />
                                   <div className='text-gray-900 text-center font-thin'>Page {index + 1}</div>
                              </div>
                         </div>
                    ))}
               </div>

               try {

                    // crating a null pdf
                    const pdfDoc = await PDFDocument.create();

                    //iterating over each pdf
                    for (const file of selectedFiles) {

                         // convert whole pdf into array64bit format
                         const fileBuffer = await file.arrayBuffer();

                         //scanning each pdf
                         const scanPdf = await PDFDocument.load(fileBuffer);

                         // get total page count in pdf 
                         const pageNum = scanPdf.getPageCount();

                         for (let index = 0; index < pageNum; index++) {
                              const condition = pageDelete.indexOf(index);
                              if (condition === -1) {
                                   const copiedPages = await pdfDoc.copyPages(scanPdf, [index]);
                                   copiedPages.forEach((page) => {
                                        //adding pages of pdf in null pdf
                                        pdfDoc.addPage(page);
                                   });
                              }

                         }

                    }
                    const mergedPdfBytes = await pdfDoc.save();
                    const blobUrl = URL.createObjectURL(new Blob([mergedPdfBytes]));
                    setBlog(blobUrl);
               } catch (error) {
                    console.error(`Error Deleting Pages PDFs:`, error);
                    alert('Error Deleting PDF’s Pages. Please try again After Refreshing The Page.');
               }
          }
     };

     useEffect(() => {
          if (selectedFiles.length > 0) {
               removePages();
          }
          // eslint-disable-next-line
     }, [])

     pageDelete.forEach((e)=>{
          console.log(e);     
     })

     return (
          <div className='p-2 w-full'>
               <ToastContainer />

               <AboutFeature featureHeading={'Remove PDF Pages'} featureDescription={'Select and remove the PDF pages you don’t need. Get a new file without your deleted pages from your original File.'}/>

               {selectedFiles.length === 0 &&
                    <UploadFile handleFileChange={handleFileChange} multiple={false}/>
               }

               {selectedFiles.length > 0 && images.length === 0 && <LoadingPages />}

               {images.length > 0 &&
                    <div className='pt-5 flex mx-auto flex-wrap p-2 w-fit gap-14 place-content-center'>
                         {images.map((imageUrl, index) => (
                              <div key={index} onClick={(e) => handlePageSelection(index, e)} className={`gap-5 ${pageDelete.includes(index) ? 'opacity-40' : ''}`}>
                                   <div className=''>
                                        <img draggable={true} className='shadow-[1px_1px_10px_gray] w-32 h-40 sm:w-52 sm:h-60 cursor-pointer' src={imageUrl} alt={`Page ${index + 1}`} />
                                        <div className='text-gray-500 text-center text-sm mt-2 font-semibold'>Page {index + 1}</div>
                                   </div>
                              </div>
                         ))}
                    </div>
               }

               {!blob && pageDelete.length > 0 && (<div onClick={removePages} className='px-4 py-2 select-none text-sm bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] text-white w-fit h-fit rounded-lg mx-auto mt-5'>Remove pages</div>)}
               <div>
                    {blob && (
                         <DownLoadEditedPDF blob={blob} />
                    )}
               </div>
          </div>
     );
};

export default DeletePages;