//////////////////{*****}//////////////////////////////////////////
// Author - swati sharma
// Version - 1.0
// Date - 7 oct 2022
// Revision - 1
// Project - JUIDCO
// Component  - CitizenPropSafApplicationFormIndex
// DESCRIPTION - CitizenPropSafApplicationFormIndex Component
//////////////////{*****}//////////////////////////////////////////


import { useState, useEffect, useContext, useRef } from 'react'
import CitizenPropBasicDetail from './CitizenPropBasicDetail'
import CitizenPropBasicDetail2 from './CitizenPropBasicDetail2'
import CitizenPropElectricityWaterDetails from './CitizenPropElectricityWaterDetails'
import CitizenPropPropertyAddressDetails from './CitizenPropPropertyAddressDetails'
import CitizenPropOwnerDetails from './CitizenPropOwnerDetails'
import CitizenPropFloorDetails from './CitizenPropFloorDetails'
import 'react-toastify/dist/ReactToastify.css';
import FormSubmitResponse from '../../Common/ResponseScreen/FormSubmitResponse'
import { useNavigate, useParams } from 'react-router-dom'
import { contextVar } from '../../Common/context/contextVar'
import axios from 'axios'
import SafFormReview from '../CitizenSafForm/SafFormReview/SafFormReview'
import SafFormDemand from '../CitizenSafForm/SafFormReview/SafFormDemand'
import CitizenApplyApiList from '../../../api/CitizenApplyApiList'
import PropFeedbackScreen from './PropFeedbackScreen'
// import LoaderComponent from '../../Component/LoaderComponent'
import { ColorRing } from "react-loader-spinner";
import FormStatusTimeline from './FormStatusTimeline'
import ApiHeader from '../../../api/ApiHeader'
import PageNo from './PageNo'
import CommonLoader from '../../Common/CommonLoader' 
import { toast, ToastContainer } from 'react-toastify'
import SafFormReview2 from './SafFormReview/SafFormReview2'
import PropertyApiList from '../../../api/PropertyApiList'
import CitizenPropBasicDetail3 from './CitizenPropBasicDetail3'
import CitizenPropAdditionalDetails from './CitizenPropAdditionalDetails'
// import ProjectApiList from '../../../api/ProjectApiList'
import { HiArrowNarrowRight, HiArrowNarrowLeft } from 'react-icons/hi'
import { Tooltip } from 'react-tooltip'


