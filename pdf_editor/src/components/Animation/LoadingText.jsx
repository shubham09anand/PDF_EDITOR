import React from 'react'
import ".././../Style/LoadingText.css"
const LoadingText = () => {
     return (
          <div className=''>
               <span className="loading-dots h-fit">.</span>
               <span className="loading-dots h-fit">.</span>
               <span className="loading-dots h-fit">.</span>
          </div>
     )
}

export default LoadingText