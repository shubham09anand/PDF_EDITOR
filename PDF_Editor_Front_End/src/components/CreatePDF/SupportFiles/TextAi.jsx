import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingPlaneAnimation from '../../Animation/LoadingPlaneAnimation';
import API from '../../../Api/Api';

const TextAi = () => {

     const [userInput, setUserInput] = useState("")
     const [aiResponse, setAiResponse] = useState(null);
     const [button, setButton] = useState(false);
     const [state, setState] = useState(false);
     const [copy, setCopy] = useState(false);

     const aiHelp = () => {
          setButton(true);
          setState(true)
          API.post("/aiTextSupport", { queery: userInput }).then((res) => {
               setAiResponse(res.data.generatedText);
          }).catch(() => {
               toast.error("Something Went Wrong.")
          }).finally(() => {
               setState(false)
               setButton(false)
          })
     }

     const handleCopyText = async () => {
          if (aiResponse === null) {
               return
          }
          try {
               await navigator.clipboard.writeText(aiResponse);
               setCopy(true);
          } catch (err) {
               // Fallback approach using a hidden input field
               const fallbackInput = document.createElement('input');
               fallbackInput.value = aiResponse;
               document.body.appendChild(fallbackInput);
               fallbackInput.select();
               document.execCommand('copy');
               document.body.removeChild(fallbackInput);
               setCopy(true);
          }finally{
               setTimeout(() => {
                    setCopy(false);
               }, 2000);
          }
     };

     return (
          <div className='md:p-2 backdrop-blur-xl w-full'>
               <ToastContainer />
               <div className='w-full flex place-content-center items-center space-x-3 mt-3'>
                    <div className="heading text-center font-bold text-xl md:text-3xl text-gray-800">AI Text-to-Text Support</div>
               </div>
               <div className='heading text-center sm:w-3/5 md:w-3/5 lg:w-1/2 mx-auto text-base font-thin text-gray-800 mt-4 font-mono'>Need help? Our AI Support feature is here for you! Simply type in your question or topic, and AI will generate helpful responses.</div>
               <div className="p-2 editor mx-auto rounded-md mt-4 w-full md:w-4/5 lg:w-3/5 flex flex-col text-gray-800 border border-gray-300 md:p-4 lg:shadow-lg">
                    <div className="flex w-full h-fit">
                         <input onChange={(e) => setUserInput(e.target.value)} value={userInput} className="title w-full bg-gray-100 border border-gray-300 p-2 mb-4 outline-none border-r-0" spellCheck="false" name="aiQurey" placeholder="Describe everything about requirement here" type="text" />
                         <button onClick={aiHelp} disabled={button} className={`border border-indigo-500 px-4 font-semibold h-full p-2 rounded-l-none border-l-0 mb-4 text-gray-200 bg-indigo-500 ${button ? "cursor-wait" : "cursor-pointer"}`} >Ask</button>
                    </div>
                    <div className='relative'>
                         {
                              aiResponse !== null && <div onClick={handleCopyText} className='backdrop-blur z-10 border px-2 pb-1 rounded-md absolute right-2 top-2 text-gray-600 w-fit h-fit cursor-pointer select-none'>{copy ? 'copied' : 'copy'}</div>}
                         {
                              aiResponse !== null &&
                              (
                                   <div className="description h-fit text-gray-700 min-h-60 border-s-4 border-green-500 md:pl-8 pl-2 pr-3 max-h-96 overflow-y-scroll example">
                                        {aiResponse.split('\n').map((line, index) => (
                                             <React.Fragment key={index}>
                                                  {line.split(/(\*\*.*?\*\*)/).map((part, partIndex) => (
                                                       <React.Fragment key={partIndex}>
                                                            {part.startsWith('**') && part.endsWith('**') ? (
                                                                 <div className='font-semibold text-gray-900'>{part.slice(2, -2)}</div>
                                                            ) : part.startsWith('*') && !part.endsWith('*') ? (
                                                                 <li className='ml-10'>{part.slice(1)}</li>
                                                            ) : (
                                                                 part
                                                            )}
                                                       </React.Fragment>
                                                  ))}
                                                  <div className='h-1'></div>
                                             </React.Fragment>
                                        ))}
                                   </div>
                              )
                         }
                         {
                              state &&
                              (
                                   <div className='absolute backdrop-blur-[2px] w-full h-full top-0'>
                                        <div className=' mx-auto z-20 flex flex-col place-content-center items-center'>
                                             <LoadingPlaneAnimation />
                                        </div>
                                   </div>
                              )
                         }
                         {
                              aiResponse === null &&
                              (
                                   <div className='bg-gray-100 text-center text-gray-500 h-60 flex place-content-center items-center'>
                                        <div>AI Text Message Will Appear Here</div>
                                   </div>
                              )
                         }
                    </div>
               </div>
          </div>
     )
}

export default TextAi