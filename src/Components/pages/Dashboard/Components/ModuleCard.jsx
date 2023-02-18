///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ModuleCard = (props) => {

  // =======NAVIGATE CONSTANT==========
  const navigate = useNavigate()

  // ========TRACK BUTTON ACTION==============
  const actionFun = () => {
    props?.label == 'Property' && navigate('/safform/new/0')
    props?.label == 'Water' && navigate('/water-apply')
    props?.label == 'Trade' && navigate('/trade-apply')
  }

  // ===========CARD CLICK ACTION===============
  const cardAction = () => {
    props?.label == 'Property' && navigate('/search/property')
    props?.label == 'Water' && navigate('/search/water')
    props?.label == 'Trade' && navigate('/search/trade')
  }


  // =============CSS STYLE VARIABLES==============
  let cardStyle = 'md:w-max w-full rounded-tl-md rounded-br-md hover:scale-105 transition-all duration-300  shadow-md text-sm bg-indigo-50 flex flex-row hover:shadow-lg shadow-indigo-200 hover:shadow-indigo-200'

  let buttonStyle = 'z-[999] px-2 py-1 text-xs 2xl:text-sm rounded-md hover:shadow-md bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer poppins'

  return (
    <>
    
    {/* ========MAIN=========== */}
    <div className={cardStyle}>

                {/* =========IMAGE LEFT PART========= */}
                <img className='w-20 2xl:w-24 rounded-r-full p-2 2xl:p-4 bg-indigo-300 cursor-pointer ' src={props?.image} onClick={() => cardAction()}/>
                
                {/* ============CONTENT RIGHT PART============== */}
                <div className='px-4 2xl:px-6 py-2 2xl:py-4 flex flex-col gap-2 2xl:gap-4 justify-center items-center'>

                  {/* ===========CARD LABEL============== */}
                    <div className='text-base 2xl:text-xl font-semibold poppins cursor-pointer ' onClick={() => cardAction()}>
                    {props?.label}
                    </div>

                    {/* =========BUTTONS============== */}
                    <div className='flex flex-row gap-x-2 2xl:gap-x-4'>

                      {/* ==========APPLY BUTTON=========== */}
                        <button className={buttonStyle} 
                        onClick={() => navigate(`${props?.search}`)}
                        id={`${props?.label}1`} data-tooltip-content={`Click to search and verify ${props?.label}`}
                        >Field Verification</button>

                        {/* ============TRACK BUTTON=========== */}
                        <button className={buttonStyle} onClick={() => actionFun()} id={`${props?.label}2`} data-tooltip-content={`Click to apply ${props?.label}`}>Apply</button>
                    </div>
                </div>
            </div>

            {/* ===========TOOLTIP============== */}
            <ReactTooltip anchorId={`${props?.label}1`} place="bottom" type="info" effect="float" className='poppins text-xs bg-indigo-600 text-white' />
            <ReactTooltip anchorId={`${props?.label}2`} place="bottom" type="info" effect="float" className='poppins text-xs bg-indigo-600 text-white' />
    
    </>
  )
}

export default ModuleCard

// export to: Module