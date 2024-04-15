import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import LoadingPages from '../Animation/LoadingPages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DeletePages = () => {

     const [status, setStatus] = useState(false);
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
               console.log(pageDelete)
          } else {
               const updatedPageDelete = [...pageDelete];
               updatedPageDelete.splice(index, 1);
               setPageDelete(updatedPageDelete);
               console.log(pageDelete)
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
                         console.log(pageNum)

                         for (let index = 0; index < pageNum - 1; index++) {
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
     }, [])


     return (
          <div className='p-2 w-full'>
               <ToastContainer />
               <div className='text-center space-y-3 mb-10'>
                    <h1 className="sm:text-5xl text-4xl font-semibold text-center title-font text-gray-900 mb-2">Remove PDF Pages</h1>
                    <p className="text-lg leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Select and remove the PDF pages you don’t need. Get a new file without your deleted pages from your original File.</p>
               </div>

               {selectedFiles.length === 0 && (
                    <div onClick={() => setStatus(true)} className="mt-10 mx-auto flex items-center justify-center w-11/12 sm:w-1/2 lg:w-1/3 bg-[#e5322d] rounded-lg cursor-pointer">
                         <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth=".5" stroke="black" className="w-12 h-12 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                   </svg>
                                   <p className="mb-2 text-3xl sm:text-4xl text-white"><span className="font-semibold">Click to upload Pdf</span></p>
                                   <p className="text-base text-white">Uplaod Your Pdfs</p>
                              </div>
                              <input id="dropzone-file" type="file" accept=".pdf" multiple className="hidden" onChange={handleFileChange} />
                         </label>
                    </div>
               )}

               {/* loading page animation */}
               {selectedFiles.length > 0 && status && images.length === 0 && <LoadingPages />}

               {images.length > 0 &&
                    <div className=' mt-5 w-full flex flex-wrap gap-5 max-h-[90vh] mx-auto overflow-y-scroll mr-5'>
                         {images.map((imageUrl, index) => (
                              <div key={index} onClick={(e) => handlePageSelection(index, e)} className={`p-4 mx-auto md:p-6 border mx-ato h-fit rounded-md border-red-500 hover:shadow-xl ${pageDelete.includes(index) ? 'opacity-40' : ''}`}>
                                   <div className=''>
                                        <img draggable={true} className='mx-auto shadow-[1px_1px_10px_black] rounded-lg w-28 h-40 sm:w-36 sm:h-48 cursor-move' src={imageUrl} alt={`Page ${index + 1}`} />
                                        <div className='text-gray-900 text-center font-thin'>Page {index + 1}</div>
                                   </div>
                              </div>
                         ))}
                    </div>
               }

               {!blob && pageDelete.length > 0 && (<div onClick={removePages} className='px-4 py-2 text-4xl bg-red-600 text-white w-fit h-fit rounded-lg mx-auto mt-5'>Remove pages</div>
               )}
               <div>
                    {blob && (
                         <div className='mt-20 mx-auto w-fit items-center text-center place-content-center '>
                              <a href={blob} download={`deleted.pdf`} className='flex place-content-center items-center bg-[#e5322d] w-fit mt-5 text-white font-semibold text-2xl px-6 py-2 rounded-md active:opacity-70 mx-auto'>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth=".5" stroke="black" className="w-12 h-12 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                   </svg>
                                   <div>Download Modifed PDF</div>
                              </a>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default DeletePages;