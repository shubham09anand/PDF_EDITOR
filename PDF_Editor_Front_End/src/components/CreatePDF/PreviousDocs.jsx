import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import collab from '../../Assets/images/pdfIcons/collab.png';

const PreviousDocs = () => {

     const optionSVG = [
          {
               svg:<img src={collab} alt="Create PDF" className="size-44 grayscale" />,
               title:'Collabrate',
               desc:'Work together on PDFs in real time, ensuring seamless collaboration and updates',
          },   
          {
               svg:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="white" stroke="white" className="size-44"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>,
               title:'Create PDF',
               desc:'Easily convert your documents into high-quality PDFs with just a click.',
          },   
          {
               svg:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-44"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>,
               title:'Copy link of document to share it',
               desc:'Generate a sharable link to your document for instant access and collaboration.',
          },
          {
               svg:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke='white' className="size-44"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>,
               title:'Downlaod your created PDF',
               desc:'Download your final PDF directly to your device once the collaboration is complete.',
          },
          {
               svg:<svg xmlns="http://www.w3.org/2000/svg" fill='white' className="bi bi-folder size-44" stroke="200" viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z" /></svg>,
               title:'Share photos in real time',
               desc:'Upload and share images instantly with collaborators in real-time and download it.',
          },
          {
               svg:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke='white' className="size-44"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>,
               title:'Text to Ai supoort',
               desc:'Leverage AI to enhance your content by turning text into actionable insights',
          },
          {
               svg:<svg xmlns="http://www.w3.org/2000/svg" stroke='2' fill='white' className="bi bi-pencil-square p-1 size-44" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" /></svg>,
               title:'Content support',
               desc:'Gather information from websites and articles, then receive a summarized version to enhance your PDF content easily.',
          },
          {
               svg:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke='white' className="size-44"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>,
               title:'Chat',
               desc:'Communicate directly with collaborators via an integrated chat feature.',
          }
     ]
     const navigate = useNavigate();
     const [joinLink, setJoinLink] = useState("");
     const [index, setIndex] = useState(0);

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

     useEffect(() => {
          const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % optionSVG.length);
          }, 2000);
      
          // Clean up the interval when the component unmounts
          return () => clearInterval(interval);
        }, [optionSVG.length]);

     return (

          <>
               <ToastContainer />
               <div className="lg:flex bg-gray-50 h-screen w-screen lg:px-20 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:pt-56">
                    <div className="mr-auto place-self-center">
                         <h1 className="select-none max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
                              Video calls and meetings for everyone
                         </h1>
                         <p className="select-none max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">This
                              free and open-source landing page template was built using the utility classes from and based on the
                              components from the
                         </p>
                         <div className='md:flex md:space-x-5 place-content-center items-center'>
                              <Link style={{ textDecoration: "none" }} to="/create_doc" className="select-none space-y-4 py-2 sm:flex sm:space-y-0 sm:space-x-4">
                                   <div className="bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] space-x-3 flex items-center justify-center w-full px-5 py-2 text-sm font-medium text-center text-gray-900 rounded-md sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="bi bi-file-pdf-fill size-6" viewBox="0 0 16 16">
                                             <path d="M5.523 10.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 4.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                                             <path fillRule="evenodd" d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m.165 11.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.6 11.6 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103" />
                                        </svg>
                                        <div className='text-white font-semibold text-base'>Creat New PDF</div>
                                   </div>
                              </Link>

                              <div className="space-y-4 sm:flex place-content-center items-center sm:space-y-0 sm:space-x-4">
                                   <div className="space-x-3 h-10 mt-0.5 rounded-md overflow-hidden w-80 flex items-center justify-center px-5 py-1 text-sm font-medium text-center text-gray-900 border border-gray-200 sm:w-auto focus:ring-4 focus:ring-gray-100 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1da1f2" className="size-6">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                        </svg>
                                        <input onChange={(e) => setJoinLink(e.target.value)} value={joinLink} type="text" id="input-group-1" className="w-80 bg-transparent border-gray-300 text-gray-600 text-sm outline-none block h-20 p-2.5 pb-1" placeholder="Enter link to join with other and invite more" />
                                   </div>
                                   <button disabled={joinLink === "" ? true : false} onClick={joinDoc} className={`text-lg font-semibold rounded-md text-white px-4 py-1 w-fit h-fit ${joinLink === "" ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] cursor-pointer'}`}>Join</button>
                              </div>
                         </div>
                    </div>
                    <div className='relative mt-28 lg:w-1/3 h-56 flex place-content-center items-center'>
                         <div onClick={()=> index === 0 ? setIndex(optionSVG.length - 1) : setIndex(index - 1)} className='border border-black p-2 absolute z-20 rounded-full top-[40%] left-0 cursor-pointer'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                   <path strokeLinecap="round" strokelinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                              </svg>
                         </div>
                         <div onClick={()=> index < optionSVG.length - 1 ? setIndex(index + 1) : setIndex(0)} className='border border-black p-2 absolute z-20 rounded-full top-[40%] right-0 cursor-pointer'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                   <path strokeLinecap="round" strokelinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                         </div>
                         <div className='size-60 md:size-72 rounded-full animate-ping'>
                              <div className={`w-fit rounded-full p-10 bg-gradient-to-tr from-[#7eafff] via-[#3e84ff] to-[#d085ff] mx-auto flex place-content-center items-center cursor-pointer`}>
                                   {optionSVG[index].svg}
                              </div>
                              <div className='mt-3 text-center text-xl font-thin'>{optionSVG[index].title}</div>
                              <div className='mt-3 w-96 -translate-x-10 text-center'>{optionSVG[index].desc}</div>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default PreviousDocs