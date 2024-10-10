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
import deletePages from "../Assets/images/pdfIcons/deletePages.png"
import imagePDF from "../Assets/images/pdfIcons/imagePDF.png"

const Home = () => {
     return (
          <section className="mt-16 text-gray-600 body-font w-full xl:p-2 xl:absolute right-0 h-8 -z-10">
               <div className="container py-2 mx-auto w-fit">
                    <div className="select-none pb-10 flex flex-wrap place-content-center -m-4 gap-y-3 sm:gap-5 items-center mx-auto w-full">
                         <div className="hidden place-content-center items-center flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="imgErr" className="object-cover object-center w-20 h-20 block" draggable={false} src={editFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Edit PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Edit PDF</h2>
                              </div>
                         </div>
                         <Link style={{ textDecoration: "none" }} to="/word_to_pdf" className="place-content-center items-center flex flex-col  sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="imgErr" className="object-cover object-center w-20 h-20 block" draggable={false} src={pdfToword} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Convert Format</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Convert Format</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/img_to_pdf" className="place-content-center items-center flex flex-col  sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="imgErr" className="object-cover object-center w-16 h-16 block" draggable={false} src={imagePDF} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Image To PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Image To PDF</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/merge_pdf" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="imgErr" className="object-cover object-center w-20 h-20 block" draggable={false} src={mergFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Merge PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Merge PDF</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/split_pdf" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="imgErr" className="object-cover object-center w-20 h-20 block" draggable={false} src={splitFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 no-underline">Split PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Split PDF</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to={`/create_pdf`} className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="imgErr" className="object-cover object-center w-20 h-20 block" draggable={false} src={uplaodFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Create PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Create PDF</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/shuffle_pdf" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="imgErr" className="object-cover object-center w-20 h-20 block" draggable={false} src={oraganisePages} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Reorganise Page</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Reorganise Page</h2>
                              </div>
                         </Link>
                         <Link style={{ textDecoration: "none" }} to="/delete_pages" className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">                             
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="imgErr" className="object-cover object-center w-20 h-20 block" draggable={false} src={deletePages} />
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
                                   <img alt="imgErr" className=" object-center w-20 h-20 block" draggable={false} src={pageNumber} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Add Page Number</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Add Page Number</h2>
                              </div>
                         </Link>
                         <div className="hidden place-content-center items-center flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
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
                         <div className="hidden place-content-center items-center flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="imgErr" className=" object-center w-20 h-20 block" draggable={false} src={compressPDF} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Compress PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Compress PDF</h2>
                              </div>
                         </div>
                         <div className="hidden place-content-center items-center flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="imgErr" className=" object-center w-20 h-20 block" draggable={false} src={pdfOCR} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Perform OCR</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Perform OCR</h2>
                              </div>
                         </div>
                         <Link to='/add_water_mark' className="place-content-center items-center flex flex-col sm:w-[45%] lg:w-2/5 xl:w-[30%] hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="imgErr" className=" object-center w-20 h-20 block" draggable={false} src={addWatermark} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Put Watermark</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Put Watermark</h2>
                              </div>
                         </Link>
                    </div>
               </div>
          </section>
     )
}

export default Home;