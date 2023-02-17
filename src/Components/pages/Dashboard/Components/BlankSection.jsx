///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'

const BlankSection = (props) => {
  return (
    <>
    
    {/* ===========MAIN================== */}
        <div className='w-full border rounded-md shadow-md hover:shadow-lg flex md:flex-row flex-col justify-center gap-y-2 gap-x-2 my-4 p-4 2xl:h-[20rem] h-[15rem]'>
            
            {/* ===========IMAGE============== */}
            <div className='w-full md:w-[35%] md:p-20 flex items-center justify-center'>
            <img src={props?.image} alt="" srcset="" className='w-[35%] md:w-full' />
            </div>

            <div className='poppins text-center w-full md:w-[55%] flex flex-col gap-y-4 items-center justify-center text-base md:text-2xl font-semibold'>
                
                {/* ===========CONTENT============ */}
                <div className='poppins'>No any <span className='poppins text-indigo-700'> &nbsp; {props?.label} &nbsp; </span> applied !!</div>
                
                {/* ===========BUTTON=========== */}
                <button className='2xl:text-base text-xs border border-indigo-400 bg-indigo-600 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-600 rounded-sm shadow-indigo-400 cypress_apply_holding'>Apply {props?.label}</button>
            
            </div>
       
        </div>

    </>
  )
}

export default BlankSection

// export : LandingDashboardNew.jsx