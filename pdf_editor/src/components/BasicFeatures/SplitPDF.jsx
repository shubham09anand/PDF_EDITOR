import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SplitPDF = () => {

     const [files, setFiles] = useState(null);
     const [loading, setLoading] = useState(false);
     const [blobs, setBlobs] = useState([]);
     const [totalSplit, setTotalSplit] = useState(1);
     const [maxPage, setMaxPage] = useState("");
     const [splitRanges, setSplitRanges] = useState([]);
     const [warning, setWarning] = useState(false);

     const handleFileChange = (e) => {
          const fileList = Array.from(e.target.files);
          for (const file of fileList) {
               if (file.type !== 'application/pdf') {
                    toast.error("Only PDF are allowed")
                    return;
               }
          }
          setFiles(fileList);
          setWarning(false);
     };

     useEffect(() => {
          if (files !== null) {
               getTotalPage();
          }
     }, [files]);

     const getTotalPage = async () => {
          const fileBuffer = await files[0].arrayBuffer();
          const scanPdf = await PDFDocument.load(fileBuffer);
          setMaxPage(scanPdf.getPageCount());
     }

     useEffect(() => {
          if (files !== null) {
               setMaxPage();
          }
     }, [files]);

     useEffect(() => {
          if (totalSplit > 10) {
               setTotalSplit(10);
          } else if (totalSplit <= 0) {
               setTotalSplit(1);
          }
     }, [totalSplit]);

     const mergePDF = async () => {
          if (files === null) {
               alert("Please select at least one PDF file.");
               return;
          }

          for (const range of splitRanges) {
               const splitStart = range.start;
               const splitEnd = range.end;

               if (splitStart < 1 || splitStart > maxPage || splitEnd < splitStart || splitEnd > maxPage || splitEnd === null || splitStart === null || isNaN(splitStart) || isNaN(splitEnd)) {
                    setWarning(true)
                    setLoading(false);
                    return;
               }
          }

          setLoading(true);
          const blobsArray = [];

          try {
               const fileBuffer = await files[0].arrayBuffer();
               const scanPdf = await PDFDocument.load(fileBuffer);

               for (const item of splitRanges) {
                    const pdfDoc = await PDFDocument.create();

                    for (let index = item.start; index < item.end + 1; index++) {
                         const copiedPages = await pdfDoc.copyPages(scanPdf, [index]);
                         copiedPages.forEach((page) => {
                              pdfDoc.addPage(page);
                         });
                    }

                    const splitedPdf = await pdfDoc.save();
                    const blobUrl = URL.createObjectURL(new Blob([splitedPdf]));
                    blobsArray.push(blobUrl);
               }

               setBlobs(blobsArray);
          } catch (error) {
               console.error('Error splitting PDFs:', error);
               alert('Error splitting PDFs. Please try again.');
          } finally {
               setLoading(false);
          }
     };

     const handleSplitRangeChange = (index, start, end) => {
          const updatedRanges = [...splitRanges];
          updatedRanges[index] = { start, end };
          setSplitRanges(updatedRanges);
     };

     useEffect(() => {
          if (totalSplit < splitRanges.length) {
               setSplitRanges(splitRanges.slice(0, totalSplit));
          } else if (totalSplit > splitRanges.length) {
               const newRanges = [...splitRanges];
               for (let i = splitRanges.length; i < totalSplit; i++) {
                    newRanges.push({ start: '', end: '' });
               }
               setSplitRanges(newRanges);
          }
     }, [totalSplit]);



     return (
          <div className='w-full'>
               <ToastContainer/>
               <div className='text-center space-y-3'>
                    <div className='text-5xl font-bold'>Split PDF files</div>
                    <div className='text-2xl font-semibold'>Split PDFs Into Multiple Fragments</div>
               </div>

               {files === null && (
                    <div className="mt-10 mx-auto flex items-center justify-center w-1/3 bg-[#e5322d] rounded-lg cursor-pointer">
                         <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth=".5" stroke="black" className="w-12 h-12 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                   </svg>
                                   <p className="mb-2 text-4xl text-white"><span className="font-semibold">Click to upload Pdf</span></p>
                                   <p className="text-base text-white">Uplaod Your Pdf</p>
                              </div>
                              <input id="dropzone-file" accept=".pdf" type="file" className="hidden" onChange={handleFileChange} />
                         </label>
                    </div>
               )}


               {files !== null && blobs.length === 0 && (
                    <div>
                         <div className='select-none gap-y-10 space-y-3 w-3/4 mx-auto flex-wrap p-5 mt-10 bg-[#f5f5fa] rounded-xl border'>


                              <div className="cursor-move mx-auto bg-white border-2 shadow-inner animate-pulse border-gray-200 rounded-lg overflow-hidden w-80 h-12 flex place-content-center items-center">
                                   <div className="flex space-x-4 h-full w-full">
                                        <div className='bg-white border-r-2 border-black px-3 h-full my-auto flex place-content-center items-center'>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="#eaeaea" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-8 h-8">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                             </svg>
                                        </div>
                                        <div className='flex place-content-center items-center pr-4'>
                                             <div className="text-sm font-semibold text-center">{files[0].name}</div>
                                        </div>
                                   </div>
                              </div>
                              <div className='text-sm text-center text-black font-semibold'>Toatal Number of page in PDF {maxPage}</div>

                              <div>
                                   <div className="max-w-sm mx-auto">
                                        <label htmlFor="number-input" className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Split PDF into</label>
                                        <input onChange={(e) => setTotalSplit(e.target.value)} value={totalSplit} type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none font-semibold block w-full p-2.5" placeholder="2" required />

                                        {totalSplit === 10 && (
                                             <div className='flex space-x-5 mt-1'>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth=".9" stroke="#e5322d" className="w-4 h-4">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                                  </svg>
                                                  <div className='text-red-600 font-extralight text-xs skew-x-12 italic'>maxiamum 10 splits are allowed</div>
                                             </div>

                                        )}
                                   </div>

                                   {Array.from({ length: totalSplit }, (_, index) => (
                                        <div key={index} className="flex justify-between place-content-center items-center mt-5">
                                             <div className='relative'>
                                                  <label htmlFor="number-input" className="block text-sm text-gray-900 dark:text-white font-semibold mb-2">Splitted Pdf</label>
                                                  <div className="my-auto h-fit mt-5 py-2 relative cursor-move mx-auto bg-white border-2 shadow-inner animate-pulse border-gray-200 rounded-lg w-80 flex flex-col place-content-center items-center">
                                                       <div className='rounded-full text-center flex place-content-center items-center w-5 h-5 bg-red-700 text-white absolute z-10 -top-2 -left-2 text-sm animate-bounce animateulse'>{index + 1}</div>
                                                       <div className="flex space-x-4 h-full w-full">
                                                            <div className="bg-white border-r-2 border-black px-3 h-full my-auto flex place-content-center items-center">
                                                                 <svg xmlns="http://www.w3.org/2000/svg" fill="#eaeaea" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-8 h-8">
                                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                                 </svg>
                                                            </div>
                                                            <div className="flex place-content-center items-center pr-4">
                                                                 <div className="text-sm font-semibold text-center">{files[0].name.split('.').slice(0, -1).join('.')}{"-split-"}{index + 1}{".pdf"}</div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="max-w-sm mx-auto">
                                                  <label className="block text-sm text-gray-900 dark:text-white font-semibold mb-2">Split From <span className='text-xs italic text-gray-800'>(enter page number)</span></label>
                                                  <input
                                                       type="number"
                                                       value={splitRanges[index]?.start || ''}
                                                       onChange={(e) => handleSplitRangeChange(index, e.target.value, splitRanges[index]?.end || '')}
                                                       aria-describedby="helper-text-explanation"
                                                       className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none font-semibold block w-full p-2.5"
                                                       placeholder="2"
                                                       required
                                                  />
                                             </div>
                                             <div className="max-w-sm mx-auto">
                                                  <label className="block text-sm text-gray-900 dark:text-white font-semibold mb-2">Split Upto <span className='text-xs italic text-gray-800'>(enter page number)</span></label>
                                                  <input
                                                       type="number"
                                                       value={splitRanges[index]?.end || ''}
                                                       onChange={(e) => handleSplitRangeChange(index, splitRanges[index]?.start || '', e.target.value)}
                                                       aria-describedby="helper-text-explanation"
                                                       className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none font-semibold block w-full p-2.5"
                                                       placeholder="2"
                                                       required
                                                  />
                                             </div>
                                        </div>
                                   ))}
                              </div>
                              {warning && (
                                   <div className='mx-auto space-y-1 w-full h-fit my-2'>
                                        <div className='flex flex-col mx-auto place-content-center items-center'>
                                             {splitRanges.splice(0, 1).map((range, index) => (
                                                  <React.Fragment key={index}>
                                                       {(isNaN(range.start) || isNaN(range.end) || range.start === null || range.end === null || range.start === "" || range.end === "" || range.start < 1 || range.start > maxPage || range.end < range.start || range.end > maxPage) && (
                                                            <>
                                                                 <div className='text-sm text-red-700 font-light mx-auto w-fit mb-5'>Splitting of your PDF failed. Possible reasons:</div>
                                                                 <div className='text-sm text-red-700 font-light'><span className='text-sm text-red-700 italic font-bold'>Split upto</span> or <span className='text-sm text-red-700 italic font-bold'>Split From</span> values could be more than the total number of pages</div>
                                                                 <div className='text-sm text-red-700 font-light'><span className='text-sm text-red-700 italic font-bold'>Split upto</span> or <span className='text-sm text-red-700 italic font-bold'>Split From</span> values could be less than or equal to 0 or not a number</div>
                                                                 <div className='text-sm text-red-700 font-light'><span className='text-sm text-red-700 italic font-bold'>Split From</span> value could be more than <span className='text-sm text-red-700 italic font-bold'>Split upto</span> value</div>
                                                                 <div className='text-sm text-red-700 font-light uppercase text-center pt-5'>Make sure that any of the above conditions are not true and try again</div>
                                                            </>
                                                       )}
                                                  </React.Fragment>
                                             ))}
                                        </div>
                                   </div>
                              )}

                         </div>
                         <div className='bg-[#e5322d] cursor-pointer w-fit mt-5 text-white font-semibold text-2xl px-6 py-2 rounded-md active:opacity-70 mx-auto' onClick={mergePDF} disabled={loading}>{loading ? 'Spliting...' : 'Split PDFs'}</div>
                    </div>
               )};

               <div>
                    {blobs.length > 0 && (
                         <div className='flex space-x-5 mx-auto flex-wrap w-fit'>
                              {blobs.map((url, index) => (
                                   <div key={index} className='mt-10 w-fit items-center text-center place-content-center '>
                                        <a key={index} href={url} download={`Splitted-${index + 1}.pdf`} className='active:opacity-50 flex place-content-center items-center bg-[#e5322d] w-fit mt-5 text-white font-semibold text-2xl px-6 py-2 rounded-md mx-auto'>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth=".5" stroke="black" className="w-12 h-12 text-gray-600">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                             </svg>
                                             <div>{`Splitted-${index + 1}.pdf`}</div>
                                        </a>
                                   </div>
                              ))}
                         </div>
                    )}
               </div>

          </div>
     )
}

export default SplitPDF