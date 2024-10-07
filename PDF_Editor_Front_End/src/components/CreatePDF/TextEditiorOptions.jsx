import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

const TextEditiorOptions = ({ svg }) => {

     return (
          <div className={`w-32 mx-auto flex place-content-center items-center cursor-pointer`}>
               {svg}
          </div>
     )
}
export default TextEditiorOptions