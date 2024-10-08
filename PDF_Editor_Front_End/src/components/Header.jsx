import React from 'react';
import projectLogo from '../Assets/images/pdfIcons/pdfLogo.jpg';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header id="header" className="fixed z-40 flex h-14 w-full items-center justify-between gap-3 bg-white px-3 shadow-sm">
            <Link to='/' className="flex flex-1 items-center">
                <img src={projectLogo} alt="imggErr" className='w-10 h-10'/>
                <div className='pl-2 font-semibold'>PDFCollaborator </div>
            </Link>
            <nav className="hidden justify-center">
                <ul className="flex flex-wrap items-center gap-3 text-sm font-medium md:gap-8">
                    <li>
                        <a className="inline-flex rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&amp;.active]:bg-indigo-100 [&amp;.active]:text-indigo-600" href="/active-link">Home</a>
                    </li>
                    <li>
                        <a className="inline-flex rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&amp;.active]:bg-indigo-100 [&amp;.active]:text-indigo-600" href="/active-link/customers">Customers</a>
                    </li>
                    <li>
                        <a className="inline-flex rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&amp;.active]:bg-indigo-100 [&amp;.active]:text-indigo-600 active" href="/active-link/partners">Partners</a>
                    </li>
                    <li>
                        <a className="inline-flex rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&amp;.active]:bg-indigo-100 [&amp;.active]:text-indigo-600" href="/active-link/team">Team</a>
                    </li>
                </ul>
            </nav>
            <div className="flex flex-1 items-center justify-end">
                <a target="_blank" rel="noreferrer" className="inline-flex justify-center whitespace-nowrap rounded-full bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300" href="https://its.shubham09anand.in">Developer</a>
            </div>
        </header>
    )
}

export default Header