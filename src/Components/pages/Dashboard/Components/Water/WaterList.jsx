///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/Fonts.css'
import water2 from '../../../../../assets/images/water2.png'
import drop from '../../../../../assets/images/drop.png'
import EmptyList from '../EmptyList'

const WaterList = (props) => {

  // =========NAVIGATION CONSTANT=============
  const navigate = useNavigate()

  return (
    <>

{/* ==============HEADING===================== */}
<div className="flex items-center gap-2 md:text-base  font-serif font-semibold text-gray-700 2xl:text-base text-sm mb-2 animate__animated animate__fadeIn">
            <img src={drop} alt="" srcset="" className='2xl:w-8 w-6' /> Water Connections{" "}
          </div>

{/* ===========BLANK SCREEN========= */}
{(props?.approvedApplications?.length == 0 || props?.approvedApplications == undefined) &&
              <EmptyList image={water2} title={"You don't have any water connection. Click below button to apply new connection"} subtitle={"All your water connections  will be visible here."} btnApply={"Apply New Connection"} btnView={"View Pending Applications"} apply={"/water-apply"} view={"/track-water"} length={props?.appliedList?.length}/>
}

{/* ==================MAIN================== */}
{(props?.approvedApplications?.length > 0 && props?.approvedApplications != undefined) && <>

{/* ============BUTTONS======================= */}
  <div className='flex flex-row flex-wrap gap-x-4 gap-y-2 absolute top-4 2xl:top-8 right-[23.5rem] 2xl:right-[32rem]'>
                
                <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-xs 2xl:text-md' onClick={() => navigate(`/water-apply`)}>Appy New Connection</button>
                <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-xs 2xl:text-md relative' onClick={() => navigate(`/track-water`)}>View Pending Applications
                
                {/* ==============PENDING COUNT IN BUTTON=========== */}
                <span className='absolute bg-amber-200 text-black rounded-full p-1 px-2 -top-2 -right-2 shadow-md font-semibold poppins'>{(props?.appliedList?.length == null || props?.appliedList?.length == undefined ||props?.appliedList?.length == '') ? 0 : props?.appliedList?.length}</span></button>
                
                </div>

        {/* ===========CARDS=========== */}
          {props?.approvedApplications != "" &&
              props?.approvedApplications?.map((elem, index) => (
                <div className='bg-white shadow-lg pb-2 px-4 mb-2 rounded-lg relative animate__animated animate__fadeIn animate__faster'>
                <div className='w-full py-4 rounded-lg  px-4 flex flex-col flex-wrap'>
                <div className='w-full flex flex-row flex-wrap gap-2 justify-between'>
                <div>
                                                <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{elem?.consumer_no ==''?'N/A':elem?.consumer_no }</div>
                                                <div className='text-xs text-gray-600 font-serif italic'>Connection No.</div>
                                            </div>
                                            <div>
                                                <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{elem?.applicant_name ==''?'N/A':elem?.applicant_name }</div>
                                                <div className='text-xs text-gray-600 font-serif italic'>Owner Name</div>
                                            </div>
                                            <div>
                                                <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{elem?.ward_mstr_id == "" ? (
                            "N/A"
                          ) : (
                            <>
                              {elem?.ward_name} ({elem?.ward_mstr_id})
                            </>
                          )}</div>
                                                <div className='text-xs text-gray-600 font-serif italic'>Ward No. (ID)</div>
                                            </div>
                                            <div>
                                                <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{elem?.address == "" ? "N/A" : elem?.address}</div>
                                                <div className='text-xs text-gray-600 font-serif italic'>Address</div>
                                            </div>
                    </div>

                    <hr className='2xl:h-[0.2rem] 2xl:my-4 h-[0.1rem] my-2' />
                    <div className='w-full md:w-1/4 pl-2 text-xs -mt-2 mb-2'>
<div className='font-semibold 2xl:text-base text-sm poppins'>Actions</div>
</div>
                  </div>

                  {/* ==========ACTION BUTTON============== */}
                  <div className='-mt-4 w-full flex md:flex-row md:items-center md:space-x-4 flex-col justify-center gap-2 md:gap-0 md:justify-start  flex-wrap md:pl-2 pb-2 animate__animated animate__fadeIn animate__faster'>
                    <div className='ml-2 text-white px-2 2xl:px-4 py-[0.2rem] text-xs 2xl:text-sm rounded-sm bg-indigo-500 border-indigo-400 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm  cursor-pointer poppins md:mt-0 mt-2'>
                      View Demand
                    </div>
                    <div
                      onClick={() =>
                        navigate(
                          `/water/viewApplication/${elem?.consumer_no}`
                        )
                      }
                      className=' text-white px-2 2xl:px-4 py-[0.2rem] text-xs 2xl:text-sm rounded-sm bg-indigo-500 border-indigo-400 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm  cursor-pointer poppins md:mt-0 mt-2'
                    >
                      View Details
                    </div>
                  </div>
                  
                </div>
              ))}

</>}
      
    </>
  )
}

export default WaterList

// export to : WaterIndex.jsx