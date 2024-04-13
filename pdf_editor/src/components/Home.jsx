import React from 'react';
import { Link } from 'react-router-dom';

import editFiles from "../Assets/images/pdfIcons/editFiles.png";
import formatFiles from "../Assets/images/pdfIcons/formatFiles.png";
import mergFiles from "../Assets/images/pdfIcons/mergFiles.png";
import splitFiles from "../Assets/images/pdfIcons/splitFiles.png";
import uplaodFiles from "../Assets/images/pdfIcons/uplaodFiles.png";
import oraganisePages from "../Assets/images/pdfIcons/oraganisePages.png";
import deletePages from "../Assets/images/pdfIcons/deletePages.png";
import plagrisim from "../Assets/images/pdfIcons/plagrisim.jpeg";
import image from "../Assets/images/pdfIcons/image.png";
import pageNumber from "../Assets/images/pdfIcons/addPageNumber.png";

const Home = () => {
     return (
          <section className="text-gray-600 body-font w-full xl:p-2 xl:absolute right-0 h-8 -z-10 mt-0">
               <div className="container px-5 py-24 pt-5 mx-auto w-fit">
                    <div className="flex flex-wrap  place-content-center -m-4 gap-4 items-center mx-auto w-fit">
                         <div className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={editFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Edit PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Edit PDF</h2>
                              </div>
                         </div>
                         <Link to="/word_to_pdf" className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={formatFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Convert Format</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Convert Format</h2>
                              </div>
                         </Link>
                         <Link to="/merge_pdf" className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={mergFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Merge PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Merge PDF</h2>
                              </div>
                         </Link>
                         <Link to="/split_pdf" className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={splitFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Split PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Split PDF</h2>
                              </div>
                         </Link>
                         <Link to={`/create_pdf`} className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={uplaodFiles} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Create PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Create PDF</h2>
                              </div>
                         </Link>
                         <Link to="/shuffle_pdf" className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={oraganisePages} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Reorganise Page</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Reorganise Page</h2>
                              </div>
                         </Link>
                         <Link to="/delete_pages" className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="ecommerce" className="object-cover object-center w-20 h-20 block" draggable={false} src={deletePages} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Delete Pages</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Delete Pages</h2>
                              </div>
                         </Link>
                         <Link to="/pdf_to_img" className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 rounded overflow-hidden">
                                   <img alt="PDFImage" className="object-cover object-center w-20 h-20 block" draggable={false} src={image} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">PDF To Image</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">PDF To Image</h2>
                              </div>
                         </Link>
                         <Link to="/add_page_number" className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-20 h-20 block" draggable={false} src={pageNumber} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Add Page Number</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Add Page Number</h2>
                              </div>
                         </Link>
                         <div className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-40 h-20 block" draggable={false} src={plagrisim} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">PDF To Word</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">PDF To Word</h2>
                              </div>
                         </div>
                         <div className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-40 h-20 block" draggable={false} src={plagrisim} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">PDF To Powerpoint</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">PDF To Powerpoint</h2>
                              </div>
                         </div>
                         <div className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-40 h-20 block" draggable={false} src={plagrisim} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Powerpoint To PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Powerpoint To PDF</h2>
                              </div>
                         </div>
                         <div className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-40 h-20 block" draggable={false} src={plagrisim} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Compress PDF</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Compress PDF</h2>
                              </div>
                         </div>
                         <div className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-40 h-20 block" draggable={false} src={plagrisim} />
                              </div>
                              <div className="mt-4">
                                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Perform OCR</h3>
                                   <h2 className="text-gray-900 title-font text-lg font-medium">Perform OCR</h2>
                              </div>
                         </div>
                         <div className="place-content-center items-center flex flex-col lg:w-1/6 sm:w-2/5 xl:w-1/4 hover:scale-105 p-4 w-full border cursor-pointer hover:bg-slate-200 rounded-xl duration-300 shadow-lg text-center">
                              <div className="block relative h-24 overflow-hidden">
                                   <img alt="ecommerce" className=" object-center w-40 h-20 block" draggable={false} src={plagrisim} />
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