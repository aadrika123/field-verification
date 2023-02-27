//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - CitizenPropOwnerDetails
// >DESCRIPTION - CitizenPropOwnerDetails Component
//////////////////{*****}//////////////////////////////////////////

import { useContext, useState, useEffect, useRef } from 'react'
import { FaUserNurse } from 'react-icons/fa'
import { BiAddToQueue } from 'react-icons/bi'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import { allowCharacterNumberInput, allowCharacterSpaceCommaInput, allowMailInput, allowNumberInput, getCurrentDate } from '../../Common/PowerUps/PowerupFunctions'
import { TiDelete } from 'react-icons/ti'
import { AiFillInfoCircle } from 'react-icons/ai'
import { contextVar } from '../../Common/context/contextVar'


function CitizenPropOwnerDetails(props) {
    const [ownerList, setOwnerList] = useState([])
    const [ownerPreviewList, setownerPreviewList] = useState([])
    const [ownerPreviewForm, setownerPreviewForm] = useState()
    const [editStatus, setEditStatus] = useState(false) //to check edit or add of form
    const [editIndex, setEditIndex] = useState() //to carry the index to edit if edistatus is true
    const [AddOwnerForm, setAddOwnerForm] = useState('-translate-y-full -top-[800px]') //to hide and show ownerform with animation
    const { notify } = useContext(contextVar)
    const [previousOwnerArrayLength, setpreviousOwnerArrayLength] = useState(0) //to carry the index to e

    const genderRef = useRef(null);
    const relationRef = useRef(null);
    const armedRef = useRef(null);
    const speciallyAbledRef = useRef(null);

    const validationSchema = yup.object({
        ownerName: yup.string().required('Enter owner name').max(50, 'Enter maximum 50 characters'),
        gender: yup.string().required('Select gender'),
        dob: yup.date().required('Select DOB'),
        guardianName: yup.string().required('Enter guardian name'),
        relation: yup.string().required('Select relation'),
        mobileNo: yup.string().required('Enter mobile no.').min(10, 'Enter 10 digit mobilen no'),
        aadhar: yup.string().required('Enter aadhar no').min(12, 'Enter 12 digit aadhar no.'),
        pan: yup.string().required('Enter PAN no.').min(10, 'enter 10 digit PAN no.'),
        email: yup.string().required('Enter email address').min(11, 'enter atleast 11 character'),
        isArmedForce: yup.string().required('Select armed force status'),
        isSpeciallyAbled: yup.string().required('Select specially-abled status'),

    })
    const formik = useFormik({
        initialValues: {
            ownerName: () => {
                return (localStorage.getItem('citizenName') != null ? localStorage.getItem('citizenName') : '')
            },
            gender: '',
            dob: getCurrentDate(),
            guardianName: '',
            relation: '',
            mobileNo: () => {
                return (localStorage.getItem('citizenMobile') != null ? localStorage.getItem('citizenMobile') : '')
            },
            aadhar: '',
            pan: '',
            email: '',
            isArmedForce: '0',
            isSpeciallyAbled: '0'
        },

        onSubmit: (values, resetForm) => {
            if (editStatus) {
                editOwnerList(values)
                setEditStatus(false)
                resetForm()
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
            // let tempOwnerPreviewList = [...ownerPreviewList, ownerPreviewForm] //taking copy of array adding latest values since setstate does not update immediatly
            let newPreviewOwner = setPreviewData() //taking copy of array adding latest values since setstate does not update immediatly
            setownerPreviewList([...ownerPreviewList, newPreviewOwner])

            props.collectFormDataFun('ownerDetails', tempOwnerList, [...ownerPreviewList, newPreviewOwner]) //sending OwnerDetails data to parent to store all form data at one container
            // resetForm()
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
        // setownerPreviewList(props?.prevData)
    }, [props?.existingPropertyDetails])

    console.log('existing property details...', props?.existingPropertyDetails?.data?.data)

    const feedPropertyData = () => {
        console.log('inside feed owner dat..')
        setpreviousOwnerArrayLength(props?.existingPropertyDetails?.data?.data?.owners?.length)
        //* making matching floor key to ajust in existing code since key coming is different
        if (props?.existingPropertyDetails?.data?.data?.owners?.length != 0) {
            console.log('inside lenght >0..')

            let ownersMake = props?.existingPropertyDetails?.data?.data?.owners.map((owner) => {
                console.log('inside values of owner...', owner)
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
                console.log('inside preview of owner...', owner)

                let gen
                if (owner?.gender == 'Male') {
                    gen = "Male"
                }
                if (owner?.gender == 'Female') {
                    gen = "Female"
                }
                if (owner?.gender == 'Transgender') {
                    gen = "Transgender"
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
        console.log('at edit owner ist...', formik.values)
        let tempOwnerlist = [...ownerList]  //*copying the array
        tempOwnerlist[editIndex] = formik.values  //*updating value of editindex

        let tempOwnerPreviewList = [...ownerPreviewList]  //*copying the preview array

        // PREVIEW DETAILS UPDATE
        tempOwnerPreviewList[editIndex].ownerName = formik.values.ownerName
        tempOwnerPreviewList[editIndex].gender = genderRef.current.options[genderRef.current.selectedIndex].innerHTML
        tempOwnerPreviewList[editIndex].dob = formik.values.dob
        tempOwnerPreviewList[editIndex].guardianName = formik.values.guardianName
        tempOwnerPreviewList[editIndex].relation = relationRef.current.options[relationRef.current.selectedIndex].innerHTML
        tempOwnerPreviewList[editIndex].mobileNo = formik.values.mobileNo
        tempOwnerPreviewList[editIndex].aadhar = formik.values.aadhar
        tempOwnerPreviewList[editIndex].pan = formik.values.pan
        tempOwnerPreviewList[editIndex].email = formik.values.email
        tempOwnerPreviewList[editIndex].isArmedForce = armedRef.current.options[armedRef.current.selectedIndex].innerHTML
        tempOwnerPreviewList[editIndex].isSpeciallyAbled = speciallyAbledRef.current.options[speciallyAbledRef.current.selectedIndex].innerHTML

        props.collectFormDataFun('ownerDetails', tempOwnerlist, tempOwnerPreviewList) //*sending OwnerDetails data to parent to store all form data at one container

        setOwnerList(tempOwnerlist) //*setting value in origin ownlist array
        setownerPreviewList(tempOwnerPreviewList) //resetting the preview array


        setEditStatus(false) //*seting edit status false after successfull edit
        toggleForm()
    }

    const setPreviewData = () => {

        let newPreviewOwner = {
            ownerName: formik.values.ownerName,
            gender: genderRef.current.options[genderRef.current.selectedIndex].innerHTML,
            dob: formik.values.dob,
            guardianName: formik.values.guardianName,
            relation: relationRef.current.options[relationRef.current.selectedIndex].innerHTML,
            mobileNo: formik.values.mobileNo,
            aadhar: formik.values.aadhar,
            pan: formik.values.pan,
            email: formik.values.email,
            isArmedForce: armedRef.current.options[armedRef.current.selectedIndex].innerHTML,
            isSpeciallyAbled: speciallyAbledRef.current.options[speciallyAbledRef.current.selectedIndex].innerHTML
        }
        // PREVIEW DETAILS UPDATE

        return newPreviewOwner
    }

    const toggleForm = () => {
        if (AddOwnerForm === 'translate-y-0 top-[100px]') {
            setAddOwnerForm('-translate-y-full -top-[800px]')
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
            props.collectFormDataFun('ownerDetails', ownerList, ownerPreviewList)
            props.nextFun(4)
            // if (props?.safType == 're') {
            //     // feedPropertyData()
            //     formik.handleSubmit()
            // }
            // if (props?.safType == 'mu') {
            //     formik.handleSubmit()
            // }
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
    // console.log('owner preview list...', ownerPreviewList)
    
    return (
        <>
             <div className='p-2'>

                <div className={`${AddOwnerForm} -mt-24 absolute transition-all block md:w-full w-[90%] top-0 z-50 rounded-md ml-4`}>

                    <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <div className="grid grid-cols-12">
                            <div className={`col-span-12 grid grid-cols-12  relative shadow-xl`}>
                                <button type='button' onClick={() => {
                                    setEditStatus(false)
                                    toggleForm()
                                }}><TiDelete className='absolute top-0 right-0 text-red-500 text-3xl hover:scale-125' /></button>

                                <div className={`grid col-span-12 grid-cols-12 rounded-md bg-indigo-50 p-4`}>
                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold ">Owner Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input readOnly={props?.safType == 're' ? true : false} {...formik.getFieldProps('ownerName')} type="text" className={`cypress_owner_name form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md ${props?.safType == 're' && 'bg-gray-200'}`}
                                        aria-describedby="emailHelp" placeholder="Enter owner name" />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.ownerName && formik.errors.ownerName ? formik.errors.ownerName : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Gender<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <select ref={genderRef} {...formik.getFieldProps('gender')} className="cypress_gender form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                        <option value="" disabled selected>select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Transgender">Transgender</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.gender && formik.errors.gender ? formik.errors.gender : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">DOB<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input {...formik.getFieldProps('dob')} type="date" className="cypress_dob block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.dob && formik.errors.dob ? formik.errors.dob : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Guardian Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input readOnly={props?.safType == 're' ? true : false} {...formik.getFieldProps('guardianName')} type="text" className={`cypress_guardian_name form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md ${props?.safType == 're' && 'bg-gray-200'}`}
                                        placeholder="Enter guardian name" />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.guardianName && formik.errors.guardianName ? formik.errors.guardianName : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Relation<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <select ref={relationRef} {...formik.getFieldProps('relation')} className="cypress_relation form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                        <option value="" disabled selected>select relation</option>
                                        <option value="S/O">S/O</option>
                                        <option value="D/O">D/O</option>
                                        <option value="W/O">W/O</option>
                                        <option value="C/O">C/O</option>

                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.relation && formik.errors.relation ? formik.errors.relation : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Mobile No.<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input {...formik.getFieldProps('mobileNo')} type="text" className="cypress_mobile form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" placeholder='Enter mobileNo no' />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.mobileNo && formik.errors.mobileNo ? formik.errors.mobileNo : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Aadhar No</label>
                                    <input {...formik.getFieldProps('aadhar')} type="text" className="form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter aadhar no." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.aadhar && formik.errors.aadhar ? formik.errors.aadhar : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">PAN No.</label>
                                    <input {...formik.getFieldProps('pan')} type="text" className="form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter pan no." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.pan && formik.errors.pan ? formik.errors.pan : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">email</label>
                                    <input {...formik.getFieldProps('email')} type="email" className="form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter email." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.email && formik.errors.email ? formik.errors.email : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Is-Armed-Force<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <select ref={armedRef} {...formik.getFieldProps('isArmedForce')} className="form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" >
                                        <option value=''>Select</option>
                                        <option value='0'>No</option>
                                        <option value='1'>Yes</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.isArmedForce && formik.errors.isArmedForce ? formik.errors.isArmedForce : null}</span>
                                </div>
                                <div className="form-group col-span-12 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Is-Specially-Abled?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <select ref={speciallyAbledRef} {...formik.getFieldProps('isSpeciallyAbled')} className="form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                        <option value=''>Select</option>
                                        <option value='0'>No</option>
                                        <option value='1'>Yes</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.isSpeciallyAbled && formik.errors.isSpeciallyAbled ? formik.errors.isSpeciallyAbled : null}</span>
                                </div>
                                <div className="col-span-12 text-center mt-4">
                                        <button type="submit" className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-green-500 hover:bg-green-600 focus:bg-green-600">{editStatus ? 'Update' : 'Add'}</button>
                                    </div>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>





                <div className={` w-full md:py-4 md:px-0 md:pb-0 md:pt-0  md:w-full mx-auto overflow-x-auto`}>
                <div className='border-2 border-blue-700 bg-blue-50 mb-4'>
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>
                    <span>Owner Details</span>
                </h1>
                            {
                                ownerPreviewList?.map((data, index) => 
                                    <>
                                    <div className={`${AddOwnerForm == 'translate-y-0 top-[100px]' ? 'hidden' : 'block'} bg-indigo-50 border-2 border-indigo-500 my-2 mx-1`}>
                <div className='text-white bg-indigo-500 px-2 font-semibold flex flex-row justify-between items-center'>
                    <span>Owner {index + 1}</span>
                    {index >= previousOwnerArrayLength && props?.safType != 're' && <span className='flex gap-2 py-1'>
                        <button className='text-xs font-normal px-2 py-1 rounded-sm bg-green-500 hover:bg-green-600 focus:bg-green-600' onClick={() => editOwner(index)}>Edit</button>
                        <button className='text-xs font-normal px-2 py-1 rounded-sm bg-red-500 hover:bg-red-600 focus:bg-red-600' onClick={() => removeOwner(index)}>Delete</button>
                    </span>}
                </div>

                <div className='px-2 py-2'>

                <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Name</span>
                        <span className='col-span-6'>{data?.ownerName == '' ? 'N/A' : data?.ownerName}</span>
                    </div>

                <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Gender</span>
                        <span className='col-span-6'>{data?.gender == '' ? 'N/A' : data?.gender}</span>
                    </div>

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>DOB</span>
                        <span className='col-span-6'>{data?.dob == '' ? 'N/A' : data?.dob}</span>
                    </div>

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Guardian Name</span>
                        <span className='col-span-6'>{data?.guardianName == '' ? 'N/A' : data?.guardianName}</span>
                    </div>

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Relation</span>
                        <span className='col-span-6'>{data?.relation == '' ? 'N/A' : data?.relation}</span>
                    </div>

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Mobile No</span>
                        <span className='col-span-6'>{data?.mobileNo == '' ? 'N/A' : data?.mobileNo}</span>
                    </div>

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Aadhar</span>
                        <span className='col-span-6'>{data?.aadhar == '' ? 'N/A' : data?.aadhar}</span>
                    </div>

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>PAN</span>
                        <span className='col-span-6'>{data?.pan == '' ? 'N/A' : data?.pan}</span>
                    </div>

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Gender</span>
                        <span className='col-span-6'>{data?.gender == '' ? 'N/A' : data?.gender}</span>
                    </div>

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Email</span>
                        <span className='col-span-6'>{data?.email == '' ? 'N/A' : data?.email}</span>
                    </div>

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Is Armed Force</span>
                        <span className='col-span-6'>{data?.isArmedForce == '' ? 'N/A' : <>{data?.isArmedForce == '0' ? 'No' : 'Yes'}</>}</span>
                    </div>

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Is Specially Abled</span>
                        <span className='col-span-6'>{data?.isSpeciallyAbled == '' ? 'N/A' : <>{data?.isSpeciallyAbled == '0' ? 'No' : 'Yes'}</>}</span>
                    </div>
                    
                </div>

                </div>
                </>)
}
</div>
</div>




  {/* ==========Button========= */}
  <div className='w-full flex justify-between m-2'>
                <div onClick={() => props.backFun(4)} className='px-4 py-1.5 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 cursor-pointer'>
                    Back
                </div>
                {props?.safType != 're' && <button onClick={toggleForm} type="button" className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-green-500 hover:bg-green-600 focus:bg-green-600">Add Owner <BiAddToQueue className=' hidden md:inline font-semibold text-sm md:text-lg' /></button>}
            <button onClick={checkMinimumOwner} className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600">{props?.safType == 're' ? 'Next' : 'Save & Next'}</button>
            </div>

            </div>
        </>
    )
}

export default CitizenPropOwnerDetails