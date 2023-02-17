import React from 'react'

const FloorPreview = (props) => {
  console.log('gettting in floor ', props?.floorList, props?.usageList, props?.occupancyList, props?.constructionList)
  return (
    <>
    
    <div className='border-2 border-blue-700 bg-blue-50 mb-4'>
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>
                    <span>Floor Details (Preview)</span>
                </h1>
                            {
                                props?.data?.map((data, index) => (
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
                    
                </div>
            </div>

           
                                    </>
                                ))
                            }
 </div>

    </>
  )
}

export default FloorPreview