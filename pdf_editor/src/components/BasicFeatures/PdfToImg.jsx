import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingPages from '../Animation/LoadingPages';
import DownLoadEditedPDF from './Components/DownLoadEditedPDF';
import AboutFeature from './Components/AboutFeature';
import UploadFile from './Components/UploadFile';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToImg = () => {

     const [selectedFiles, setSelectedFiles] = useState([]);
     const [images, setImages] = useState([]);
     const [pageDelete, setPageDelete] = useState([]);
     const [selectedPage, setSelectedPage] = useState([]);
     const [loading, setLoading] = useState(false)

     const handleFileChange = async (e) => {
          console.log(e.target.files)
          if (e.target.files[0].type !== 'application/pdf') {
               toast.error("Only PDF are allowed")
               return;
          }
          const files = (e.target.files);
          setSelectedFiles(files);
          setLoading(true)
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
               updatedSelectedPage.splice(index, 1);
               updatedPageDelete.splice(index, 1);
               setPageDelete(updatedPageDelete);
               setSelectedPage(updatedSelectedPage);
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

               <AboutFeature featureHeading={'PDF to JPG'} featureDescription={"Convert page into a JPG or extract all images contained in a PDF."} />
               
               {loading && images.length === 0 && <LoadingPages/>}

               <div className='flex flex-col-reverse'>
                    <div className={selectedPage.length > 0 ? "w-full" : "w-full"}>
                         {selectedFiles.length === 0 && (
                              <UploadFile handleFileChange={handleFileChange} multiple={false} />
                         )}

                         {images.length > 0 && (
                              <>
                                   <div className='flex mx-auto flex-wrap p-2 w-fit place-content-center'>
                                        {images.map((imageUrl, index) => (
                                             <div key={index} onClick={(e) => handlePageSelection(index, imageUrl, e)} className={`m-5 w-fit h-fit ${pageDelete.includes(index) ? 'opacity-40' : ''}`}>
                                                  <div className='mx-auto pb-2'>
                                                       <img draggable={true} className={`shadow-[1px_1px_10px_gray] w-32 h-40 sm:w-52 sm:h-60 cursor-pointer}`} src={imageUrl} alt={`Page ${index + 1}`} />
                                                       <div className='text-gray-500 text-center text-sm mt-2 font-semibold'>{index + 1}</div>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              </>
                         )}
                    </div>

                    {selectedPage.length > 0 && (
                         <>
                              <DownLoadEditedPDF />
                              <div className='text-lg font-thin text-gray-700 text-center mt-2'>Select image which you want to convert into image</div>
                              <div className='font-extrabold text-gray-700 w-80 mx-auto overflow-x-scroll text-center text-wrap'>Page Slected : {pageDelete.map(index => index + 1).join(", ")}</div>
                              <div onClick={handleDownloadImage} className='flex flex-col cursor-pointer place-content-center items-center bg-[#e5322d] w-fit mt-5 text-white font-semibold text-xl px-6 py-2 rounded-md active:opacity-70 mx-auto'>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth=".5" stroke="black" className="w-12 h-12 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                   </svg>
                                   <div className='mt-2'>Convert Selected Page As Image</div>
                              </div>
                         </>
                    )}
               </div>
          </div>
     );
};

export default PdfToImg;