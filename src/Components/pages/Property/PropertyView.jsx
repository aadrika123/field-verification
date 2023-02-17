import React from 'react'
import {BiChevronsRight} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import {AiFillInfoCircle} from 'react-icons/ai'

const PropertyView = (props) => {

    const navigate = useNavigate()
    
    console.log("getting search data => ", props?.dataList)

  return (
    <>
        <div className='w-full bg-indigo-50 shadow-md  rounded-sm pb-2 border-2 border-indigo-600 mb-4 select-none cursor-pointer' onClick={() => navigate(`/propVerify/${props?.dataList?.id}`)}>
            <div className='font-semibold bg-indigo-600 px-4 text-white'>Property Details</div>
                                            <div className='w-full rounded-lg p-4 space-b-2'>
                                                <div className='flex flex-row flex-wrap gap-x-4 gap-y-2 w-full'>

                                                        <div className='w-full md:w-[40%] grid grid-cols-12'>
                                                        <div className='col-span-6 text-xs text-gray-600'>Current Ward No.</div>
                                                            <div className='col-span-6 font-semibold text-gray-700 2xl:text-base text-sm'>{props?.dataList?.ward_no == '' ? 'N/A' : props?.dataList?.ward_no}{props?.dataList?.old_ward_no == '' ? props?.dataList?.new_ward_no : props?.dataList?.old_ward_no}</div>
                                                            
                                                        </div>

                                                        <div className='w-full md:w-[40%] grid grid-cols-12'>
                                                        <div className='col-span-6 text-xs text-gray-600'>Assessment Type</div>
                                                            <div className='col-span-6 font-semibold text-gray-700 2xl:text-base text-sm'>{props?.dataList?.assessment == '' ? 'N/A' : props?.dataList?.assessment}{props?.dataList?.assessment_type == '' ? 'N/A' : props?.dataList?.assessment_type}</div>
                                                          
                                                        </div>

                                                        <div className='w-full md:w-[40%] grid grid-cols-12'>
                                                        <div className='col-span-6 text-xs text-gray-600'>Property Type</div>
                                                            <div className='col-span-6 font-semibold text-gray-700 2xl:text-base text-sm'>{props?.dataList?.property_type == '' ? 'N/A' : props?.dataList?.property_type}</div>
                                                            
                                                        </div>

                                                        <div className='w-full md:w-[40%] grid grid-cols-12'>
                                                        <div className='col-span-6 text-xs text-gray-600'>Applicant Name</div>
                                                            <div className='col-span-6 font-semibold text-gray-700 2xl:text-base text-sm'>{props?.dataList?.owner_name == ''?'N/A':props?.dataList?.owner_name}</div>
                                                           
                                                        </div>

                                                        <div className='w-full md:w-[40%] grid grid-cols-12'>
                                                        <div className='col-span-6 text-xs text-gray-600 no-underline'>Mobile No. </div>
                                                            <div className='col-span-6 font-semibold text-gray-700 2xl:text-base text-sm'>{props?.dataList?.mobile_no  == ''?'N/A': props?.dataList?.mobile_no}</div>
                                                            
                                                        </div>
                                            
                                                        <div className='w-full md:w-[40%] grid grid-cols-12'>
                                                        <div className='col-span-6 text-xs text-gray-600'>Saf/No</div>
                                                            <div className='col-span-6 font-semibold text-gray-700 2xl:text-base text-sm'>{props?.dataList?.saf_no==''?'N/A':props?.dataList?.saf_no}</div>
                                                            
                                                        </div>

                                                        <div className='w-full md:w-[40%] grid grid-cols-12'>
                                                            <div className='col-span-6 text-xs text-gray-600'>Property Address</div>
                                                            <div className='col-span-6 font-semibold text-gray-700 2xl:text-base text-sm'>{props?.dataList?.prop_address ==''?'N/A':props?.dataList?.prop_address }</div>
                                                           
                                                        </div>

                                                        <div className='w-full md:w-[40%] grid grid-cols-12'>
                                                            <div className='col-span-6 text-xs text-gray-600'>Apply Date</div>
                                                            <div className='col-span-6 font-semibold text-gray-700 2xl:text-base text-sm'>{props?.dataList?.apply_date ==''?'N/A':props?.dataList?.apply_date}{props?.dataList?.application_date ==''?'N/A':props?.dataList?.application_date}</div>
                                                            
                                                        </div>

                                                        {/* <div className='w-full md:w-[40%] grid grid-cols-12'>
                                                            <div className='col-span-6 text-xs text-gray-600'>Forward Date</div>
                                                            <div className='col-span-6 font-semibold text-gray-700 2xl:text-base text-sm'>{props?.dataList?.forward_date ==''?'N/A':props?.dataList?.forward_date }</div>
                                                            
                                                        </div> */}

                                                </div>
                                                
                                            </div>
                                            <div onClick={() => navigate(`/propVerify/${props?.dataList?.id}`)} className='mb-2 mx-4 relative text-white px-2 2xl:px-4 py-[0.2rem] text-xs 2xl:text-sm md:absolute md:bottom-3 2xl:bottom-2 md:right-2 rounded-sm bg-indigo-500 border-indigo-400 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm  cursor-pointer poppins md:mt-0 w-max'>Verify Details<BiChevronsRight className="inline font-semibold text-xl" /></div>
         </div>
    </>
  )
}

export default PropertyView