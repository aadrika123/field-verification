import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProjectApiList from '../../../api/ProjectApiList'
import CommonLoader from '../../Common/CommonLoader'
import axios from 'axios'
import ApiHeader from '../../../api/ApiHeader'
import VerifyIndex from './VerifyIndex'
import {contextVar} from '../../Common/context/contextVar'

const VerifyForm = () => {

    const contextData = {
       
    }

    const [applicationData, setapplicationData] = useState()

    const [loader, setloader] = useState(false)

    const {api_getStaticSafDetails} = ProjectApiList()

    const {id} = useParams()

    useEffect(() => {

        setTimeout(() => {
            setloader(false)
        }, 10000);

        setloader(true)

        fetchApplicationData()

    },[])

    const fetchApplicationData = () => {
        axios.post(api_getStaticSafDetails, {applicationId : id}, ApiHeader())
        .then((res) => {
            console.log("getting application data => ", res)
            setloader(false)
            setapplicationData(res?.data?.data)
        })
        .catch((err) => {
            console.log("getting application data error => ", err)
            setloader(false)
        })
    }

  return (
    <>
    
    {loader && <CommonLoader />}

    <contextVar.Provider value={contextData}>
        <div className='w-full'>
            <h1 className=' text-center font-bold text-xl uppercase border-b-2 border-gray-700 mx-4'>Self Assessment <br/>  Field Verification</h1>
        <div className='p-4 flex flex-col gap-y-4'>
            <div className='w-full items-center justify-center px-4 shadow-sm flex md:flex-row flex-col flex-wrap gap-2 md:justify-evenly bg-indigo-50'>
                <span className="grid grid-cols-12 w-full text-sm gap-2 my-1"><span className='col-span-6'>Your Application No.:</span> <span className="font-semibold text-base col-span-6">{applicationData?.saf_no}</span></span>
                <span className="grid grid-cols-12 w-full text-sm  gap-2 my-1"><span className='col-span-6'>Application Type:</span> <span className="font-semibold text-base col-span-6">{applicationData?.assessment_type}</span></span>
                <span className="grid grid-cols-12 w-full text-sm  gap-2 my-1"><span className='col-span-6'>Apply Date:</span> <span className="font-semibold text-base col-span-6">{applicationData?.application_date}</span></span>
            </div>
            <VerifyIndex applicationData={applicationData} />
        </div>
        
        </div>
    </contextVar.Provider>
    
    </>
  )
}

export default VerifyForm