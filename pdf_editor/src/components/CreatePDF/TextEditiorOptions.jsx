import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

const TextEditiorOptions = ({ svg }) => {

     return (
          <>
               <div className={`p-3 w-full mx-auto flex place-content-center items-center active:bg-neutral-200 cursor-pointer`}>
                    {svg}
               </div>
          </>
     )
}
export default TextEditiorOptions