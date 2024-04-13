import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToImg = () => {

     const [selectedFiles, setSelectedFiles] = useState([]);
     const [images, setImages] = useState([]);
     const [pageDelete, setPageDelete] = useState([]);
     const [selectedPage, setSelectedPage] = useState([]);

     const handleFileChange = async (e) => {
          console.log(e.target.files)
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

     const handlePageSelection = (pageIndex, imageUrl, e) => {
          e.stopPropagation();
          const index = pageDelete.indexOf(pageIndex);
          console.log(selectedPage)
          if (index === -1) {
               setPageDelete([...pageDelete, pageIndex]);
               setSelectedPage([...selectedPage, imageUrl])
          } else {
               const updatedPageDelete = [...pageDelete];
               const updatedSelectedPage = [...selectedPage];

               updatedSelectedPage.splice(index, 1)
               updatedPageDelete.splice(index, 1);

               setPageDelete(updatedPageDelete);
               setSelectedPage(updatedSelectedPage)
          }
     };

     const handleDownloadImage = () => {
          selectedPage.forEach((url, index) => {
               console.log(selectedPage)
               const anchor = document.createElement('a');
               anchor.href = url;
               anchor.download = `Photo-${index + 1}`;
               anchor.click();
          })
     }


     return (
          <div className='w-full'>
               <ToastContainer />
               <div className='text-center space-y-3'>
                    <div class="text-center mb-10">
                         <h1 class="sm:text-5xl text-4xl font-semibold text-center title-font text-gray-900 mb-2">PDF to JPG</h1>
                         <p class="text-lg leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">C page into a JPG or extract all images contained in a PDF.</p>
                    </div>
               </div>

               <div className='flex flex-col-reverse'>
                    <div className={selectedPage.length > 0 ? "w-full" : "w-full"}>
                         {selectedFiles.length === 0 && (
                              <div className="mt-0 mx-auto flex items-center justify-center w-11/12 md:w-1/2 bg-[#e5322d] rounded-lg cursor-pointer">
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

                         {images.length > 0 && (
                              <>
                                   <div className='text-lg font-thin text-gray-700 text-center mt-2'>Select image which you wnat to convert into image</div>
                                   <div className='flex flex-wrap gap-5 max-h-[80vh] m-auto mx-auto w-[95%] overflow-y-scroll example mt-10'>
                                        {images.map((imageUrl, index) => (
                                             <div key={index} onClick={(e) => handlePageSelection(index, imageUrl, e)} className={`p-2 md:p-4 border w-40 md:w-44 h-fit mx-auto rounded-md border-red-500 hover:shadow-xl ${pageDelete.includes(index) ? 'opacity-40' : ''}`}>
                                                  <div className='mx-auto'>
                                                       <img draggable={true} className={`shadow-[1px_1px_10px_black] rounded-lg h-48 mx-auto cursor-move ${selectedPage.length > 0 ? "w-32" : "w-36 md:w-44"}`} src={imageUrl} alt={`Page ${index + 1}`} />
                                                       <div className='text-gray-900 text-center font-thin'>Page {index + 1}</div>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              </>
                         )}
                    </div>


                    {selectedPage.length > 0 && (
                         <div className=''>
                              <div className='text-lg text-gray-500 w-80 mx-auto overflow-x-scroll text-center text-wrap'>Page Slected : {pageDelete.join(" , ")}</div>
                              <div onClick={handleDownloadImage} className='flex flex-col cursor-pointer place-content-center items-center bg-[#e5322d] w-fit mt-5 text-white font-semibold text-xl px-6 py-2 rounded-md active:opacity-70 mx-auto'>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth=".5" stroke="black" className="w-12 h-12 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                   </svg>
                                   <div className='mt-2'>Convert Selected Page As Image</div>
                              </div>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default PdfToImg;