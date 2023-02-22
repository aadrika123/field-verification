//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - CitizenPropPropertyAddressDetails
// >DESCRIPTION - CitizenPropPropertyAddressDetails Component
//////////////////{*****}//////////////////////////////////////////


import { useState, useEffect } from 'react'
import { RiBuilding2Fill } from 'react-icons/ri'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowCharacterCommaInput, allowCharacterNumberInput, allowCharacterInput, allowNumberCharacterInput, allowNumberCommaInput, allowCharacterSpaceCommaInput, allowFloatInput, allowNumberInput, allowCharacterNumberSpaceCommaInput } from '../../../Components/Common/PowerUps/PowerupFunctions'


function CitizenPropPropertyAddressDetails(props) {
    const [formOpen, setformOpen] = useState(false)
    const validationSchema = yup.object({
        addressCheckbox: yup.boolean(),
        khataNo: yup.string().required('Enter khat no.').max(50, 'Enter maximum 50 characters'),
        plotNo: yup.string().required('Enter plot no'),
        village_mauja: yup.string().required('Enter village/mauja name'),
        plotArea: yup.string().required('Enter area of plot'),
        roadWidth: yup.string().required('Enter road width'),
        city: yup.string().required('Enter city'),
        district: yup.string().required('Enter district'),
        state: yup.string().required('Enter state'),
        pin: yup.string().required('Enter pin').min(6, 'Enter minimum 6 digit'),
        locality: yup.string().required('Enter locality '),
        c_city: yup.string().when('addressCheckbox', {
            is: true,
            then: yup.string().required('Enter city')
        }),
        c_district: yup.string().when('addressCheckbox', {
            is: true,
            then: yup.string().required('Enter district')
        }),
        c_state: yup.string().when('addressCheckbox', {
            is: true,
            then: yup.string().required('Enter state')
        }),
        c_pin: yup.string().when('addressCheckbox', {
            is: true,
            then: yup.string().required('Enter pin').min(6, 'Enter minimum 6 digit'),
        }),
        c_locality: yup.string().when('addressCheckbox', {
            is: true,
            then: yup.string().required('Enter locality')
        }),
        // c_city: yup.string().required('Enter city'),
        // c_district: yup.string().required('Enter district'),
        // c_state: yup.string().required('Enter state'),
        // c_pin: yup.string().required('Enter pin'),
        // c_locality: yup.string().required('Enter locality '),

    })
    const formik = useFormik({
        initialValues: {
            addressCheckbox: '',
            khataNo: '',
            plotNo: '',
            village_mauja: '',
            plotArea: '',
            roadWidth: '',
            city: 'Ranchi', //static later fetch with ulbId onchange
            district: 'Ranchi', //static later fetch with ulbId onchange
            state: 'Jharkhand', //static later fetch with ulbId onchange
            pin: '',
            locality: '',
            c_city: '',
            c_district: '',
            c_state: '',
            c_pin: '',
            c_locality: '',
            // addressCheckbox: false
        },

        onSubmit: (values, resetForm) => {
            console.log('propertyaddressdetails ', values)
            props.collectFormDataFun('propertyAddressDetails', values) //sending PropertyAddressDetails data to parent to store all form data at one container
            props.nextFun(2) //forwarding to next form level
        }
        , validationSchema
    })

//    let setDisable = (tempReadOnly)=>{
//     setreadOnly({tempReadOnly,plotNo:false})
//     }
//     // GENERATING STATE KEYS FROM FORMIK FOR READONLY ATTRIBUTE TOGGLE //
//     const [readOnly, setreadOnly] = useState({})
//     const createFormikStateVariables = () => {
//         let listOfInputs = Object.keys(formik.initialValues)
//         let tempReadOnly = { ...readOnly }

//         listOfInputs.map((data) => {
//             tempReadOnly = { ...tempReadOnly, [data]: true }
//         })
//         setreadOnly(tempReadOnly)
//         console.log('after readonly.....', tempReadOnly)
//         setDisable(tempReadOnly)
//     }
//     useEffect(() => {
//         createFormikStateVariables()
//     }, [])
    // GENERATING STATE KEYS FROM FORMIK FOR READONLY ATTRIBUTE TOGGLE //

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        { name == 'addressCheckbox' && setformOpen(e.target.checked) }

        //input restrict validation
        { name == 'khataNo' && formik.setFieldValue("khataNo", allowNumberCommaInput(value, formik.values.khataNo, 100)) }
        { name == 'plotNo' && formik.setFieldValue("plotNo", allowNumberCommaInput(value, formik.values.plotNo, 100)) }
        { name == 'village_mauja' && formik.setFieldValue("village_mauja", allowCharacterSpaceCommaInput(value, formik.values.village_mauja, 100)) }
        { name == 'plotArea' && formik.setFieldValue("plotArea", allowFloatInput(value, formik.values.plotArea, 20)) }
        { name == 'roadWidth' && formik.setFieldValue("roadWidth", allowFloatInput(value, formik.values.roadWidth, 20)) }
        { name == 'city' && formik.setFieldValue("city", allowCharacterInput(value, formik.values.city, 100)) }
        { name == 'district' && formik.setFieldValue("district", allowCharacterInput(value, formik.values.district, 100)) }
        { name == 'state' && formik.setFieldValue("state", allowCharacterInput(value, formik.values.state, 100)) }
        { name == 'pin' && formik.setFieldValue("pin", allowNumberInput(value, formik.values.pin, 6)) }
        { name == 'locality' && formik.setFieldValue("locality", allowCharacterNumberSpaceCommaInput(value, formik.values.locality, 200)) }
        { name == 'c_city' && formik.setFieldValue("c_city", allowCharacterInput(value, formik.values.c_city, 100)) }
        { name == 'c_district' && formik.setFieldValue("c_district", allowCharacterInput(value, formik.values.c_district, 100)) }
        { name == 'c_state' && formik.setFieldValue("c_state", allowCharacterInput(value, formik.values.c_state, 100)) }
        { name == 'c_pin' && formik.setFieldValue("c_pin", allowNumberInput(value, formik.values.c_pin, 6)) }
        { name == 'c_locality' && formik.setFieldValue("c_locality", allowCharacterNumberSpaceCommaInput(value, formik.values.c_locality, 200)) }
    }
    useEffect(() => {
        if (props?.safType == 're' || props?.safType == 'mu' || props?.safType == 'bo-edit') {
            feedPropertyData()
        }
    }, [props?.existingPropertyDetails, props?.safType])
    useEffect(() => {
        setLocationByUlb()
    }, [props?.ulbLocation])




    const setLocationByUlb = () => {
        console.log('inside location in address...', props?.ulbLocation)
        formik.setFieldValue('city', props?.ulbLocation?.city_name)
        formik.setFieldValue('state', props?.ulbLocation?.name)
        formik.setFieldValue('district', props?.ulbLocation?.city_name)
    }


    const feedPropertyData = () => {
        console.log('existing property details in prop address...', props?.existingPropertyDetails?.data?.data)
        formik.setFieldValue('khataNo', props?.existingPropertyDetails?.data?.data?.khata_no)
        formik.setFieldValue('plotNo', props?.existingPropertyDetails?.data?.data?.plot_no)
        formik.setFieldValue('village_mauja', props?.existingPropertyDetails?.data?.data?.village_mauja_name)
        formik.setFieldValue('plotArea', props?.existingPropertyDetails?.data?.data?.area_of_plot)
        formik.setFieldValue('roadWidth', props?.existingPropertyDetails?.data?.data?.road_width)
        formik.setFieldValue('city', props?.existingPropertyDetails?.data?.data?.prop_city)
        formik.setFieldValue('district', props?.existingPropertyDetails?.data?.data?.prop_dist)
        formik.setFieldValue('state', props?.existingPropertyDetails?.data?.data?.prop_state)
        formik.setFieldValue('pin', props?.existingPropertyDetails?.data?.data?.prop_pin_code)
        formik.setFieldValue('locality', props?.existingPropertyDetails?.data?.data?.prop_address)
        formik.setFieldValue('c_city', props?.existingPropertyDetails?.data?.data?.corr_city)
        formik.setFieldValue('c_district', props?.existingPropertyDetails?.data?.data?.corr_dist)
        formik.setFieldValue('c_state', props?.existingPropertyDetails?.data?.data?.corr_state)
        formik.setFieldValue('c_pin', props?.existingPropertyDetails?.data?.data?.corr_pin_code)
        formik.setFieldValue('c_locality', props?.existingPropertyDetails?.data?.data?.corr_address)

        let propAddress = {
            khataNo: props?.existingPropertyDetails?.data?.data?.khata_no,
            plotNo: props?.existingPropertyDetails?.data?.data?.plot_no,
            village_mauja: props?.existingPropertyDetails?.data?.data,
            plotArea: props?.existingPropertyDetails?.data?.data?.area_of_plot,
            roadWidth: props?.existingPropertyDetails?.data?.data?.road_width,
            city: props?.existingPropertyDetails?.data?.data?.prop_city,
            district: props?.existingPropertyDetails?.data?.data?.prop_dist,
            state: props?.existingPropertyDetails?.data?.data?.prop_state,
            pin: props?.existingPropertyDetails?.data?.data?.prop_pin_code,
            locality: props?.existingPropertyDetails?.data?.data?.prop_address,
            c_city: props?.existingPropertyDetails?.data?.data?.corr_city,
            c_district: props?.existingPropertyDetails?.data?.data?.corr_dist,
            c_state: props?.existingPropertyDetails?.data?.data?.corr_state,
            c_pin: props?.existingPropertyDetails?.data?.data?.corr_pin_code,
            c_locality: props?.existingPropertyDetails?.data?.data?.corr_address,
        }
        console.log('auto feed data.....address...', propAddress)
        props?.collectFormDataFun('propertyAddressDetails', propAddress)


    }
    return (
        <>
            {/* <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600'><RiBuilding2Fill className="inline mr-2" />Property Address & Details</h1> */}

            <div className="block p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto absolute top-8 border border-gray-200">

                <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        <div className="col-span-4 grid grid-cols-1 md:grid-cols-5">
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Khata No.<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input  {...formik.getFieldProps('khataNo')} type="text" className="cypress_khata_no form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter Khata No." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.khataNo && formik.errors.khataNo ? formik.errors.khataNo : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Plot No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input  {...formik.getFieldProps('plotNo')} type="text" className="cypress_plot_no form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter Plot No." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.plotNo && formik.errors.plotNo ? formik.errors.plotNo : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Village/Mauja Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input  {...formik.getFieldProps('village_mauja')} type="text" className="cypress_village form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter Village/Mauja Name" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.village_mauja && formik.errors.village_mauja ? formik.errors.village_mauja : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Area of Plot (in Decimal)</label>
                                <input  {...formik.getFieldProps('plotArea')} type="text" className="cypress_plot_area form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="EnterArea of Plot." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.plotArea && formik.errors.plotArea ? formik.errors.plotArea : null}</span>
                            </div>

                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Road Width (in ft)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small> </label>
                                <input  {...formik.getFieldProps('roadWidth')} type="text" className="cypress_road_width form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter Road Width" />
                                <label className='hidden'><small className="block mt-1 text-xs text-gray-600 inline text-red-400 leading-tight">In Case of No Road Enter "0" (For Vacant Land Only)</small></label>
                                <span className="text-red-600 absolute text-xs">{formik.touched.roadWidth && formik.errors.roadWidth ? formik.errors.roadWidth : null}</span>
                            </div>
                        </div>
                        <div className="col-span-4 grid grid-cols-5 justify-center items-center">
                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                            <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="block mt-1 text-xs text-blue-400 inline md:px-4 font-mono text-center">Basic Address</small></label></div>
                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                        </div>

                        {/* Basic address */}
                        <div className="col-span-4 grid grid-cols-1 md:grid-cols-4">
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">City<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input readOnly={true} {...formik.getFieldProps('city')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-norma ltext-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 placeholder-gray-300 shadow-md bg-gray-200"
                                    placeholder="Enter City" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.city && formik.errors.city ? formik.errors.city : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">District<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input readOnly={true}  {...formik.getFieldProps('district')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-norma ltext-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 placeholder-gray-300 shadow-md bg-gray-200"
                                    placeholder="Enter District" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.district && formik.errors.district ? formik.errors.district : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">State<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input readOnly={true} {...formik.getFieldProps('state')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-norma ltext-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 placeholder-gray-300 shadow-md bg-gray-200"
                                    placeholder="Enter State" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.state && formik.errors.state ? formik.errors.state : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Pin<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input  {...formik.getFieldProps('pin')} type="text" className="cypress_pin form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter Pin no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.pin && formik.errors.pin ? formik.errors.pin : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-4 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Property Address (enter full mailing address)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input  {...formik.getFieldProps('locality')} type="text" className="cypress_address form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter Property Address" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.locality && formik.errors.locality ? formik.errors.locality : null}</span>
                            </div>
                            <div className="form-group col-span-4 form-check mb-2 md:px-4">
                                <input  {...formik.getFieldProps('addressCheckbox')} type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />
                                <label className="form-check-label text-gray-800"> <span className='inline text-red-400 text-sm font-semibold'>Note : </span><small className="block mt-1 text-xs text-gray-600 inline ">If Corresponding Address Different from Property Address (Please Tick)</small></label>
                            </div>
                        </div>

                        {/* Corresponding  address */}
                        <div className={`col-span-4 ${!formOpen ? 'hidden' : 'grid'} grid-cols-1 md:grid-cols-4`}>
                            <div className="col-span-4 grid grid-cols-5 justify-center items-center">
                                <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                                <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="block mt-1 text-xs text-blue-400 inline md:px-4 font-mono text-center">Corresponding Address</small></label></div>
                                <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">City</label>
                                <input  {...formik.getFieldProps('c_city')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter City" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.c_city && formik.errors.c_city ? formik.errors.c_city : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">District</label>
                                <input  {...formik.getFieldProps('c_district')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter District" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.c_district && formik.errors.c_district ? formik.errors.c_district : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">State</label>
                                <input  {...formik.getFieldProps('c_state')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter State" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.c_state && formik.errors.c_state ? formik.errors.c_state : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Pin</label>
                                <input  {...formik.getFieldProps('c_pin')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter Pin" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.c_pin && formik.errors.c_pin ? formik.errors.c_pin : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-4 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Address <span className='font-normal'>(enter full mailing address)</span></label>
                                <input {...formik.getFieldProps('c_locality')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter Address" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.c_locality && formik.errors.c_locality ? formik.errors.c_locality : null}</span>
                            </div>

                        </div>

                        <div className="col-span-4 grid grid-cols-2">
                            <div className='md:px-4'>
                                <button onClick={() => props.backFun(2)} type="button" className=" px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                            </div>
                            <div className='md:px-10 text-right'>
                                <button type="submit" className="cypress_next2_button px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                            </div>
                        </div>

                    </div>

                </form>
            </div>
        </>
    )
}

export default CitizenPropPropertyAddressDetails