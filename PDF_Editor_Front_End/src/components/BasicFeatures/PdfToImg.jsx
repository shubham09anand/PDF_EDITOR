import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { ToastContainer, toast } from 'react-toastify';
import { PDFDocument } from 'pdf-lib'
import 'react-toastify/dist/ReactToastify.css';
import LoadingPages from '../Animation/LoadingPages';
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
          const fileBuffer = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(fileBuffer);
          return pdfDoc.getPageCount();
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
          // console.log(selectedPage)
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
               // console.log(selectedPage)
               const anchor = document.createElement('a');
               anchor.href = url;
               anchor.download = `Photo-${index + 1}`;
               anchor.click();
          })
     }

     const reupload = () => {
          setSelectedFiles([]);
          setImages([]);
          setPageDelete([]);
          setSelectedPage([]);
     }

     return (
          <div className='w-full'>
               <ToastContainer />

               <AboutFeature featureHeading={'PDF to JPG'} featureDescription={"Convert page into a JPG or extract all images contained in a PDF."} />

               {selectedFiles.length > 0 && loading && images.length === 0 && <LoadingPages />}

               {selectedFiles.length !== 0 &&
                    <div className="mx-auto flex h-full w-fit mt-5 md:mb-10 shadow-sm p-2 rounded-lg">
                         <div className="bg-white h-full mr-2 my-auto flex place-content-center items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-pdf size-6" viewBox="0 0 16 16">
                                   <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                                   <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                              </svg>
                         </div>
                         <div className='select-none flex place-content-center items-center pr-4'>
                              <div className="text-sm truncate font-semibold text- max-w-48 overflow-x-scroll example">{selectedFiles[0]?.name}</div>
                         </div>
                         <div onClick={reupload} className="bg-white md:bg-transparent cursor-pointer hover:opacity-75 active:opacity-50 border-l-2 border-black px-3 h-full my-auto flex place-content-center items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                   <path strokeLinecap="round" strok-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                              </svg>
                         </div>
                    </div>
               }

               <div className=''>
                    <div className={selectedPage.length > 0 ? "w-full" : "w-full"}>
                         {selectedFiles.length === 0 && (
                              <UploadFile handleFileChange={handleFileChange} multiple={false} />
                         )}

                         {images.length > 0 && (
                              <>
                                   <div className='font-thin text-gray-500 text-center mt-5'>Tap on <span className='font-extrabold text-black tracking-tighter'>PAGES</span> which you want to convert into image</div>
                                   <div className='flex mx-auto flex-wrap p-2 w-fit place-content-center'>
                                        {images.map((imageUrl, index) => (
                                             <div key={index} onClick={(e) => handlePageSelection(index, imageUrl, e)} className={`m-3 w-fit h-fit ${pageDelete.includes(index) ? 'opacity-40' : ''}`}>
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
                              <div className='font-extrabold text-gray-700 w-80 mx-auto overflow-x-scroll text-center'>Page Selected: {pageDelete.sort((a, b) => a - b).map(index => index + 1).join(", ")}</div>
                              <div onClick={handleDownloadImage} className='mx-auto w-fit cursor-pointer active:opacity-80 items-center text-center place-content-center '>
                                   <div style={{ textDecoration: "none" }} className='px-5 py-3 space-x-4 flex place-content-center items-center bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] w-fit mt-3 text-white font-semibold text-2xl rounded-lg active:opacity-70 mx-auto'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-pdf size-8" viewBox="0 0 16 16">
                                             <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                                             <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                                        </svg>
                                        <div className='no-underline'>Convert In Image</div>
                                   </div>
                              </div>
                         </>
                    )}
               </div>
          </div>
     );
};

export default PdfToImg;