import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

const TextEditiorOptions = ({ optionDisplay, editorDisplay, displayValue, svg, option, description }) => {

     return (
          <>
               <li onClick={() => optionDisplay(displayValue)} className={`hover:animate-pulse p-3 transition duration-300 ease-in-out h-fit hover:bg-neutral-200 cursor-pointer rounded-xl relative ${editorDisplay ? "w-fit" : "w-full"}`}>
                    <div>
                         <div className="flex items-start space-x-4">
                              <div className="shrink-0">
                                   <div>
                                        <div
                                             className="bg-gray-300 p-2 rounded-full">
                                             {svg}
                                        </div>
                                   </div>
                              </div>
                              <div className={`w-52 ${editorDisplay ? "hidden" : "block"}`}>
                                   <p className="-mb-.5 font-bold">
                                        {option}
                                   </p>
                                   <p className="mb-0 text-xs">
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