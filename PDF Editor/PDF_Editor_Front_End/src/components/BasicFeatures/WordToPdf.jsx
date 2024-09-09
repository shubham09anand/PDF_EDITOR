import React from 'react'

const WordToPdf = () => {
     return (
          <div className='w-full'>
            <div className='text-center space-y-3'>
              <div className='text-5xl font-bold'>Convert WORD to PDF</div>
              <div className='text-2xl font-semibold'>Make DOC and DOCX files easy to read by converting them to PDF.</div>
            </div>
      
            
              <div className="mt-10 mx-auto flex items-center justify-center w-1/3 bg-[#e5322d] rounded-lg cursor-pointer">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth=".5" stroke="black" className="w-12 h-12 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>
                    <p className="mb-2 text-4xl text-white"><span className="font-semibold">Click to upload Pdf</span></p>
                    <p className="text-base text-white">Uplaod Your Pdfs</p>
                  </div>
                  <input accept=".pdf" id="dropzone-file" type="file" className="hidden"  />
                </label>
              </div>
          
      
           
              <div>
                <div className='gapy-y-10 space-y-3 w-1/2 mx-auto flex-wrap p-5 mt-10 bg-[#f5f5fa] rounded-xl border'>
                  
                
                    <div className="cursor-move mx-auto bg-white border-2 shadow-inner animate-pulse border-gray-200 rounded-lg overflow-hidden w-80 h-12 flex place-content-center items-center">
                      <div className="flex space-x-4 h-full w-full">
                        <div className='bg-white border-r-2 border-black px-3 h-full my-auto flex place-content-center items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="#eaeaea" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                          </svg>
                        </div>
                        <div className='flex place-content-center items-center pr-4'>
                          <div className="text-sm font-semibold text-center"></div>
                        </div>
                      </div>
                    </div>
                </div>
                <div className='bg-[#e5322d] cursor-pointer w-fit mt-5 text-white font-semibold text-2xl px-6 py-2 rounded-md active:opacity-70 mx-auto' >{true ? 'Merging...' : 'Merge PDFs'}</div>
              </div>
      
      
            <div>
             
                <div className='mt-20 mx-auto w-fit items-center text-center place-content-center '>
                  <a href="/" download={`pdf`} className='flex place-content-center items-center bg-[#2f74ff] w-fit mt-5 text-white font-semibold text-2xl px-6 py-2 rounded-md active:opacity-70 mx-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth=".5" stroke="black" className="w-12 h-12 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>
                    <div>Download Word File</div>
                  </a>
                  <div className='mx-auto mt-3 w-fit font-semibold'>Name of Word File : <input type="text" className='rounded-lg py-1 mt-2 outline-none text-center shadow-[1px_1px_gray] border' /></div>
                </div>
              
            </div>
      
          </div>
        );
}

export default WordToPdf