import React from "react";

import pdfEditorLogo from "../../Assets/images/pdfIcons/pdfEditorLogo.png";
import editFiles from "../../Assets/images/pdfIcons/editFiles.png";
import mergFiles from "../../Assets/images/pdfIcons/mergFiles.png";
import splitFiles from "../../Assets/images/pdfIcons/splitFiles.avif";
import uplaodFiles from "../../Assets/images/pdfIcons/uplaodFiles.png";
import oraganisePages from "../../Assets/images/pdfIcons/oraganisePages.png";
import deletePages from "../../Assets/images/pdfIcons/deletePages.png";
import plagrisim from "../../Assets/images/pdfIcons/plagrisim.jpeg";
import image from "../../Assets/images/pdfIcons/image.png";
import pageNumber from "../../Assets/images/pdfIcons/addPageNumber.avif";
import pdfToword from "../../Assets/images/pdfIcons/pdfToword.avif";


const Intro = () => {

    return (
        <div id="carouselExampleControls" className="hidden lg:block carousel slide w-full" data-ride="carousel">

            <div className="carousel-inner rounded-xl">

                <div className="carousel-item active bg-white h-full">
                <div className="pt-32 space-y-4 mx-auto w-full text-center h-[550px] text-gray-900 inrto rounded-xl border border-gray-100 shadow">
                        <img src={pdfEditorLogo} alt="" className="w-72 h-56 mx-auto border-4 border-black" />
                        <div className="text-6xl font-extrabold">PDF<span className="text-[#ff2929]">Editor</span></div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Edit Files</span>
                        </div>
                        <img src={editFiles} alt="" className="w-20 h-20 mx-auto border-4 border-black" />
                        <ul role="list" className="mt-96 pt-10 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Chat With Your <span className="font-extrabold font-signature1">Friends</span> and <span className="font-extrabold font-signature1">Family</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Chat With New people</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Support Different type of Image Format <span className="font-extrabold font-signature1">(jpeg, jpg, svg , png , webp)</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Support Different type of Document Format <span className="font-extrabold font-signature1">(word, pdf, powepoint, html , css , javascript and many more)</span></span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Change Format</span>
                        </div>
                        <img src={pdfToword} alt="" className="w-20 h-20 mx-auto border-4 border-black" />
                        <ul role="list" className="mt-96 pt-10 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Chat With Your <span className="font-extrabold font-signature1">Friends</span> and <span className="font-extrabold font-signature1">Family</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Chat With New people</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Support Different type of Image Format <span className="font-extrabold font-signature1">(jpeg, jpg, svg , png , webp)</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Support Different type of Document Format <span className="font-extrabold font-signature1">(word, pdf, powepoint, html , css , javascript and many more)</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Create PDF</span>
                        </div>
                        <img src={mergFiles} alt="" className="w-20 h-20 mx-auto border-4 border-black bg-white object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Genrate <span className="font-extrabold font-signature1 uppercase">Photo</span> From Text And Send Them</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>No Need To Download <span className="font-extrabold font-signature1 uppercase">AI Genrated Picture</span> , Save Your <span className="font-extrabold font-signature1 uppercase">Device Storage</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Split PDF</span>
                        </div>
                        <img src={splitFiles} alt="" className="w-20 h-20 mx-auto border-4 border-black bg-white object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Genrate <span className="font-extrabold font-signature1 uppercase">Photo</span> From Text And Send Them</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>No Need To Download <span className="font-extrabold font-signature1 uppercase">AI Genrated Picture</span> , Save Your <span className="font-extrabold font-signature1 uppercase">Device Storage</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Edit PDF</span>
                        </div>
                        <img src={uplaodFiles} alt="" className="w-20 h-20 mx-auto border-4 border-black bg-white object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Genrate <span className="font-extrabold font-signature1 uppercase">Photo</span> From Text And Send Them</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>No Need To Download <span className="font-extrabold font-signature1 uppercase">AI Genrated Picture</span> , Save Your <span className="font-extrabold font-signature1 uppercase">Device Storage</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Organsie PDF</span>
                        </div>
                        <img src={oraganisePages} alt="" className="w-20 h-20 mx-auto border-4 border-black bg-white object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Genrate <span className="font-extrabold font-signature1 uppercase">Photo</span> From Text And Send Them</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>No Need To Download <span className="font-extrabold font-signature1 uppercase">AI Genrated Picture</span> , Save Your <span className="font-extrabold font-signature1 uppercase">Device Storage</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Delete PDF</span>
                        </div>
                        <img src={deletePages} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Don't Know What to Message <span className="font-extrabold font-signature1 uppercase">Ask AI</span> For Help</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Genrate <span className="font-extrabold font-signature"> Custom Message </span> With <span className="font-extrabold font-signature">AI</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">PDF To Images</span>
                        </div>
                        <img src={image} alt="" className="w-20 h-20 mx-auto border-4 border-black bg-white" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Make New <span className="font-extrabold font-signature1 uppercase">Friends</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Stay in Touch With Your Friends</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-3xl font-extrabold">Add Page NUmber</span>
                        </div>
                        <img src={pageNumber} alt="" className="w-20 h-20 mx-auto border-4 border-black bg-white" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Create <span className="font-extrabold font-signature1 uppercase">Blog/Articles</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Share Your <span className="font-extrabold font-signature1 uppercase"><span className="font-extrabold font-signature1 uppercase">Views, Experinces</span> With Others</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Read Other People Blogs</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Evade Plagiarism</span>
                        </div>
                        <img src={plagrisim} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Share Highlits of Your <span className="font-extrabold font-signature1 uppercase">Life , Experinces , Achivements And Other Milestones</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Devploers</span>
                        </div>
                        <img src={pageNumber} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white object-fill" />
                        <ul role="list" className="mt-96 pt- space-y-4 text-left ml-5 pr-5">
                            <li className="bg-gray-200 introAnimation mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden py-2">
                                <div className="sm:flex sm:items-center px-4">
                                    <img className="block h-16 sm:h-16 w-16 rounded-full object-contain mx-auto sm:mb-0 sm:mr-4 sm:ml-0" src={pageNumber} alt="" />
                                    <div className="text-center sm:text-left sm:flex-grow">
                                        <div className="">
                                            <p className="text-base font-extrabold leading-tight">Shubham Anand</p>
                                        </div>
                                        
                                        <div className="flex mx-auto gap-3 w-fit mt-2">

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-envelope-fill w-5 h-5 cursor-pointer" viewBox="0 0 16 16">
                                                <title>shubham09anand@gmail.com</title>
                                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                            </svg>

                                            <svg fill="currentColor" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" role="img">
                                                <title>shubham09anand</title>
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                                            </svg>

                                            <svg fill="currentColor" role="img" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <title>shubham09anand</title>
                                                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                                            </svg>

                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="bg-gray-200 introAnimation mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden py-2">
                                <div className="sm:flex sm:items-center px-4">
                                    <img className="block h-16 sm:h-16 rounded-full mx-auto sm:mb-0 sm:mr-4 sm:ml-0" src={pageNumber} alt="" />
                                    <div className="text-center sm:text-left sm:flex-grow">
                                        <div className="">
                                            <p className="text-base font-extrabold leading-tight">Utkrash Thakur</p>
                                        </div>
                                        <div className="flex mx-auto gap-3 w-fit mt-2">

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-envelope-fill w-5 h-5 cursor-pointer" viewBox="0 0 16 16">
                                                <title>shubham09anand@gmail.com</title>
                                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                            </svg>

                                            <svg fill="currentColor" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" role="img">
                                                <title>shubham09anand</title>
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                                            </svg>

                                            <svg fill="currentColor" role="img" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <title>shubham09anand</title>
                                                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                                            </svg>

                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li className="bg-gray-200 introAnimation mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden py-2">
                                <div className="sm:flex sm:items-center px-4">
                                    <img className="block h-16 w-16 object-contain sm:h-16 rounded-full mx-auto sm:mb-0 sm:mr-4 sm:ml-0" src={pageNumber} alt="" />
                                    <div className="text-center sm:text-left sm:flex-grow">
                                        <div className="">
                                            <p className="text-base font-extrabold leading-tight">Saket Yadav</p>

                                            <div className="flex mx-auto gap-3 w-fit mt-2">

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-envelope-fill w-5 h-5 cursor-pointer" viewBox="0 0 16 16">
                                                    <title>shubham09anand@gmail.com</title>
                                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                                </svg>

                                                <svg fill="currentColor" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" role="img">
                                                    <title>shubham09anand</title>
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                                                </svg>

                                                <svg fill="currentColor" role="img" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <title>shubham09anand</title>
                                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                                                </svg>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a onClick={() => console.log("Clicked!")} id="next-Button" className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Intro;