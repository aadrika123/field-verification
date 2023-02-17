import React, { useEffect, useState } from 'react'
import ProjectApiList from '../../../api/ProjectApiList'
import CommonLoader from '../../Common/CommonLoader'
import axios from 'axios'
import ApiHeader from '../../../api/ApiHeader'
import FloorDetails from './FloorDetails'
import { useFormik } from 'formik'
import * as yup from 'yup'
import BasicDetails from './BasicDetails'
import FloorIndex from './FloorIndex'
import Remarks from './Remarks'
import Preview from './Preview'
import ExtraDetails from './ExtraDetails'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const VerifyIndex = (props) => {

  const navigate = useNavigate()

    const [wardList, setwardList] = useState()
    const [propertyType, setpropertyType] = useState()
    const [ownershipType, setownershipType] = useState()
    const [usageType, setusageType] = useState()
    const [occupancyType, setoccupancyType] = useState()
    const [roadList, setroadList] = useState()
    const [floorList, setfloorList] = useState()
    const [constructionList, setconstructionList] = useState()

    const [basicDetails, setbasicDetails] = useState()
    const [extraDetails, setextraDetails] = useState()
    const [remarksDetails, setremarksDetails] = useState()
    const [floorDetails, setfloorDetails] = useState()
    const [allData, setallData] = useState()
    const [allFormData, setallFormData] = useState()

    const [pageNo, setpageNo] = useState(1)

    const [loader, setloader] = useState(false)

    const {api_getSafMasterData, post_SiteVerification} = ProjectApiList()

    useEffect(() => {
        setloader(true)

        axios.get(api_getSafMasterData, ApiHeader())
        .then((res) => {
            console.log("getting master list => ", res)
            setloader(false)
            setwardList(res?.data?.data?.ward_master)
            setpropertyType(res?.data?.data?.property_type)
            setownershipType(res?.data?.data?.ownership_types)
            setusageType(res?.data?.data?.usage_type)
            setoccupancyType(res?.data?.data?.occupancy_type)
            setroadList(res?.data?.data?.road_type)
            setfloorList(res?.data?.data?.floor_type)
            setconstructionList(res?.data?.data?.construction_type)
        })
        .catch((err) => {
            console.log("getting master list error  => ", err)
            setloader(false)
        })
    
    }, [])

  const nextFun = (val) => {
    setpageNo(val+1)
  }

  const backFun = (val) => {
    setpageNo(val-1)
  }

  const collectDataFun = (key, formData) => {
    console.log('prev of all Data', allFormData)
    setallFormData({ ...allFormData, [key]: formData })
}

  const submitFun = () => {

    setloader(true)

    let body = {
      safId : props?.applicationData?.id,
      wardId : allFormData?.basic?.oldWardNo,
      // newWardId : allFormData?.basic?.newWardNo,
      zone : allFormData?.basic?.zone,
      propertyType : allFormData?.basic?.propertyType,
      areaOfPlot : allFormData?.basic?.areaOfPlot,
      roadWidth : allFormData?.basic?.roadType,
      isHoardingBoard : allFormData?.extra?.hoardingBoard == 'true' ? 1 : 0,
      hoardingBoard : {
        area : allFormData?.extra?.hoardingArea,
        dateFrom : allFormData?.extra?.hoardingInstallation
      },
      isMobileTower : allFormData?.extra?.mobileTower == 'true' ? 1 : 0,
      mobileTower : {
        area : allFormData?.extra?.mobileArea,
        dateFrom : allFormData?.extra?.mobileInstallation
      },
      isPetrolPump : allFormData?.extra?.petrolPump == 'true' ? 1 : 0,
      petrolPump: {
        area : allFormData?.extra?.petrolArea,
        dateFrom : allFormData?.extra?.petrolCompletion
      },
      isWaterHarvesting : allFormData?.extra?.waterHarvesting == 'true' ? 1 : 0,
      floor : allFormData?.floor
    }

    console.log('request body => ', body)

    axios.post(post_SiteVerification, body, ApiHeader())
    .then((res) => {
      console.log("success => ", res)
      toast.success('Submitted Successfully !!!')
      navigate('/search/property')
      setloader(false)
    })
    .catch((err) => {
      console.log('error', err)
      toast.error('Something went wrong !!!')
      setloader(false)
    })
  }

  return (
    <>

    {loader && <CommonLoader />}

    <ToastContainer position="top-right" autoClose={2000} />
    
        <div className='w-full'>

            {pageNo != 5 && <div className='text-xs mb-1'>Page No.: {pageNo}/4</div>}

            {pageNo == 1 && <BasicDetails applicationData={props?.applicationData} wardList={wardList} propertyType={propertyType} roadList={roadList} next={() => nextFun(1)} collectData={collectDataFun} preData={allFormData?.basic} />}

            {pageNo == 2 && <FloorIndex applicationData={props?.applicationData?.floors} usageType={usageType} occupancyType={occupancyType} constructionList={constructionList} floorList={floorList} next={() => nextFun(2)} back={() => backFun(2)} collectData={collectDataFun} preData={allFormData?.floor} />}

            {pageNo == 3 && <ExtraDetails applicationData={props?.applicationData} next={() => nextFun(3)} back={() => backFun(3)} collectData={collectDataFun} preData={allFormData?.extra}  />}

            {pageNo == 4 && <Remarks next={() => nextFun(4)} back={() => backFun(4)} collectData={collectDataFun} preData={allFormData?.remarks}  />}

            {pageNo == 5 && <Preview next={() => submitFun()} back={() => backFun(5)} allData={allFormData} applicationData={props?.applicationData} wardList={wardList} propertyList={propertyType} roadList={roadList} usageList={usageType} occupancyList={occupancyType} constructionList={constructionList} floorList={floorList} /> }


        </div>
    
    </>
  )
}

export default VerifyIndex