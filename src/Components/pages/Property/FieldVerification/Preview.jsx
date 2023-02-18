import React from 'react'
import BasicPreview from './BasicPreview'
import ExtraPreview from './ExtraPreview'
import FloorPreview from './FloorPreview'

const Preview = (props) => {

  console.log('all data', props?.allData)

  return (
    <>

    <div>

        <BasicPreview data={props?.allData?.basic} applicationData={props?.applicationData} wardList={props?.wardList} propertyList={props?.propertyList} roadList={props?.roadList} />
        <FloorPreview data={props?.allData?.floor} applicationData={props?.applicationData} usageList={props?.usageList} occupancyList={props?.occupancyList} constructionList={props?.constructionList} floorList={props?.floorList} />
        <ExtraPreview data={props?.allData?.extra} applicationData={props?.applicationData} />
        
        <div className='border-2 border-blue-700 bg-blue-50 mb-4'>
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>Remarks (Preview)</h1>
            <div className='bg-indigo-50 my-2 mx-1'>
                <span>{props?.allData?.remarks?.remarks}</span>
               </div>
            </div>
      
    </div>    

     {/* ==========Button========= */}
     <div className='w-full flex justify-between m-2'>
                <div onClick={props?.back} className='px-4 py-1.5 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 cursor-pointer'>
                    Back
                </div>
            <button onClick={props?.next} className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-green-500 hover:bg-green-600 focus:bg-green-600">Submit & Next</button>
            </div>

    </>
  )
}

export default Preview