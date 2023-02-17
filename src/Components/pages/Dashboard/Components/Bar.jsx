///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import '../assets/Fonts.css'

const Bar = (props) => {
  return (
    <>
    
    <div className='w-full flex flex-row items-center mt-12'>
        <div className='h-[0.1rem] 2xl:h-[0.15rem] w-[42%] bg-gray-500'></div><div className='w-[16%] text-center text-xs arvo '>{props?.title}</div><div className='h-[0.1rem] 2xl:h-[0.15rem] w-[42%] bg-gray-500'></div>
    </div>
    
    </>
  )
}

export default Bar

// export to : LandingDashboardNew