function CitizenPropSafApplicationFormIndex() {

    const { api_getMasterData, api_postNewAssessment, api_getAllUlb, api_getHoldingDetails, api_getLocationByUlb, api_reviewCalculation, api_updateSafDetails } = CitizenApplyApiList()
    // const { api_getStaticSafDetails } = ProjectApiList()
    const { notify } = useContext(contextVar)     //////global toast function/////
    const navigate = useNavigate()
    const [formIndex, setFormIndex] = useState(1) ///{***✅ formindex specifies type of form like basicdetails at index 1 ...***}///
    const [animateform1, setAnimateform1] = useState(true) ////{***slide animation control state for BasicDetails form***}////
    const [animateform2, setAnimateform2] = useState(false)////{***slide animation control state for PropertyAddressDetails form***}///
    const [animateform3, setAnimateform3] = useState(false)//{***slide animation control state for ElectricityWaterDetails form***}//   
    const [animateform4, setAnimateform4] = useState(false)/////{*** slide animation control state for OwnerDetails form***}///
    const [animateform5, setAnimateform5] = useState(false)///{*** slide animation control state for FloorDetails form***}///
    const [animateform6, setAnimateform6] = useState(false)////{***slide animation control state for reviewForm page***}////
    const [animateform7, setAnimateform7] = useState(false)///{*** slide animation control state for formDemand page***}///
    const [animateform8, setAnimateform8] = useState(false)/////{***slide animation control state for payment page***}////
    const [animateform9, setAnimateform9] = useState(false)/////{***slide animation control state for payment page***}////
    const [preFormData, setPreFormData] = useState()///{***state variable to hold all form required data***}///
    const [safSubmitResponse, setsafSubmitResponse] = useState()////{***state variable to hold response data after submitting the saf form***}//
    const [show, setshow] = useState(false)////{***slide animation control state for BasicDetails form***}///
    const [ulbList, setulbList] = useState(false)////{***slide animation control state for BasicDetails form***}///
    const [allFormData, setAllFormData] = useState({}) //* State variable to store form data from all forms at one variable
    const [allFormPreviewData, setAllFormPreviewData] = useState({}) //* State variable to store form data from all forms at one variable
    const [responseScreenStatus, setResponseScreenStatus] = useState('')
    const [formHeadStatus, setformHeadStatus] = useState(true)
    const [loaderStatus, setLoaderStatus] = useState(false)
    const [existingPropertyDetails, setexistingPropertyDetails] = useState()
    const [safTypeCame, setsafTypeCame] = useState()
    const [ulbLocation, setulbLocation] = useState()
    const { calculatePropertyTax } = PropertyApiList();
    const [rulesetData, setrulesetData] = useState();
    const [viewLevel, setviewLevel] = useState(1);
    const [zoneList, setzoneList] = useState();
    const [zoneValue, setzoneValue] = useState(false)
    const viewRef = useRef(null)
    const [previewCloseStatus, setpreviewCloseStatus] = useState(false)


    // const moveToTop = () => {
    //     viewRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    // };


    useEffect(() => {
        if (formIndex < 7) {
            // moveToTop()
        }
        if (formIndex == 7) {
            submitRuelsetData()
        }
    }, [formIndex])


    let assTypeText = "NEW ASSESSMENT"

    //*receiving saf type 
    const { safType, safId } = useParams()


    console.log('saf type...', safType)
    ///// BACK FUN  /////
    const backFun = (formIndex) => {
        let tempFormIndex = formIndex
        //> if backward by current form index 2
        if (tempFormIndex == 2) {
            //> go to form index 1 since back from index 2
            setFormIndex(1)
            //> always setstate one index less than current index
            setAnimateform1(true)
            //> always current index setstate
            setAnimateform2(false)
        }
        if (tempFormIndex == 3) {
            setFormIndex(2)
            setAnimateform2(true)
            setAnimateform3(false)
        }
        if (tempFormIndex == 4) {
            setFormIndex(3)
            setAnimateform3(true)
            setAnimateform4(false)
        }
        if (tempFormIndex == 5) {
            setFormIndex(4)
            setAnimateform4(true)
            setAnimateform5(false)
        }
        if (tempFormIndex == 6) {
            setFormIndex(5)
            setAnimateform5(true)
            setAnimateform6(false)
        }
        if (tempFormIndex == 7) {
            setFormIndex(6)
            setAnimateform6(true)
            setAnimateform7(false)
        }
        if (tempFormIndex == 8) {
            setformHeadStatus(true)
            setFormIndex(7)
            setAnimateform7(true)
            setAnimateform8(false)
        }
        if (tempFormIndex == 9) {
            setFormIndex(8)
            setAnimateform8(true)
            setAnimateform9(false)
        }


    }

    ///// NEXT FUN /////
    const nextFun = (formIndex) => {
        let tempFormIndex = formIndex

        ///// forward by current form index 1 /////
        if (tempFormIndex == 1) {
            ///// go to form index 2 since forward from index 1////
            setFormIndex(2)

            ///// always current index setstate////
            setAnimateform1(false)

            //// always setstate one index greater than current index////
            setAnimateform2(true)
        }
        if (tempFormIndex == 2) {
            setFormIndex(3)
            setAnimateform2(false)
            setAnimateform3(true)
        }
        if (tempFormIndex == 3) {
            setFormIndex(4)
            setAnimateform3(false)
            setAnimateform4(true)
        }
        if (tempFormIndex == 4) {
            setFormIndex(5)
            setAnimateform4(false)
            setAnimateform5(true)
        }
        if (tempFormIndex == 5) {
            setFormIndex(6)
            setAnimateform5(false)
            setAnimateform6(true)
        }
        if (tempFormIndex == 6) {
            // submitRuelsetData()
            setformHeadStatus(false)

            setFormIndex(7)
            setAnimateform6(false)
            setAnimateform7(true)
        }
        if (tempFormIndex == 7) {

            // IF BO EDIT THEN DONT SHOW DEMAND ONLY UPDATE PAGE SHOW
            if (safType == 'bo-edit') {
                setFormIndex(9)
                setAnimateform7(false)
                return
            }
            setFormIndex(8)
            setAnimateform7(false)
            setAnimateform8(true)
        }
        // if (tempFormIndex == 7) {
        //     setFormIndex(8)
        //     setAnimateform7(false)
        //     setAnimateform8(true)
        // }

    }

    ///// SUBMIT FORM /////
    const submitButtonToggle = () => {
        // alert("submitted")
        submitSafForm()
    }

    ///////////{*** NEW ASSESSMENT TYPE SUBMIT FUNCTION***}/////////
    const submitSafForm = () => {
        setLoaderStatus(true)
        let token = window.localStorage.getItem('token')
        console.log('token at basic details is post method...', token)
        const header = {
            headers:
            {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }

        let correspondingAddress
        //* If corresponding address is diffrent 
        if (allFormData.propertyAddressDetails.addressCheckbox) {
            correspondingAddress = {
                corrAddress: allFormData.propertyAddressDetails.c_locality,
                corrCity: allFormData.propertyAddressDetails.c_city,
                corrDist: allFormData.propertyAddressDetails.c_district,
                corrState: allFormData.propertyAddressDetails.c_state,
                corrPinCode: allFormData.propertyAddressDetails.c_pin,
            }
        } else {//* If corresponding address is same then both address will be same
            correspondingAddress = {
                corrAddress: allFormData.propertyAddressDetails.locality,
                corrCity: allFormData.propertyAddressDetails.city,
                corrDist: allFormData.propertyAddressDetails.district,
                corrState: allFormData.propertyAddressDetails.state,
                corrPinCode: allFormData.propertyAddressDetails.pin,
            }
        }

        let assessmentSpecific
        if (safType == 'new') {
            assessmentSpecific = {
                assessmentType: 1
            }
        }
        if (safType == 're') {
            assessmentSpecific = {
                transferModeId: null,
                assessmentType: 2,
                holdingNo: existingPropertyDetails?.data?.data?.holding_no
            }
        }
        if (safType == 'mu') {
            assessmentSpecific = {
                transferModeId: 1,
                assessmentType: 3,
                holdingNo: existingPropertyDetails?.data?.data?.holding_no
            }
        }

        let requestBody

        //* REQUESTBODY FOR NEW ASSESSMENT
        if (safType == 'new') {
            requestBody = {

                // basic details
                ulbId: allFormData.basicDetails.ulbId,
                assessmentType: 1,
                ward: allFormData.basicDetails.wardNo, //done
                newWard: allFormData.basicDetails.newWardNo,
                propertyType: allFormData.basicDetails.propertyType,//done
                dateOfPurchase: '',// what is this ?
                ownershipType: allFormData.basicDetails.ownerShiptype,//done

                zone: allFormData.additionalDetails.zone,//done
                isMobileTower: allFormData.additionalDetails.mobileTowerStatus,//done
                mobileTower: {
                    area: allFormData.additionalDetails.mobileTowerArea,//done
                    dateFrom: allFormData.additionalDetails.mobileTowerDate//done
                },
                isHoardingBoard: allFormData.additionalDetails.hoardingStatus,//done
                hoardingBoard: {
                    area: allFormData.additionalDetails.hoardingArea,//done
                    dateFrom: allFormData.additionalDetails.hoardingDate,//done
                },
                isPetrolPump: allFormData.additionalDetails.petrolPumpStatus,//done
                petrolPump: {
                    area: allFormData.additionalDetails.petrolPumpArea,//done
                    dateFrom: allFormData.additionalDetails.petrolPumpDate//done
                },

                isWaterHarvesting: allFormData.additionalDetails.waterHarvestingStatus,//done

                //** ELECTRICITY & WATER DETAILS
                // electricityConnection: true,
                electricityCustNo: allFormData.electricityWaterDetails.electricityKNo,
                electricityAccNo: allFormData.electricityWaterDetails.electricityAccNo,
                electricityBindBookNo: allFormData.electricityWaterDetails.bindBookNo,
                electricityConsCategory: allFormData.electricityWaterDetails.electrictyConsumerNo,
                buildingPlanApprovalNo: allFormData.electricityWaterDetails.bpApprovalNo,
                buildingPlanApprovalDate: allFormData.electricityWaterDetails.bpApprovalDate,
                waterConnNo: allFormData.electricityWaterDetails.waterConsumerNo,
                waterConnDate: allFormData.electricityWaterDetails.waterConnectionDate,

                //** PROPERTY ADDRESS EXTRA
                khataNo: allFormData.propertyAddressDetails.khataNo,
                plotNo: allFormData.propertyAddressDetails.plotNo,
                villageMaujaName: allFormData.propertyAddressDetails.villageMaujaName,
                roadType: allFormData.propertyAddressDetails.roadWidth,//done
                areaOfPlot: allFormData.propertyAddressDetails.plotArea,//done

                //* PROPERTY ADDRESS MAIN
                propCity: allFormData?.propertyAddressDetails?.city,
                propDist: allFormData?.propertyAddressDetails?.district,
                propPinCode: allFormData?.propertyAddressDetails?.pin,
                propState: allFormData?.propertyAddressDetails?.state,
                propAddress: allFormData?.propertyAddressDetails?.locality,

                //* CORRESPONDING ADDRESS
                corrCity: correspondingAddress?.corrCity,
                corrDist: correspondingAddress?.corrDist,
                corrPinCode: correspondingAddress?.corrPinCode,
                corrState: correspondingAddress?.corrState,
                propAddress: correspondingAddress?.corrAddress,

                //** owner
                owner: allFormData.ownerDetails,

                //** floor
                floor: allFormData.floorDetails //done


            }
        }

        //* REQUESTBODY FOR RE-ASSESSMENT
        if (safType == 're') {
            requestBody = {

                // basic details
                ulbId: allFormData.basicDetails.ulbId,
                previousHoldingId: safId,
                transferModeId: null,
                assessmentType: 2,
                // propertyAssessment:existingPropertyDetails?.data?.data?.assessment_type, //previous assessment type of this property
                holdingNo: existingPropertyDetails?.data?.data?.holding_no,
                ward: allFormData.basicDetails.wardNo, //done
                newWard: allFormData.basicDetails.newWardNo,
                propertyType: allFormData.basicDetails.propertyType,//done
                dateOfPurchase: '',// what is this ?
                ownershipType: allFormData.basicDetails.ownerShiptype,//done

                // zone: allFormData.basicDetails.zone,//done
                zone: 1,//done
                isOwnerChanged: 0,
                landOccupationDate: null,
                isMobileTower: allFormData.additionalDetails.mobileTowerStatus,//done
                mobileTower: {
                    area: allFormData.additionalDetails.mobileTowerArea,//done
                    dateFrom: allFormData.additionalDetails.mobileTowerDate//done
                },
                isHoardingBoard: allFormData.additionalDetails.hoardingStatus,//done
                hoardingBoard: {
                    area: allFormData.additionalDetails.hoardingArea,//done
                    dateFrom: allFormData.additionalDetails.hoardingDate,//done
                },
                isPetrolPump: allFormData.additionalDetails.petrolPumpStatus,//done
                petrolPump: {
                    area: allFormData.additionalDetails.petrolPumpArea,//done
                    dateFrom: allFormData.additionalDetails.petrolPumpDate//done
                },

                isWaterHarvesting: allFormData.additionalDetails.waterHarvestingStatus,//done

                //** ELECTRICITY & WATER DETAILS
                // electricityConnection: true,
                electricityCustNo: allFormData.electricityWaterDetails.electricityKNo,
                electricityAccNo: allFormData.electricityWaterDetails.electricityAccNo,
                electricityBindBookNo: allFormData.electricityWaterDetails.bindBookNo,
                electricityConsCategory: allFormData.electricityWaterDetails.electrictyConsumerNo,
                buildingPlanApprovalNo: allFormData.electricityWaterDetails.bpApprovalNo,
                buildingPlanApprovalDate: allFormData.electricityWaterDetails.bpApprovalDate,
                waterConnNo: allFormData.electricityWaterDetails.waterConsumerNo,
                waterConnDate: allFormData.electricityWaterDetails.waterConnectionDate,

                //** PROPERTY ADDRESS EXTRA
                khataNo: allFormData.propertyAddressDetails.khataNo,
                plotNo: allFormData.propertyAddressDetails.plotNo,
                villageMaujaName: allFormData.propertyAddressDetails.villageMaujaName,
                roadType: allFormData.propertyAddressDetails.roadWidth,//done
                areaOfPlot: allFormData.propertyAddressDetails.plotArea,//done

                //* PROPERTY ADDRESS MAIN
                propCity: allFormData?.propertyAddressDetails?.city,
                propDist: allFormData?.propertyAddressDetails?.district,
                propPinCode: allFormData?.propertyAddressDetails?.pin,
                propState: allFormData?.propertyAddressDetails?.state,
                propAddress: allFormData?.propertyAddressDetails?.locality,

                //* CORRESPONDING ADDRESS
                corrCity: correspondingAddress?.corrCity,
                corrDist: correspondingAddress?.corrDist,
                corrPinCode: correspondingAddress?.corrPinCode,
                corrState: correspondingAddress?.corrState,
                propAddress: correspondingAddress?.corrAddress,

                //** owner
                owner: allFormData.ownerDetails,

                //** floor
                floor: allFormData.floorDetails //done


            }
        }


        //* REQUESTBODY FOR MUTATION
        if (safType == 'mu') {
            requestBody = {

                // basic details
                dateOfPurchase: allFormData.basicDetails.dateOfPurchase,
                ulbId: allFormData.basicDetails.ulbId,
                previousHoldingId: safId,
                transferModeId: 1,
                assessmentType: 3,
                // propertyAssessment:existingPropertyDetails?.data?.data?.assessment_type, //previous assessment type of this property
                holdingNo: existingPropertyDetails?.data?.data?.holding_no,
                ward: allFormData.basicDetails.wardNo, //done
                newWard: allFormData.basicDetails.newWardNo,
                propertyType: allFormData.basicDetails.propertyType,//done
                ownershipType: allFormData.basicDetails.ownerShiptype,//done

                zone: allFormData.additionalDetails.zone,//done
                isOwnerChanged: 1,
                isMobileTower: allFormData.additionalDetails.mobileTowerStatus,//done
                mobileTower: {
                    area: allFormData.additionalDetails.mobileTowerArea,//done
                    dateFrom: allFormData.additionalDetails.mobileTowerDate//done
                },
                isHoardingBoard: allFormData.additionalDetails.hoardingStatus,//done
                hoardingBoard: {
                    area: allFormData.additionalDetails.hoardingArea,//done
                    dateFrom: allFormData.additionalDetails.hoardingDate,//done
                },
                isPetrolPump: allFormData.additionalDetails.petrolPumpStatus,//done
                petrolPump: {
                    area: allFormData.additionalDetails.petrolPumpArea,//done
                    dateFrom: allFormData.additionalDetails.petrolPumpDate//done
                },

                isWaterHarvesting: allFormData.additionalDetails.waterHarvestingStatus,//done
                //** ELECTRICITY & WATER DETAILS
                // electricityConnection: true,
                electricityCustNo: allFormData.electricityWaterDetails.electricityKNo,
                electricityAccNo: allFormData.electricityWaterDetails.electricityAccNo,
                electricityBindBookNo: allFormData.electricityWaterDetails.bindBookNo,
                electricityConsCategory: allFormData.electricityWaterDetails.electrictyConsumerNo,
                buildingPlanApprovalNo: allFormData.electricityWaterDetails.bpApprovalNo,
                buildingPlanApprovalDate: allFormData.electricityWaterDetails.bpApprovalDate,
                waterConnNo: allFormData.electricityWaterDetails.waterConsumerNo,
                waterConnDate: allFormData.electricityWaterDetails.waterConnectionDate,

                //** PROPERTY ADDRESS EXTRA
                khataNo: allFormData.propertyAddressDetails.khataNo,
                plotNo: allFormData.propertyAddressDetails.plotNo,
                villageMaujaName: allFormData.propertyAddressDetails.villageMaujaName,
                roadType: allFormData.propertyAddressDetails.roadWidth,//done
                areaOfPlot: allFormData.propertyAddressDetails.plotArea,//done

                //* PROPERTY ADDRESS MAIN
                propCity: allFormData?.propertyAddressDetails?.city,
                propDist: allFormData?.propertyAddressDetails?.district,
                propPinCode: allFormData?.propertyAddressDetails?.pin,
                propState: allFormData?.propertyAddressDetails?.state,
                propAddress: allFormData?.propertyAddressDetails?.locality,

                //* CORRESPONDING ADDRESS
                corrCity: correspondingAddress?.corrCity,
                corrDist: correspondingAddress?.corrDist,
                corrPinCode: correspondingAddress?.corrPinCode,
                corrState: correspondingAddress?.corrState,
                propAddress: correspondingAddress?.corrAddress,

                //** owner
                owner: allFormData.ownerDetails,

                //** floor
                floor: allFormData.floorDetails //done


            }
        }

        console.log('form submit request body....', requestBody)

        //* setting api urls for new, re and mutation case
        // let url
        // if(safType=='new'){
        //     url = api_postNewAssessment
        // }
        // if(safType=='re'){
        //     url = api_postNewAssessment
        // }
        // if(safType=='mu'){
        //     url = api_postNewAssessment
        // }

        // return
        axios.post(`${api_postNewAssessment}`, requestBody, ApiHeader())
            .then(function (response) {
                // setloader(false)
                console.log('response after pushing saf data', response)
                if (response?.data?.status) {
                    // notify('Saf Successfull submitted...','success')
                    toast.success("SAF Successfully Submitted !!")
                    setsafSubmitResponse(response.data)
                    setLoaderStatus(false)
                    nextFun(7)
                } else {
                    notify('Something went wrong in applying', 'error')
                    setLoaderStatus(false)
                }


            })
            .catch(function (error) {
                console.log('error in submitting saf form ', 'error');
                // notify('Something went wrong','error')
                toast.error("Something went wrong !!")
                setLoaderStatus(false)
            })
    }

    ///////////{*** COLLECTING ALL FORM DATA***}/////////
    const collectAllFormData = (key, formData, previewFormData) => {
        console.log('floor list at collection........', formData)
        //*previewformdata coming empty if floor case
        console.log('floor preview list at collection........', previewFormData)
        console.log('prev of all Data', allFormData)
        setAllFormData({ ...allFormData, [key]: formData })

        //* storing data to preview
        //* in case to change data via select box
        if (key == 'basicDetails' || key == 'ownerDetails' || key == 'floorDetails') {
            console.log('data at collection via of key ===', key, '===', formData, 'preview...', previewFormData)
            setAllFormPreviewData({ ...allFormPreviewData, [key]: previewFormData })
        } else {
            //** no need to change data
            console.log('data not in preview ===', key, '===', formData, 'preview...', previewFormData)
            setAllFormPreviewData({ ...allFormPreviewData, [key]: formData })

        }
    }

    // console.log("all data abc => ", allFormData, "preview data",  allFormPreviewData)

    ///////////{*** GETTING MASTER DATA***}/////////
    useEffect(() => {

        setsafTypeCame(safType)
        fetchMasterData()
        fetchULBList()
        if (safType == 're' || safType == 'mu') {
            fetchPropertyDetails()
        }

    }, [])

    const fetchMasterData = () => {

        axios.get(`${api_getMasterData}`, ApiHeader())
            .then(function (response) {
                console.log('saf master data ....', response.data.data)
                setPreFormData(response.data.data)
            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
    }
    const fetchULBList = () => {
        // api/get-all-ulb
        axios.get(`${api_getAllUlb}`, ApiHeader())
            .then(function (response) {
                console.log('ulb list...', response)
                setulbList(response?.data)
            })
            .catch(function (error) {
                console.log('ulb list error.... ', error);
            })
    }


    const fetchPropertyDetails = () => {

        let requestBody = {
            propertyId: safId
            // propertyId: 54 //staic for checking
        }
        setLoaderStatus(true)

        console.log('body before finding prop', requestBody)
        axios.post(`${api_getHoldingDetails}`, requestBody, ApiHeader())
            .then(function (response) {
                console.log('getting property detail for re assesment ...', response)
                setexistingPropertyDetails(response)
                setLoaderStatus(false)
            })
            .catch(function (error) {
                console.log('==2 details by id error...', error)
                setLoaderStatus(false)
            })
    }

    if (responseScreenStatus == 'success') {
        return (
            <>
                <FormSubmitResponse />
            </>
        )
    }

    // console.log('==after changed allformdata==.....',allFormData, allFormPreviewData)

    const showLoader = (value) => {
        setshow(value);
    }
    const getLocationByUlb = (ublId) => {
        let requestBody = {
            ulbId: ublId
        }
        console.log('before ulbi', requestBody)
        axios.post(`${api_getLocationByUlb}`, requestBody, ApiHeader())
            .then(function (response) {
                console.log('location by ulbid ...', response)
                setulbLocation(response?.data?.data)
            })
            .catch(function (error) {
                console.log('==2 details by id error...', error)
            })
    }

    const submitRuelsetData = () => {
        // return
        // setsubmitButtonStatus(false);
        setLoaderStatus(true);
        console.log("--1--at submitRuelsetData");
        let astType
        // if(afType == 'new'){

        // }
        // activating loader
        const requestBody = {
            ulbId: allFormData.basicDetails.ulbId,
            assessmentType: "1",
            // ward: basicDetails?.wardNo,
            ward: allFormData?.basicDetails?.wardNo,
            newWard: allFormData?.basicDetails?.newWardNo,
            ownershipType: allFormData?.basicDetails?.ownerShiptype,
            propertyType: allFormData?.basicDetails?.propertyType,
            zone: allFormData?.additionalDetails?.zone,
            isMobileTower: allFormData?.additionalDetails?.mobileTowerStatus,//done
            mobileTower: {
                area: allFormData?.additionalDetails?.mobileTowerArea,//done
                dateFrom: allFormData?.additionalDetails?.mobileTowerDate//done
            },
            isHoardingBoard: allFormData?.additionalDetails?.hoardingStatus,//done
            hoardingBoard: {
                area: allFormData?.additionalDetails?.hoardingArea,//done
                dateFrom: allFormData?.additionalDetails?.hoardingDate,//done
            },
            isPetrolPump: allFormData?.additionalDetails?.petrolPumpStatus,//done
            petrolPump: {
                area: allFormData?.additionalDetails?.petrolPumpArea,//done
                dateFrom: allFormData?.additionalDetails?.petrolPumpDate//done
            },

            isWaterHarvesting: allFormData.additionalDetails.waterHarvestingStatus,

            roadType: allFormData.propertyAddressDetails.roadWidth,
            areaOfPlot: allFormData.propertyAddressDetails.plotArea,
            floor: allFormData?.floorDetails,
            owner: allFormData?.ownerDetails,
        };

        console.log("--2--before fetch ruleset data at preview....", requestBody);

        // return
        axios
            .post(api_reviewCalculation, requestBody, ApiHeader())
            .then(function (response) {
                console.log("==3 cacluator tax response===", response);
                setrulesetData(response?.data);
                setLoaderStatus(false)

                // setisLoading(false);
                // setsubmitButtonStatus(true);
            })
            .catch(function (error) {
                console.log("== 3 calcualte tax error== ", error);
                notify(`Something went wrong`, "error");
                setLoaderStatus(false)
                // setisLoading(false);
                // setsubmitButtonStatus(true);
            });
    };

    return (
        <>
            <ToastContainer autoClose={2000} position="top-center" />
            {loaderStatus && <CommonLoader />}

            <div className='text-center font-bold text-gray-700 text-xl border-b-2 border-gray-700 mx-4 mb-4'>
            Applying For {safType == 'new' && 'New Assessment'}  {safType == 're' && 'Re Assessment'}  {safType == 'mu' && 'Mutation'} <br />
            {safType != 'new' && formHeadStatus &&
                            <div className='relative font-bold text-gray-700  text-2xl text-center'><span className='text-gray-500'>Holding No.</span> {existingPropertyDetails?.data?.data?.holding_no}</div>}
            </div>
            

                <div className="w-full">

                {(formIndex < 7) && <div className='text-xs mb-1 mx-4'>Page No.: {formIndex}/6</div>}
                                {formIndex < 8 && <>
                                    {animateform1 && <CitizenPropBasicDetail3 setzoneList={setzoneList} getLocationByUlb={getLocationByUlb} safType={safType} existingPropertyDetails={existingPropertyDetails} prevData={allFormData?.basicDetails} ulbList={ulbList} preFormData={preFormData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} formIndex />}
                                    {animateform2 && <CitizenPropPropertyAddressDetails ulbLocation={ulbLocation} safType={safType} existingPropertyDetails={existingPropertyDetails} prevData={allFormData?.propertyAddressDetails} preFormData={preFormData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} formIndex />}
                                    {animateform3 && <CitizenPropElectricityWaterDetails safType={safType} existingPropertyDetails={existingPropertyDetails} prevData={allFormData?.electricityWaterDetails} preFormData={preFormData} collectFormDataFun={collectAllFormData} backFun={backFun} nextFun={nextFun} formIndex />}
                                    {animateform4 && <CitizenPropOwnerDetails safType={safType} existingPropertyDetails={existingPropertyDetails} prevData={allFormData?.ownerDetails} preFormData={preFormData} assType={assTypeText} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} formIndex />}
                                    {animateform5 && <CitizenPropFloorDetails safType={safType} existingPropertyDetails={existingPropertyDetails} prevData={allFormData?.floorDetails} preFormData={preFormData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} formIndex />}
                                    {animateform6 && <CitizenPropAdditionalDetails submitRuelsetData={submitRuelsetData} zoneValue={zoneValue} setzoneValue={setzoneValue} zoneList={zoneList} getLocationByUlb={getLocationByUlb} safType={safType} existingPropertyDetails={existingPropertyDetails} prevData={allFormData?.additionalDetails} ulbList={ulbList} preFormData={preFormData} collectFormDataFun={collectAllFormData} allFormData={allFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} formIndex />}
                                    {(formIndex == 7 && animateform7) && <SafFormReview safType={safType} zoneValue={zoneValue} rulesetData={rulesetData} formReviewData={allFormPreviewData} collectFormDataFun={collectAllFormData} submitFun={submitButtonToggle} toastFun={notify} backFun={backFun} nextFun={nextFun} />}
                                </>}
                </div>
                               

                                {/*//> after successfully form submit show safformdemand page */}
                                {(formIndex == 8 && animateform8) && <SafFormDemand toastFun={notify} backFun={backFun} nextFun={nextFun} safSubmitResponse={safSubmitResponse} showLoader={showLoader} />}
                                {(formIndex == 9 && animateform9) && 
                                    <div>
                                        <div>Changes Saved Successfully !</div>
                                        <button type="button" className="px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Back to Workflow</button>
                                    </div>
                                }
                            
        </>
    )
}

export default CitizenPropSafApplicationFormIndex