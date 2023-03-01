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
import { useLocation, useNavigate } from 'react-router-dom'
import GeoIndex from '../GeoTagging/GeoIndex'
import SubmissionScreen from '../../Common/SubmissionScreen'
import ForwardScreen from '../../Common/ForwardScreen'

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
    const [submitStatus, setsubmitStatus] = useState(false)
    const [forwardStatus, setforwardStatus] = useState(false)

    const [basicDetails, setbasicDetails] = useState()
    const [extraDetails, setextraDetails] = useState()
    const [remarksDetails, setremarksDetails] = useState()
    const [floorDetails, setfloorDetails] = useState()
    const [allData, setallData] = useState()
    const [allFormData, setallFormData] = useState()
    const [updatedData, setupdatedData] = useState()
    const [forward, setforward] = useState(false)

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
    // val == 4 && mergeFloorFun()
  }

  const backFun = (val) => {
    setpageNo(val-1)
  }

  const collectDataFun = (key, formData) => {
    console.log('prev of all Data', allFormData)
    setallFormData({ ...allFormData, [key]: formData })
}

// const mergeFloorFun = () => {
//   const mergedArray = allFormData.floor.concat(allFormData.addFloor);
// setupdatedData( {
//     ...allFormData,
//     floor: mergedArray,
//   });
// }

console.log('merged data => ', allFormData?.floor?.concat(allFormData?.addFloor))

  const submitFun = () => {

    role == '["ULB Tax Collector"]' && setforwardStatus(true)

    setloader(true)

    // val == 'false' && toast.error('Something went wrong !!!')

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
      floor : allFormData?.floor?.concat(allFormData?.addFloor)
    }

    console.log('request body => ', body)

    axios.post(post_SiteVerification, body, ApiHeader())
    .then((res) => {
      if(res?.data?.status == true){
      console.log("success => ", res)
      role != '["ULB Tax Collector"]' && toast.success('Data Submitted Successfully !!!')
      setloader(false)
      role == '["ULB Tax Collector"]' && setforward(true)
      role == '["ULB Tax Collector"]' && navigate('/search/property')
      // navigate('/geoTagging/' + props?.applicationData?.id)
      // props.page(5)
      setsubmitStatus(true)
    }
    if(res?.data?.status == false){
      console.log("error => ", res)
      toast.error('Something went wrong !!!')
      setloader(false)
      role == '["ULB Tax Collector"]' && setforward(false)
      role == '["ULB Tax Collector"]' && setforwardStatus(false)
    }
    })
    .catch((err) => {
      console.log('error', err)
      toast.error('Something went wrong !!!')
      setloader(false)
      role == '["ULB Tax Collector"]' && setforward(false)
      role == '["ULB Tax Collector"]' && setforwardStatus(false)
    })

  }

//   role == '["Tax Collector"]'
// role == '["ULB Tax Collector"]'

  console.log('pre data => ', allFormData)

  const location = useLocation()

  const role = localStorage.getItem('roles')

  const submitAction = () => {
    role == '["ULB Tax Collector"]' ? setforwardStatus(true) : submitFun()
  }

  return (
    <>

    {loader && <CommonLoader />}

    <ToastContainer position="top-center" autoClose={2000} />

    {role != '["ULB Tax Collector"]' && <SubmissionScreen heading={'Field Verification'} type='saf' process='verify' appNo={props?.applicationData?.saf_no} openSubmit={submitStatus} id={props?.applicationData?.id} navigation={() => navigate('/search/property')} forward={() => setforwardStatus(true)}/>}

    <ForwardScreen openScreen={forwardStatus} id={props?.applicationData?.id} closePopUp={() => setforwardStatus(false)} canSubmit={forward} navigation={() => submitFun()} />
    
        {!loader && 
        <div className='w-full'>

            {(pageNo != 6 && !loader) && <div className='text-xs mb-1'>Page No.: {pageNo}/5</div>}

            {pageNo == 1 && <BasicDetails applicationData={props?.applicationData} wardList={wardList} propertyType={propertyType} roadList={roadList} next={() => nextFun(1)} collectData={collectDataFun} preData={allFormData?.basic} />}

            {pageNo == 2 && <FloorIndex applicationData={props?.applicationData?.floors} usageType={usageType} occupancyType={occupancyType} constructionList={constructionList} floorList={floorList} next={() => nextFun(2)} back={() => backFun(2)} collectData={collectDataFun} preData={allFormData} />}

            {pageNo == 3 && <ExtraDetails applicationData={props?.applicationData} next={() => nextFun(3)} back={() => backFun(3)} collectData={collectDataFun} preData={allFormData?.extra}  />}

            {pageNo == 4 && <Remarks next={() => nextFun(4)} back={() => backFun(4)} collectData={collectDataFun} preData={allFormData?.remarks}  />}

            {(pageNo == 5 && !loader) && <Preview next={() => submitAction()} back={() => backFun(5)} allData={allFormData} applicationData={props?.applicationData} wardList={wardList} propertyList={propertyType} roadList={roadList} usageList={usageType} occupancyList={occupancyType} constructionList={constructionList} floorList={floorList} /> }

        </div>}
    
    </>
  )
}

export default VerifyIndex