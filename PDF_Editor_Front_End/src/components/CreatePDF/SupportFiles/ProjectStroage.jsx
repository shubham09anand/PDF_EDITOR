import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import uploadImage from '../../../Assets/images/icons/uploadImage.webp';
import { downloadImage } from './SupportFilesFunction';
import { io } from "socket.io-client";
import { useLocation } from 'react-router-dom';

const ProjectStorage = ({ editorHeight }) => {

     const location = useLocation();
     const docId = location.pathname.split("/")[3];
     const [socket, setSocket] = useState(null);
     const [currImg, setCurrImg] = useState(0);
     const [displayUpload, setDisplayUpload] = useState(true)
     const [fileUploaded, setFileUploaded] = useState([]);
     const [preview, setPreview] = useState(null);
     const [mettingPhoto, setMettingPhoto] = useState([]);

     useEffect(() => {
          const s = io(
               'https://apipdfcollaborator.shubham09anand.in',
               {
                    transports: ['websocket'], // force websocket
                    path: '/socket.io',
               }
          );
          // process.env.REACT_APP_API_URL_SOCKET_NETWORK);
          // 'http://127.0.0.1:8080/');
          setSocket(s);

          return () => {
               s.disconnect();
          };
     }, []);

     const sendPhoto = () => {
          if (!socket || docId === null) return;
          console.log("Sending photo")
          socket.emit('send-photo', { files: fileUploaded, docId: docId });
     };

     useEffect(() => {
          if (!socket || docId === null) return;
          socket.on('forward-photo', ((data) => {
               if (data) {
                    setMettingPhoto((previousfile) => [...previousfile, data.files])
                    setFileUploaded([]);
                    setDisplayUpload(true)
               } else {
                    toast.error("Something went Wrong")
               }
          }));

     }, [socket, docId])

     useEffect(() => {
          if (!socket) return;
          socket.emit("join-room", docId);

          socket.on('receive-photos', (data) => {
               console.log('Received photo:', data);
               console.log('Received data:', data);
          });

          return () => {
               socket.off('receive-photos');
          };
     }, [socket]);

     const imgPrev = () => {
          if (currImg === 0) {
               setCurrImg(fileUploaded.length - 1);
          } else {
               setCurrImg(currImg - 1);
          }
     };

     const imgNext = () => {
          if (currImg < fileUploaded.length - 1) {
               setCurrImg(currImg + 1);
          } else {
               setCurrImg(0);
          }
     };

     let handleImageChange = (e) => {
          let valid = true;
          var files = e.target.files;
          const imageTypes = ['image/jpg', 'image/jpeg', 'image/avif', 'image/png'];
          const MAX_SIZE = 10 * 1024 * 1024;
          var total_size = 0;

          var filesArray = [].slice.call(files);

          filesArray.forEach((file) => {
               total_size += file.size;
               if (total_size > MAX_SIZE) {
                    toast.warning("Maximum 10MB is allowed.");
                    valid = false;
                    return;
               }

               if (!imageTypes.includes(file.type)) {
                    valid = false;
                    toast.warning("Please select only JPEG, JPG, AVIF, PNG.");
                    return;
               }

               if (valid) {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                         let base64String = reader.result;
                         setFileUploaded((prevFiles) => [...prevFiles, base64String]);
                    };

                    try {
                         reader.readAsDataURL(file);
                    } catch (error) {
                         toast.warning("File processing failed.");
                    }
               }
          });
     };

     const handleRemoveImages = () => {
          setFileUploaded([]);
     };

     const controlPreview = (url) => {
          window.scrollTo(0, 0);
          setPreview(url)
     }

     return (
          <div className='w-screen'>
               <ToastContainer />
               <div className="p-1 py-2 w-full backdrop-blur-2xl">
                    <div className="my-0 rounded-md bg-white w-full lg:w-1/2 mx-auto">
                         {preview === null && (
                              <div className="flex justify-between relative  bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] rounded-md py-2 px-8 place-content-center items-center text-xl font-semibold uppercase tracking-wider text-white">
                                   <div>Upload Files</div>
                                   <svg onClick={() => setDisplayUpload(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className={`w-6 h-6 duration-500 ${!displayUpload ? 'rotate-0' : 'rotate-180'}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                   </svg>
                              </div>
                         )}

                         {displayUpload && mettingPhoto?.length === 0 && (
                              <div className='mt-4'>
                                   <div className='text-center text-gray-600'>Upload images to share with your teammates.</div>
                                   <div className='p-2 rounded-lg shadow-inner text-gray-400 bg-gray-100 mt-2 text-center'>Photos of this section are visible only to those who had joined this metting and will be deleted when this page will be either refreshed or you leave the metting</div>
                              </div>
                         )}

                         <div className={`space-y-4 px-4 transition-all duration-700 overflow-hidden ${displayUpload ? "h-0" : "h-96"}`}>
                              <div className='pt-4'>
                                   <div style={{ backgroundImage: `url(${uploadImage})` }} className={`border-2 flex flex-col items-center justify-center rounded-lg h-72 border-gray-900 border-dashed ${fileUploaded.length === 0 ? 'border-dashed' : 'border border-solid'}`}>
                                        {
                                             fileUploaded.length === 0 && (
                                                  <div className="mt-4 text-center text-xl font-medium text-gray-800">
                                                       <label className="cursor-pointer shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-blue-500 shadow hover:bg-blue-50">
                                                            <input onChange={(e) => handleImageChange(e)} multiple className="hidden" type="file" accept='imgage/*' name="file" id="" />
                                                            browse
                                                       </label>
                                                  </div>
                                             )
                                        }
                                        {
                                             fileUploaded.length > 0 && (
                                                  <div className='h-full w-full rounded-lg flex place-content-center items-center relative backdrop-blur-2xl'>
                                                       {fileUploaded.length > 1 && (
                                                            <svg onClick={imgPrev} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="backdrop-blur-3xl rounded-full absolute left-4 w-8 h-8 p-1 cursor-pointer bg-[#6366f1] active:opacity-50">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                                                            </svg>
                                                       )}
                                                       <img src={fileUploaded[currImg]} alt="" className='h-full w-96' />
                                                       <div className='absolute top-5 right-5 rounded-2xl p-2 text-white tracking-widest backdrop-blur-2xl'>{currImg + 1}/{fileUploaded.length}</div>
                                                       {fileUploaded.length > 1 && (
                                                            <svg onClick={imgNext} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="backdrop-blur-3xl rounded-full absolute right-4 w-8 h-8 p-1 cursor-pointer bg-[#6366f1] active:opacity-50">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                                                            </svg>
                                                       )}
                                                  </div>
                                             )
                                        }
                                   </div>
                              </div>
                              {fileUploaded.length > 0 && (
                                   <div className='flex place-content-center'>
                                        <button onClick={handleRemoveImages} className="cursor-pointer p-2 active:opacity-55 bg-red-600 px-5 w-fit  font-semibold text-white select-none">Reupload</button>
                                        <button onClick={sendPhoto} className="cursor-pointer p-2 active:opacity-55 bg-black px-5 w-fit  font-semibold text-white select-none">Send</button>
                                   </div>
                              )}
                         </div>
                    </div>

                    {displayUpload && (
                         <div className='w-full'>
                              <div className={`mx-auto h-[400px] overflow-y-scroll example ${preview === null ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
                                   {preview !== null &&
                                        <div style={{ height: `${editorHeight}px` }} className='w-screen h-screen flex place-content-center translate-y-10 backdrop-blur-3xl fixed left-0 top-0'>
                                             <img src={preview} alt="imgErr" className='w-full lg:w-1/2 h-96 bg-current mx-auto lg:translate-x-1/2 scale-x-95 left-0 object-scale-down absolute z-50 bg-white' />
                                             <svg onClick={() => setPreview(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3.5" stroke="white" className="size-7 p-1 absolute z-50 right-5 top-2 lg:right-5 cursor-pointer bg-[#6366f1] rounded-full">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                             </svg>
                                        </div>

                                   }
                                   {preview === null && (
                                        <div className='flex flex-wrap place-content-center items-center gap-4 mt-4 pb-4 overflow-y-scroll'>
                                             {mettingPhoto?.map((item, index) => {
                                                  if (Array.isArray(item)) {
                                                       return item.map((subItem, subIndex) => (
                                                            <div onClick={() => controlPreview(subItem)} style={{ backgroundImage: `url(${subItem})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }} key={`${index}-${subIndex}`} className="w-full h-60 sm:w-3/4 sm:h-80 md:w-1/2 lg:w-1/4 flex border-2 border-gray-400 rounded-md relative flex-wrap">
                                                                 <a onClick={() => downloadImage(subItem, `_${subIndex}.png`)} href={subItem} download={`image_${subIndex + 1}`}>
                                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 absolute right-4 rounded-md bg-[#6366f1] p-1 top-3 z-20 cursor-pointer">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                                      </svg>
                                                                 </a>
                                                            </div>
                                                       ));
                                                  } else {
                                                       return (
                                                            <div onClick={() => controlPreview(item)} style={{ backgroundImage: `url(${item})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }} key={index} className="w-full h-60 sm:w-3/4 sm:h-80 md:w-1/2 lg:w-1/4 flex border-2 border-gray-400 rounded-md relative flex-wrap">
                                                                 <a onClick={() => downloadImage(item, `_${index}.png`)} href={item} download={`image_${index + 1}`}>
                                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-4 rounded-md backdrop-blur-lg p-1 top-3 z-20 cursor-pointer">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                                      </svg>
                                                                 </a>
                                                            </div>
                                                       );
                                                  }
                                             })}
                                        </div>
                                   )}
                              </div>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default ProjectStorage;
