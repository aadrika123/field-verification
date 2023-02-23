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
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { getCurrentDate, allowFloatInput } from '../../Common/PowerUps/PowerupFunctions'
import { inputContainerStyle, commonInputStyle, inputErrorStyle, inputLabelStyle } from '../../Common/CommonTailwind/CommonTailwind'
import { useNavigate } from 'react-router-dom'

function CitizenPropBasicDetail(props) {

    const navigate = useNavigate()

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [basicViewForm, setbasicViewForm] = useState({mobileTowerStatus:'0',hoardingStatus:'0',petrolPumpStatus:'0',waterHarvestingStatus:'0'})

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
        }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        hoardingArea: yup.string().when('hoardingStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        petrolPumpArea: yup.string().when('petrolPumpStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
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
        ulbId:'',
        wardNo: '',
        newWardNo: '',
        ownerShiptype: '',
        propertyType: '',
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
    }
    const onSubmit = (values, resetForm) => {
        console.log('basic deatils ', values)
        props.collectFormDataFun('basicDetails', values,basicViewForm) //sending BasicDetails data to parent to store all form data at one container
        props.nextFun(1) //forwarding to next form level
    }



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
        {name=='ulbId' && props?.getLocationByUlb(value)}
        { name === 'mobileTowerStatus' && ((value === '1') ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false)) }
        { name === 'hoardingStatus' && ((value === '1') ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false)) }
        { name === 'petrolPumpStatus' && ((value === '1') ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false)) }

        //* Collecting basic details to preview
        if (event.target.type == 'select-one') {
            setbasicViewForm({ ...basicViewForm, [name]: event.target[event.target.selectedIndex].text })
        } else {
            setbasicViewForm({ ...basicViewForm, [name]: value })
        }

    };

    useEffect(() => {
        
        if(props?.safType=='re'|| props?.safType=='mu'){
            feedPropertyData()
        }
    }, [props?.existingPropertyDetails])
    
    console.log('existing property details...',props?.existingPropertyDetails?.data?.dat,)

    const feedPropertyData=()=>{
        // setFieldValue("ulbId", props?.existingPropertyDetails?.data?.data?.ulb_id)
    }

    
    console.log('preview basic detals....', basicViewForm)
    return (
        <>
            <div className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600 w-full'><FaHome className="inline mr-2" /><span>Basic Details</span>{props?.safType !='new' && <span className='inline-block float-right'> <span className='font-normal'>Holding No. : </span>{props?.existingPropertyDetails?.data?.data?.holding_no}</span>}</div>
            <div className="block p-4 w-full md:py-6 shadow-lg bg-white border border-gray-200  mx-auto absolute top-14">

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form onChange={handleOnChange}>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="col-span-4 grid grid-cols-1 md:grid-cols-5">
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>ULB</label>
                                    <Field as="select" name="ulbId" className={`${commonInputStyle} cursor-pointer `}>
                                        <option value="" disabled selected>select ULB</option>
                                        <option value="2" selected>Ranchi Nagar Nigam</option>
                                        {/* {
                                            props?.ulbList?.map((data) => (
                                                <option value={data.id}>{data.ulb_name}</option>
                                            ))
                                        } */}
                                    </Field>
                                    <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='ulbId' />
                                    </span>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Ward No</label>
                                    <Field as="select" name="wardNo" className={`${commonInputStyle} cursor-pointer `}>
                                        <option value="" disabled selected>select ward</option>
                                        <option value="50" selected>50</option>
                                        {/* {
                                            props?.preFormData?.ward_master.map((data) => (
                                                <option value={data.id}>{data.ward_name}</option>
                                            ))
                                        } */}
                                    </Field>
                                    <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='wardNo' />
                                    </span>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>New Ward No</label>
                                    <Field as="select" name="newWardNo" className={`${commonInputStyle} cursor-pointer `} >
                                        <option value="" disabled selected>select new ward</option>
                                        <option value="50" selected>50</option>

                                        {/* {
                                            props?.preFormData?.ward_master.map((data) => (
                                                <option value={data.id}>{data.ward_name}</option>
                                            ))
                                        } */}
                                    </Field>
                                    <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='newWardNo' />
                                    </span>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Ownership Type</label>
                                    <Field as="select" name="ownerShiptype" className={`${commonInputStyle} cursor-pointer `}
                                    >
                                        <option value="" disabled selected>select ownership type</option>
                                        {
                                            props?.preFormData?.ownership_types.map((data) => (
                                                <option value={data.id}>{data.ownership_type}</option>
                                            ))
                                        }
                                    </Field>
                                    <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='ownerShiptype' />
                                    </span>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property Type</label>
                                    <Field as="select" name="propertyType" className={`${commonInputStyle} `}
                                    >
                                        <option value="" disabled selected>select property type</option>
                                        {
                                            props?.preFormData?.property_type.map((data) => (
                                                <option value={data.id}>{data.property_type}</option>
                                            ))
                                        }
                                    </Field>
                                    <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='propertyType' />
                                    </span>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}>Zone</label>
                                    <Field as="select" name="zone" className={`${commonInputStyle} cursor-pointer `}
                                    >
                                        <option value="" disabled selected>select zone</option>
                                        <option value="1">Zone-1</option>
                                        <option value="2">Zone-2</option>

                                    </Field>
                                    <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='zone' />
                                    </span>
                                </div>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property has Mobile Tower(s) ?</label>
                                <Field as="select" name="mobileTowerStatus" className={`${commonInputStyle} cursor-pointer `}
                                >
                                    <option value="0" selected>No</option>
                                    <option value="1">Yes</option>
                                </Field>
                                <span className={`${inputErrorStyle}`}>
                                    <ErrorMessage name='mobileTowerStatus' />
                                </span>
                            </div>
                            <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                                <div className={`${inputContainerStyle}`}>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area Covered</label>
                                    <Field disabled={!mobileTowerStatusToggle} name="mobileTowerArea" type="text" className={`${commonInputStyle} ${!mobileTowerStatusToggle && 'bg-gray-300 opacity-30'}`} />
                                    <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='mobileTowerArea' />
                                    </span>
                                </div>

                                <div className={`${inputContainerStyle}`}>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Installation Date</label>
                                    <Field disabled={!mobileTowerStatusToggle} name="mobileTowerDate" type="date" className={`${commonInputStyle} ${!mobileTowerStatusToggle && 'bg-gray-300 opacity-30'}`} placeholder='dd-mm-yyyy' min={'2021-05-20'} max={'2024-05-25'}
                                    />
                                    <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='mobileTowerDate' />
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-4 grid grid-cols-4">
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property has Hoarding Board(s) ?</label>
                                    <Field as="select" name="hoardingStatus" className={`${commonInputStyle} cursor-pointer `}
                                    >
                                        <option value="0" selected>No</option>
                                        <option value="1">Yes</option>
                                    </Field>
                                    <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='hoardingStatus' />
                                    </span>
                                </div>


                                <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                                    <div className={`${inputContainerStyle}`}>
                                        <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area</label>
                                        <Field disabled={!hoardingStatusToggle} name="hoardingArea" type="text" className={`${commonInputStyle} ${!hoardingStatusToggle && 'bg-gray-300 opacity-30'}`} />
                                        <span className={`${inputErrorStyle}`}>
                                            <ErrorMessage name='hoardingArea' />
                                        </span>
                                    </div>
                                    <div className={`${inputContainerStyle}`}>
                                        <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Installation Date</small></label>
                                        <Field disabled={!hoardingStatusToggle} name="hoardingDate" type="date" className={`${commonInputStyle} ${!hoardingStatusToggle && 'bg-gray-300 opacity-30'}`}
                                        />
                                        <span className={`${inputErrorStyle}`}>
                                            <ErrorMessage name='hoardingDate' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 grid grid-cols-4">
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Is property a Petrol Pump ?</label>
                                    <Field as="select" name="petrolPumpStatus" className={`${commonInputStyle} cursor-pointer `}
                                    >
                                        <option value="0" selected>No</option>
                                        <option value="1">Yes</option>
                                    </Field>
                                    <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='petrolPumpStatus' />
                                    </span>
                                </div>

                                <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                                    <div className={`${inputContainerStyle}`}>

                                        <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area</label>
                                        <Field disabled={!petrolPumpStatusToggle} name="petrolPumpArea" type="text" className={`${commonInputStyle} ${!petrolPumpStatusToggle && 'bg-gray-300 opacity-30'}`} />
                                        <span className={`${inputErrorStyle}`}>
                                            <ErrorMessage name='petrolPumpArea' />
                                        </span>
                                    </div>
                                    <div className={`${inputContainerStyle}`}>
                                        <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Completion Date</small></label>
                                        <Field disabled={!petrolPumpStatusToggle} name="petrolPumpDate" type="date" className={`${commonInputStyle} ${!petrolPumpStatusToggle && 'bg-gray-300 opacity-30'}`}
                                        />
                                        <span className={`${inputErrorStyle}`}>
                                            <ErrorMessage name='petrolPumpDate' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Rainwater harvesting provision ?</label>
                                <Field as="select" name="waterHarvestingStatus" className={`${commonInputStyle} cursor-pointer `}
                                >
                                    <option value="0" selected>No</option>
                                    <option value="1">Yes</option>
                                </Field>
                                <span className={`${inputErrorStyle}`}>
                                    <ErrorMessage name='waterHarvestingStatus' />
                                </span>
                            </div>

                            <div></div>
                            <div className="col-span-4 grid grid-cols-2">
                                <div className='md:px-10'>
                                </div>
                                <div className='md:px-10 text-right'>
                                    <button type="submit" className=" px-6 py-2.5 bg-sky-400 text-white font-medium text-xs leading-tight  rounded  hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                                </div>
                            </div>
                            <div className="col-span-4 grid grid-cols-2">
                            </div>
                        </div>
                    </Form>
                </Formik>

            </div>
        </>
    )
}

export default CitizenPropBasicDetail