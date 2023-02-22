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
import FormSubmitResponse from '../../../Components/Common/ResponseScreen/FormSubmitResponse'
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
import ProjectApiList from '../../../api/ProjectApiList'
import { HiArrowNarrowRight, HiArrowNarrowLeft } from 'react-icons/hi'
import { Tooltip } from 'react-tooltip'


function CitizenPropSafApplicationFormIndex() {

    const { api_getMasterData, api_postNewAssessment, api_getAllUlb, api_getHoldingDetails, api_getLocationByUlb, api_reviewCalculation, api_updateSafDetails } = CitizenApplyApiList()
    const { api_getStaticSafDetails } = ProjectApiList()
    const { notify } = useContext(contextVar)     //////global toast function/////
    const navigate = useNavigate()
    const [formIndex, setFormIndex] = useState(1) ///{***✅ formindex specifies type of form like basicdetails at index 1 ...***}///
    const [animateform1, setAnimateform1] = useState('translate-x-0 mb-40') ////{***slide animation control state for BasicDetails form***}////
    const [animateform2, setAnimateform2] = useState('pl-20 translate-x-full')////{***slide animation control state for PropertyAddressDetails form***}///
    const [animateform3, setAnimateform3] = useState('pl-20 translate-x-full')//{***slide animation control state for ElectricityWaterDetails form***}//   
    const [animateform4, setAnimateform4] = useState('pl-20 translate-x-full')/////{*** slide animation control state for OwnerDetails form***}///
    const [animateform5, setAnimateform5] = useState('pl-20 translate-x-full')///{*** slide animation control state for FloorDetails form***}///
    const [animateform6, setAnimateform6] = useState('pl-20 translate-x-full')////{***slide animation control state for reviewForm page***}////
    const [animateform7, setAnimateform7] = useState('pl-20 translate-x-full')///{*** slide animation control state for formDemand page***}///
    const [animateform8, setAnimateform8] = useState('pl-20 translate-x-full')/////{***slide animation control state for payment page***}////
    const [animateform9, setAnimateform9] = useState('pl-20 translate-x-full')/////{***slide animation control state for payment page***}////
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


    const moveToTop = () => {
        viewRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };


    useEffect(() => {
        if (formIndex < 7) {
            moveToTop()
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
            setAnimateform1('translate-x-0 mb-40')
            //> always current index setstate
            setAnimateform2('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 3) {
            setFormIndex(2)
            setAnimateform2('translate-x-0 mb-40')
            setAnimateform3('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 4) {
            setFormIndex(3)
            setAnimateform3('translate-x-0 mb-40')
            setAnimateform4('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 5) {
            setFormIndex(4)
            setAnimateform4('translate-x-0 mb-40')
            setAnimateform5('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 6) {
            setFormIndex(5)
            setAnimateform5('translate-x-0 mb-40')
            setAnimateform6('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 7) {
            setFormIndex(6)
            setAnimateform6('translate-x-0 mb-40')
            setAnimateform7('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 8) {
            setformHeadStatus(true)
            setFormIndex(7)
            setAnimateform7('translate-x-0 mb-40')
            setAnimateform8('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 9) {
            setFormIndex(8)
            setAnimateform8('translate-x-0 mb-40')
            setAnimateform9('pl-20 translate-x-full mb-0')
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
            setAnimateform1(' -translate-x-full right-80 mb-0')

            //// always setstate one index greater than current index////
            setAnimateform2('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 2) {
            setFormIndex(3)
            setAnimateform2('-translate-x-full right-80 mb-0')
            setAnimateform3('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 3) {
            setFormIndex(4)
            setAnimateform3('-translate-x-full right-80 mb-0')
            setAnimateform4('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 4) {
            setFormIndex(5)
            setAnimateform4('-translate-x-full right-80 mb-0')
            setAnimateform5('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 5) {
            setFormIndex(6)
            setAnimateform5('-translate-x-full right-80 mb-0')
            setAnimateform6('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 6) {
            // submitRuelsetData()
            setformHeadStatus(false)

            setFormIndex(7)
            setAnimateform6('-translate-x-full right-80 mb-0')
            setAnimateform7('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 7) {

            // IF BO EDIT THEN DONT SHOW DEMAND ONLY UPDATE PAGE SHOW
            if (safType == 'bo-edit') {
                setFormIndex(9)
                setAnimateform7('-translate-x-full right-80 mb-0')
                return
            }
            setFormIndex(8)
            setAnimateform7('-translate-x-full right-80 mb-0')
            setAnimateform8('pl-0 translate-x-0 mb-40')
        }
        // if (tempFormIndex == 7) {
        //     setFormIndex(8)
        //     setAnimateform7('-translate-x-full right-80 mb-0')
        //     setAnimateform8('pl-0 translate-x-0 mb-40')
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

        //* REQUESTBODY FOR BO-EDIT-CASE
        if (safType == 'bo-edit') {
            requestBody = {



                //** ELECTRICITY & WATER DETAILS
                // electricityConnection: true,
                id: existingPropertyDetails?.data?.data?.id,
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
            }
        }
        let url
        if (safType == 'bo-edit') {
            url = api_updateSafDetails
        } else {
            url = api_postNewAssessment
        }
        console.log('form submit request body ....', requestBody)
        console.log('...url....', url)

        axios.post(url, requestBody, ApiHeader())
            .then(function (response) {
                // setloader(false)
                console.log('response after pushing saf data', response)
                if (response?.data?.status) {
                    // notify('Saf Successfull submitted...','success')
                    toast.success("SAF Successfully Submitted !!")
                    setsafSubmitResponse(response.data)
                    setLoaderStatus(false)
                    // IF BO EDIT CASE THEN SHOW ONLY CHANGES SAVED
                    if (safType != 'bo-edit') {
                        nextFun(7)
                    }
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
        //*previewformdata coming empty if floor case
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
        if (safType == 're' || safType == 'mu' || safType == 'bo-edit') {
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
        setLoaderStatus(true)

        console.log('inside fetchPropertyDetails....', safType)
        // return
        let url
        let requestBody
        if (safType == 'bo-edit') {
            url = api_getStaticSafDetails
            requestBody = {
                applicationId: safId
            }
        } else {
            url = api_getHoldingDetails
            requestBody = {
                propertyId: safId
            }
        }


        setLoaderStatus(true)

        console.log('body before finding prop', requestBody)
        // return
        axios.post(url, requestBody, ApiHeader())
            .then(function (response) {
                console.log('getting property detail for re assesment or updation ...', response)
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
        if (safType == 'bo-edit') {
            return
        }
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
            <ToastContainer autoClose={2000} position="top-right" />
            {loaderStatus && <CommonLoader />}
            {/* take a parent div ...style it as displayed below    ,....make it a grid with col-12 */}
            <div className='w-full grid grid-cols-1 md:grid-cols-12 gap-2 lg:grid-cols-12 px-2 md:p-6 md:px-10 md:space-x-10 '>

                <div className='col-span-12'>
                    {formHeadStatus && <span className='font-bold text-gray-700  text-2xl font-serif text-center float-center'>You Are Applying For {safType == 'new' && 'New Assessment'}  {safType == 're' && 'Re Assessment'}  {safType == 'mu' && 'Mutation'}</span>}

                    <span onClick={() => setpreviewCloseStatus(!previewCloseStatus)} className='hidden md:flex cursor-pointer px-4 py-1  float-right  justify-center items-center bg-indigo-500 rounded-full shadow-2xl border border-white hover:scale-105 hover:bg-indigo-700'>
                        {/* {!previewCloseStatus && <HiArrowNarrowRight className="text-white font-semibold" />}
                        {previewCloseStatus && <HiArrowNarrowLeft className="text-white font-semibold" />} */}
                       <Tooltip anchorId="preview-form-button" />
                        <span id="preview-form-button" data-tooltip-content={previewCloseStatus ? 'Click to open form preview' : 'Click to close form preview'} className='text-white'>{previewCloseStatus ? 'Show Preview' : 'Hide Preview'}</span>
                    </span>
                </div>

                {/* Rest of the component will go here ....it has a col-span of 9*/}
                <div className={`${formIndex >= 7 ? 'col-span-12' : (previewCloseStatus ? 'col-span-12' : 'col-span-9')} w-full h-screen overflow-x-hidden`}>

                    {/* your custom content */}
                    <div className='w-full  text-lg rounded-lg'>
                        {/* {5>4 && */}


                        {safType != 'new' && formHeadStatus &&
                            <div className='relative font-bold text-gray-700  text-2xl text-center'><span className='text-gray-500'>Holding No.</span> {existingPropertyDetails?.data?.data?.holding_no}</div>}
                        <div>
                        </div>
                        {formIndex < 7 && <div className="flex mt-5 mb-5 md:pr-6">
                            <FormStatusTimeline active={formIndex == 1 && true} index="1" level="Basic Details" verificationStatus={formIndex >= 2 && true} last={false} />
                            <FormStatusTimeline active={formIndex == 2 && true} index="2" level="Property Details" verificationStatus={formIndex >= 3 && true} last={false} />
                            <FormStatusTimeline active={formIndex == 3 && true} index="3" level="Electricity & Water" verificationStatus={formIndex >= 4 && true} last={false} />
                            <FormStatusTimeline active={formIndex == 4 && true} index="4" level="Owner Details" verificationStatus={formIndex >= 5 && true} last={false} />
                            <FormStatusTimeline active={formIndex == 5 && true} index="5" level="Floor Details" verificationStatus={formIndex >= 6 && true} last={false} />
                            {/* <PageNo formIndex={formIndex} /> */}
                            <FormStatusTimeline active={formIndex == 6 && true} index="6" level="Additional Details" verificationStatus={formIndex >= 7 && true} last={true} />
                            <PageNo formIndex={formIndex} />
                        </div>}
                        {/* <div className='mt-4 mb-2 font-serif font-semibold text-gray-600 w-full px-4'>Form 1 out of 5</div> */}
                        <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-8  py-4  md:-mt-10'>
                            <div className='col-span-8 ' ref={viewRef}>
                                {/* <LoaderComponent show={show} /> */}
                                {formIndex < 8 && <>
                                    <div className={`${animateform1} transition-all relative`}><CitizenPropBasicDetail3 setzoneList={setzoneList} getLocationByUlb={getLocationByUlb} safType={safType} existingPropertyDetails={existingPropertyDetails} ulbList={ulbList} preFormData={preFormData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} formIndex /></div>
                                    <div className={`${animateform2} transition-all relative`}><CitizenPropPropertyAddressDetails ulbLocation={ulbLocation} safType={safType} existingPropertyDetails={existingPropertyDetails} preFormData={preFormData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} formIndex /></div>
                                    <div className={`${animateform3} transition-all relative`}><CitizenPropElectricityWaterDetails safType={safType} existingPropertyDetails={existingPropertyDetails} preFormData={preFormData} collectFormDataFun={collectAllFormData} backFun={backFun} nextFun={nextFun} formIndex /></div>
                                    <div className={`${animateform4} transition-all relative`}><CitizenPropOwnerDetails safType={safType} existingPropertyDetails={existingPropertyDetails} preFormData={preFormData} assType={assTypeText} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} formIndex /></div>
                                    <div className={`${animateform5} transition-all relative`}><CitizenPropFloorDetails safType={safType} existingPropertyDetails={existingPropertyDetails} preFormData={preFormData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} formIndex /></div>
                                    <div className={`${animateform6} transition-all relative`}><CitizenPropAdditionalDetails submitRuelsetData={submitRuelsetData} zoneValue={zoneValue} setzoneValue={setzoneValue} zoneList={zoneList} getLocationByUlb={getLocationByUlb} safType={safType} existingPropertyDetails={existingPropertyDetails} ulbList={ulbList} preFormData={preFormData} collectFormDataFun={collectAllFormData} allFormData={allFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} formIndex /></div>
                                    {formIndex == 7 && <div className={`${animateform7} transition-all relative`}><SafFormReview safType={safType} zoneValue={zoneValue} rulesetData={rulesetData} formReviewData={allFormPreviewData} collectFormDataFun={collectAllFormData} submitFun={submitButtonToggle} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>}
                                </>}
                                {/*//> after successfully form submit show safformdemand page */}
                                {formIndex == 8 && <div className={`${animateform8} transition-all relative`}><SafFormDemand toastFun={notify} backFun={backFun} nextFun={nextFun} safSubmitResponse={safSubmitResponse} showLoader={showLoader} /></div>}
                                {formIndex == 9 && <div className={`${animateform8} transition-all relative`}>
                                    <div>
                                        <div>Changes Saved Successfully !</div>
                                        <button type="button" className="px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Back to Workflow</button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FeedBack Screen*/}
                {formIndex < 7 && <div className={`transition-all ${previewCloseStatus ? 'col-span-0 hidden' : 'col-span-3 block'} w-full h-screen  rounded-lg p-2 overflow-auto`}>
                    <div className=''>
                        <PropFeedbackScreen formIndex={formIndex} verificationStatus={formIndex} allFormData={allFormPreviewData} assTypeText={assTypeText} />
                    </div>
                </div>}

            </div>
        </>
    )
}

export default CitizenPropSafApplicationFormIndex