import React from 'react'

const Test = () => {
     return (
          <div className='p-3 border-4 border-[#f2f2f2] w-3/5 '>
               {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className='mx-auto py-2 px-4 bg-[#fafaf9] border border-gray-500 rounded-lg flex place-content-center items-center justify-between mb-2'>
                         <div className='flex place-content-center items-center gap-x-5'>
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/400px-PDF_file_icon.svg.png" alt="" className='w-8 h-10' />
                              <div className='text-black font-semibold text-sm'>Lorem ipsum dolor sit amet.</div>
                         </div>

                         <div className='text-gray-600 font-semibold'>8.9 mb</div>

                         <div className='px-4 py-2 w-fit h-fit'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                         </div>

                         <div className='px-4 py-2 w-fit h-fit font-semibold flex place-content-center items-center gap-x-5'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                         </div>

                         <div className='px-4 py-2 w-fit h-fit font-semibold flex place-content-center items-center gap-x-5'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                              </svg>
                         </div>
                    </div>
               ))}
          </div>
     );
}

export default Test;
