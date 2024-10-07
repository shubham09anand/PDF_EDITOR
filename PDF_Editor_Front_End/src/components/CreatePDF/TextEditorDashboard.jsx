import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import TextEditiorOptions from './TextEditiorOptions';

import { useLocation } from 'react-router-dom';
import { handleGeneratePdf } from './CreatePDFFunction';

const TextEditorDashboard = ({ pdfGenrationStatus, documentContent, display, setDisplay }) => {

     const optionSVG = {
          save: <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="green" stroke="green" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>,
          link: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>,
          download: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${display ? 'green' : 'black'}`} className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>,
          project: <svg xmlns="http://www.w3.org/2000/svg" fill={`${display === 4 ? 'green' : 'black'}`} className="bi bi-folder size-7" stroke="200" viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/></svg>,
          aiText: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${display === 2 ? 'green' : 'black'}`} className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>,
          contentSupport: <svg xmlns="http://www.w3.org/2000/svg" stroke='2' fill={`${display === 3 ? 'green' : 'black'}`} className="bi bi-pencil-square w-8 h-8 p-1" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" /></svg>,
          message: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${display === 1 ? 'green' : 'black'}`} className="size-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>,
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

          <nav id='textEditorDashboard' className="overflow-hidden w-screen h-[57px] lg:h-[70px] border-t-black border-t-2 border-x-0 border-b-0 flex bg-white absolute bottom-0 z-20">
          <div className='w-[200%] h-full flex overflow-x-scroll'>
               <div onClick={() => setDisplay(0)} className={`w-full flex place-content-center border-l items-center h-full transition duration-300 cursor-pointer relative ${display === 0 ? 'border-b-2 bg-gray-100 border-green-700' : ""}`}>
                    <div className="w-32 flex items-start space-x-2">
                         <div className="rounded-full mx-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-7 h-7">
                                   <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                   <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                              </svg>
                         </div>
                    </div>
               </div>

               <div onClick={handleCopyLink} className={`w-full flex place-content-center border-l items-center`}>
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

               <div onClick={genratePDF} className={`w-full flex place-content-center border-l items-center ${display === 0 ? 'block' : 'hidden'}`}>
                    <TextEditiorOptions displayValue={display} svg={optionSVG.download} option={"Download"} />
               </div>

               <div onClick={() => setDisplay(4)} className={`w-full flex place-content-center border-l items-center ${display === 4 ? 'border-b-2 bg-gray-100 border-green-700' : ""}`}>
                    <TextEditiorOptions displayValue={display} svg={optionSVG.project} option={"Project Storage"} />
               </div>

               <div onClick={() => setDisplay(2)} className={`w-full flex place-content-center border-l items-center ${display === 2 ? 'border-b-2 bg-gray-100 border-green-700' : ""}`}>
                    <TextEditiorOptions displayValue={display} svg={optionSVG.aiText} option={"Text-To-Text Support"} />
               </div>

               <div onClick={() => setDisplay(3)} className={`w-full flex place-content-center border-l items-center ${display === 3 ? 'border-b-2 bg-gray-100 border-green-700' : ""}`}>
                    <TextEditiorOptions displayValue={display} svg={optionSVG.contentSupport} option={"Content Support"} />
               </div>

               <div onClick={() => display === 1 ? setDisplay(0) : setDisplay(1)} className={`w-full flex place-content-center border-l items-center ${display === 1 ? 'border-b-2 bg-gray-100 border-green-700' : ""}`}>
                    <TextEditiorOptions displayValue={display} svg={optionSVG.message} option={"Text-To-Image Support"} />
               </div>
          </div>

     </nav>
     )
}
export default TextEditorDashboard