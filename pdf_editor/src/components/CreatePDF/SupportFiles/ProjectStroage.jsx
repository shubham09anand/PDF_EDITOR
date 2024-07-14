import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import uploadImage from '../../../Assets/images/icons/uploadImage.webp'

const ProjectStorage = () => {

     const [currImg, setCurrImg] = useState(0);

     const [displayUpload, setDisplayUpload] = useState(true)

     const [fileUploaded, setFileUploaded] = useState([]);

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
          var files = e.target.files;
          var filesArray = [].slice.call(files);

          filesArray.forEach((file) => {
               if (!file.type.startsWith('image/')) {
                    toast.warning("Please select only image files.");
                    return;
               }
               let reader = new FileReader();
               reader.onloadend = () => {
                    let base64String = reader.result;
                    setFileUploaded((prevFiles) =>
                         [...prevFiles, base64String]);
               };
               try {
                    reader.readAsDataURL(file);
               } catch (error) {
                    toast.warning("Process faliled")
               }
          });
     };

     const handleRemoveImages = () => {
          setFileUploaded([]);
     };

     const handleDownloadImage = (url) => {
          const anchor = document.createElement('a');
          console.log(url)
          anchor.href = url;
          anchor.download = `Photo`;
          anchor.click();
     }

     const image = [
          "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
          "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp",
     ];

     return (
          <div className='mx-auto'>
               <ToastContainer />
               <div className="container py-2 w-full backdrop-blur-2xl">
                    <div className=" my-10 overflow-hidden rounded-sm bg-white shadow-lg w-full">
                         <div className="flex justify-between relative bg-blue-600 py-2 px-8 place-content-center items-center text-xl font-semibold uppercase tracking-wider text-white">
                              <div>Upload Files</div>
                              <svg onClick={() => setDisplayUpload(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                         </div>
                         <div className={`space-y-4 px-4 transition-all duration-700 ${displayUpload ? "h-0" : "h-96"}`}>
                              <div className='pt-4'>
                                   <div style={{backgroundImage: `url(${uploadImage})`}} className={`flex flex-col items-center justify-center rounded-lg h-72 border-gray-900 border-dashed ${fileUploaded.length === 0 ? 'border-dashed' : 'border border-solid'}`}>
                                        {
                                             fileUploaded.length === 0 && (
                                                  <p className="mt-4 text-center text-xl font-medium text-gray-800">
                                                       <label className="cursor-pointer shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-blue-500 shadow hover:bg-blue-50">
                                                            <input onChange={(e) => handleImageChange(e)} multiple className="hidden" type="file" name="file" id="" />
                                                            browse
                                                       </label>
                                                  </p>
                                             )
                                        }
                                        {
                                             fileUploaded.length > 0 && (
                                                  <div className='h-full w-full rounded-lg flex place-content-center items-center relative bg-gray-900'>
                                                       <svg onClick={imgPrev} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="backdrop-blur-3xl rounded-full absolute left-4 w-8 h-8 p-1 cursor-pointer active:opacity-50">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                                                       </svg>
                                                       <img src={fileUploaded[currImg]} alt="" className='h-full w-96 object-scale-down' />
                                                       <div className='absolute top-5 right-5 rounded-2xl p-2 text-white tracking-widest backdrop-blur-2xl'>{currImg + 1}/{fileUploaded.length}</div>
                                                       <svg onClick={imgNext} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="backdrop-blur-3xl rounded-full absolute right-4 w-8 h-8 p-1 cursor-pointer active:opacity-50">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                                                       </svg>
                                                  </div>
                                             )
                                        }
                                   </div>
                              </div>
                              {
                                   fileUploaded.length > 0 ? (
                                        <div className='flex'>
                                             <div className="cursor-pointer active:opacity-55 rounded-sm bg-black px-5 py-2 w-fit  font-semibold text-white select-none">Save In Project Storage</div>
                                             <div onClick={handleRemoveImages} className="cursor-pointer active:opacity-55 rounded-sm bg-red-600 px-5 py-2 w-fit  font-semibold text-white select-none">Reupload</div>
                                        </div>
                                   ) : (
                                        <p className="text-sm font-extralight text-center w-fit ">Upload Photos Here To Let Other Team Members See Them. These Photos Are Avilabel In This Project Only.</p>
                                   )
                              }
                         </div>
                    </div>

                    {displayUpload && (
                         <>
                              <div className='font-semibold text-2xl text-gray-800 mb-2 mx-auto px-2'>Previous</div>
                              <div className={`-m-1 mb-20 w-fit  flex flex-wrap gap-2 md:-m-2 overflow-y-scroll example place-content-center px-2 ${displayUpload ? "h-fit max-h-[700px]" : "h-72"}`}>
                                   {image.map((url, index) => (
                                        <div key={index} className="flex w-40 h-40 sm:w-48 sm:h-48 md:w-56 lg:w-72 md:h-56 lg:h-60 relative flex-wrap">
                                             <svg onClick={() => handleDownloadImage(url)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-4 rounded-md backdrop-blur-lg p-1 top-3 z-20 cursor-pointer">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                             </svg>
                                             <div className="w-full p-1 md:p-2">
                                                  <img
                                                       alt="gallery"
                                                       className="block h-full w-full rounded-lg object-cover object-center"
                                                       src={url} />
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </>
                    )}

               </div>
          </div>
     );
};

export default ProjectStorage;
