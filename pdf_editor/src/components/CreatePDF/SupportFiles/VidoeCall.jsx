import React, { useState } from 'react';
import Messaging from './Messaging';

import avatar1 from '../../../Assets/images/avatars/avatar-1.jpg';
import avatar2 from '../../../Assets/images/avatars/avatar-2.jpg';
import avatar3 from '../../../Assets/images/avatars/avatar-3.jpg';
import avatar4 from '../../../Assets/images/avatars/avatar-4.jpg';
import avatar5 from '../../../Assets/images/avatars/avatar-5.jpg';

const VidoeCall = () => {

     const [displayMessage, setDisplayMessage] = useState(false);
     const [joinedPeople, setJoinedPeople] = useState(true);

     const setDisplay = () => {
          if (displayMessage === true) {
               setDisplayMessage(false)
          }
          else {
               setDisplayMessage(true)
          }
     }

     return (
          <div className='flex w-screen backdrop-blur-md h-full'>
               <div className={`space-y-1 rounded-lg p-2 pt-0 relative transition-all duration-700 ${displayMessage ? 'w-3/4' : 'w-full'}`}>
                    <div className='w-2/3 absolute bg-green-700'></div>
                    <div className='flex place-content-center items-center h-fit bg-gray-200 rounded-lg p-2'>
                         <div className="px-4 w-fit text-xl font-semibold">Joined People</div>
                         <svg onClick={() => joinedPeople ? setJoinedPeople(false) : setJoinedPeople(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 bg-gray-400 rounded-md hover:bg-gray-300 cursor-pointer p-1">
                              <path fillRule="evenodd" d="M3.22 3.22a.75.75 0 0 1 1.06 0l3.97 3.97V4.5a.75.75 0 0 1 1.5 0V9a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1 0-1.5h2.69L3.22 4.28a.75.75 0 0 1 0-1.06Zm17.56 0a.75.75 0 0 1 0 1.06l-3.97 3.97h2.69a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0ZM3.75 15a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-2.69l-3.97 3.97a.75.75 0 0 1-1.06-1.06l3.97-3.97H4.5a.75.75 0 0 1-.75-.75Zm10.5 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-2.69l3.97 3.97a.75.75 0 1 1-1.06 1.06l-3.97-3.97v2.69a.75.75 0 0 1-1.5 0V15Z" clipRule="evenodd" />
                         </svg>
                    </div>

                    <div className={`flex gap-x-5 overflow-x-scroll transition-all duration-700 ${joinedPeople ? 'h-36' : 'h-0'}`}>
                         <div style={{ backgroundImage: `url(${avatar1})`, backgroundSize: 'cover' }} className='w-96 h-36 rounded-xl relative'>
                              <img src={avatar1} alt="" className='w-full h-36 object-contain rounded-xl absolute' />
                              <div className='font-semibold backdrop-blur-sm text-gray-700 text-sm z-20 w-fit h-fit p-.5 px-2 rounded-sm absolute bottom-3 right-2'>Lorem, ipsum.</div>
                         </div>
                         <div style={{ backgroundImage: `url(${avatar2})`, backgroundSize: 'cover' }} className='w-96 h-36 rounded-xl relative'>
                              <img src={avatar2} alt="" className='w-full h-36 object-contain rounded-xl absolute' />
                              <div className='font-semibold backdrop-blur-sm text-gray-700 text-sm z-20 w-fit h-fit p-.5 px-2 rounded-sm absolute bottom-3 right-2'>Lorem, ipsum.</div>
                         </div>
                         <div style={{ backgroundImage: `url(${avatar3})`, backgroundSize: 'cover' }} className='w-96 h-36 rounded-xl relative'>
                              <img src={avatar3} alt="" className='w-full h-36 object-contain rounded-xl absolute' />
                              <div className='font-semibold backdrop-blur-sm text-gray-700 text-sm z-20 w-fit h-fit p-.5 px-2 rounded-sm absolute bottom-3 right-2'>Lorem, ipsum.</div>
                         </div>
                         <div style={{ backgroundImage: `url(${avatar4})`, backgroundSize: 'cover' }} className='w-96 h-36 rounded-xl relative'>
                              <img src={avatar4} alt="" className='w-full h-36 object-contain rounded-xl absolute' />
                              <div className='font-semibold backdrop-blur-sm text-gray-700 text-sm z-20 w-fit h-fit p-.5 px-2 rounded-sm absolute bottom-3 right-2'>Lorem, ipsum.</div>
                         </div>
                         <div style={{ backgroundImage: `url(${avatar5})`, backgroundSize: 'cover' }} className='w-96 h-36 rounded-xl relative'>
                              <img src={avatar5} alt="" className='w-full h-36 object-contain rounded-xl absolute' />
                              <div className='font-semibold backdrop-blur-sm text-gray-700 text-sm z-20 w-fit h-fit p-.5 px-2 rounded-sm absolute bottom-3 right-2'>Lorem, ipsum.</div>
                         </div>
                    </div>


                    {/* <img src={avatar6} style={{backgroundImage: `url(${avatar6})`}} alt="" className='w-full h-[450px] object-cover rounded-xl absolute z-20' /> */}
                    <div className={`w-full bg-gray-500 rounded-xl transition-all duration-1000 ${joinedPeople ? "h-[calc(60vh)]" : "h-[calc(68vh)]"}`}></div>

                    <div className='w-full h-20 rounded-xl bg-slate-400'>
                         <div className='w-full mx-auto h-full backdrop-blur-3xl flex place-content-center items-center lg:px-20 rounded-lg justify-between'>
                              <div className='mx-3'>
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="lg:w-14 lg:h-14 active:opacity-50 p-2 rounded-full glassMorphic cursor-pointer shadow-xl">
                                        <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                                   </svg>
                              </div>
                              <div className='mx-3'>
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="lg:w-14 lg:h-14 active:opacity-50 p-2 rounded-full glassMorphic cursor-pointer shadow-xl">
                                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                                        <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                                   </svg>
                              </div>
                              <div className='mx-3'>
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="lg:w-14 lg:h-14 active:opacity-50 p-2 rounded-full glassMorphic cursor-pointer shadow-xl">
                                        <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                                        <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                                   </svg>
                              </div>
                              <div className='mx-3'>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="lg:w-14 lg:h-14 p-2 rounded-full cursor-pointer bg-[#ef4346]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
                                   </svg>
                              </div>
                              <div className='mx-3' onClick={setDisplay}>
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="lg:w-14 lg:h-14 active:opacity-50 p-2 rounded-full glassMorphic cursor-pointer shadow-xl">
                                        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                                   </svg>
                              </div>
                              <div className='mx-3'>
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="lg:w-14 lg:h-14 active:opacity-50 p-2 rounded-full glassMorphic cursor-pointer shadow-xl">
                                        <path fillRule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z" clipRule="evenodd" />
                                   </svg>
                              </div>
                              <div className='mx-3'>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="lg:w-14 lg:h-14 active:opacity-50 p-2 rounded-full glassMorphic cursor-pointer shadow-xl">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                   </svg>
                              </div>
                         </div>
                    </div>
               </div>
               {displayMessage && <Messaging />}
          </div>
     )
}

export default VidoeCall