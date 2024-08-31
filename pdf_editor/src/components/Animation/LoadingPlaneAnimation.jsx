import React from 'react';
import "../../Style/Plane.css"

const LoadingPlaneAnimation = () => {
     return (
          <div>
               <div className='scale-50'>
                    <div className="paperplane">
                         <div className="plane">
                              <div className="wingRight"></div>
                              <div className="wingLeft"></div>
                              <div className="bottom"></div>
                              <div className="top"></div>
                              <div className="middle"></div>
                         </div>
                         <div className="clouds">
                              <div className="cloudOne"></div>
                              <div className="cloudTwo"></div>
                              <div className="cloudThree"></div>
                         </div>
                    </div>
               </div>
               <div className='mx-auto h-fit w-fit -translate-y-36'>
                    <span className="loading-dots h-fit">.</span>
                    <span className="loading-dots h-fit">.</span>
                    <span className="loading-dots h-fit">.</span>
               </div>
          </div>
     )
}

export default LoadingPlaneAnimation