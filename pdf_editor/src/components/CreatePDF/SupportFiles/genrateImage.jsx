import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import LoadingPlaneAnimation from '../../Animation/LoadingPlaneAnimation';


const GenrateImage = () => {
     const [imageQueery, setImageQueery] = useState("");
     const [scrapImages, setScrapImages] = useState();
     const [button, setButton] = useState(false);

     const getImages = () => {
          if (imageQueery === "" || imageQueery.trim() === null) {
               toast.error("Enter a text in input Field");
               return;
          }
          setButton(true)
          setScrapImages([])
          axios.post("http://127.0.0.1:3200/auth/getImages",
               { queery: imageQueery }).then((res) => {
                    setScrapImages(res.data.apiResult.items)
                    console.log(res.status)
                    console.log(res.data)
               }).catch((error) => {
                    toast.error(`Process Failed`)
               }).finally(() => {
                    setButton(false)
               })

     }

     return (
          <>
               <div className="editor mx-auto rounded-md w-full flex flex-col text-gray-800 p-4 max-w-4xl">
                    <ToastContainer />
                    <div className="flex w-full h-fit">
                         <input onChange={(e) => setImageQueery(e.target.value)} value={imageQueery} className="title w-full bg-gray-200 rounded-md rounded-r-none border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Describe everything about requirement here" type="text" />
                         <button onClick={getImages} disabled={button} className={`btn border border-indigo-500 px-4 font-semibold h-fit w-fit p-2 rounded-l-none mb-4 text-gray-200 bg-indigo-500 cursor-wait`} >Ask</button>
                    </div>
                    <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
                         {button &&
                              <div className='absolute z-20 backdrop-blur-[2px] w-full h-full top-0'>
                                   <div className=' mx-auto z-20 flex flex-col place-content-center items-center'>
                                        <LoadingPlaneAnimation />
                                   </div>
                              </div>
                         }
                         {scrapImages !== null && scrapImages?.map((url, index) => (
                              <div key={index} className='relative w-full'>
                                   <div className='flex space-x-4 absolute top-3 right-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="active:opacity-75 w-6 h-6 p-1 backdrop-blur-md rounded-full cursor-pointer">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="active:opacity-75 w-6 h-6 p-1 backdrop-blur-md rounded-full cursor-pointer">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                   </div>
                                   <img className="object-cover object-center w-80 h-48 max-w-full rounded-lg" src={url.link} alt={`gallery_photo_${index}`} />
                              </div>
                         ))}
                    </div>
               </div>
          </>
     )
}

export default GenrateImage