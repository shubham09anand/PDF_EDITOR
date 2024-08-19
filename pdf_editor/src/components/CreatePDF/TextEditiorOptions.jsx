import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

const TextEditiorOptions = ({ optionDisplay, editorDisplay, displayValue, svg, option, description }) => {

     return (
          <>
               <li onClick={() => optionDisplay(displayValue)} className={`hover:animate-pulse p-3 transition duration-300 ease-in-out h-fit hover:bg-neutral-200 cursor-pointer rounded-xl relative mx-auto ${editorDisplay ? "w-fit" : "w-full"}`}>
                    <div>
                         <div className="flex items-start space-x-4">
                              <div className="shrink-0">
                                   <div className={`${editorDisplay ? "pr-0" : "r-3"}`}>
                                        <div
                                             className="bg-gray-300 p-2 rounded-full">
                                             {svg}
                                        </div>
                                   </div>
                              </div>
                              <div className={`hidden ${editorDisplay ? "grow hidden" : ""}`}>
                                   <p className="-mb-.5 font-bold text-neutral-800 dark:text-white">
                                        {option}
                                   </p>
                                   <p className="mb-0 text-neutral-500 dark:text-neutral-200 text-xs">
                                        {description}
                                   </p>
                              </div>
                         </div>
                    </div>
               </li>
          </>
     )
}
export default TextEditiorOptions