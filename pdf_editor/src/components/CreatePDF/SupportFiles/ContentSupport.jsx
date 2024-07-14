import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import bbcNews from "../../../Assets/images/icons/bbcNews.png";
import washingtonPost from "../../../Assets/images/icons/washingtonPost.png";
import DW from "../../../Assets/images/icons/DW.png";
import CNN from "../../../Assets/images/icons/CNN.jpeg";
import sunNews from "../../../Assets/images/icons/sunNews.png";
import GenrateImage from './genrateImage';
import LoadingPlaneAnimation from '../../Animation/LoadingPlaneAnimation';

const ContentSupport = () => {

     const [links, setLinks] = useState([]);
     const [itemDisplay, setItemDisplay] = useState(0)
     const [queery, setQueery] = useState("");
     const [button, setButton] = useState(true);
     const [summary, setSummary] = useState(null);
     const [summaryState, steSummaryState] = useState(false);
     const [selectedOrigin, setSelectedOrigin] = useState("https://www.bbc.com/");
     const [fullArticle, setFullArticle] = useState(false);
     const [selectedImage, setSelectedImage] = useState(null);

     const getLinks = () => {
          if (queery === "" || queery.trim() === null || selectedOrigin === "Select An Organisation") {
               toast.error("Enter a text in input Field");
               return;
          }
          setButton(false);
          axios.post("http://127.0.0.1:8080/auth/googleSearch",
               { queery: queery, selectedOrigin: selectedOrigin }).then((res) => {
                    setLinks(res.data.apiResult.items);
                    setItemDisplay(1);
               }).catch(() => {
                    toast.error(`Process Failed With Stauats Code`)
               }).finally(() => {
                    setButton(true)
               })
     }

     const scrapingProcess = (link, snippet, tilte) => {
          if (queery === "" || queery.trim() === null || selectedOrigin === "Select An Organisation") {
               toast.error("Enter a text in input Field");
               return;
          }
          steSummaryState(true);
          setButton(false);
          axios.post("http://127.0.0.1:8080/auth/scrapeWebpage",
               { slectedLink: link, conetntSnippet: snippet, contentTitle: tilte }).then((res) => {
                    setSummary(res.data)
                    setItemDisplay(2);
                    steSummaryState(false);
                    console.log(res.data)
               }).catch((error) => {
                    console.log(error)
                    toast.error(`Process Failed With Stauats Code`)
               }).finally(() => {
                    steSummaryState(false);
                    setButton(true)
               })
     }
     return (
          <div className="p-2 lg:p-5 w-full flex bg-teal-lightest font-sans mx-auto h-fu backdrop-blur-2xl relative">
               <ToastContainer />
               <div className="h-screen m-4 w-11/12 md:w-4/5 lg:w-3/4 mx-auto">
                    <div className="mb-4">
                         <div className='w-full flex place-content-center items-center space-x-3 mt-3'>
                              <div className="heading text-center font-bold text-xl md:text-3xl text-gray-800">Content Supoort</div>
                         </div>
                         <div className='heading text-center w-11/12 md:w-4/5 lg:w-3/4 xl:w-4/5 mx-auto text-base font-thin text-gray-800 mt-4 font-mono'>Need insights? Just input your key topics or interests, and we'll provide you with relevant article links along with concise summaries.</div>
                         <div className="flex flex-col place-content-center items-center w-full h-fit mt-3">
                              <div className={`space-y-4 flex flex-col w-full md:space-x-5 ${itemDisplay === 0 ? "block" : "hidden"}`}>
                                   <div className='flex place-content-center items-center space-x-5'>
                                        {
                                             links.length !== 0 && (
                                                  <svg onClick={() => setItemDisplay(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 rotate-[180deg] cursor-pointer rounded-full">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                  </svg>
                                             )
                                        }
                                   </div>
                                   <input onChange={(e) => setQueery(e.target.value)} value={queery} className="mx-auto rounded-md title w-full bg-gray-100 border border-gray-300 p-2 outline-none" spellCheck="false" placeholder="Enter Key-Words" type="text" />
                                   <div className="dropdown w-60 mx-auto">
                                        <button className="border border-black w-60 btn bg-[#ffffff] dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                             {selectedOrigin}
                                        </button>
                                        <ul className="dropdown-menu w-60">
                                             <li onClick={() => setSelectedOrigin("https://www.bbc.com/")}>
                                                  <div className="flex items-center text-sm p-1.5 px-4 cursor-pointer hover:bg-gray-200 active:opacity-75 text-gray-600 capitalize transition-colors duration-300 transform">
                                                       <img src={bbcNews} alt="" className='w-8 h-8' />
                                                       <span className="mx-1 px-2 font-extrabold">
                                                            BBC
                                                       </span>
                                                  </div>
                                             </li>
                                             <li onClick={() => setSelectedOrigin("https://www.thesun.co.uk/")}>
                                                  <div className="flex items-center text-sm p-1.5 px-4 cursor-pointer hover:bg-gray-200 active:opacity-75 text-gray-600 capitalize transition-colors duration-300 transform">
                                                       <img src={sunNews} alt="" className='w-8 h-8' />
                                                       <span className="mx-1 px-2 font-extrabold">
                                                            The Sun
                                                       </span>
                                                  </div>
                                             </li>
                                             <li onClick={() => setSelectedOrigin("https://www.washingtonpost.com/")}>
                                                  <div className="flex items-center text-sm p-1.5 px-4 cursor-pointer hover:bg-gray-200 active:opacity-75 text-gray-600 capitalize transition-colors duration-300 transform">
                                                       <img src={washingtonPost} alt="" className='w-8 h-8' />
                                                       <span className="mx-1 px-2 font-extrabold">
                                                            Washington Post
                                                       </span>
                                                  </div>
                                             </li>
                                             <li onClick={() => setSelectedOrigin("https://www.dw.com/")}>
                                                  <div className="flex items-center text-sm p-1.5 px-4 cursor-pointer hover:bg-gray-200 active:opacity-75 text-gray-600 capitalize transition-colors duration-300 transform">
                                                       <img src={DW} alt="" className='w-8 h-7' />
                                                       <span className="mx-1 px-2 font-extrabold">
                                                            Deutsche Welle
                                                       </span>
                                                  </div>
                                             </li>
                                             <li onClick={() => setSelectedOrigin("https://edition.cnn.com/")} >
                                                  <div className="flex items-center text-sm p-1.5 px-4 cursor-pointer hover:bg-gray-200 active:opacity-75 text-gray-600 capitalize transition-colors duration-300 transform">
                                                       <img src={CNN} alt="" className='w-8 h-7' />
                                                       <span className="mx-1 px-2 font-extrabold">
                                                            CNN
                                                       </span>
                                                  </div>
                                             </li>
                                        </ul>
                                   </div>
                                   <button onClick={getLinks} className={`mx-auto btn border border-indigo-500 px-4 font-semibold cursor-pointer h-fit w-fit p-2 mb-4 text-gray-200 bg-indigo-500 ${button ? "cursor-pointer" : "cursor-wait"}`} >Search</button>
                              </div>
                         </div>
                    </div>

                    {/* link display */}
                    <div key={Math.random()} className='relative'>
                         <div className={`mb-10 w-full space-y-3 relative ${itemDisplay === 1 ? "block" : "hidden"}`}>
                              {summaryState &&
                                   <div className='absolute z-20 backdrop-blur-[2px] w-full h-full top-0'>
                                        <div className=' mx-auto z-20 flex flex-col place-content-center items-center'>
                                             <LoadingPlaneAnimation />
                                        </div>
                                   </div>
                              }
                              <div className='flex place-content-center items-center mt-1 space-x-10'>
                                   <svg onClick={() => setItemDisplay(0)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 cursor-pointer rounded-full">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                   </svg>
                                   <div className="heading text-center font-bold text-3xl my-3 mt-0 text-gray-800">Relevent Link</div>
                                   {
                                        summary !== null && (
                                             <svg onClick={() => setItemDisplay(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 rotate-[180deg] cursor-pointer rounded-full">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                             </svg>
                                        )
                                   }
                              </div>
                              {links.map((link, index) => (
                                   <div key={index} className="flex items-center">
                                        <div className="relative w-full">
                                             <input id="website-url" type="text" className="bg-gray-50 border-r-0 border rounded-l-xl font-extrabold border-gray-300 text-gray-500 outline-none text-sm block w-full p-3" value={link.link} readOnly />
                                        </div>
                                        <div className="flex-shrink-0 z-10 outline-none inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white cursor-pointer active:opacity-75 bg-gray-100 focus:outline-none border border-r-0" type="div">
                                             <a href={link?.link} target='_blank'>
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-5 h-5">
                                                       <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
                                                  </svg>
                                             </a>
                                        </div>
                                        <button onClick={() => scrapingProcess(link?.link, link?.snippet, link?.title)} className="flex-shrink-0 z-10 outline-none inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white cursor-pointer active:opacity-75 bg-gray-200 focus:outline-none border border-l-0" type="div">
                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-5 h-5">
                                                  <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                                                  <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                             </svg>
                                        </button>
                                   </div>
                              ))}
                         </div>
                    </div>


                    <div className={`h-6 ${itemDisplay === 2 ? "block" : "hidden"}`}>
                         <div className='flex place-content-center items-center my-5 space-x-5'>
                              <svg onClick={() => setItemDisplay(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 cursor-pointer rounded-full">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                              </svg>
                              <div className="heading text-center font-bold text-3xl text-gray-800">Genrated Summary</div>
                              <svg onClick={() => setItemDisplay(3)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 rotate-[180deg] cursor-pointer rounded-full">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                              </svg>
                         </div>

                         <p className="text-3xl font-extrabold dark:text-white">{summary?.scrapData?.articleTitle}</p>
                         {
                              !summary?.scrapData?.articleTitle && <p className="text-3xl border-l-8 border-red-700 pl-5 font-extrabold dark:text-white">{summary?.scrapData?.articleHeading}</p>
                         }

                         <div className="p-4 my-4 ">
                              <p className="mb-3 text-gray-600 dark:text-gray-400 border-s-4 pl-4">
                                   {summary?.genaratedSummary?.generatedText.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                             {line.split(/(\*\*.*?\*\*)/).map((part, partIndex) => (
                                                  <React.Fragment key={partIndex}>
                                                       {part.startsWith('**') && part.endsWith('**') ? (
                                                            <strong>{part.slice(2, -2)}</strong>
                                                       ) : part.startsWith('*') && !part.endsWith('*') ? (
                                                            <li className='ml-10'>{part.slice(1)}</li>
                                                       ) : (
                                                            part
                                                       )}
                                                  </React.Fragment>
                                             ))}
                                             <br />
                                        </React.Fragment>
                                   ))}
                              </p>

                              <div className='flex space-x-5 mt-5 items-center'>
                                   <div className="heading font-bold text-2xl text-gray-800">Full Article</div>
                                   <svg onClick={() => fullArticle ? setFullArticle(false) : setFullArticle(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer hover:bg-slate-200">
                                        <path fillRule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                   </svg>
                              </div>

                              <p className={`border-s-4 border-green-600 mb-3 text-gray-600 mt-2 dark:text-gray-400 overflow-y-scroll  px-10 transition-all duration-1000 ${fullArticle ? 'h-0' : 'h-fit'}`}>
                                   {
                                        summary?.scrapData?.artilceOriginalContent === "" && <>Sorry No Full Preview Avilabe...</>
                                   }
                                   {summary?.scrapData?.artilceOriginalContent.split(`&#92;`).map((line, index) => (
                                        <React.Fragment key={index}>
                                             {line}
                                             <div className='h-2'></div>
                                        </React.Fragment>
                                   ))}
                              </p>
                         </div>
                    </div>



                    <div className={`${itemDisplay === 3 ? "block" : "hidden"}`}>
                         <div className='flex place-content-center items-center space-x-5'>
                              <svg onClick={() => setItemDisplay(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 cursor-pointer rounded-full">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                              </svg>
                              <div className="heading text-center font-bold text-3xl my-3 text-gray-800">Genrate Images</div>
                         </div>
                         <GenrateImage />
                         <div className="-m-1 mb-20 w-fit mx-auto flex flex-wrap gap-2 md:-m-2 overflow-y-scroll example">
                              {
                                   links.map((link, index) => (
                                        <div onClick={() => setSelectedImage(link?.pagemap.cse_image[0]?.src)} key={index} className='relative w-fit mx-auto'>
                                             <div className='flex space-x-4 absolute top-3 right-3'>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="active:opacity-75 w-6 h-6 p-1 backdrop-blur-md rounded-full cursor-pointer">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                  </svg>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="active:opacity-75 w-6 h-6 p-1 backdrop-blur-md rounded-full cursor-pointer">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                  </svg>
                                             </div>
                                             <img className="object-cover object-center w-60 h-48 max-w-full rounded-lg"
                                                  src={link?.pagemap.cse_image[0]?.src}
                                                  alt="gallery-photo" />
                                        </div>
                                   ))
                              }
                         </div>
                    </div>

                    {
                         selectedImage !== null && (
                              <div className='w-[98%] h-[92%] absolute top-0 left-5'>
                                   <img src={selectedImage} alt="" className='w-full h-full absolute top-0 left-0' />
                                   <svg onClick={()=> setSelectedImage(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 backdrop-blur-3xl cursor-pointer rounded-full absolute top-5 right-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                   </svg>

                              </div>
                         )
                    }

               </div>
          </div>
     )
}

export default ContentSupport