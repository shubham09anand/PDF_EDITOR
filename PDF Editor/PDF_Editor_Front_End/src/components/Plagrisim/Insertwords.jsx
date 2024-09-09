import React, { useState } from 'react'

const Insertwords = () => {

     const [userInput, setuserInput] = useState("");
     const [maniuplatedText, setManiuplatedText] = useState("");

     const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', '{', ']', '}', '|', ';', ':', '"', '<', '.', '>', '/', '?' , " "];


     const handleInsertion = () => {
          const words = userInput.split(" ");
          let text = [];
          words.forEach((item, index) => {
              text.push(<span key={index}>{item}</span>);
      
              // Check if it's the 5th word and not the last word
              if ((index + 1) % 5 === 0 && index !== words.length - 1) {
                  text.push(<span className='w-[20px]'></span>);
              } else if (index !== words.length - 1) {
                  text.push(<span key={`special-${index}`} className='text-xs text-white'>{specialCharacters[Math.floor(Math.random() * specialCharacters.length)]}</span>);
              }
          });
      
          setManiuplatedText(text);
      }
      


     return (
          <div className='w-1/2'>
               <form>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                         <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                              <label htmlFor="comment" className="sr-only">Your comment</label>
                              <textarea onChange={(e) => setuserInput(e.target.value)} value={userInput} id="comment" rows="10" className="w-full p-2 text-sm text-gray-900 bg-white outline-none rounded-lg resize-none border-2" placeholder="Write a comment..." required></textarea>
                         </div>
                         <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                              <button onClick={handleInsertion} type="button" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                   Insert
                              </button>
                         </div>
                    </div>
               </form>

               <div className='text-justify'>{maniuplatedText}</div>
          </div>
     )
}

export default Insertwords