import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = ({controllDisplay}) => {

    const location = useLocation();
    const currentPath = location.pathname;
    const result = currentPath.startsWith("/create_doc/document");

    return (
        <div>
            <nav className="mb-4 bg-gray-400 h-20 flex place-content-center items-center border-gray-200">
                <div className="flex flex-wrap place-content-center items-center justify-between mx-auto w-screen p-2 ">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </div>
                    <button data-collapse-toggle="mega-menu-full-image" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-full-image" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div id="mega-menu-full-image" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col place-content-center items-center mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                            
                            {
                                !(currentPath === "/") &&
                            <li>
                                <a className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
                            </li>
                            }
                            {
                                result && (
                                    <li onClick={()=> controllDisplay(true)}>More Options</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header