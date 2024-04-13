import React from 'react'

const ImageAi = ({ setDisplay }) => {
     return (
          <div className='p-2 w-full h-screen backdrop-blur-2xl'>
               <div className='w-full flex place-content-center items-center space-x-3 mt-3'>
                    <div onClick={() => { setDisplay(0) }} className='bg-gray-300 rounded-full w-fit h-fit cursor-pointer'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 p-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                         </svg>
                    </div>
                    <div className="heading text-center font-bold text-xl md:text-3xl text-gray-800">AI Text-to-Image Support</div>
               </div>
               <div className='heading text-center w-1/3 mx-auto text-base font-thin text-gray-800 mt-4 font-mono'>Describe, and we'll visualize! Use text to generate images effortlessly. From your words to vibrant visuals, let our AI bring your ideas to life</div>
               <div className="editor mx-auto rounded-md mt-2 w-full sm:w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                    <div className="flex w-full h-fit">
                         <input className="title w-full bg-gray-100 border border-gray-300 p-2 mb-4 rounded-md rounded-r-none border-right-0 outline-none" spellCheck="false" placeholder="Describe everything about your image" type="text" />
                         <button disabled={false} className="btn border border-indigo-500 px-4 font-semibold cursor-pointer rounded-l-none border-l-0 h-full p-2 mb-4 text-gray-200 bg-indigo-500" >Send</button>
                    </div>
                    <div className="description bg-gray-100 sec p-3 h-60 border border-gray-300 rounded-md relative">
                         <div className='text-gray-400 select-none'>AI genrated image will appear here</div>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-2 rounded-md bg-gray-300 p-1 top-3 z-20">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                         </svg>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-10 rounded-md bg-gray-300 p-1 top-3 z-20">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                         </svg>
                    </div>
               </div>
          </div>
     )
}

export default ImageAi