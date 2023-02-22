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

function CitizenPropAdditionalDetails(props) {

    const navigate = useNavigate()

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [basicViewForm, setbasicViewForm] = useState({ mobileTowerStatus: '0', hoardingStatus: '0', petrolPumpStatus: '0', waterHarvestingStatus: '0' })

    console.log("passing master data to basic detail form", props.preFormData)
    const validationSchema = yup.object({
        // ulbId: yup.string().required('Select ULB'),
        // wardNo: yup.string().required('Select ward'),
        // newWardNo: yup.string().required('Select new ward'),
        // ownerShiptype: yup.string().required('Select ownership type'),
        // propertyType: yup.string().required('Select property'),
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
        mobileTowerDate: yup.date().when('mobileTowerStatus', {
            is: '1',
            then: yup.date().required('Field is required')
        }),
        hoardingDate: yup.date().when('hoardingStatus', {
            is: '1',
            then: yup.date().required('Field is required')
        }),
        petrolPumpDate: yup.date().when('petrolPumpStatus', {
            is: '1',
            then: yup.date().required('Field is required')
        }),

    })

    const initialValues = {
        zone: '',
        mobileTowerStatus: '0',
        hoardingStatus: '0',
        petrolPumpStatus: '0',
        waterHarvestingStatus: '0',
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
            console.log('additionalDetails deatils ', values)
            props.collectFormDataFun('additionalDetails', values, basicViewForm) //sending BasicDetails data to parent to store all form data at one container
            props.nextFun(6) //forwarding to next form level
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
        checkForZone()
    }, [props?.allFormData?.floorDetails])


    useEffect(() => {


        if (props?.safType == 're' || props?.safType == 'mu' || props?.safType == 'bo-edit') {
            feedPropertyData()
        }
    }, [props?.existingPropertyDetails])

    console.log('existing property details...', props?.existingPropertyDetails?.data?.data)

    const feedPropertyData = () => {

        let previewDetails
        let basicDetails


        formik.setFieldValue('zone', props?.existingPropertyDetails?.data?.data?.zone_mstr_id)

        formik.setFieldValue('mobileTowerStatus', props?.existingPropertyDetails?.data?.data?.is_mobile_tower == true ? 1 : 0)
        formik.setFieldValue('hoardingStatus', props?.existingPropertyDetails?.data?.data?.is_hoarding_board == true ? 1 : 0)
        formik.setFieldValue('petrolPumpStatus', props?.existingPropertyDetails?.data?.data?.is_petrol_pump == true ? 1 : 0)
        formik.setFieldValue('waterHarvestingStatus', props?.existingPropertyDetails?.data?.data?.is_water_harvesting == true ? 1 : 0)

        { props?.existingPropertyDetails?.data?.data?.is_mobile_tower == true ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false) }
        { props?.existingPropertyDetails?.data?.data?.is_hoarding_board == true ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false) }
        { props?.existingPropertyDetails?.data?.data?.is_petrol_pump == true ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false) }

        formik.setFieldValue('mobileTowerArea', props?.existingPropertyDetails?.data?.data?.tower_area)
        formik.setFieldValue('mobileTowerDate', props?.existingPropertyDetails?.data?.data?.tower_installation_date)

        formik.setFieldValue('hoardingArea', props?.existingPropertyDetails?.data?.data?.hoarding_area)
        formik.setFieldValue('hoardingDate', props?.existingPropertyDetails?.data?.data?.hoarding_installation_date)

        formik.setFieldValue('petrolPumpArea', props?.existingPropertyDetails?.data?.data?.under_ground_area)
        formik.setFieldValue('petrolPumpDate', props?.existingPropertyDetails?.data?.data?.petrol_pump_completion_date)


        //* ARRANGING MAIN DATA
        basicDetails = {
            zone: props?.existingPropertyDetails?.data?.data?.zone_mstr_id,
        }
        // //* ARRANGING PREVIEW DATA
        previewDetails = {
            zone: props?.existingPropertyDetails?.data?.data?.zone_mstr_id,
        }

        console.log('auto feed data.....basic...', basicDetails, previewDetails)
        props.collectFormDataFun('additionalDetails', basicDetails, previewDetails) //sending BasicDetails data to parent to store all form data at one container
        setbasicViewForm(previewDetails)
    }

    let safType = props.safType
    console.log("saf type...", props.safType)
    console.log('preview basic detals....', basicViewForm)

    const checkForZone = () => {
        // FOR RANCHI IF ANY CONSTRUCTED DATE IS LESS THAN 2016 THEN SHOW ZONE
        let specificDate = new Date("01-04-2016");
        console.log('floor data...at additional', props?.allFormData?.floorDetails)

        let filteredArr = props?.allFormData?.floorDetails?.filter(obj => {
            let date = new Date(obj?.dateFrom);
            return date < specificDate;
        });
        if (filteredArr?.length != 0) {
            props?.setzoneValue(true)
        } else {
            // IF NO ZONE TO SELECT THEN BY DEFAULT ZONE-1 PASS AS INSTRUCTED BY ANIL SIR
            props?.setzoneValue(false)
            formik.setFieldValue('zone', '1')
        }
        console.log('filtered array....', filteredArr)

    }
    return (
        <>
            {/* <div className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600 w-full'><FaHome className="inline mr-2" /><span>Basic Details</span>{props?.safType != 'new' && <span className='inline-block float-right'> <span className='font-normal'>Holding No. : </span>{props?.existingPropertyDetails?.data?.data?.holding_no}</span>}</div> */}
            <div className="block p-4 w-full md:py-6 rounded-lg mx-auto absolute top-8">

                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12  space-x-2">
                        <div className="col-span-12 md:col-span-6 md:col-start-4 grid grid-cols-12 md:px-12 bg-white shadow-xl py-10 rounded-lg">
                            {props?.zoneValue && <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Zone<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select {...formik.getFieldProps('zone')} className={`${commonInputStyle} cursor-pointer cypress_zone`}
                                >
                                    <option value="" disabled selected>select zone</option>
                                    {
                                        props?.zoneList?.map((data) => (
                                            <option value={data?.id}>{data?.zone}</option>
                                        ))
                                    }

                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.zone && formik.errors.zone ? formik.errors.zone : null}</span>

                            </div>}
                            <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-2 text-gray-600 text-sm font-semibold`}>Property has Mobile Tower(s) ?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                {/* <select {...formik.getFieldProps('mobileTowerStatus')} value={formik.values.mobileTowerStatus} className={`${commonInputStyle} cursor-pointer `} */}
                                <select name='mobileTowerStatus' value={formik.values.mobileTowerStatus} className={`${commonInputStyle} cursor-pointer cypress_mobile_tower_status`} onChange={formik.handleChange}
                                >
                                    <option>select</option>

                                    <option value="0" >No</option>
                                    <option value="1">Yes</option>

                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerStatus && formik.errors.mobileTowerStatus ? formik.errors.mobileTowerStatus : null}</span>

                            </div>
                            {mobileTowerStatusToggle && <div className={`col-span-12 grid grid-cols-1 md:grid-cols-3`}>
                                <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                    <label className="form-label inline-block mb-2 text-gray-600 text-xs font-normal">Total Area Covered<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input {...formik.getFieldProps('mobileTowerArea')} disabled={!mobileTowerStatusToggle} type="text" className={`${commonInputStyle} ${!mobileTowerStatusToggle && 'bg-gray-300 opacity-30'}`} />

                                    <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerArea && formik.errors.mobileTowerArea ? formik.errors.mobileTowerArea : null}</span>
                                </div>

                                <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                    <label className="form-label inline-block mb-2 text-gray-600 text-xs font-normal">Installation Date<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small><small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input {...formik.getFieldProps('mobileTowerDate')} disabled={!mobileTowerStatusToggle} type="date" className={`${commonInputStyle} ${!mobileTowerStatusToggle && 'bg-gray-300 opacity-30'}`} placeholder='dd-mm-yyyy' min={'2021-05-20'} max={'2024-05-25'}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerDate && formik.errors.mobileTowerDate ? formik.errors.mobileTowerDate : null}</span>

                                </div>
                            </div>}
                            <div className="col-span-12 grid grid-cols-4">
                                <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                    <label className={`form-label inline-block mb-2 text-gray-600 text-sm font-semibold`}>Property has Hoarding Board(s) ?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <select {...formik.getFieldProps('hoardingStatus')} value={formik.values.hoardingStatus} className={`${commonInputStyle} cursor-pointer cypress_hoarding_status`}
                                    >
                                        <option>select</option>
                                        <option value="0" >No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.hoardingStatus && formik.errors.hoardingStatus ? formik.errors.hoardingStatus : null}</span>

                                </div>


                                {hoardingStatusToggle && <div className={`col-span-12 grid grid-cols-1 md:grid-cols-3`}>
                                    <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                        <label className="form-label inline-block mb-2 text-gray-600 text-xs font-normal">Total Area<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <input {...formik.getFieldProps('hoardingArea')} disabled={!hoardingStatusToggle} type="text" className={`${commonInputStyle} ${!hoardingStatusToggle && 'bg-gray-300 opacity-30'}`} />

                                        <span className="text-red-600 absolute text-xs">{formik.touched.hoardingArea && formik.errors.hoardingArea ? formik.errors.hoardingArea : null}</span>
                                    </div>
                                    <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                        <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline ">Installation Date</small></label>
                                        <input {...formik.getFieldProps('hoardingDate')} disabled={!hoardingStatusToggle} type="date" className={`${commonInputStyle} ${!hoardingStatusToggle && 'bg-gray-300 opacity-30'}`}
                                        />

                                        <span className="text-red-600 absolute text-xs">{formik.touched.hoardingDate && formik.errors.hoardingDate ? formik.errors.hoardingDate : null}</span>
                                    </div>
                                </div>}
                            </div>
                            <div className="col-span-12 grid grid-cols-4">
                                <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                    <label className={`form-label inline-block mb-2 text-gray-600 text-sm font-semibold`}>Is property a Petrol Pump ?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <select {...formik.getFieldProps('petrolPumpStatus')} value={formik.values.petrolPumpStatus} className={`${commonInputStyle} cursor-pointer cypress_petrol_pump_status`}
                                    >
                                        <option>select</option>
                                        <option value="0" >No</option>
                                        <option value="1">Yes</option>
                                    </select>

                                    <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpStatus && formik.errors.petrolPumpStatus ? formik.errors.petrolPumpStatus : null}</span>

                                </div>

                                {petrolPumpStatusToggle && <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                                    <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>

                                        <label className="form-label inline-block mb-2 text-gray-600 text-xs font-normal">Total Area<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <input {...formik.getFieldProps('petrolPumpArea')} disabled={!petrolPumpStatusToggle} name="petrolPumpArea" type="text" className={`${commonInputStyle} ${!petrolPumpStatusToggle && 'bg-gray-300 opacity-30'}`} />

                                        <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpArea && formik.errors.petrolPumpArea ? formik.errors.petrolPumpArea : null}</span>

                                    </div>
                                    <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                        <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline ">Completion Date</small></label>
                                        <input {...formik.getFieldProps('petrolPumpDate')} disabled={!petrolPumpStatusToggle} name="petrolPumpDate" type="date" className={`${commonInputStyle} ${!petrolPumpStatusToggle && 'bg-gray-300 opacity-30'}`}
                                        />

                                        <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpDate && formik.errors.petrolPumpDate ? formik.errors.petrolPumpDate : null}</span>

                                    </div>
                                </div>}
                            </div>
                            <div className={`form-group col-span-12 md:col-span-12 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-2 text-gray-600 text-sm font-semibold`}>Rainwater harvesting provision ?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select {...formik.getFieldProps('waterHarvestingStatus')} value={formik.values.waterHarvestingStatus} className={`${commonInputStyle} cursor-pointer cypress_harvesting_status`}
                                >
                                    <option>select</option>
                                    <option value="0" >No</option>
                                    <option value="1">Yes</option>
                                </select>

                                <span className="text-red-600 absolute text-xs">{formik.touched.waterHarvestingStatus && formik.errors.waterHarvestingStatus ? formik.errors.waterHarvestingStatus : null}</span>

                            </div>
                            <div className="col-span-12 grid grid-cols-12 mt-10">
                                <div className=' col-span-6'>
                                    <button onClick={() => props.backFun(6)} type="button" className=" px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                                </div>
                                <div className=' text-right col-span-6'>
                                    <button type="submit" className="cypress_next6_button px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </form>

            </div>
        </>
    )
}

export default CitizenPropAdditionalDetails