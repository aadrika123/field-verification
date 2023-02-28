import React, { useState } from 'react'

const BasicPreview = (props) => {

  return (
    <>
    
    {/* =======Basic Details============== */}
    <div className='border-2 border-blue-700 bg-blue-50 mb-4 ' >
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>Basic Detatils (Preview)</h1>

                {/* =======Old Ward No.========= */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Old Ward No.</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.old_ward_no == '' ? 'N/A' : props?.applicationData?.old_ward_no}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            {props?.data?.oldWardNoCheck == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            {
                                props?.wardList?.map((elem) => <>
                                {elem?.id == props?.data?.oldWardNo && elem?.ward_name}
                                </>)
                            }
                        </span>
                    </div>
                </div>
            </div>

            {/* =====New Ward No.======== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>New Ward No.</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.new_ward_no == '' ? 'N/A' : props?.applicationData?.new_ward_no}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            {props?.data?.newWardNoCheck == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {
                                props?.wardList?.map((elem) => <>
                                {elem?.id == props?.data?.newWardNo && elem?.ward_name}
                                </>)
                            }
                           </span>
                    </div>
                </div>
            </div>

            {/* ========Zone===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Zone</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.zone_mstr_id == '' ? 'N/A' : <>
                            {props?.applicationData?.zone_mstr_id == 1 && <>Zone-1</>}
                            {props?.applicationData?.zone_mstr_id == 2 && <>Zone-2</>}
                        </>}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            {props?.data?.zoneCheck == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {props?.data?.zone == 1 && <>Zone-1</>}
                            {props?.data?.zone == 2 && <>Zone-2</>}
                            </span>
                    </div>
                </div>
            </div>

            {/* ======Property Type===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Property Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.property_type == '' ? 'N/A' : props?.applicationData?.property_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                           {props?.data?.propertyCheck == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {
                                props?.propertyList?.map((elem) => <>
                                {elem?.id == props?.data?.propertyType && elem?.property_type}
                                </>)
                            }
                             </span>
                    </div>
                </div>
            </div>

            {/* =========Area Of Plot=========== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Area Of Plot (in decimal)</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.area_of_plot == '' ? 'N/A' : props?.applicationData?.area_of_plot}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        {props?.data?.areaCheck == 'true' ? 'Correct' : 'Incorrect'}
                        <span className='col-span-6 flex gap-2'>
                           
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            {props?.data?.areaOfPlot}
                            </span>
                    </div>
                </div>
            </div>

            {/* ======Road Type===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Road Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.road_type_master == '' ? 'N/A' : props?.applicationData?.road_type_master}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                           {props?.data?.roadCheck == "true" ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {
                                props?.roadList?.map((elem) => <>
                                {elem?.id == props?.data?.roadType && elem?.road_type}
                                </>)
                            }
                           </span>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default BasicPreview