import React from 'react';
import { Link } from 'react-router-dom';

import editFiles from "../Assets/images/pdfIcons/editFiles.png";
import compressPDF from "../Assets/images/pdfIcons/compressPDF.png";
import mergFiles from "../Assets/images/pdfIcons/mergFiles.png";
import splitFiles from "../Assets/images/pdfIcons/splitFiles.avif";
import uplaodFiles from "../Assets/images/pdfIcons/uplaodFiles.png";
import oraganisePages from "../Assets/images/pdfIcons/oraganisePages.png";
import image from "../Assets/images/pdfIcons/image.png";
import pdfOCR from "../Assets/images/pdfIcons/pdfOCR.png";
import pageNumber from "../Assets/images/pdfIcons/addPageNumber.avif";
import pdfToword from "../Assets/images/pdfIcons/pdfToword.avif";
import addWatermark from "../Assets/images/pdfIcons/addWatermark.avif";


const Home = () => {
     return (
          <section className="pt-5 text-gray-600 body-font w-full xl:p-2 xl:absolute right-0 h-8 -z-10 mt-0">
               <div className="container py-2 mx-auto w-fit">
                    <div className="select-none pb-10 flex flex-wrap place-content-center -m-4 gap-y-3 sm:gap-5 items-center mx-auto w-full">
                         <div className="place-content-center items-center flex hidden flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={editFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Edit PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Edit PDF</h2>
                              </div>
                         </div>
                         <Link style={{ textDecoration: "none" }} to="/word_to_pdf" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={pdfToword} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Convert Format</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Convert Format</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/merge_pdf" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={mergFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Merge PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Merge PDF</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/split_pdf" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={splitFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 no-underline">Split PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Split PDF</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to={`/create_pdf`} className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={uplaodFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Create PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Create PDF</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/shuffle_pdf" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={oraganisePages} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Reorganise Page</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Reorganise Page</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/delete_pages" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-">

                                   <div className='w-[70px] h-[88px] scale-90 bg-gradient-to-tr relative from-[#3d83ff] via-[#846be6] to-[#7656f5] rounded-lg flex place-content-center items-center '>
                                        <div className='w-[70px] h-[88px] space-y-2 pl-2 relative'>
                                             <div className='w-[70px] h-[88px] rounded-lg absolute backdrop-blur-sm'></div>
                                             <div className='absolute w-[70px] h-[88px]'>
                                                  <div className='w-4/5 h-1.5 bg-gradient-to-tr my-1 from-white to-[#7656f5] rounded-3xl'></div>
                                                  <div className='flex space-x-0.5'>
                                                       <div className='w-1/5 h-1.5 bg-gradient-to-tr my-1 from-white to-[#7656f5] rounded-3xl'></div>
                                                       <div className='w-1/5 h-1.5 bg-gradient-to-tr my-1 from-white to-[#7656f5] rounded-3xl'></div>
                                                       <div className='w-1/5 h-1.5 bg-gradient-to-tr my-1 from-white to-[#7656f5] rounded-3xl'></div>
                                                  </div>
                                                  <div className='flex space-x-0.5'>
                                                       <div className='w-1/5 h-1.5 bg-gradient-to-tr my-1 from-white to-[#7656f5] rounded-3xl'></div>
                                                       <div className='w-2/4 h-1.5 bg-gradient-to-tr my-1 from-white to-[#7656f5] rounded-3xl'></div>
                                                  </div>
                                                  <div className='w-1/2 h-1.5 bg-gradient-to-tr my-1 from-white to-[#7656f5] rounded-3xl'></div>
                                                  <div className='w-3/4 h-1.5 bg-gradient-to-tr my-1 from-white to-[#7656f5] rounded-3xl'></div>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="z-20 w-9 h-9 p-1 bg-red-500 rounded-full absolute -right-2 -bottom-1">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                  </svg>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Delete Pages</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Delete Pages</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/pdf_to_img" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="PDFImage" className="object-cover object-center w-20 h-20 block" draggable={false} src={image} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">PDF To Image</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">PDF To Image</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/add_page_number" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-20 h-20 block" draggable={false} src={pageNumber} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Add Page Number</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Add Page Number</h2>
                              </div>
                         </Link>
                         <div className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <div className='w-40 h-20 bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] rounded-lg flex place-content-center items-center relative'>
                                        <div className='absolute w-40 h-20 backdrop-blur-[10px] rounded-lg z-20'></div>
                                        <div className='text-2xl text-white font-bold absolute z-10 w-fit h-fit select-none'>Plagrisim</div>
                                        <div className='text-2xl text-white font-bold absolute z-20 w-fit h-fit stroke-inherit line-through decoration-[#7656f5] decoration-2 select-none'>Plagrisim</div>
                                   </div>
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Evade Plagrisim</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Evade Plagrisim</h2>
                              </div>
                         </div>
                         <div className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-20 h-20 block" draggable={false} src={compressPDF} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Compress PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Compress PDF</h2>
                              </div>
                         </div>
                         <div className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-20 h-20 block" draggable={false} src={pdfOCR} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Perform OCR</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Perform OCR</h2>
                              </div>
                         </div>
                         <div className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-20 h-20 block" draggable={false} src={addWatermark} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Put Watermark</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Put Watermark</h2>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     )
}

export default Home;