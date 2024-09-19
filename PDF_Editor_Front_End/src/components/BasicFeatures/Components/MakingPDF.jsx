import React from 'react'
import '../../../Style/MakingDocument.css'
const MakingPDF = ({processType}) => {
     return (
          <>
               <div id="loader" className='fixed z-50 h-screen w-screen backdrop-blur-md'>
                    <div id="shadow"></div>
                    <div id="box"></div>
                    <div className='text-lg font-semibold text-blue-900 -ml-14 pt-5'>{processType}</div>
               </div>
          </>
     )
}

export default MakingPDF