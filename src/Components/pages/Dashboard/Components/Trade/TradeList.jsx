///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import { useContext } from 'react'
import '../../assets/Fonts.css'
import { contextDash } from '../../context/contextDash'
import {BiChevronsRight} from 'react-icons/bi'
import {AiFillInfoCircle} from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import team from '../../../../../assets/images/team.png'
import EmptyList from '../EmptyList'
import moment from 'moment/moment'
import { useEffect } from 'react'

const TradeList = (props) => {

  const navigate = useNavigate()

  const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${year}-${month}-${day}`;

  return (
    <>

    <div className="flex items-center gap-2 md:text-base  font-serif font-semibold text-gray-700 2xl:text-base text-sm mb-2 animate__animated animate__fadeIn">
                {" "}
                <img src={team} alt="" srcset="" className='2xl:w-8 w-6' /> My Licenses{" "}
              </div>
    
    {(props?.applicationData?.length == 0 || props?.applicationData == undefined) && <EmptyList length={props?.application?.length} image={team} title={"You don't have any licenses. Click below to apply new license."} subtitle={"All your licenses will be visible here."} btnApply={"Apply New License"} btnView={"View Pending Applications"} apply={'/trade-new-apply'} view={'/track-trade'}/>}
    
    {(props?.applicationData?.length != 0 && props?.applicationData != undefined) && 
    props?.applicationData?.map((application) => 
    <>
                    <div className='flex flex-row flex-wrap gap-x-4 gap-y-2 absolute top-4 2xl:top-8 right-[23.5rem] 2xl:right-[32rem]'>
                <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-xs 2xl:text-md' onClick={() => navigate(`/trade-new-apply`)}>Appy New License</button>
                <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-xs 2xl:text-md relative' onClick={() => navigate(`/track-trade`)}>View Pending Applications
                <span className='absolute bg-amber-200 text-black rounded-full p-1 px-2 -top-2 -right-2 shadow-md font-semibold poppins'>{(props?.application?.length == null || props?.application?.length == undefined ||props?.application?.length == '') ? 0 : props?.application?.length}</span></button>
                </div>
    <div className='bg-white shadow-lg pb-2 px-4 mb-2 rounded-lg relative animate__animated animate__fadeIn animate__faster'>
            <div className='w-full py-4 rounded-lg  px-4 flex flex-col flex-wrap'>
            {application?.license_type == 'old' && <span className={`bg-red-500 border-red-300 hover:border-red-600 hover:bg-red-500 px-2 text-xs py-1 rounded-sm tracking-wider text-white font-semibold shadow-sm poppins uppercase w-max`}>
                  {application?.license_type} License
                </span>}
                {(application?.valid_upto == currentDate || application?.valid_upto < currentDate) && <span className={`bg-red-500 border-red-300 hover:border-red-600 hover:bg-red-500 px-2 text-xs py-1 rounded-sm tracking-wider text-white font-semibold shadow-sm poppins uppercase w-max`}>
                  License Expired
                </span>}
                <div className='w-full flex flex-row flex-wrap gap-2 justify-between'>
                                            <div>
                                                <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{application?.firm_name ==''?'N/A':application?.firm_name }</div>
                                                <div className='text-xs text-gray-600 font-serif italic'>Firm Name</div>
                                            </div>
                                            <div>
                                                <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{application?.application_no ==''?'N/A':application?.application_no }</div>
                                                <div className='text-xs text-gray-600 font-serif italic'>Applicant No.</div>
                                            </div>
                                            <div>
                                                <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{application?.license_no ==''?'N/A':application?.license_no }</div>
                                                <div className='text-xs text-gray-600 font-serif italic'>License No.</div>
                                            </div>
                                            <div>
                                                <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{application?.valid_from ==''?'N/A':application?.valid_from }</div>
                                                <div className='text-xs text-gray-600 font-serif italic'>Valid From</div>
                                            </div>
                                            <div>
                                                <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{application?.valid_upto ==''?'N/A':application?.valid_upto }</div>
                                                <div className='text-xs text-gray-600 font-serif italic'>Valid Upto</div>
                                            </div>
                                            </div>
                    
                    <hr className='2xl:h-[0.2rem] 2xl:my-4 h-[0.1rem] my-2' />
</div>
{
    (application?.license_type != 'old' || application?.license_type != 'rejected') && <>
    
    <div className='w-full md:w-1/4 pl-2 text-xs -mt-5 mb-2'>
<div className='font-semibold 2xl:text-base text-sm poppins'>Services</div>
</div>


        <div className='2xl:mt-0 w-full flex md:flex-row md:items-center md:space-x-4 flex-col justify-center gap-2 md:gap-0 md:justify-start  flex-wrap md:pl-2 pb-2 animate__animated animate__fadeIn animate__faster'>
{
    application?.option?.map((elem) => 
    <>

            <div onClick={() => navigate(`/trade-renewal/${application?.id}`)} className={(elem == 'RENEWAL' ? `visible` : `hidden`) +` flex-initial text-xs 2xl:text-sm poppins border border-indigo-600 text-indigo-700 px-2 shadow-inidgo-400 py-1 rounded-md cursor-pointer shadow-gray-400 hover:bg-indigo-600 transition-all duration-200 hover:text-white hover:scale-105`}>Renewal</div>
            <div onClick={() => navigate(`'/trade-amendment/${application?.id}`)} className={(elem == 'AMENDMENT' ? `visible` : `hidden`) +` flex-initial text-xs 2xl:text-sm poppins border border-indigo-600 text-indigo-700 px-2 shadow-inidgo-400 py-1 rounded-md cursor-pointer shadow-gray-400 hover:bg-indigo-600 transition-all duration-200 hover:text-white hover:scale-105`}>Amendment</div>
           <div onClick={() => navigate(`/trade-surrender/${application?.id}`)} className={(elem == 'SURRENDER' ? `visible` : `hidden`) +` flex-initial text-xs 2xl:text-sm poppins border border-indigo-600 text-indigo-700 px-2 shadow-inidgo-400 py-1 rounded-md cursor-pointer shadow-gray-400 hover:bg-indigo-600 transition-all duration-200 hover:text-white hover:scale-105`}>Surrender</div>

    </>)
} </div>
    </>
}
<span onClick={() => navigate(`/trade-view/${application?.id}`)} className=' text-white px-2 2xl:px-4 py-[0.2rem] text-xs 2xl:text-sm md:absolute bottom-3 2xl:bottom-2 right-4 rounded-sm bg-indigo-500 border-indigo-400 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm  cursor-pointer poppins md:mt-0 mt-2'>View Details<BiChevronsRight className="inline font-semibold text-xl" /></span>
            </div>
            
        
    
   
    
    </>
    )
    }
          
        </>
  )
}

export default TradeList

// export to : TradeIndex.jsx