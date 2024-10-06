import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const Messaging = () => {

     const location = useLocation();
     const docId = location.pathname.split("/")[3];
     const [name, setName] = useState("");
     const [startConvo, setStartConvo] = useState(false);
     const [socket, setSocket] = useState(null);
     const [message, setMessage] = useState("");
     const [warning, setWarning] = useState(false);
     const [mettingMess, setMettingMess] = useState([])

     useEffect(() => {
          const s = io(process.env.REACT_APP_API_URL_SOCKET_NETWORK);
          setSocket(s);

          return () => {
               s.disconnect();
          };
     }, []);

     const startChatting = () => {
          if (name === "") {
               setWarning(true);
               return
          }
          if (docId && socket) {
               socket.emit("join-room", docId);
          }
          setStartConvo(true)
     }

     const sendMessage = () => {
          if (socket === null || docId === null) return;
          const currentTime = new Date().toLocaleTimeString();
          socket.emit('send-message', { name: name, docId: docId, message: message, currentTime: currentTime })
     }

     useEffect(() => {
          if (!socket || !docId) return;

          socket.on('forward-message', (data) => {
               console.log(data)
               setMettingMess(prev => [...prev, data]);
          });

          return () => socket.off('forward-message');
     }, [socket, docId]);

     return (
          <div className='md:w-1/2 lg:w-1/3 h-[639px] mt-16 border-l-4 border-black absolute right-0 top-[31px] overflow-y-hidden z-20'>
               <div className="text-sm font-medium space-y-3 overflow-y-scroll pr-4 pl-2 py-2 relative">
                    <div className="px-2 w-full text-2xl"> Message</div>

                    {!startConvo && (
                         <div className='flex-col place-content-center items-center'>
                              <div className='bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] w-fit h-fit mx-auto rounded-full p-2'>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="white" className="size-16">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                   </svg>
                              </div>
                              <div className='text-base font-thin pt-2 text-center'>Start Chatting with your team</div>
                              <div className='flex flex-col'>
                                   <input placeholder='Name' type="text" name="userName" id="username" value={name} onChange={(e) => setName(e.target.value)} className='mx-auto w-full shadow-inner resize-none bg-secondery rounded-md p-2 outline-none border-2 bg-slate-50 focus:bg-gray-100' />
                                   <div className={`text-red-600 text-xs font-semibold italic ${warning ? 'block' : 'hidden'}`}>Name is required *</div>
                                   <button onClick={startChatting} className='mx-auto bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] w-full h-fit px-4 py-1 mt-3 rounded-sm text-lg font-light text-white cursor-pointer select-none'>Join</button>
                              </div>
                         </div>
                    )}

                    {startConvo && (
                         <>
                              <div className='h-[500px] overflow-y-scroll example space-y-3'>
                                   {mettingMess && mettingMess.length >= 1 && mettingMess.map((mess, index) => (
                                        <div key={index} className='mb-2'>
                                             <div className='flex space-x-5'>
                                                  <div className='font-semibold text-sm italic pl-2 mb-1'>{mess?.name}</div>
                                                  <div className='text-xs pt-1 font-thin italic'>{mess?.currentTime}</div>
                                             </div>
                                             <div className="px-4 py-2 rounded-2xl w-fit max-w-44 lg:max-w-full bg-blue-600 text-white"> {mess?.message} </div>
                                        </div>
                                   ))}

                                   {mettingMess && mettingMess.length === 0 && (
                                        <div className='text-center text-gray-400 font-medium'>No messsage yet</div>
                                   )}
                              </div>

                              <div className="flex left-0 w-full h-fit py-2 place-content-center items-center space-x-5 px-1 rounded-lg">
                                   <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message" rows="2" className="w-11/12 shadow-inner resize-none bg-secondery rounded-full p-2 outline-none bg-slate-100"></textarea>
                                   <button className='outline-none bg-purple-500 rounded-full p-2'>
                                        <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-8 cursor-pointer rounded-full">
                                             <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                        </svg>
                                   </button>
                              </div>
                         </>
                    )}
               </div>
          </div>
     )
}

export default Messaging