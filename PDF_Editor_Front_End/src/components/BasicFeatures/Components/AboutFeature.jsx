import React from 'react';
import { Link } from 'react-router-dom';
import BackGroundSVG from '../BackGroundSVG';

const AboutFeature = ({ featureHeading, featureDescription }) => {
     return (
          <>
               <BackGroundSVG />
               <div className='text-center space-y-3 mt-10 mb-3'>
                    <div className='relative justify-between place-content-center items-center px-5  mx-auto'>
                         <Link to='/' className='absolute left-10 p-2 bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] rounded-full cursor-pointer hover:opacity-75 active:opacity-30'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-5">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                              </svg>
                         </Link>
                         <div className='text-3xl md:text-4xl lg:text-5xl font-semibold text-[#33333b]'>{featureHeading}</div>
                    </div>
                    <div className='text-xl md:text-2xl font-semibold px-2 w-11/12 md:w-3/4 lg:w-1/2 mx-auto'>{featureDescription}</div>
               </div>
          </>
     )
}

export default AboutFeature