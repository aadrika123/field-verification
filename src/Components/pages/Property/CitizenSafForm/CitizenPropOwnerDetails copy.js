//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - CitizenPropOwnerDetails
// >DESCRIPTION - CitizenPropOwnerDetails Component
//////////////////{*****}//////////////////////////////////////////

import { useContext, useState, useEffect } from 'react'
import { FaUserNurse } from 'react-icons/fa'
import { BiAddToQueue } from 'react-icons/bi'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import { allowCharacterNumberInput, allowCharacterSpaceCommaInput, allowMailInput, allowNumberInput, getCurrentDate } from '../../../Components/Common/PowerUps/PowerupFunctions'
import { TiDelete } from 'react-icons/ti'
import { AiFillInfoCircle } from 'react-icons/ai'
import { contextVar } from '../../../Components/ContextVar'

function CitizenPropOwnerDetails(props) {
    const [ownerList, setOwnerList] = useState([])
    const [ownerPreviewList, setownerPreviewList] = useState([])
    const [ownerPreviewForm, setownerPreviewForm] = useState({ isArmedForce: '0', isSpeciallyAbled: '0' })
    const [editStatus, setEditStatus] = useState(false) //to check edit or add of form
    const [editIndex, setEditIndex] = useState() //to carry the index to edit if edistatus is true
    const [AddOwnerForm, setAddOwnerForm] = useState('-translate-y-full -top-[500px]') //to hide and show ownerform with animation

    const { notify } = useContext(contextVar)

    console.log('current date at owner ', getCurrentDate())


    const validationSchema = yup.object({
        ownerName: yup.string().required('Enter owner name').max(50, 'Enter maximum 50 characters'),
        gender: yup.string().required('Select gender'),
        dob: yup.date().required('Select DOB'),
        guardianName: yup.string(),
        relation: yup.string(),
        mobileNo: yup.string().required('Enter mobile no.').min(10, 'Enter 10 digit mobilen no'),
        aadhar: yup.string(),
        pan: yup.string(),
        email: yup.string(),
        isArmedForce: yup.string().required('Select armed force status'),
        isSpeciallyAbled: yup.string().required('Select specially-abled status'),

    })
    const formik = useFormik({
        initialValues: {
            ownerName: localStorage.getItem('citizenName'),
            gender: '',
            dob: getCurrentDate(),
            guardianName: '',
            relation: '',
            mobileNo: localStorage.getItem('citizenMobile'),
            aadhar: '',
            pan: '',
            email: '',
            isArmedForce: '0',
            isSpeciallyAbled: '0'
        },

        onSubmit: (values, resetForm) => {
            if (editStatus) {
                editOwnerList(values)
                return
            }
            //check for duplicate entry for 1-mobileNo 2-aadhar 3-pan
            let duplicateStatus = checkDuplicateOwner(values)
            if (duplicateStatus) {
                return
            }

            let tempOwnerList = [...ownerList, values] //taking copy of array adding latest values since setstate does not update immediatly
            setOwnerList([...ownerList, values])

            //* Adding ownerpreviewlist to preview data
            let tempOwnerPreviewList = [...ownerPreviewList, ownerPreviewForm] //taking copy of array adding latest values since setstate does not update immediatly
            setownerPreviewList([...ownerPreviewList, ownerPreviewForm])

            props.collectFormDataFun('ownerDetails', tempOwnerList, tempOwnerPreviewList) //sending OwnerDetails data to parent to store all form data at one container
            toggleForm()
        }
        , validationSchema
    })

    useEffect(() => {
       
        if (ownerList?.length == 0 && props?.safType != 're' && props?.safType != 'mu') {
            setAddOwnerForm('translate-y-0 top-[100px]')
            setCitizenDetails()
        }
    }, [])

    const setCitizenDetails = () => {
        formik.setFieldValue('ownerName', localStorage.getItem('citizenName'))
        formik.setFieldValue('mobileNo', localStorage.getItem('citizenMobile'))
    }
    useEffect(() => {

        if (props?.safType == 're' || props?.safType == 'mu') {
            feedPropertyData()
        }
    }, [props?.existingPropertyDetails])

    console.log('existing property details...', props?.existingPropertyDetails?.data?.data)

    const feedPropertyData = () => {
        console.log('inside feed owner dat..')
        //* making matching floor key to ajust in existing code since key coming is different
        if (props?.existingPropertyDetails?.data?.data?.owners?.length != 0) {
            console.log('inside lenght >0..')

            let ownersMake = props?.existingPropertyDetails?.data?.data?.owners.map((owner) => {
                let rel
                let arm
                let spl

                //checking armed force
                if (owner?.is_armed_force) {
                    arm = "1"
                }
                if (owner?.is_armed_force == false) {
                    arm = "0"
                }

                //checking specially abeld
                if (owner?.is_specially_abled) {
                    spl = "1"
                }
                if (owner?.is_specially_abled == false) {
                    spl = "0"
                }

                return {
                    ownerName: owner?.owner_name,
                    gender: owner?.gender,
                    dob: owner?.dob,
                    guardianName: owner?.guardian_name,
                    relation: owner?.relation_type,
                    mobileNo: owner?.mobile_no,
                    aadhar: owner?.aadhar_no,
                    pan: owner?.pan_no,
                    email: owner?.email,
                    isArmedForce: arm,
                    isSpeciallyAbled: spl,
                }
            })

            let previewOwnersMake = props?.existingPropertyDetails?.data?.data?.owners.map((owner) => {
                let gen
                if (owner?.gender == '1') {
                    gen = "Male"
                }
                if (owner?.gender == '2') {
                    gen = "Female"
                }
                if (owner?.gender == '3') {
                    gen = "Other"
                }
                return {
                    ownerName: owner?.owner_name,
                    gender: gen,
                    dob: owner?.dob,
                    guardianName: owner?.guardian_name,
                    relation: owner?.relation_type,
                    mobileNo: owner?.mobile_no,
                    aadhar: owner?.aadhar_no,
                    pan: owner?.pan_no,
                    email: owner?.email,
                    isArmedForce: owner?.is_armed_force,
                    isSpeciallyAbled: owner?.is_specially_abled,
                }
            })

            console.log('owner make...', ownersMake, ' previewonwer make', previewOwnersMake)
            props.collectFormDataFun('ownerDetails', ownersMake, previewOwnersMake) //sending OwnerDetails data to parent to store all form data at one container
            setOwnerList(ownersMake)
            setownerPreviewList(previewOwnersMake)

        }

    }

    const checkDuplicateOwner = (currentOwner) => {
        let duplicateStatus = false
        let message = ''
        console.log('at duplicate.....')
        ownerList.some((owner) => {
            // if (currentOwner.mobileNo == owner.mobileNo) {
            //     duplicateStatus = true
            //     message = 'Duplicate mobile no.'
            //     //  notify(message, 'error')
            //     return
            // }
            if (currentOwner.aadhar != '' && (currentOwner.aadhar == owner.aadhar)) {
                duplicateStatus = true
                message = 'Duplicate aadhar no.'
                // notify(message, 'error')
                return
            }
            if (currentOwner.pan != '' && (currentOwner.pan == owner.pan)) {
                duplicateStatus = true
                message = 'Duplicate PAN no.'
                // notify(message, 'error')
                return
            }

        })

        { duplicateStatus && notify(message, 'error') } //notify toast if duplicate true with message
        console.log('duplicate check....', duplicateStatus)

        return duplicateStatus
    }
    const editOwnerList = () => {
        console.log('at edit owner ist...',formik.values)
        let tempOwnerlist = [...ownerList]  //*copying the array
        tempOwnerlist[editIndex] = formik.values  //*updating value of editindex

        let tempOwnerPreviewList = [...ownerPreviewList]  //*copying the preview array
        tempOwnerPreviewList[editIndex] = ownerPreviewForm  //*updating value of preiview list

        props.collectFormDataFun('ownerDetails', tempOwnerlist, tempOwnerPreviewList) //*sending OwnerDetails data to parent to store all form data at one container

        setOwnerList(tempOwnerlist) //*setting value in origin ownlist array
        setownerPreviewList(tempOwnerPreviewList) //resetting the preview array


        setEditStatus(false) //*seting edit status false after successfull edit
        toggleForm()
    }

    const toggleForm = () => {
        if (AddOwnerForm === 'translate-y-0 top-[100px]') {
            setAddOwnerForm('-translate-y-full -top-[500px]')
        } else {
            setAddOwnerForm('translate-y-0 top-[100px]')
        }
        // (AddOwnerForm == 'translate-y-0 top-40' && setAddOwnerForm('-translate-y-full -top-80'))
        // (AddOwnerForm == '-translate-y-full -top-80' && setAddOwnerForm('translate-y-0 top-40'))
    }

    //funtion to remove owner from ownerlist via index
    const removeOwner = (index) => {
        setOwnerList(current =>
            current.filter((ct, cIndex) => {
                return cIndex != index
            }),
        );

        //removing owner for preview data
        setownerPreviewList(current =>
            current.filter((ct, cIndex) => {
                return cIndex != index
            }),
        );

    }


    console.log('owner list.....', ownerList)
    //function to edit owner from owner list via index
    const editOwner = (index) => {
        setEditStatus(true)
        setEditIndex(index)
        let tempOwnerlist = [...ownerList]
        formik.resetForm()

        formik.initialValues.ownerName = tempOwnerlist[index].ownerName
        formik.initialValues.gender = tempOwnerlist[index].gender
        formik.initialValues.dob = tempOwnerlist[index].dob
        formik.initialValues.guardianName = tempOwnerlist[index].guardianName
        formik.initialValues.relation = tempOwnerlist[index].relation
        formik.initialValues.mobileNo = tempOwnerlist[index].mobileNo
        formik.initialValues.aadhar = tempOwnerlist[index].aadhar
        formik.initialValues.pan = tempOwnerlist[index].pan
        formik.initialValues.email = tempOwnerlist[index].email
        formik.initialValues.isArmedForce = tempOwnerlist[index].isArmedForce
        formik.initialValues.isSpeciallyAbled = tempOwnerlist[index].isSpeciallyAbled

        toggleForm()
    }
    const checkMinimumOwner = () => {
        if (ownerList.length === 0) {
            props.toastFun('Add minimum one owner')
        } else {
            props.nextFun(4)
            if (props?.safType == 're') {
                // feedPropertyData()
                formik.handleSubmit()
            }
            if (props?.safType == 'mu') {
                formik.handleSubmit()
            }
        }
    }
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        //input restrict validation
        { name == 'ownerName' && formik.setFieldValue("ownerName", allowCharacterSpaceCommaInput(value, formik.values.ownerName, 100)) }
        { name == 'guardianName' && formik.setFieldValue("guardianName", allowCharacterSpaceCommaInput(value, formik.values.guardianName, 100)) }
        { name == 'mobileNo' && formik.setFieldValue("mobileNo", allowNumberInput(value, formik.values.mobileNo, 10)) }
        { name == 'aadhar' && formik.setFieldValue("aadhar", allowNumberInput(value, formik.values.aadhar, 12)) }
        { name == 'pan' && formik.setFieldValue("pan", allowCharacterNumberInput(value, formik.values.pan, 10)) }
        { name == 'email' && formik.setFieldValue("email", allowMailInput(value, formik.values.email, 100)) }

        //* Collecting owner details to preview
        if (e.target.type == 'select-one') {
            setownerPreviewForm({ ...ownerPreviewForm, [name]: e.target[e.target.selectedIndex].text })
        } else {
            setownerPreviewForm({ ...ownerPreviewForm, [name]: value })
        }

    }
    console.log('owner preview list...', ownerPreviewList)
    return (
        <>
            <div className="absolute w-full md:px-10">

                <div className={`${AddOwnerForm} transition-all relative block w-full  md:w-full mx-auto absolute -top-1  z-50`}>

                    <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                        <div className="grid grid-cols-12 pt-10">
                            {/* <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600 text-center'><FaUserNurse className="inline mr-2" />Owner Details </h1> */}

                            <div className={`col-start-4 col-span-6 grid grid-cols-12 bg-white relative p-10 shadow-xl`}>
                                <button type='button' onClick={toggleForm}><TiDelete className='absolute top-5 right-5 text-red-500 text-3xl hover:scale-125' /></button>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Owner Name</label>
                                    <input readOnly={props?.safType == 're' ? false : false} {...formik.getFieldProps('ownerName')} type="text" className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        aria-describedby="emailHelp" placeholder="Enter owner name" />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.ownerName && formik.errors.ownerName ? formik.errors.ownerName : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Gender</label>
                                    <select {...formik.getFieldProps('gender')} className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                        <option value="" disabled selected>select gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Other</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.gender && formik.errors.gender ? formik.errors.gender : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>DOB</label>
                                    <input {...formik.getFieldProps('dob')} type="date" className="block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.dob && formik.errors.dob ? formik.errors.dob : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Guardian Name</label>
                                    <input readOnly={props?.safType == 're' ? false : false} {...formik.getFieldProps('guardianName')} type="text" className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter guardian name" />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.guardianName && formik.errors.guardianName ? formik.errors.guardianName : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Relation</label>
                                    <select {...formik.getFieldProps('relation')} className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                        <option value="" disabled selected>select relation</option>
                                        <option value="S/O">S/O</option>
                                        <option value="D/O">D/O</option>
                                        <option value="W/O">W/O</option>
                                        <option value="C/O">C/O</option>

                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.relation && formik.errors.relation ? formik.errors.relation : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Mobile No.</label>
                                    <input {...formik.getFieldProps('mobileNo')} type="text" className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" placeholder='Enter mobileNo no' />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.mobileNo && formik.errors.mobileNo ? formik.errors.mobileNo : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Aadhar No</label>
                                    <input {...formik.getFieldProps('aadhar')} type="text" className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter aadhar no." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.aadhar && formik.errors.aadhar ? formik.errors.aadhar : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">PAN No.</label>
                                    <input {...formik.getFieldProps('pan')} type="text" className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter pan no." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.pan && formik.errors.pan ? formik.errors.pan : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">email</label>
                                    <input {...formik.getFieldProps('email')} type="email" className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter email." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.email && formik.errors.email ? formik.errors.email : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Is-Armed-Force</label>
                                    <select {...formik.getFieldProps('isArmedForce')} className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" >
                                        <option value=''>Select</option>
                                        <option value='0'>No</option>
                                        <option value='1'>Yes</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.isArmedForce && formik.errors.isArmedForce ? formik.errors.isArmedForce : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Is-Specially-Abled?</label>
                                    <select {...formik.getFieldProps('isSpeciallyAbled')} className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                        <option value=''>Select</option>
                                        <option value='0'>No</option>
                                        <option value='1'>Yes</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.isSpeciallyAbled && formik.errors.isSpeciallyAbled ? formik.errors.isSpeciallyAbled : null}</span>
                                </div>
                                <div className=" col-span-12 text-center mt-10">
                                    <button type="submit" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer">{editStatus ? 'Update' : 'Add'}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={`${AddOwnerForm == 'translate-y-0 top-[100px]' ? 'hidden' : 'block'} p-4 w-full md:py-4 rounded-lg shadow-lg bg-white md:w-full mx-auto absolute top-14 `}>
                    <div className="grid grid-cols-1 md:grid-cols-5 ">
                        <div className="col-span-5 grid grid-cols-3">
                            <div className='md:px-10'>
                                <button onClick={() => props.backFun(4)} type="button" className=" px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                            </div>
                            <div className='md:px-4 text-center'>
                                <button onClick={toggleForm} type="button" className=" px-6 py-2.5 bg-gray-200 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:text-white hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Add Owner <BiAddToQueue className=' hidden md:inline font-semibold text-sm md:text-lg' /></button>
                                {/* {props?.safType != 're' && <button onClick={toggleForm} type="button" className=" px-6 py-2.5 bg-gray-200 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:text-white hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Add Owner <BiAddToQueue className=' hidden md:inline font-semibold text-sm md:text-lg' /></button>} */}
                            </div>
                            <div className='md:px-10 text-right'>
                                <button type="button" onClick={checkMinimumOwner} className=" px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">{props?.safType == 're' ? 'Next' : 'Save & Next'}</button>
                            </div>

                        </div>
                    </div>

                </div>
                <div className={`${AddOwnerForm == 'translate-y-0 top-[100px]' ? 'hidden' : 'block'}  p-4 mt-20 w-full md:py-4 md:px-0 md:pb-0 md:pt-0 rounded-lg shadow-lg bg-white md:w-full mx-auto absolute top-14 overflow-x-auto`}>

                    {ownerPreviewList?.length != 0 && <table className='min-w-full leading-normal'>
                        <thead className='font-bold text-left text-sm bg-sky-50'>
                            <tr>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">#</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">Owner</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">Gender</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">DOB</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">Guardian</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">Relation</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">mobileNo</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">Aadhar</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">PAN</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">email</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">IsArmed</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">IsSpecially</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">Action</th>
                                {/* {props?.safType != 're' && <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs uppercase text-left">Action</th>} */}
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {
                                ownerPreviewList?.map((data, index) => (
                                    <>
                                        <tr className="bg-white shadow-lg border-b border-gray-200">
                                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                            <td className="px-2 py-2 text-sm text-left">{data.ownerName}</td>
                                            <td className="px-2 py-2 text-sm text-left">{data.gender}</td>
                                            <td className="px-2 py-2 text-sm text-left">{data.dob}</td>
                                            <td className="px-2 py-2 text-sm text-left">{data.guardianName}</td>
                                            <td className="px-2 py-2 text-sm text-left">{data.relation}</td>
                                            <td className="px-2 py-2 text-sm text-left">{data.mobileNo}</td>
                                            <td className="px-2 py-2 text-sm text-left">{(data.aadhar == '' || data.aadhar == null) ? 'N/A' : data.aadhar}</td>
                                            <td className="px-2 py-2 text-sm text-left">{(data.pan == '' || data.pan == null) ? 'N/A' : data.pan}</td>
                                            <td className="px-2 py-2 text-sm text-left">{(data.email == '' || data.email == null) ? 'N/A' : data.email}</td>
                                            <td className="px-2 py-2 text-sm text-left">{data.isArmedForce == '0' ? 'No' : 'Yes'}</td>
                                            <td className="px-2 py-2 text-sm text-left">{data.isSpeciallyAbled == '0' ? 'No' : 'Yes'}</td>
                                            <td className="px-2 py-2 text-sm text-left"><TbEdit onClick={() => editOwner(index)} className='inline text-green-500 font-semibold text-lg cursor-pointer hover:text-green-700 relative hover:scale-150' /><RiDeleteBack2Line onClick={() => removeOwner(index)} className='inline ml-2 text-red-400 font-semibold text-lg cursor-pointer hover:text-red-700 relative hover:scale-150' /></td>
                                            {/* {props?.safType != 're' && <td className="px-2 py-2 text-sm text-left"><TbEdit onClick={() => editOwner(index)} className='inline text-green-500 font-semibold text-lg cursor-pointer hover:text-green-700 relative hover:scale-150' /><RiDeleteBack2Line onClick={() => removeOwner(index)} className='inline ml-2 text-red-400 font-semibold text-lg cursor-pointer hover:text-red-700 relative hover:scale-150' /></td>} */}
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>}
                    <div>
                        <div className='bg-red-50 text-red-400 px-2 py-2 rounded-sm shadow-lg opacity-80 mt-10'>
                            <AiFillInfoCircle className="inline mr-2" />
                            Click add owner button to add owner of the property, You can add multiple owners by repeating the same method
                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}

export default CitizenPropOwnerDetails