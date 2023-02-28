import React from 'react'

const FloorPreview = (props) => {
  console.log('gettting in floor ', props?.data, props?.addFloor)
  console.log('app data => ', props?.applicationData?.floors)
  return (
    <>
    

                            {
                                props?.data?.map((data, index) => (
                                    <>
    <div className='border-2 border-blue-700 bg-blue-50 mb-4'>
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>
                <span> {
                          props?.floorList?.map((elem) => <>
                            {elem?.id == data.floorNo && elem?.floor_name}
                          </>)
                        } (Preview)</span>
                </h1>

                  {/* usage type */}
                <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Usage Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.floors[index]?.usage_type == '' ? 'N/A' : props?.applicationData?.floors[index]?.usage_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            {data?.useTypeStatus == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {
                          props?.usageList?.map((elem) => <>
                            {elem?.id == data.useType && elem?.usage_type}
                          </>)
                        }
                        </span>
                    </div>
                </div>
            </div>
            
            {/* occupancy type */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Occupancy Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.floors[index]?.occupancy_type == '' ? 'N/A' : props?.applicationData?.floors[index]?.occupancy_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            {data?.occupancyTypeStatus == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {
                          props?.occupancyList?.map((elem) => <>
                            {elem?.id == data.occupancyType && elem?.occupancy_type}
                          </>)
                        }
                        </span>
                    </div>
                </div>
            </div>
            
            {/* construction type */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Construction Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.floors[index]?.construction_type == '' ? 'N/A' : props?.applicationData?.floors[index]?.construction_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            {data?.constructionTypeStatus == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {
                          props?.constructionList?.map((elem) => <>
                            {elem?.id == data.constructionType && elem?.construction_type}
                          </>)
                        }
                        </span>
                    </div>
                </div>
            </div>
            
            {/* build up area */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Built Up Area</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.floors[index]?.builtup_area == '' ? 'N/A' : props?.applicationData?.floors[index]?.builtup_area}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            {data?.builtupAreaStatus == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                          {data?.buildupArea == '' ? 'N/A' : data?.buildupArea}
                        </span>
                    </div>
                </div>
            </div>

            {/* date from */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Date From</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.floors[index]?.date_from == '' ? 'N/A' : props?.applicationData?.floors[index]?.date_from}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            {data?.dateFromStatus == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {data?.dateFrom == '' ? 'N/A' : data?.dateFrom}
                        </span>
                    </div>
                </div>
            </div>

            {/* date upto */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Date Upto</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.floors[index]?.date_upto == '' ? 'N/A' : props?.applicationData?.floors[index]?.date_upto}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            {data?.dateUptoStatus == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {data?.dateUpto == '' ? 'N/A' : data?.dateUpto}
                        </span>
                    </div>
                </div>
            </div>

           </div>
                                    </>
                                ))
                            }

                            {
                              props?.addFloor?.length > 0 && <>

<div className='border-2 border-blue-700 bg-blue-50 mb-4'>
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>
                <span> Floor Added (Preview)</span>
                </h1>

                              {
                                props?.addFloor?.map((data, index) => 
                                <>
                                  <div className={` bg-indigo-50 border-2 border-indigo-500 my-2 mx-1`}>
                <div className='text-white bg-indigo-500 px-2 font-semibold flex flex-row justify-between items-center'>
                    <span> {
                          props?.floorList?.map((elem) => <>
                            {elem?.id == data.floorNo && elem?.floor_name}
                          </>)
                        }</span>
                </div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Usage Type</span>
                        <span className='col-span-6'>{data?.useType == '' ? 'N/A' : <>
                        {
                          props?.usageList?.map((elem) => <>
                            {elem?.id == data.useType && elem?.usage_type}
                          </>)
                        }
                        </>}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Occupancy Type</span>
                        <span className='col-span-6'>{data?.occupancyType == '' ? 'N/A' : <>
                        {
                          props?.occupancyList?.map((elem) => <>
                            {elem?.id == data.occupancyType && elem?.occupancy_type}
                          </>)
                        }
                        </>}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Construction Type</span>
                        <span className='col-span-6'>{data?.constructionType == '' ? 'N/A' : <>
                        {
                          props?.constructionList?.map((elem) => <>
                            {elem?.id == data.constructionType && elem?.construction_type}
                          </>)
                        }
                        </>}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Built Up Area (in Sq. Ft.)</span>
                        <span className='col-span-6'>{data?.buildupArea == '' ? 'N/A' : data?.buildupArea}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Date From</span>
                        <span className='col-span-6'>{data?.dateFrom == '' ? 'N/A' : data?.dateFrom}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Date Upto</span>
                        <span className='col-span-6'>{data?.dateUpto == '' ? 'N/A' : data?.dateUpto}</span>
                    </div>
                    
                </div>
            </div>
                                </>)
                              }
                              </div>
                              </>
                            }
 

    </>
  )
}

export default FloorPreview