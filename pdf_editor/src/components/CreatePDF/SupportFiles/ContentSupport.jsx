import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bbcNews from "../../../Assets/images/icons/bbcNews.png";
import washingtonPost from "../../../Assets/images/icons/washingtonPost.png";
import DW from "../../../Assets/images/icons/DW.png";
import CNN from "../../../Assets/images/icons/CNN.jpeg";
import sunNews from "../../../Assets/images/icons/sunNews.png";
import LoadingPlaneAnimation from '../../Animation/LoadingPlaneAnimation';
import API from '../../../Api/Api';

const ContentSupport = () => {

     const newsOutletLinks = [
          {
               name: "BBC",
               link: "https://www.bbc.com/",
               photo: bbcNews,
          },
          {
               name: "Deutsche Welle",
               link: "https://www.dw.com/",
               photo: DW,
          },
          {
               name: "The Sun",
               link: "https://www.thesun.co.uk/",
               photo: sunNews,
          },
          {
               name: "Washington Post",
               link: "https://www.washingtonpost.com/",
               photo: washingtonPost,
          },
          {
               name: "CNN",
               link: "https://edition.cnn.com/",
               photo: CNN,
          },
     ]
     const [links, setLinks] = useState([]);
     const [itemDisplay, setItemDisplay] = useState(0)
     const [queery, setQueery] = useState("");
     const [button, setButton] = useState(true);
     const [summary, setSummary] = useState(null);
     const [summaryState, steSummaryState] = useState(false);
     const [selectedOrigin, setSelectedOrigin] = useState("https://www.bbc.com/");
     const [selectedArticle, setSelectedArticle] = useState([]);
     const [selectedImage, setSelectedImage] = useState(null);

     const getLinks = () => {
          if (queery === "" || queery.trim() === null || selectedOrigin === "Select An Organisation") {
               toast.error("Enter a text in input Field");
               return;
          }
          setButton(false);
          // eslint-disable-next-line
          API.post("/googleSearch", { queery: queery, selectedOrigin: selectedOrigin }).
               then((res) => {
                    if (res.data?.apiResult?.items) {
                         setLinks(res.data?.apiResult?.items);
                         setItemDisplay(1);
                    }
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
          setSelectedArticle([link])
          steSummaryState(true);
          setButton(false);
          // eslint-disable-next-line
          API.post("/scrapeWebpage", { slectedLink: link, conetntSnippet: snippet, contentTitle: tilte }).
               then((res) => {
                    setSummary(res.data)
                    setItemDisplay(2);
                    steSummaryState(false);
               }).catch(() => {
                    // console.log(error)
                    toast.error(`Process Failed With Stauats Code`)
               }).finally(() => {
                    steSummaryState(false);
                    setButton(true)
               })
     }

     const downloadImage = async (url, filename) => {
          try {
               const response = await fetch(url);
               if (!response.ok) throw new Error('Network response was not ok');

               const blob = await response.blob();
               const link = document.createElement('a');
               link.href = URL.createObjectURL(blob);
               link.download = filename;
               document.body.appendChild(link); // Append to body to make it work in Firefox
               link.click();
               document.body.removeChild(link); // Clean up
          } catch (error) {
               console.error('Error downloading the image:', error);
          }
     };

     return (
          <div className="p-2 lg:p-5 w-full flex bg-teal-lightest font-sans mx-auto h-fu backdrop-blur-2xl relative">
               <ToastContainer />
               <div className="h-screen m-4 w-[99%] md:w-4/5 lg:w-3/4 mx-auto">
                    <div className="mb-4">
                         <div className='w-full flex place-content-center items-center space-x-3 mt-3'>
                              <div className="heading text-center font-bold text-xl md:text-3xl text-gray-800">Content Supoort</div>
                         </div>
                         <div className='heading text-center w-full md:w-4/5 lg:w-3/4 xl:w-4/5 mx-auto text-base font-thin text-gray-800 mt-4 font-mono'>Need insights? Just input your key topics or interests, and we'll provide you with relevant article links along with concise summaries.</div>
                         <div className="flex flex-col place-content-center items-center w-full h-fit mt-3">
                              <div className={`space-y-4 flex flex-col w-full md:space-x-5 ${itemDisplay === 0 ? "block" : "hidden"}`}>
                                   <div className='flex place-content-center items-center space-x-5'>
                                        {
                                             links && links?.length !== 0 ? (
                                                  <svg onClick={() => setItemDisplay(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 rotate-[180deg] cursor-pointer rounded-full">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                  </svg>
                                             ) :
                                                  <div>No Links Found Realted To Your Querry</div>
                                        }
                                   </div>
                                   <input onChange={(e) => setQueery(e.target.value)} value={queery} className="mx-auto rounded-md title w-full bg-gray-100 border border-gray-300 p-2 outline-none" spellCheck="false" placeholder="Enter Key-Words" type="text" />
                                   <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                             Dropdown button
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                             <a class="dropdown-item" href="./">Action</a>
                                             <a class="dropdown-item" href="./">Another action</a>
                                             <a class="dropdown-item" href="./">Something else here</a>
                                        </div>
                                   </div>
                                   <div className="dropdown w-60 mx-auto">
                                        <button className="border border-black w-60 btn bg-[#ffffff] dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                             {selectedOrigin}
                                        </button>
                                        <ul className="dropdown-menu w-60">
                                             {
                                                  newsOutletLinks?.map((items, index) => (
                                                       <li key={index} onClick={() => setSelectedOrigin(items.link)}>
                                                            <div className="flex items-center text-sm p-1.5 px-4 cursor-pointer hover:bg-gray-200 active:opacity-75 text-gray-600 capitalize transition-colors duration-300 transform">
                                                                 <img src={items.photo} alt="" className='w-8 h-8' />
                                                                 <span className="mx-1 px-2 font-extrabold">
                                                                      {items.name}
                                                                 </span>
                                                            </div>
                                                       </li>
                                                  ))
                                             }
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
                              <div className='flex place-content-center items-center space-x-10'>
                                   <svg onClick={() => setItemDisplay(0)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 cursor-pointer rounded-full">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                   </svg>
                                   <div className="heading text-center font-bold text-3xl mt-0 text-gray-800">Relevent Link</div>
                                   {
                                        summary !== null && (
                                             <svg onClick={() => setItemDisplay(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 rotate-[180deg] cursor-pointer rounded-full">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                             </svg>
                                        )
                                   }
                              </div>
                              {links?.map((link, index) => (
                                   <div key={index} className="flex items-center">
                                        <div className="relative w-full">
                                             <input id="website-url" type="text" className="bg-gray-50 border-r-0 border rounded-l-xl font-extrabold border-gray-300 text-gray-500 outline-none text-sm block w-full p-3" value={link.link} readOnly />
                                        </div>
                                        <div className="flex-shrink-0 z-10 outline-none inline-flex items-center py-3 px-3 md:px-4 text-sm font-medium text-center text-white cursor-pointer active:opacity-75 bg-gray-100 focus:outline-none border border-r-0" type="div">
                                             <a href={link?.link} target='_blank' rel='noreferrer'>
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-5 h-5">
                                                       <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
                                                  </svg>
                                             </a>
                                        </div>
                                        <button onClick={() => scrapingProcess(link?.link, link?.snippet, link?.title)} className="flex-shrink-0 z-10 outline-none inline-flex items-center py-3 px-3 md:px-4 text-sm font-medium text-center text-white cursor-pointer active:opacity-75 bg-gray-200 focus:outline-none border border-l-0" type="div">
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
                         <div className='flex place-content-center items-center my-2 space-x-5'>
                              <svg onClick={() => setItemDisplay(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 cursor-pointer rounded-full">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                              </svg>
                              <div className="heading text-center font-bold text-3xl text-gray-800">Genrated Summary</div>
                              <svg onClick={() => setItemDisplay(3)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-2 bg-gray-200 rotate-[180deg] cursor-pointer rounded-full">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                              </svg>
                         </div>

                         <p className="text-3xl mx-auto w-fit mb-2 mt-4 font-extrabold">{summary?.scrapData?.articleTitle}</p>
                         {
                              !summary?.scrapData?.articleTitle && <p className="text-3xl border-l-8 border-red-700 pl-5 font-extrabold">{summary?.scrapData?.articleHeading}</p>
                         }

                         <div className="md:p-4">
                              <p className="mb-3 text-gray-600 sm:border-s-4 md:pl-4">
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
                                   <a target='_blank' rel='noreferrer' className=' mt-5 text-blue-500 font-semibold text-sm' href={selectedArticle[0]}>To Read Full Article Click Here</a>
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
                         <div className="-m-1 mb-20 w-fit mx-auto flex flex-wrap gap-2 md:-m-2 overflow-y-scroll example">
                              {links?.map((link, index) => {
                                   const imageUrl = link?.pagemap?.cse_image[0]?.src;

                                   return (
                                        <div onContextMenu={(e) => e.preventDefault()} key={index} className="relative w-fit m-1 mx-auto">
                                             <div className="flex space-x-4 absolute top-3 right-3 bg-white rounded-md">
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="active:opacity-75 w-6 h-6 p-1 backdrop-blur-md rounded-full cursor-pointer">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                  </svg>
                                                  <svg onClick={() => downloadImage(imageUrl, `${queery}_${index}.png`)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="active:opacity-75 w-6 h-6 p-1 backdrop-blur-md rounded-full cursor-pointer">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                  </svg>
                                                  <svg onClick={() => setSelectedImage(imageUrl)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="active:opacity-75 w-6 h-6 p-1 backdrop-blur-md rounded-full cursor-pointer">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                                  </svg>
                                             </div>
                                             <img className="object-cover object-center shadow w-80 h-56 max-w-full rounded-lg" src={imageUrl} alt={`${queery}_${index}`} />
                                        </div>
                                   );
                              })}
                         </div>

                    </div>

                    {
                         selectedImage !== null && (
                              <div className='w-[98%] h-[92%] absolute top-0 left-5'>
                                   <img src={selectedImage} alt="" className='w-full h-full absolute top-0 left-0' />
                                   <svg onClick={() => setSelectedImage(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 backdrop-blur-3xl cursor-pointer rounded-full absolute top-5 right-10">
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