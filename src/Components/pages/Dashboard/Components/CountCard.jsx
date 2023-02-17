///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip'

const CountCard = (props) => {

  // =======NAVIGATION CONSTANST==========
  const navigate = useNavigate()

  // =============VIEW BUTTON ACTION===============
  const actionFun = () => {
    props?.location == 'property' && navigate("/propertyDashboard")
    props?.location == 'trade' && navigate('/view-trade')
    props?.location == 'water' && navigate('/view-water')
  }

  // ==============CSS STYLE CONSTANT==============
  let buttonStyle = 'z-10 px-4 py-1 text-xs 2xl:text-sm rounded-md hover:shadow-md bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer poppins'

  return (
    <>
    
    {/* ===========MAIN============== */}
    <div className={`cursor-pointer flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-[22%] md:px-3 2xl:px-6`} onClick={() => actionFun()}>
         
         <div className={` p-4 2xl:p-6 2xl:mb-6 mb-3 shadow-lg rounded-lg border-2 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl`}>
           
           {/* ============COUNTING============== */}
           <div className="inline-block font-bold poppins 2xl:text-4xl text-2xl text-indigo-600 mb-1">
           <CountUp className='font-bold poppins' end={props?.data?.length == undefined ? 0 : props?.data?.length}/>
             </div>

             {/* ========LABEL========== */}
             <h3 className="2xl:text-lg text-sm leading-normal mb-1 2xl:mb-2 font-semibold text-gray-800 poppins">{props?.label}</h3>

             {/* =========BUTTON========== */}
             <button className={buttonStyle} onClick={() => actionFun()} id={props?.label} data-tooltip-content={`Click to view your ${props?.label} list`}>View</button>
           </div>
           
         </div>

         {/* ============TOOLTIP================== */}
         <ReactTooltip anchorId={props?.label} place="bottom" type="info" effect="float" className='poppins text-xs bg-indigo-600 text-white' />
    </>
  )
}

export default CountCard

// export to : Count.jsx