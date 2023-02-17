///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyList = (props) => {

  // ==========NAVIGATION CONSTANT=============
    const navigate = useNavigate()

  return (
    <>
    
    {/* ============MAIN================ */}
    <div className='px-20'>
                 <div className='text-sm  font-sans text-gray-700 w-full grid grid-cols-12'>
                     
                      {/* ========SPACE MANAGED============== */}
                     <div className='col-span-3 flex items-center poppins  tracking-wide text-center justify-center rounded-md w-max px-6'>
                     </div>

                     </div>

                      {/* ==========IMAGE============ */}
                     <div className='mt-0 2xl:mt-16'><img className='w-48 2xl:w-56 mx-auto ' src={props?.image} /></div>

                     {/* ===============TITLE=============== */}
                     <div className='2xl:text-3xl md:text-2xl text-xl font-semibold text-gray-700 text-center mt-0 font-serif'>{props?.title}</div>
                     
                     {/* =========SUBTITLE================ */}
                     <div className='text-center mt-2 2xl:mt-4 text-ellipsis overflow-hidden h-40 md:h-auto opacity-80 text-lg 2xl:text-xl poppins'>{props?.subtitle}</div>
                     
                     {/* ===============BUTTONS================ */}
                     <div className='col-span-12 flex gap-4 flex-row items-center justify-center mt-4 2xl:mt-8'>
                             <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-sm 2xl:text-md' onClick={() => navigate(`${props?.apply}`)}>{props?.btnApply}</button>
                             <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-sm 2xl:text-md' onClick={() => navigate(`/landingDashboard`)}>Go to Dashboard</button>
                             <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-sm 2xl:text-md relative' onClick={() => navigate(`${props?.view}`)}>{props?.btnView} 
                             
                             {/* ============COUNT IN BUTTON========== */}
                             <span className='absolute bg-amber-200 text-black rounded-full p-1 px-2 -top-2 -right-2 shadow-md font-semibold poppins'>{(props?.length == null || props?.length == undefined ||props?.length == '') ? 0 : props?.length}</span></button>

                         </div>
                         
                 </div>

    </>
  )
}

export default EmptyList

// export to : WaterList.jsx, WaterPending.jsx, TradeList.jsx, TradePending.jsx