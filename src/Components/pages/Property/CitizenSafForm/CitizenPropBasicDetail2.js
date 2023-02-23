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
import { getCurrentDate, allowFloatInput } from '../../Common/PowerUps/PowerupFunctions'
import { inputContainerStyle, commonInputStyle, inputErrorStyle, inputLabelStyle } from '../../Common/CommonTailwind/CommonTailwind'
import { useNavigate } from 'react-router-dom'

function CitizenPropBasicDetail2(props) {

    const navigate = useNavigate()

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [basicViewForm, setbasicViewForm] = useState({ mobileTowerStatus: '0', hoardingStatus: '0', petrolPumpStatus: '0', waterHarvestingStatus: '0' })

    console.log("passing master data to basic detail form", props.preFormData)
    const validationSchema = yup.object({
        ulbId: yup.string().required('Select ULB'),
        wardNo: yup.string().required('Select ward'),
        newWardNo: yup.string().required('Select new ward'),
        ownerShiptype: yup.string().required('Select ownership type'),
        propertyType: yup.string().required('Select property'),
        zone: yup.string(),
        mobileTowerStatus: yup.string().required('Select mobile tower status'),
        hoardingStatus: yup.string().required('Select hoarding status'),
        petrolPumpStatus: yup.string().required('Select petrol pump status'),
        waterHarvestingStatus: yup.string().required('Select water harvesting status'),
        mobileTowerArea: yup.string('enter numbers only').when('mobileTowerStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }),
        hoardingArea: yup.string().when('hoardingStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }),
        petrolPumpArea: yup.string().when('petrolPumpStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }),
        // mobileTowerArea: yup.string('enter numbers only').when('mobileTowerStatus', {
        //     is: 'yes',
        //     then: yup.string().required('Field is required')
        // }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        // hoardingArea: yup.string().when('hoardingStatus', {
        //     is: 'yes',
        //     then: yup.string().required('Field is required')
        // }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        // petrolPumpArea: yup.string().when('petrolPumpStatus', {
        //     is: 'yes',
        //     then: yup.string().required('Field is required')
        // }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        mobileTowerDate: yup.date().when('mobileTowerStatus', {
            is: 'yes',
            then: yup.date().required('Field is required')
        }),
        hoardingDate: yup.date().when('hoardingStatus', {
            is: 'yes',
            then: yup.date().required('Field is required')
        }),
        petrolPumpDate: yup.date().when('petrolPumpStatus', {
            is: 'yes',
            then: yup.date().required('Field is required')
        }),

    })

    const initialValues = {
        ulbId: '',
        wardNo: '',
        newWardNo: '',
        ownerShiptype: '',
        propertyType: '',
        zone: '',
        mobileTowerStatus: '',
        hoardingStatus: '',
        petrolPumpStatus: '',
        waterHarvestingStatus: '',
        mobileTowerArea: '',
        hoardingArea: '',
        petrolPumpArea: '',
        mobileTowerDate: '',
        hoardingDate: '',
        petrolPumpDate: ''
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
        { name == 'mobileTowerStatus' && ((value == '1') ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false)) }
        { name == 'hoardingStatus' && ((value == '1') ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false)) }
        { name == 'petrolPumpStatus' && ((value == '1') ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false)) }

        //* Collecting basic details to preview
        if (event.target.type == 'select-one') {
            setbasicViewForm({ ...basicViewForm, [name]: event.target[event.target.selectedIndex].text })
        } else {
            setbasicViewForm({ ...basicViewForm, [name]: value })
        }

    };

    useEffect(() => {

        if (props?.safType == 're' || props?.safType == 'mu') {
            feedPropertyData()
        }
    }, [props?.existingPropertyDetails])

    console.log('existing property details...', props?.existingPropertyDetails?.data?.data)

    const feedPropertyData = () => {

        let previewDetails
        let basicDetails

        //* FEEDING PROPERTY DATA
        formik.setFieldValue('ulbId', props?.existingPropertyDetails?.data?.data?.ulb_id)
        formik.setFieldValue('wardNo', props?.existingPropertyDetails?.data?.data?.ward_mstr_id)
        formik.setFieldValue('newWardNo', props?.existingPropertyDetails?.data?.data?.new_ward_mstr_id)
        formik.setFieldValue('ownerShiptype', props?.existingPropertyDetails?.data?.data?.ownership_type_mstr_id)
        formik.setFieldValue('propertyType', props?.existingPropertyDetails?.data?.data?.prop_type_mstr_id)
        formik.setFieldValue('zone', props?.existingPropertyDetails?.data?.data?.zone_mstr_id)


        formik.setFieldValue('mobileTowerStatus', props?.existingPropertyDetails?.data?.data?.is_mobile_tower == true ? 1 : 0)
        formik.setFieldValue('hoardingStatus', props?.existingPropertyDetails?.data?.data?.is_hoarding_board == true ? 1 : 0)
        formik.setFieldValue('petrolPumpStatus', props?.existingPropertyDetails?.data?.data?.is_petrol_pump == true ? 1 : 0)
        formik.setFieldValue('waterHarvestingStatus', props?.existingPropertyDetails?.data?.data?.is_water_harvesting == true ? 1 : 0)

        { props?.existingPropertyDetails?.data?.data?.is_mobile_tower == true ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false) }
        { props?.existingPropertyDetails?.data?.data?.is_hoarding_board == true ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false) }
        { props?.existingPropertyDetails?.data?.data?.is_petrol_pump == true ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false) }


        // formik.setFieldValue('mobileTowerStatus', () => {
        //     if (props?.existingPropertyDetails?.data?.data?.is_mobile_tower == true) {
        //         return 1
        //     } else {
        //         return 0
        //     }
        // })
        // formik.setFieldValue('hoardingStatus', () => {
        //     if (props?.existingPropertyDetails?.data?.data?.is_hoarding_board) {
        //         return 1
        //     } else {
        //         return 0
        //     }
        // })
        // formik.setFieldValue('petrolPumpStatus', () => {
        //     if (props?.existingPropertyDetails?.data?.data?.is_petrol_pump) {
        //         return 1
        //     } else {
        //         return 0
        //     }
        // })
        // formik.setFieldValue('waterHarvestingStatus', () => {
        //     if (props?.existingPropertyDetails?.data?.data?.is_water_harvesting) {
        //         return 1
        //     } else {
        //         return 0
        //     }
        // })

        formik.setFieldValue('mobileTowerArea', props?.existingPropertyDetails?.data?.data?.tower_area)
        formik.setFieldValue('mobileTowerDate', props?.existingPropertyDetails?.data?.data?.tower_installation_date)

        formik.setFieldValue('hoardingArea', props?.existingPropertyDetails?.data?.data?.hoarding_area)
        formik.setFieldValue('hoardingDate', props?.existingPropertyDetails?.data?.data?.hoarding_installation_date)

        formik.setFieldValue('petrolPumpArea', props?.existingPropertyDetails?.data?.data?.under_ground_area)
        formik.setFieldValue('petrolPumpDate', props?.existingPropertyDetails?.data?.data?.petrol_pump_completion_date)


        //* ARRANGING MAIN DATA
        basicDetails = {
            ulbId: props?.existingPropertyDetails?.data?.data?.ulb_id,
            wardNo: props?.existingPropertyDetails?.data?.data?.ward_mstr_id,
            newWardNo: props?.existingPropertyDetails?.data?.data?.new_ward_mstr_id,
            ownerShiptype: props?.existingPropertyDetails?.data?.data?.ownership_type_mstr_id,
            propertyType: props?.existingPropertyDetails?.data?.data?.prop_type_mstr_id,
            zone: props?.existingPropertyDetails?.data?.data?.zone_mstr_id,

        }
        //* ARRANGING PREVIEW DATA
        previewDetails = {
            ulbId: props?.existingPropertyDetails?.data?.data?.ulb_id,
            wardNo: props?.existingPropertyDetails?.data?.data?.ward_mstr_id,
            newWardNo: props?.existingPropertyDetails?.data?.data?.new_ward_mstr_id,
            ownerShiptype: props?.existingPropertyDetails?.data?.data?.ownership_type,
            propertyType: props?.existingPropertyDetails?.data?.data?.property_type,
            zone: props?.existingPropertyDetails?.data?.data?.zone_mstr_id,

        }

        console.log('auto feed data.....basic...', basicDetails, previewDetails)
        props.collectFormDataFun('basicDetails', basicDetails, previewDetails) //sending BasicDetails data to parent to store all form data at one container
        setbasicViewForm(previewDetails)
    }

    let safType = props.safType
    console.log("saf type...", props.safType)
    console.log('preview basic detals....', basicViewForm)
    return (
        <>
            {/* <div className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600 w-full'><FaHome className="inline mr-2" /><span>Basic Details</span>{props?.safType != 'new' && <span className='inline-block float-right'> <span className='font-normal'>Holding No. : </span>{props?.existingPropertyDetails?.data?.data?.holding_no}</span>}</div> */}
            <div className="block p-4 w-full md:py-6 rounded-lg mx-auto absolute top-8">

                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12  space-x-2">
                        <div className="col-span-12 md:col-span-6 grid grid-cols-12 md:px-12 bg-white shadow-xl pb-40 pt-4">
                            <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>ULB</label>
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
                            <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Ward No</label>
                                <select {...formik.getFieldProps('wardNo')} className={`${commonInputStyle} cursor-pointer `}>
                                    <option value="" disabled selected>select ward</option>
                                    {/* <option value="50" selected>50</option> */}
                                    {
                                            props?.preFormData?.ward_master.map((data) => (
                                                <option value={data.id}>{data.ward_name}</option>
                                            ))
                                        }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</span>

                            </div>
                            <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>New Ward No</label>
                                <select {...formik.getFieldProps('newWardNo')} className={`${commonInputStyle} cursor-pointer `} >
                                    <option value="" disabled selected>select new ward</option>
                                    {/* <option value="50" selected>50</option> */}

                                    {
                                            props?.preFormData?.ward_master.map((data) => (
                                                <option value={data.id}>{data.ward_name}</option>
                                            ))
                                        }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.newWardNo && formik.errors.newWardNo ? formik.errors.newWardNo : null}</span>

                            </div>
                            <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Ownership Type</label>
                                <select {...formik.getFieldProps('ownerShiptype')} className={`${commonInputStyle} cursor-pointer `}
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
                            <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property Type</label>
                                <select {...formik.getFieldProps('propertyType')} className={`${commonInputStyle} `}
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
                            <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Zone</label>
                                <select {...formik.getFieldProps('zone')} className={`${commonInputStyle} cursor-pointer `}
                                >
                                    <option value="" disabled selected>select zone</option>
                                    <option value="1">Zone-1</option>
                                    <option value="2">Zone-2</option>

                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.zone && formik.errors.zone ? formik.errors.zone : null}</span>

                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 grid grid-cols-1 md:grid-cols-12 bg-white md:px-12 shadow-xl pt-4 pb-10">
                            <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property has Mobile Tower(s) ?</label>
                                {/* <select {...formik.getFieldProps('mobileTowerStatus')} value={formik.values.mobileTowerStatus} className={`${commonInputStyle} cursor-pointer `} */}
                                <select name='mobileTowerStatus' value={formik.values.mobileTowerStatus} className={`${commonInputStyle} cursor-pointer `} onChange={formik.handleChange}
                                >
                                    <option>select</option>

                                    <option value="0" >No</option>
                                    <option value="1">Yes</option>

                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerStatus && formik.errors.mobileTowerStatus ? formik.errors.mobileTowerStatus : null}</span>

                            </div>
                            {mobileTowerStatusToggle && <div className={`col-span-12 grid grid-cols-1 md:grid-cols-3`}>
                                <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area Covered</label>
                                    <input {...formik.getFieldProps('mobileTowerArea')} disabled={!mobileTowerStatusToggle} type="text" className={`${commonInputStyle} ${!mobileTowerStatusToggle && 'bg-gray-300 opacity-30'}`} />

                                    <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerArea && formik.errors.mobileTowerArea ? formik.errors.mobileTowerArea : null}</span>
                                </div>

                                <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Installation Date</label>
                                    <input {...formik.getFieldProps('mobileTowerDate')} disabled={!mobileTowerStatusToggle} type="date" className={`${commonInputStyle} ${!mobileTowerStatusToggle && 'bg-gray-300 opacity-30'}`} placeholder='dd-mm-yyyy' min={'2021-05-20'} max={'2024-05-25'}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerDate && formik.errors.mobileTowerDate ? formik.errors.mobileTowerDate : null}</span>

                                </div>
                            </div>}
                            <div className="col-span-12 grid grid-cols-4">
                                <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                    <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property has Hoarding Board(s) ?</label>
                                    <select {...formik.getFieldProps('hoardingStatus')} value={formik.values.hoardingStatus} className={`${commonInputStyle} cursor-pointer `}
                                    >
                                        <option>select</option>
                                        <option value="0" >No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.hoardingStatus && formik.errors.hoardingStatus ? formik.errors.hoardingStatus : null}</span>

                                </div>


                                {hoardingStatusToggle && <div className={`col-span-12 grid grid-cols-1 md:grid-cols-3`}>
                                    <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                        <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area</label>
                                        <input {...formik.getFieldProps('hoardingArea')} disabled={!hoardingStatusToggle} type="text" className={`${commonInputStyle} ${!hoardingStatusToggle && 'bg-gray-300 opacity-30'}`} />

                                        <span className="text-red-600 absolute text-xs">{formik.touched.hoardingArea && formik.errors.hoardingArea ? formik.errors.hoardingArea : null}</span>
                                    </div>
                                    <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                        <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Installation Date</small></label>
                                        <input {...formik.getFieldProps('hoardingDate')} disabled={!hoardingStatusToggle} type="date" className={`${commonInputStyle} ${!hoardingStatusToggle && 'bg-gray-300 opacity-30'}`}
                                        />

                                        <span className="text-red-600 absolute text-xs">{formik.touched.hoardingDate && formik.errors.hoardingDate ? formik.errors.hoardingDate : null}</span>
                                    </div>
                                </div>}
                            </div>
                            <div className="col-span-12 grid grid-cols-4">
                                <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                    <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Is property a Petrol Pump ?</label>
                                    <select {...formik.getFieldProps('petrolPumpStatus')} value={formik.values.petrolPumpStatus} className={`${commonInputStyle} cursor-pointer `}
                                    >
                                        <option>select</option>
                                        <option value="0" >No</option>
                                        <option value="1">Yes</option>
                                    </select>

                                    <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpStatus && formik.errors.petrolPumpStatus ? formik.errors.petrolPumpStatus : null}</span>

                                </div>

                                {petrolPumpStatusToggle && <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                                    <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>

                                        <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area</label>
                                        <input {...formik.getFieldProps('petrolPumpArea')} disabled={!petrolPumpStatusToggle} name="petrolPumpArea" type="text" className={`${commonInputStyle} ${!petrolPumpStatusToggle && 'bg-gray-300 opacity-30'}`} />

                                        <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpArea && formik.errors.petrolPumpArea ? formik.errors.petrolPumpArea : null}</span>

                                    </div>
                                    <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                        <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Completion Date</small></label>
                                        <input {...formik.getFieldProps('petrolPumpDate')} disabled={!petrolPumpStatusToggle} name="petrolPumpDate" type="date" className={`${commonInputStyle} ${!petrolPumpStatusToggle && 'bg-gray-300 opacity-30'}`}
                                        />

                                        <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpDate && formik.errors.petrolPumpDate ? formik.errors.petrolPumpDate : null}</span>

                                    </div>
                                </div>}
                            </div>
                            <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Rainwater harvesting provision ?</label>
                                <select {...formik.getFieldProps('waterHarvestingStatus')} value={formik.values.waterHarvestingStatus} className={`${commonInputStyle} cursor-pointer `}
                                >
                                    <option>select</option>
                                    <option value="0" >No</option>
                                    <option value="1">Yes</option>
                                </select>

                                <span className="text-red-600 absolute text-xs">{formik.touched.waterHarvestingStatus && formik.errors.waterHarvestingStatus ? formik.errors.waterHarvestingStatus : null}</span>

                            </div>
                        </div>

                        <div></div>
                        <div className="col-span-12 grid grid-cols-2 mt-10">
                            <div className='md:px-10'>
                            </div>
                            <div className='text-right'>
                                <button type="submit" className=" px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                            </div>
                        </div>
                        <div className="col-span-4 grid grid-cols-2">
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default CitizenPropBasicDetail2