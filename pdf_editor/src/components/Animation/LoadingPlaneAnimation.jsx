import React from 'react';
import "../../Style/Plane.css"

const LoadingPlaneAnimation = () => {
     return (
          <div>
               <div className='scale-50'>
                    <div class="paperplane">
                         <div class="plane">
                              <div class="wingRight"></div>
                              <div class="wingLeft"></div>
                              <div class="bottom"></div>
                              <div class="top"></div>
                              <div class="middle"></div>
                         </div>
                         <div class="clouds">
                              <div class="cloudOne"></div>
                              <div class="cloudTwo"></div>
                              <div class="cloudThree"></div>
                         </div>
                    </div>
               </div>
               <div className='mx-auto h-fit w-fit -translate-y-36'>
                    <span class="loading-dots h-fit">.</span>
                    <span class="loading-dots h-fit">.</span>
                    <span class="loading-dots h-fit">.</span>
               </div>
          </div>
     )
}

export default LoadingPlaneAnimation