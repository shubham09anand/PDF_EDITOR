import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import addPdf from "../../Assets/images/icons/addPdf.png";
import moment from 'moment';
import uploadFile from "../../Assets/images/icons/uploadFile.png";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateLink } from './CreatePDFFunction';


const PreviousDocs = () => {

     const navigate = useNavigate();
     const [doc, setDoc] = useState([]);
     const [joinLink, setJoinLink] = useState("");
     const [listDisplay, setListDisplay] = useState(0)
     const userId = "6608f032efa3e1a31913d0f3";

     useEffect(() => {
          axios.post("http://127.0.0.1:8080/auth/getDocumentList", { userId: userId }).then((req) => {
               setDoc(req.data.doc);
          }).catch((error) => {
               console.log(error)
               toast.error("Something Went Wrong While Loading Previous Document")
          })
     }, [userId])

     const joinDoc = () => {
          const docId = joinLink.split("/");
          console.log(docId)
          if (joinLink === "" || joinLink === null) {
               toast.info("Enter A Room Link")
               return
          }
          else if (docId.length !== 6) {
               toast.error("Invalid Link 2")
               return
          }
          else {
               validateLink(docId[docId.length - 1]).then((res) => {
                    // console.log(res)
                    if (res.data.status === 0 || res.data.success === false) {
                         toast.error("Invalid Link")
                         return
                    }
                    else{
                         navigate(`/create_doc/document/${docId[docId.length - 1]}`);
                    }
               })
          }
     }

     return (
          
          <div className='sm:pl-2 w-full h-fit'>
               {process.env.server}
               <ToastContainer />
               <div className='w-full space-x-2 px-2 md:space-x-10 flex lg:hidden py-2'>
                    <div onClick={() => setListDisplay(0)} className='shadow-inner rounded-lg w-full border-2 font-semibold text-sm text-center py-2 pl-2 cursor-pointer'>Your Previous Work</div>
                    <div onClick={() => setListDisplay(1)} className='shadow-inner rounded-lg w-full border-2 font-semibold text-sm text-center py-2 pl-2 cursor-pointer'>Make A New PDF</div>
               </div>
               <div className='flex space-x-'>
                    {
                         listDisplay === 0 && (
                              <div className='w-full lg:w-3/4'>
                                   <h3 className="text-3xl pl-3 font-bold dark:text-white">Previous Files</h3>
                                   <div className="mt-3 max-w-screen-lg px-2">
                                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                             <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                  <thead className="text-xs uppercase bg-gray-500 text-white">
                                                       <tr>
                                                            <th scope="col" className="px-6 py-3 text-center">
                                                                 File name
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-center hidden md:block">
                                                                 Date
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-center">
                                                                 Download
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-center">
                                                                 Edit
                                                            </th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {doc?.map((file, index) => (
                                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                                 <th scope="row" className="sm:pl-4 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden dark:text-white relative">
                                                                      <div className='flex pr-2 w-fit place-content-start md:pl-3 items-center space-x-3 rounded-3xl md:bg-gray-300 py-1.5 text-clip'>
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hidden md:block w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                                           </svg>
                                                                           <div className='max-w-32 w-fit sm:max-w-80 text-wrap md:text-base max-h-10 md:max-h-6 truncate px-1'>{file?.docName}</div>
                                                                      </div>
                                                                      <div className='pl-4 md:hidden bg-gray-200 rounded-3xl w-fit h-fit px-2 py-1 ml-2'>{moment(file.createdAt)?.format('YYYY-MM-DD')}</div>
                                                                 </th>
                                                                 <td className="px-6 py-4 text-center hidden md:block">
                                                                      {moment(file.createdAt)?.format('YYYY-MM-DD')}
                                                                 </td>
                                                                 <td className="px-6 py-">
                                                                      <div className=' cursor-pointer w-fit h-fit mx-auto px-2 py-1 bg-red-500 rounded-3xl'>
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 mx-auto">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                                           </svg>
                                                                      </div>
                                                                 </td>
                                                                 <td className="px-6 py-4">
                                                                      <Link to={`/create_doc/document/${file?.docID}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                                           <div className='w-fit h-fit mx-auto cursor-pointer'>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                                     <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                                                </svg>
                                                                           </div>
                                                                      </Link>
                                                                 </td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>
                                   </div>

                                   {
                                        doc.length === 0 && (
                                             <div className="text-md w-full text-center pt-10 font-semibold mb-3">No Previous Files</div>
                                        )
                                   }
                              </div>
                         )
                    }

                    {
                         listDisplay === 1 && (
                              <div className='pl-5 pr-5 sm:w-3/4 md:w-1/2 mx-auto pt-12 lg:hidden'>
                                   <Link to="/create_doc" className='cursor-pointer px-3 h-32 w-full flex items-center border-b rounded-lg bg-gray-400 hover:bg-slate-500 my-2 active:opacity-20 duration-700'>
                                        <img src={addPdf} alt="" className='w-16 h-16 lg:w-24 lg:h-24' />
                                        <div className='no-underline font-semibold w-fit mx-auto text-center text-lg'>Create A New Document</div>
                                   </Link>
                                   <div className='cursor-pointer px-3 h-32 w-full flex items-center border-b rounded-lg bg-gray-400 hover:bg-slate-500 my-2 active:opacity-20 duration-700'>
                                        <img src={uploadFile} alt="" className='w-[5rem] h-[5rem] lg:w-[7rem] lg:h-[7rem]' />
                                        <div className='font-semibold w-fit mx-auto text-center text-lg'>Upload A Exisiting PDF and Work</div>
                                   </div>
                              </div>
                         )
                    }

                    <div className='px-10 w-1/2 mx-auto pt-12 hidden lg:block'>
                         <div to="/create_doc" className='p-2 w-full flex items-center border-b bg-gray-200 my-2'>
                              <img src={addPdf} alt="" className='w-[70px] h-[70px]'/>
                              <div className='ml-2'>
                                   <div className='w-fit'>Join A Meeting</div>
                                   <div className='flex place-content-center items-center gap-x-2'>
                                        <input onChange={(e) => setJoinLink(e.target.value)} value={joinLink} type="text" className="mt-1 w-60 lg:w-80 py-1 pl-2 pr-4 text-gray-700 bg-white border border-gray-500 rounded-md outline-none" placeholder="Enter the link of Document" />
                                        <div onClick={joinDoc} className='cursor-pointer bg-red-500 rounded-md flex place-content-center items-center p-1 mt-2'>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="white" className="w-6 h-6 p-1">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                             </svg>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <Link style={{textDecoration:"none"}} to="/create_doc" className='cursor-pointer p-2 w-full flex items-center border-b bg-gray-200 my-2 active:opacity-20 duration-700'>
                              <img src={addPdf} alt="" className='w-[70px] h-[70px]' />
                              <div className='w-fit text-2xl pl-3'>Create A New Document</div>
                         </Link>
                    </div>
               </div>
          </div>
     )
}

export default PreviousDocs