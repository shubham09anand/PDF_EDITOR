import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PreviousDocs = () => {

     const navigate = useNavigate();
     const [joinLink, setJoinLink] = useState("");

     const joinDoc = () => {
          const docId = joinLink.split("/");
          if (joinLink === "" || joinLink === null) {
               toast.info("Link Required")
               return
          }
          else if (docId.length !== 6) {
               toast.info("Invalid Link")
               return
          }
          else {
               navigate(`/create_doc/document/${docId[5]}`);
          }
     }

     return (

          <>
               <ToastContainer />
               <div className="lg:flex bg-gray-100 h-screen w-screen lg:px-20 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:pt-56">
                    <div className="mr-auto place-self-center">
                         <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
                              Video calls and meetings for everyone
                         </h1>
                         <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">This
                              free and open-source landing page template was built using the utility classes from <a target="_blank" className="hover:underline">Tailwind CSS</a> and based on the
                              components from the
                         </p>
                         <div className='md:flex md:space-x-5'>
                              <Link style={{ textDecoration: "none" }} to="/create_doc" className="space-y-4 py-2 sm:flex sm:space-y-0 sm:space-x-4">
                                   <div className="bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] space-x-3 flex items-center justify-center w-full px-5 py-2 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-sm sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="bi bi-file-pdf-fill size-6" viewBox="0 0 16 16">
                                             <path d="M5.523 10.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 4.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                                             <path fillRule="evenodd" d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m.165 11.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.6 11.6 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103" />
                                        </svg>
                                        <div className='text-white font-semibold text-base'>Creat New PDF</div>
                                   </div>
                              </Link>

                              <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                   <div className="space-x-3 flex items-center justify-center w-full px-5 py-1 text-sm font-medium text-center text-gray-900 border border-gray-200 sm:w-auto focus:ring-4 focus:ring-gray-100 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1da1f2" className="size-6">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                        </svg>
                                        <input onChange={(e) => setJoinLink(e.target.value)} value={joinLink} type="text" id="input-group-1" className="w-80 border-b border-gray-300 text-gray-600 text-sm outline-none block p-2.5 pb-0.5" placeholder="Enter link to join with other and invite more" />
                                   </div>
                                   <button onClick={joinDoc} className='text-lg font-semibold text-white bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] px-4 py-2 cursor-pointer w-full h-fit'>Join</button>
                              </div>
                         </div>
                    </div>
                    <div className='relative mt-28 lg:w-1/3 h-56 flex place-content-center items-center'>
                         <div className='border-2 p-2 absolute z-20 rounded-full top-[40%] left-0 cursor-pointer'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                   <path strokeLinecap="round" strokelinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                              </svg>
                         </div>
                         <div className='border-2 p-2 absolute z-20 rounded-full top-[40%] right-0 cursor-pointer'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                   <path strokeLinecap="round" strokelinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                         </div>
                         <div className='size-60 md:size-72 rounded-full mx-auto bg-slate-200'></div>
                    </div>
               </div>
          </>
     )
}

export default PreviousDocs