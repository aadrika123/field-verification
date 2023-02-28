import React, { useEffect, useState } from 'react'
import CommonLoader from '../../Common/CommonLoader'
import PropertyApiList from '../../../api/PropertyApiList'
import ApiHeader from '../../../api/ApiHeader'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {FcCamera} from 'react-icons/fc'

const HarvestingVerificationIndex = () => {
    
    const [loader, setloader] = useState(false)
    const [applicationData, setapplicationData] = useState()

    const {get_HarvestingDetailsById} = PropertyApiList()

    const {id} = useParams()

    useEffect(() => {
        setloader(true)

      axios.post(get_HarvestingDetailsById, {applicationId : id}, ApiHeader())
      .then((res) => {
        console.log('success => ', res)
        setloader(false)
      })
      .catch((err) => {
        console.log("errror => ", err)
        setloader(false)
      })
    }, [])
    

  return (
    <>
    
    {loader && <CommonLoader />}

        <div className='w-full'>
            <h1 className=' text-center font-bold text-xl border-b-2 border-gray-700 mx-4'>Field Verification <br />
            Rain Water Harvesting </h1>
        <div className='p-4 flex flex-col gap-y-4'>
            {/* <div className='w-full items-center justify-center px-4 shadow-sm flex md:flex-row flex-col flex-wrap gap-2 md:justify-evenly bg-indigo-50'>
                <span className="grid grid-cols-12 w-full text-sm gap-2 my-1"><span className='col-span-6'>Your Application No.:</span> <span className="font-semibold text-base col-span-6">{applicationData?.saf_no}</span></span>
                <span className="grid grid-cols-12 w-full text-sm  gap-2 my-1"><span className='col-span-6'>Application Type:</span> <span className="font-semibold text-base col-span-6">{applicationData?.assessment_type}</span></span>
                <span className="grid grid-cols-12 w-full text-sm  gap-2 my-1"><span className='col-span-6'>Apply Date:</span> <span className="font-semibold text-base col-span-6">{applicationData?.application_date}</span></span>
            </div> */}
            

            <div className={` bg-indigo-50 border-2 border-indigo-500 my-2 mx-1`}>
            <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>
                    <span>Water Harvesting Declaration</span>
                </h1>

                <div className="p-2">

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Application No.</span>
                        <span className='col-span-6'>{applicationData?.applicationNo == '' ? 'N/A' : applicationData?.applicationNo}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Does Completion of Water Harvesting is done before 31-03-2017?</span>
                        <span className='col-span-6'>{applicationData?.completionBefore2017 == '' ? 'N/A' : applicationData?.completionBefore2017}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Holding No.</span>
                        <span className='col-span-6'>{applicationData?.holdingNo == '' ? 'N/A' : applicationData?.holdingNo}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Name</span>
                        <span className='col-span-6'>{applicationData?.applicantName == '' ? 'N/A' : applicationData?.applicantName}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Guardian Name</span>
                        <span className='col-span-6'>{applicationData?.guardianName == '' ? 'N/A' : applicationData?.guardianName}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Ward No.</span>
                        <span className='col-span-6'>{applicationData?.wardNo == '' ? 'N/A' : applicationData?.wardNo}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Address</span>
                        <span className='col-span-6'>{applicationData?.propertyAddress == '' ? 'N/A' : applicationData?.propertyAddress}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Mobile No.</span>
                        <span className='col-span-6'>{applicationData?.mobileNo == '' ? 'N/A' : applicationData?.mobileNo}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Date of Completion of Water Harvesting Structure</span>
                        <span className='col-span-6'>{applicationData?.dateOfCompletion == '' ? 'N/A' : applicationData?.dateOfCompletion}</span>
                    </div> 

                    <form className="grid grid-cols-12 text-sm pb-2 border-2 border-indigo-400 px-1 py-2 rounded-md mt-4">
                        <span className=' col-span-12 font-semibold'>Water Harvesting Image</span>

                        <span className='col-span-12 my-2'>
                        <div className="grid grid-cols-12 text-sm pb-2">
                        {/* <span className=' col-span-5 font-semibold'>View</span> */}
                        <span className='col-span-12 text-center flex justify-center'><img src="" alt="image" srcset="" /></span>
                    </div> 
                        </span>

                        <div className="col-span-12">
                        <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-5 font-semibold'>Check</span>
                        <span className='col-span-7 flex gap-2' >
                            <span className='flex gap-1'>
                            <input type="radio" name="oldWardNoCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="oldWardNoCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                        </div>

                        <div className="col-span-12">
                        <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-12 grid grid-cols-12 mb-2'>
                            <span className="col-span-4 text-sm flex items-center font-semibold">Upload :</span>
                            <span className="col-span-5 text-sm"><input type="file" name="frontImage" id="" accept='.jpg, .jpeg' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span>
                            <span className='text-red-500 text-xs col-span-2 flex justify-center items-center'>OR</span>
                            <span className="col-span-1 text-sm flex items-center justify-end"><abbr title='Click to capture image'  className='cursor-pointer'><span className='text-xl'><FcCamera /></span></abbr> </span>
                        </span>
                        <span className='col-span-12 grid grid-cols-12'>
                            <span className="col-span-6 text-sm flex items-center font-semibold">Latitude :</span>
                            <span className="col-span-6 text-sm"><span className='font-semibold text-sm'></span></span>
                        </span>
                        <span className='col-span-12 grid grid-cols-12'>
                            <span className="col-span-6 text-sm flex items-center font-semibold">Longitude :</span>
                            <span className="col-span-6 text-sm"><span className='font-semibold text-sm'></span></span>
                        </span>
                    </div> 
                        </div>

                    </form>

                </div>
                

            </div>

        </div>
        
        </div>

    
    </>
  )
}

export default HarvestingVerificationIndex