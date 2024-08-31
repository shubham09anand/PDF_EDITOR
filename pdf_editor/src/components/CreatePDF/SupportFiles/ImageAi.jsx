import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { generateAiImage } from '../CreatePDFFunction';
import 'react-toastify/dist/ReactToastify.css';

const ImageAi = () => {

     const [userQueery, setUserQueery] = useState("");
     const [status, setStatus] = useState(true);
     const [button, setButton] = useState(false);
     const [generatedImage, setGeneratedImage] = useState();

     const handleAiImageGenrator = () => {

          setButton(true);

          generateAiImage(userQueery).then((res) => {
               setStatus(false);
               console.log(res.data)
               setGeneratedImage(res.data);
          }).catch(() => {
               toast.warning("Please Try Again");
          }).finally(() => {
               setButton(false);
          })
     }

     return (
          <div className='p-2 w-full h-screen backdrop-blur-2xl'>
               <ToastContainer />
               <div className='w-fit mx-auto'>
                    <div className='w-fit mx-auto flex place-content-center items-center space-x-3 mt-3'>
                         <div className="heading text-center font-bold text-xl md:text-3xl text-gray-800">AI Text-to-Image Support</div>
                    </div>
                    <div className='heading text-center w-4/5 md:w-1/3 lg:w-1/2 mx-auto text-base font-thin text-gray-800 mt-4 mb-4 font-mono'>Describe, and we'll visualize! Use text to generate images effortlessly. From your words to vibrant visuals, let our AI bring your ideas to life</div>
                    <div className="mx-auto h-fit rounded-md mt-2 w-full sm:w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                         <div className="flex w-full h-fit">
                              <input onChange={(e) => setUserQueery(e.target.value)} value={userQueery} className="title w-full bg-gray-100 border border-gray-300 p-2 mb-4 rounded-md rounded-r-none border-right-0 outline-none" spellCheck="false" placeholder="Describe everything about your image" type="text" />
                              <button disabled={button} onClick={() => handleAiImageGenrator(userQueery)} className={`border border-indigo-500 px-4 font-semibold rounded-l-none border-l-0 h-full p-2 mb-4 text-gray-200 bg-indigo-500 ${button ? "cursor-wait" : "cursor-pointer"}`}>Send</button>
                         </div>
                         {
                              status && (
                                   <div className="description bg-gray-100 sec p-3 h-60 border border-gray-300 rounded-md relative">
                                        <div className='text-gray-400 select-none'>AI genrated image will appear here</div>
                                   </div>
                              )
                         }
                         {
                              !status && (
                                   <div className="description bg-gray-100 border border-gray-300 rounded-md relative">
                                        <img src={generateAiImage?.imageUrls} alt="" className='h-80 w-full' />
                                        <div className='absolute right-7 top-6 z-20 flex gap-x-4'>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 rounded-md bg-gray-300 p-1">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                             </svg>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 rounded-md bg-gray-300 p-1">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                             </svg>
                                        </div>
                                   </div>
                              )
                         }
                    </div>
               </div>
          </div>
     )
}

export default ImageAi