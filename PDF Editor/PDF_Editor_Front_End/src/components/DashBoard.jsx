import React from 'react';

import message from '../Assets/images/icons/message.png';
import event from '../Assets/images/icons/event.png';
import page from '../Assets/images/icons/page.png';
import blog from '../Assets/images/icons/blog.png';


const Dashboard = () => {
  return (
    <div className='absolute w-64 backdrop-blur-md border-r-2 border-black'>
      <div id="site__sidebar" className="top-0 left-0 z-[99] mt-0 overflow-hidden transition-transform xl:duration-500 max-xl:-translate-x-full">
        <div className="p-2 max-xl:bg-white shadow-sm h-[calc(100vh-54px)] relative z-30 max-lg:border-r dark:max-xl:!bg-slate-700 dark:border-slate-700">
          <div className="pr-4" data-simplebar="init">
            <div className="simplebar-wrapper" style={{ margin: "0px -16px 0px 0px" }}>
              <div className="simplebar-height-auto-observer-wrapper">
                <div className="simplebar-height-auto-observer"></div>
              </div>
              <div className="simplebar-mask">
                <div className="simplebar-offset" style={{ right: "-20px; bottom: 0px" }}>
                  <div className="simplebar-content" style={{ padding: "0px calc(36px) 0px 0px; height: 100%; overflow: hidden scroll" }}>
                    <nav id="side">
                      <ul className=''>
                        <div style={{ textDecoration: "none" }} to="/" className="rounded-lg active:opacity-60 mt-2 hover:bg-slate-200 cursor-pointer">
                          <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                            <span>Home</span>
                          </div>
                        </div>
                        <div style={{ textDecoration: "none" }} to="/message" className=" rounded-lg active:opacity-60">
                          <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                            <img src={message} alt="messages" className="w-5" />
                            <span>Messages</span>
                          </div>
                        </div>
                        <div style={{ textDecoration: "none" }} to="/friends" className=" rounded-lg active:opacity-60">
                          <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                            <img src={event} alt="messages" className="w-6" />
                            <span>Friends</span>
                          </div>
                        </div>
                        <div style={{ textDecoration: "none" }} to="/news" className=" rounded-lg active:opacity-60">
                          <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                            <img src={page} alt="pages" className="w-6" />
                            <span>News</span>
                          </div>
                        </div>
                        <div style={{ textDecoration: "none" }} to="/blog" className=" rounded-lg active:opacity-60">
                          <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                            <img src={blog} alt="blog" className="w-6" />
                            <span>Blog</span>
                          </div>
                        </div>
                      </ul>
                    </nav>
                    <nav id="side" className="font-medium text-sm text-black border-t pt-3 mt-2 dark:text-white dark:border-slate-800">
                      <div className="px-3 pb-2 text-sm font-medium">
                        <div className="text-black dark:text-white"></div>
                      </div>
                      <ul className="mt-2 space-x-2" uk-nav="multiple: true">
                        <div style={{ textDecoration: "none" }} to='/account-setting'>
                          <div className='flex items-center gap-10 px-4 capitalize'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>Setting</span>
                          </div>
                        </div>
                        <div style={{ textDecoration: "none" }} to='/account-setting'>
                          <div className='flex items-center gap-10 px-2 capitalize mt-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"></path>
                            </svg>
                            <span>Log Out</span>
                          </div>
                        </div>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="simplebar-placeholder" style={{ width: "292px; height: 897px" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard