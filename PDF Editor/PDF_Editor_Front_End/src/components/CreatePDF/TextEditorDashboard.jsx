import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import TextEditiorOptions from './TextEditiorOptions';

import { useLocation } from 'react-router-dom';
import { handleGeneratePdf } from './CreatePDFFunction';

const TextEditorDashboard = ({ pdfGenrationStatus, documentContent, display, setDisplay }) => {

     const optionSVG = {
          save: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6"><path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" /></svg>,
          link: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6"><path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" /></svg>,
          download: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>,
          video: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6"><path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" /></svg>,
          project: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6"><path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" /></svg>,
          aiImage: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-8 h-8 p-1"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" /></svg>,
          aiText: <svg xmlns="http://www.w3.org/2000/svg" stroke='2' fill="black" className="bi bi-body-text w-8 h-8 p-1" viewBox="0 0 16 16"><path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" /></svg>,
          contentSupport: <svg xmlns="http://www.w3.org/2000/svg" stroke='2' fill="black" className="bi bi-pencil-square w-8 h-8 p-1" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" /></svg>,
     }

     const location = useLocation();
     const [copied, setCopied] = useState(0);
     const [link, setLink] = useState();

     useEffect(() => {
          setLink(location.pathname);
          // eslint-disable-next-line 
     }, [link])

     const handleCopyLink = async () => {
          try {
               await window.navigator.clipboard.writeText(`${window.location.origin}${location.pathname}`);
               setCopied(1)
               setTimeout(() => {
                    setCopied(0)
               }, 2000);
          } catch (err) {
          }
     }

     const genratePDF = async () => {
          try {
               pdfGenrationStatus(null)
               const result = await handleGeneratePdf(documentContent);
               if (result === 1) {
                    pdfGenrationStatus(result)
               } else if (result === 0) {
                    pdfGenrationStatus(result)
               }
          } catch (error) {
               pdfGenrationStatus(0)
               console.error('An error occurred:', error);
          }
     };


     return (
          <nav className="w-full h-[10%] border-t-black border-t-2 border-x-0 border-b-0  flex justify-center relative z-20 bg-white">
               <div onClick={() => setDisplay(0)} className={`flex place-content-center items-center h-full w-full transition duration-300 cursor-pointer relative ${display === 0 ? 'border-b-4 border-green-700' : ""}`}>
                    <div className="flex items-start space-x-2">
                         <div className="rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-7 h-7">
                                   <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                   <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                              </svg>
                         </div>
                    </div>
               </div>

               <div onClick={handleCopyLink} className={`w-full flex place-content-center items-center`}>
                    {copied === 0 && <TextEditiorOptions displayValue={display} svg={optionSVG.link} option={"Link"} />}

                    {copied === 1 &&
                         <div className='flex-col sm:flex place-content-center items-center gap-x-5'>
                              <div className='text-sm mb-1 sm:mb-0 font-bold text-center'>Copied</div>
                              <div className='w-fit h-fit p-1 bg-green-600 rounded-full mx-auto'>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                   </svg>
                              </div>
                         </div>
                    }
               </div>

               <div onClick={genratePDF} className={`w-full flex place-content-center items-center ${display === 0 ? 'block' : 'hidden'}`}>
                    <TextEditiorOptions displayValue={display} svg={optionSVG.download} option={"Download"} />
               </div>

               {/* <div onClick={() => setDisplay(4)} className={`w-full flex place-content-center items-center ${display === 4 ? 'border-b-4 border-green-700' : ""}`}>
                    <TextEditiorOptions displayValue={display} svg={optionSVG.project} option={"Project Storage"} />
               </div> */}

               <div onClick={() => setDisplay(1)} className={`w-full flex place-content-center items-center ${display === 1 ? 'border-b-4 border-green-700' : ""}`}>
                    <TextEditiorOptions displayValue={display} svg={optionSVG.aiImage} option={"Text-To-Image Support"} />
               </div>

               <div onClick={() => setDisplay(2)} className={`w-full flex place-content-center items-center ${display === 2 ? 'border-b-4 border-green-700' : ""}`}>
                    <TextEditiorOptions displayValue={display} svg={optionSVG.aiText} option={"Text-To-Text Support"} />
               </div>

               <div onClick={() => setDisplay(3)} className={`w-full flex place-content-center items-center ${display === 3 ? 'border-b-4 border-green-700' : ""}`}>
                    <TextEditiorOptions displayValue={display} svg={optionSVG.contentSupport} option={"Content Support"} />
               </div>
          </nav>
     )
}
export default TextEditorDashboard