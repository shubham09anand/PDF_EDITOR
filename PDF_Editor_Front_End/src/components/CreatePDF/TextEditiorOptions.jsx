import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

const TextEditiorOptions = ({ svg }) => {

     return (
          <div className='w-32 animate-ping'>
               <div className={`w-fit rounded-full p-2 bg-gradient-to-tr from-[#7eafff] via-[#3e84ff] to-[#d085ff] mx-auto flex place-content-center items-center cursor-pointer`}>
                    {svg}
               </div>
          </div>
     )
}
export default TextEditiorOptions