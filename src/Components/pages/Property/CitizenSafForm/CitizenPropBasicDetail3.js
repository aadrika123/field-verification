//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - CitizenPropBasicDetail
// >DESCRIPTION - CitizenPropBasicDetail Component
//////////////////{*****}//////////////////////////////////////////

import { useState, useEffect } from 'react'
import { FaHome } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getCurrentDate, allowFloatInput } from '../../../Components/Common/PowerUps/PowerupFunctions'
import { inputContainerStyle, commonInputStyle, inputErrorStyle, inputLabelStyle } from '../../../Components/Common/CommonTailwind/CommonTailwind'
import { useNavigate } from 'react-router-dom'
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList'
import axios from 'axios'
import ApiHeader from '../../../Components/ApiList/ApiHeader'
import { AiFillInfoCircle } from 'react-icons/ai'

function CitizenPropBasicDetail3(props) {

    const navigate = useNavigate()

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [readOnly, setreadOnly] = useState({})

    const [wardByUlb, setwardByUlb] = useState()
    const [newWardList, setnewWardList] = useState()
    const [selectedUlbId, setselectedUlbId] = useState()
    const [basicViewForm, setbasicViewForm] = useState({ mobileTowerStatus: '0', hoardingStatus: '0', petrolPumpStatus: '0', waterHarvestingStatus: '0' })

    const { api_wardByUlb, api_newWardByOldWard, api_zoneByUlb } = CitizenApplyApiList()

    console.log("ex data", props?.existingPropertyDetails?.data?.data)
    const validationSchema = yup.object({
        dateOfPurchase: yup.string(),
        transferMode: yup.string(),
        ulbId: yup.string().required('Select ULB'),
        wardNo: yup.string().required('Select ward'),
        newWardNo: yup.string().required('Select new ward'),
        ownerShiptype: yup.string().required('Select ownership type'),
        propertyType: yup.string().required('Select property'),
    })

    const initialValues = {
        transferMode: '',
        dateOfPurchase: '',
        ulbId: '',
        wardNo: '',
        newWardNo: '',
        ownerShiptype: '',
        propertyType: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values, resetForm) => {
            console.log('basic deatils ', values)
            props.collectFormDataFun('basicDetails', values, basicViewForm) //sending BasicDetails data to parent to store all form data at one container
            props.nextFun(1) //forwarding to next form level
        }
        , validationSchema
    })

    console.log("formik values", initialValues);

    const seleOptions = [
        { option: 'one', value: 1 },
        { option: 'two', value: 2 },
        { option: 'three', value: 3 },
        { option: 'four', value: 4 },
        { option: 'five', value: 5 },
        { option: 'six', value: 6 },
    ]
    const handleOnChange = (event) => {
        // console.log('input type', event.target[event.target.selectedIndex].text)
        let name = event.target.name
        let value = event.target.value
        { name == 'ulbId' && props?.getLocationByUlb(value) }
        { name == 'ulbId' && fetchWardByUlb(value) }
        { name == 'ulbId' && fetchZoneByUlb(value) }
        { name == 'wardNo' && fetchNewWardByOldWard(value) }

        //* Collecting basic details to preview
        if (event.target.type == 'select-one') {
            setbasicViewForm({ ...basicViewForm, [name]: event.target[event.target.selectedIndex].text })
        } else {
            setbasicViewForm({ ...basicViewForm, [name]: value })
        }

    };

    // GENERATING STATE KEYS FROM FORMIK FOR READONLY ATTRIBUTE TOGGLE //
    // const createFormikStateVariables = () => {
    //     let listOfInputs = Object.keys(formik.initialValues)
    //     let tempReadOnly = { ...readOnly }

    //     listOfInputs.map((data) => {
    //         tempReadOnly = { ...tempReadOnly, [data]: false }
    //     })
    //     setreadOnly(tempReadOnly)
    //     console.log('after readonly.....', tempReadOnly)

    // }
    // useEffect(() => {
    //     createFormikStateVariables()
    // }, [])
    // GENERATING STATE KEYS FROM FORMIK FOR READONLY ATTRIBUTE TOGGLE //

    useEffect(() => {
        if (props?.safType == 're' || props?.safType == 'mu' || props?.safType == 'bo-edit') {
            feedPropertyData()
        }
    }, [props?.existingPropertyDetails])

    console.log('existing property details...', props?.existingPropertyDetails?.data?.data)

    const feedPropertyData = () => {

        let previewDetails
        let basicDetails

        //* FEEDING PROPERTY DATA
        formik.setFieldValue('ulbId', props?.existingPropertyDetails?.data?.data?.ulb_id)
        // FETCH THOSE LIST WHICH COMES ONCHANGE EVEN OF ULB AND WARD AND THEN SET WARD,NEWWARD,ZONE AFTER RESPONSE
        props?.getLocationByUlb(props?.existingPropertyDetails?.data?.data?.ulb_id)
        fetchWardByUlb(props?.existingPropertyDetails?.data?.data?.ulb_id)
        setselectedUlbId(props?.existingPropertyDetails?.data?.data?.ulb_id)
        fetchZoneByUlb(props?.existingPropertyDetails?.data?.data?.ulb_id)
        fetchNewWardByOldWard(JSON.stringify(props?.existingPropertyDetails?.data?.data?.ward_mstr_id))


        formik.setFieldValue('ownerShiptype', props?.existingPropertyDetails?.data?.data?.ownership_type_mstr_id)
        formik.setFieldValue('propertyType', props?.existingPropertyDetails?.data?.data?.prop_type_mstr_id)
        // formik.setFieldValue('zone', props?.existingPropertyDetails?.data?.data?.zone_mstr_id)

        //* ARRANGING MAIN DATA
        basicDetails = {
            ulbId: props?.existingPropertyDetails?.data?.data?.ulb_id,
            wardNo: props?.existingPropertyDetails?.data?.data?.ward_mstr_id,
            newWardNo: props?.existingPropertyDetails?.data?.data?.new_ward_mstr_id,
            ownerShiptype: props?.existingPropertyDetails?.data?.data?.ownership_type_mstr_id,
            propertyType: props?.existingPropertyDetails?.data?.data?.prop_type_mstr_id,
            // zone: props?.existingPropertyDetails?.data?.data?.zone_mstr_id,

        }
        //* ARRANGING PREVIEW DATA
        previewDetails = {
            ulbId: props?.existingPropertyDetails?.data?.data?.ulb_id,
            wardNo: props?.existingPropertyDetails?.data?.data?.ward_mstr_id,
            newWardNo: props?.existingPropertyDetails?.data?.data?.new_ward_mstr_id,
            ownerShiptype: props?.existingPropertyDetails?.data?.data?.ownership_type,
            propertyType: props?.existingPropertyDetails?.data?.data?.property_type,
            // zone: props?.existingPropertyDetails?.data?.data?.zone_mstr_id,

        }

        console.log('auto feed data.....basic...', basicDetails, previewDetails)
        props.collectFormDataFun('basicDetails', basicDetails, previewDetails) //sending BasicDetails data to parent to store all form data at one container
        setbasicViewForm(previewDetails)
    }

    let safType = props.safType
    console.log("saf type...", props.safType)
    console.log('preview basic detals....', basicViewForm)


    const fetchWardByUlb = (ulbId) => {
        console.log('before fetch wardby ulb...')
        setselectedUlbId(ulbId)
        axios.post(api_wardByUlb, { ulbId: ulbId }, ApiHeader())
            .then(function (response) {
                console.log('wardlist by ulb ....', response.data.data)
                setwardByUlb(response.data.data)
                formik.setFieldValue('wardNo', props?.existingPropertyDetails?.data?.data?.ward_mstr_id)

            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
    }
    const fetchZoneByUlb = (ulbId) => {
        console.log('before fetch zone by ulb...')
        setselectedUlbId(ulbId)
        axios.post(api_zoneByUlb, { ulbId: ulbId }, ApiHeader())
            .then(function (response) {
                console.log('zone list by ulb ....', response.data.data)
                props?.setzoneList(response.data.data)
            })
            .catch(function (error) {
                console.log('zone list error errorrr.... ', error);
            })
    }
    const fetchNewWardByOldWard = (oldWardId) => {
        let requestBody = {
            oldWardMstrId: oldWardId,
            ulbId: selectedUlbId
        }
        console.log('before fetch wardby old ward...', requestBody)

        axios.post(api_newWardByOldWard, requestBody, ApiHeader())
            .then(function (response) {
                console.log('wardlist by oldward list ....', response.data.data)
                setnewWardList(response.data.data)
                formik.setFieldValue('newWardNo', props?.existingPropertyDetails?.data?.data?.new_ward_mstr_id)
            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
    }
    return (
        <>
            {/* <div className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600 w-full'><FaHome className="inline mr-2" /><span>Basic Details</span>{props?.safType != 'new' && <span className='inline-block float-right'> <span className='font-normal'>Holding No. : </span>{props?.existingPropertyDetails?.data?.data?.holding_no}</span>}</div> */}
            <div className="block md:p-4 w-full md:py-6 rounded-lg mx-auto absolute top-4">

                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12  space-x-2">



                        <div className="col-span-12 xl:col-span-6 xl:col-start-4 grid grid-cols-12 md:px-12 bg-white shadow-xl md:py-10 rounded-lg px-10">

                            {props?.safType == 'mu' && <div className={`form-group col-span-12 md:col-span-12 mb-4 md:px-10`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Transfer Mode<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select id='basic_details_1' {...formik.getFieldProps('transferMode')} className={`${commonInputStyle} cursor-pointer `}>
                                    <option value="" disabled selected>Select Transfer Mode</option>
                                    {
                                        props?.preFormData?.transfer_mode.map((data) => (
                                            <option value={data.id}>{data.transfer_mode}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.transferMode && formik.errors.transferMode ? formik.errors.transferMode : null}</span>
                            </div>
                            }

                            {props?.safType == 'mu' && <div className={`form-group col-span-12 md:col-span-12 mb-4 md:px-10`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Date of Purchase</label>
                                <input type='date' {...formik.getFieldProps('dateOfPurchase')} className={`${commonInputStyle} cursor-pointer `} />
                                <span className="text-red-600 absolute text-xs">{formik.touched.dateOfPurchase && formik.errors.dateOfPurchase ? formik.errors.dateOfPurchase : null}</span>
                            </div>
                            }

                            <div className={`form-group col-span-12 md:col-span-12 mb-4 md:px-10`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>ULB<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select id='basic_details_1' {...formik.getFieldProps('ulbId')} className={`${commonInputStyle} cursor-pointer `}>
                                    <option value="" disabled selected>select ULB</option>
                                    <option value="2" selected>Ranchi Nagar Nigam</option>
                                    {/* {
                                            props?.ulbList?.map((data) => (
                                                <option value={data.id}>{data.ulb_name}</option>
                                            ))
                                        } */}
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.ulbId && formik.errors.ulbId ? formik.errors.ulbId : null}</span>
                            </div>

                            <div className={`form-group col-span-12 md:col-span-12 mb-4 md:px-10`}>
                                <div> <label className={`form-label text-xs mb-1 text-gray-400  font-semibold flex items-center`}><AiFillInfoCircle className="inline" />Select ulb to get ward list</label></div>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Old Ward No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select {...formik.getFieldProps('wardNo')} className={`${commonInputStyle} cursor-pointer cypress_ward`}>
                                    <option value="" disabled selected>select ward</option>
                                    {/* <option value="50" selected>50</option> */}
                                    {
                                        wardByUlb?.map((data) => (
                                            <option value={data.id}>{data.ward_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</span>

                            </div>
                            <div className={`form-group col-span-12 md:col-span-12 mb-4 md:px-10`}>
                                <div> <label className={`form-label text-xs mb-1 text-gray-400  font-semibold flex items-center`}><AiFillInfoCircle className="inline" />Select old ward to get new ward list</label></div>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>New Ward No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select {...formik.getFieldProps('newWardNo')} className={`${commonInputStyle} cursor-pointer cypress_new_ward`} >
                                    <option value="" disabled selected>select new ward</option>
                                    {/* <option value="50" selected>50</option> */}

                                    {
                                        newWardList?.map((data) => (
                                            <option value={data.id}>{data.ward_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.newWardNo && formik.errors.newWardNo ? formik.errors.newWardNo : null}</span>

                            </div>
                            <div className={`form-group col-span-12 md:col-span-12 mb-4 md:px-10`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Ownership Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select  {...formik.getFieldProps('ownerShiptype')} className={`${commonInputStyle} cursor-pointer cypress_ownership_type`}
                                >
                                    <option value="" disabled selected>select ownership type--</option>
                                    {
                                        props?.preFormData?.ownership_types.map((data) => (
                                            <option value={data.id}>{data.ownership_type}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.ownerShiptype && formik.errors.ownerShiptype ? formik.errors.ownerShiptype : null}</span>
                            </div>
                            <div className={`form-group col-span-12 md:col-span-12 mb-4 md:px-10`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Property Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select {...formik.getFieldProps('propertyType')} className={`${commonInputStyle} cursor-pointer cypress_property_type`}
                                >
                                    <option value="" disabled selected>select property type</option>
                                    {
                                        props?.preFormData?.property_type.map((data) => (
                                            <option value={data.id}>{data.property_type}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.propertyType && formik.errors.propertyType ? formik.errors.propertyType : null}</span>
                            </div>
                            <div className=' text-center col-span-12 mt-10'>
                                <button type="submit" className="cypress_next1_button px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                            </div>
                        </div>

                        <div></div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default CitizenPropBasicDetail3