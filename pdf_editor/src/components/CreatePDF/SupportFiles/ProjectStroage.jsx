import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const ProjectStroage = ({ setDisplay }) => {
     
     const location = useLocation();
     const currentLocation = location.pathname;
     console.log(currentLocation);
     const data = currentLocation.split("/")
     console.log(data)

     const [displayUpload, setDisplayUpload] = useState(true);
     const [socket, setSocket] = useState(null);


     useEffect(() => {
          const s = io("http://127.0.0.1:3001");
          setSocket(s);

          return () => {
               s.disconnect();
          }
     }, []);

     const sendData = (e) =>{

          e.preventDefault();

          if (!socket) return;
     }

     return (
          <div>
               <div className="container mx-auto px-5 py-2 lg:px-32 w-fit backdrop-blur-2xl">
                    <div onClick={() => { setDisplay(0) }} className='bg-gray-200 p-1 rounded-md absolute left-10 cursor-pointer'>close</div>
                    <div className="w- mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
                         <div className="flex justify-between relative bg-blue-600 py-2 px-8 place-content-center items-center text-xl font-semibold uppercase tracking-wider text-white">
                              <div>Upload Files</div>
                              <svg onClick={() => displayUpload ? setDisplayUpload(false) : setDisplayUpload(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer active:opacity-75">
                                   <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                              </svg>
                         </div>
                         <div className={`space-y-4 px-8 mt-4 transition-all duration-700 ${displayUpload ? "h-0" : "h-80"}`}>
                              <div className="flex flex-col items-center justify-center rounded-lg border-2 h-48 border-gray-900 border-dashed px-4 py-10">
                                   <p className="mt-4 text-center text-xl font-medium text-gray-800">
                                        <label className="shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-blue-500 shadow hover:bg-blue-50">
                                             <input className="hidden" type="file" name="file" id="" />
                                             browse
                                        </label>
                                   </p>
                              </div>
                              <div className="text-gray-600 font-thin text-lg">Tailwind.zip</div>

                              <div className="mt-4 rounded-full bg-blue-600 px-10 py-2 w-fit mx-auto font-semibold text-white">Save In Project Stroage</div>
                         </div>
                    </div>

                    <div className='font-semibold text-2xl text-gray-800 mb-2'>Previous Material</div>
                    <div className={`-m-1 w-fit mx-auto flex flex-wrap md:-m-2 overflow-y-scroll ${displayUpload ? "h-[calc(70vh)]" : "h-72"}`}>
                         <div className="flex w-64 relative flex-wrap mx-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-2 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-10 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                              </svg>
                              <div className="w-full p-1 md:p-2">
                                   <img
                                        alt="gallery"
                                        className="block h-52 w-80 rounded-lg object-cover object-center"
                                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
                              </div>
                         </div>
                         <div className="flex w-64 relative flex-wrap mx-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-2 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-10 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                              </svg>
                              <div className="w-full p-1 md:p-2">
                                   <img
                                        alt="gallery"
                                        className="block h-52 w-80 rounded-lg object-cover object-center"
                                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp" />
                              </div>
                         </div>
                         <div className="flex w-64 relative flex-wrap mx-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-2 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-10 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                              </svg>
                              <div className="w-full p-1 md:p-2">
                                   <img
                                        alt="gallery"
                                        className="block h-52 w-80 rounded-lg object-cover object-center"
                                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp" />
                              </div>
                         </div>
                         <div className="flex w-64 relative flex-wrap mx-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-2 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-10 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                              </svg>
                              <div className="w-full p-1 md:p-2">
                                   <img
                                        alt="gallery"
                                        className="block h-52 w-80 rounded-lg object-cover object-center"
                                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                              </div>
                         </div>
                         <div className="flex w-64 relative flex-wrap mx-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-2 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-10 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                              </svg>
                              <div className="w-full p-1 md:p-2">
                                   <img
                                        alt="gallery"
                                        className="block h-52 w-80 rounded-lg object-cover object-center"
                                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                              </div>
                         </div>
                         <div className="flex w-64 relative flex-wrap mx-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-2 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-10 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                              </svg>
                              <div className="w-full p-1 md:p-2">
                                   <img
                                        alt="gallery"
                                        className="block h-52 w-80 rounded-lg object-cover object-center"
                                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                              </div>
                         </div>
                         <div className="flex w-64 relative flex-wrap mx-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-2 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-10 rounded-md backdrop-blur-lg p-1 top-3 z-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                              </svg>
                              <div className="w-full p-1 md:p-2">
                                   <img
                                        alt="gallery"
                                        className="block h-52 w-80 rounded-lg object-cover object-center"
                                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp" />
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default ProjectStroage