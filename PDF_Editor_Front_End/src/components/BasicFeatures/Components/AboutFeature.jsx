import React from 'react'
import BackGroundSVG from '../BackGroundSVG'

const AboutFeature = ({ featureHeading, featureDescription }) => {
     return (
          <>
               <BackGroundSVG />
               <div className='text-center space-y-3 mt-3'>
                    <div className='text-3xl md:text-4xl lg:text-5xl font-semibold text-[#33333b]'>{featureHeading}</div>
                    <div className='text-xl md:text-2xl font-semibold px-2 w-11/12 md:w-3/4 lg:w-1/2 mx-auto'>{featureDescription}</div>
               </div>
          </>
     )
}

export default AboutFeature