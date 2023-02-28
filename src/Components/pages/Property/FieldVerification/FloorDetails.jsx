import { useState, useEffect, useContext, useRef } from 'react'
import { FaUserNurse } from 'react-icons/fa'
import { BiAddToQueue } from 'react-icons/bi'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import { allowFloatInput, getCurrentDate } from '../../Common/PowerupFunctions'
import { TiDelete } from 'react-icons/ti'
import { AiFillInfoCircle } from 'react-icons/ai'

const FloorDetails = (props) => {

    const [floorList, setfloorList] = useState([])
    const [floorPreviewList, setfloorPreviewList] = useState([])
    const [floorPreviewForm, setfloorPreviewForm] = useState()
    const [editStatus, setEditStatus] = useState(false) //to check edit or add of form
    const [editIndex, setEditIndex] = useState() //to carry the index to edit if edistatus is true
    const [AddFloorForm, setAddFloorForm] = useState('translate-y-0 top-[100px]')
    const notify = ''

    const floorNoRef = useRef(null);
    const useTypeRef = useRef(null);
    const occupancyTypeRef = useRef(null);
    const constructionTypeRef = useRef(null);

    const validationSchema = yup.object({
        floorNo: yup.string().required('Select floor no.').max(50, 'Enter maximum 50 characters'),
        useType: yup.string().required('Select use type'),
        occupancyType: yup.string().required('Select occupancy type'),
        constructionType: yup.string().required('Select construction type'),
        buildupArea: yup.string().required('Enter builtup Area'),
        dateFrom: yup.date().required('Select from date'),
        dateUpto: yup.date()

    })
    const formik = useFormik({
        initialValues: {
            floorNo: '',
            useType: '',
            occupancyType: '',
            constructionType: '',
            buildupArea: '',
            dateFrom: '',
            dateUpto: ''
        },

        onSubmit: (values, resetForm) => {
            if (editStatus) {
                editfloorList(values)
                resetForm()
                return
            }
            let tempFloorList = [...floorList, values] //taking copy of array adding latest values since setstate does not update immediatly
            setfloorList([...floorList, values])
            console.log('tempfloor list before add.....', tempFloorList)

            //* Adding floorPreviewList to preview data
            let tempfloorPreviewList = [...floorPreviewList, floorPreviewForm] //taking copy of array adding latest values since setstate does not update immediatly

            console.log('tempfloor preview list before add.....', tempfloorPreviewList)
            setfloorPreviewList([...floorPreviewList, floorPreviewForm])

            // props.collectFormDataFun('floorDetails', tempFloorList, tempfloorPreviewList) //sending FloorDetails data to parent to store all form data at one container
            toggleForm()
        }
        , validationSchema
    })

    useEffect(() => {
        if (floorList?.length == 0 && props?.safType != 're' && props?.safType != 'mu' && props?.safType != 'bo-edit') {
            setAddFloorForm('translate-y-0 top-[100px]')
        }
    }, [])


    useEffect(() => {

            feedPropertyData()
       
    }, [props?.preData])

    // console.log('existing property details...', props?.existingPropertyDetails?.data?.data)

    const feedPropertyData = () => {
        console.log('inside feed floor dat..')
        //* making matching floor key to ajust in existing code since key coming is different
        if (props?.preData.length != 0) {
            console.log('inside lenght >0..')

            let floorsMake = props?.preData.map((owner) => {
                return {
                    floorNo: owner?.floorNo,
                    useType: owner?.useType,
                    occupancyType: owner?.occupancyType,
                    constructionType: owner?.constructionType,
                    buildupArea: owner?.buildupArea,
                    dateFrom: owner?.dateFrom,
                    dateUpto: owner?.dateUpto,

                }
            })

            let previewFloorsMake = props?.preData.map((owner) => {
                return {
                    floorNo: owner?.floorNo,
                    useType: owner?.useType,
                    occupancyType: owner?.occupancyType,
                    constructionType: owner?.constructionType,
                    buildupArea: owner?.buildupArea,
                    dateFrom: owner?.dateFrom,
                    dateUpto: owner?.dateUpto,

                }
            })

            console.log('owner make...', floorsMake)
            setfloorList(floorsMake)
            setfloorPreviewList(previewFloorsMake)
            // props.collectFormDataFun('floorDetails', floorsMake, previewFloorsMake) //sending FloorDetails data to parent to store all form data at one container

        }

    }

    const editfloorList = () => {
        let tempfloorList = [...floorList]  //copying the array
        tempfloorList[editIndex] = formik.values  //updating value of editindex

        let tempfloorPreviewList = [...floorPreviewList]  //copying the array

        // PREVIEW DETAILS UPDATE
        tempfloorPreviewList[editIndex].floorNo = floorNoRef.current.options[floorNoRef.current.selectedIndex].innerHTML
        tempfloorPreviewList[editIndex].useType = useTypeRef.current.options[useTypeRef.current.selectedIndex].innerHTML
        tempfloorPreviewList[editIndex].occupancyType = occupancyTypeRef.current.options[occupancyTypeRef.current.selectedIndex].innerHTML
        tempfloorPreviewList[editIndex].constructionType = constructionTypeRef.current.options[constructionTypeRef.current.selectedIndex].innerHTML
        tempfloorPreviewList[editIndex].buildupArea = formik.values.buildupArea
        tempfloorPreviewList[editIndex].dateFrom = formik.values.dateFrom
        tempfloorPreviewList[editIndex].dateUpto = formik.values.dateUpto

        // props.collectFormDataFun('floorDetails', tempfloorList, tempfloorPreviewList) //sending FloorDetails data to parent to store all form data at one container

        setfloorList(tempfloorList) //setting value in origin ownlist array
        setfloorPreviewList(tempfloorPreviewList)
        setEditStatus(false) //seting edit status false after successfull edit
        toggleForm()
    }

    const toggleForm = () => {
        console.log('inside toggelg form')
        if (AddFloorForm === 'translate-y-0 top-[100px]') {
            setAddFloorForm('-translate-y-full -top-[400px]')
        } else {
            setAddFloorForm('translate-y-0 top-[100px]')
        }
    }
    console.log("floor list ", floorList)

    //funtion to remove owner from floorList via index
    const removeFloor = (index) => {
        //use concept of proper callback here
        setfloorList(current =>
            current.filter((ct, cIndex) => {
                return cIndex != index
            }),
        );
        //removing floorpervilist
        setfloorPreviewList(current =>
            current.filter((ct, cIndex) => {
                return cIndex != index
            }),
        );
    }


    useEffect(() => {
        // props.collectFormDataFun('floorDetails', floorList, floorPreviewList)
    }, [floorList, floorPreviewList])

    //function to edit owner from owner list via index
    const editFloor = (index) => {
        setEditStatus(true)
        setEditIndex(index)
        let tempfloorList = [...floorList]
        formik.resetForm()

        formik.initialValues.floorNo = tempfloorList[index].floorNo
        formik.initialValues.useType = tempfloorList[index].useType
        formik.initialValues.occupancyType = tempfloorList[index].occupancyType
        formik.initialValues.constructionType = tempfloorList[index].constructionType
        formik.initialValues.buildupArea = tempfloorList[index].buildupArea
        formik.initialValues.dateFrom = tempfloorList[index].dateFrom
        formik.initialValues.dateUpto = tempfloorList[index].dateUpto

        toggleForm()
    }
    const checkMinimumFloor = () => {
        // if (floorList.length === 0) {
        //     notify('Add minimum one floor', 'warn')
        // } else {
            console.log('inside checkmin floor')
            props.collectData('addFloor',floorList)
            props.next()
        // }
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        //input restrict validation
        { name == 'buildupArea' && formik.setFieldValue("buildupArea", allowFloatInput(value, formik.values.buildupArea, 20)) }

        //* Collecting floor details to preview
        if (e.target.type == 'select-one') {
            setfloorPreviewForm({ ...floorPreviewForm, [name]: e.target[e.target.selectedIndex].text })
        } else {
            setfloorPreviewForm({ ...floorPreviewForm, [name]: value })
        }
    }
   
    useEffect(() => {
        toggleForm()
    },[])

    return (
        <>
            <div>

                <div className={`${AddFloorForm} fixed transition-all block md:w-full w-[90%] top-0 z-50 rounded-md`}>
                    <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                        <div className="grid grid-cols-12">
                            <div className={`col-span-12 grid grid-cols-12 bg-white relative shadow-xl`}>
                                <button type='button' onClick={() => {
                                    setEditStatus(false)
                                    toggleForm()
                                }}><TiDelete className='absolute top-0 right-0 text-red-500 text-3xl hover:scale-125' /></button>

                                <div className={`grid col-span-12 grid-cols-12 rounded-md bg-indigo-50 p-4`}>
                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold ">
                                            Floor No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <select ref={floorNoRef} {...formik.getFieldProps('floorNo')} className="cypress_floor_no form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                            aria-describedby="emailHelp" >
                                            <option>SELECT</option>
                                            {
                                                props?.floorList?.map((data) => (

                                                    <option key={`floorName${data.id}`} value={data.id}>{data.floor_name}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="text-red-600 absolute text-xs">{formik.touched.floorNo && formik.errors.floorNo ? formik.errors.floorNo : null}</span>
                                    </div>
                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Usage Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <select ref={useTypeRef} {...formik.getFieldProps('useType')} className="cypress_usage_type form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                            <option>SELECT</option>
                                            {
                                                props?.usageList?.map((data) => (
                                                    <option key={`usageType${data.id}`} value={data.id}>{data.usage_type}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="text-red-600 absolute text-xs">{formik.touched.useType && formik.errors.useType ? formik.errors.useType : null}</span>
                                    </div>
                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Occupancy Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <select ref={occupancyTypeRef} {...formik.getFieldProps('occupancyType')} className="cypress_occupancy_type form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md">
                                            <option>SELECT</option>
                                            {
                                                props?.occupancyList?.map((data) => (
                                                    <option key={`OccupancyType${data.id}`} value={data.id}>{data.occupancy_type}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="text-red-600 absolute text-xs">{formik.touched.occupancyType && formik.errors.occupancyType ? formik.errors.occupancyType : null}</span>
                                    </div>
                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Construction Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <select ref={constructionTypeRef} {...formik.getFieldProps('constructionType')} className="cypress_construction_type form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                            placeholder="Enter guardian name" >
                                            <option>SELECT</option>
                                            {
                                                props?.constructionList?.map((data) => (
                                                    <option key={`constructionType${data.id}`} value={data.id}>{data.construction_type}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="text-red-600 absolute text-xs">{formik.touched.constructionType && formik.errors.constructionType ? formik.errors.constructionType : null}</span>
                                    </div>
                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Built Up Area (in Sq. Ft)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <input {...formik.getFieldProps('buildupArea')} type="text" className="cypress_builtup_area form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                        <span className="text-red-600 absolute text-xs">{formik.touched.buildupArea && formik.errors.buildupArea ? formik.errors.buildupArea : null}</span>
                                    </div>
                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"> Date From<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <input {...formik.getFieldProps('dateFrom')} type="date" className="cypress_construction_date_from form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" placeholder='Enter dateFrom no' />
                                        <span className="text-red-600 absolute text-xs">{formik.touched.dateFrom && formik.errors.dateFrom ? formik.errors.dateFrom : null}</span>
                                    </div>
                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"> Date Upto<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <input {...formik.getFieldProps('dateUpto')} type="date" className="cypress_construction_date_from form-control block w-full px-3 py-1.5 text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" placeholder='Enter dateFrom no' />
                                        <span className="text-red-600 absolute text-xs">{formik.touched.dateUpto && formik.errors.dateUpto ? formik.errors.dateUpto : null}</span>
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
                    <span>Add Floor</span>
                </h1>
                            {
                                floorList?.map((data, index) => (
                                    <>

            <div className={`${AddFloorForm == 'translate-y-0 top-[100px]' ? 'hidden' : 'block'} bg-indigo-50 border-2 border-indigo-500 my-2 mx-1`}>
                <div className='text-white bg-indigo-500 px-2 font-semibold flex flex-row justify-between items-center'>
                    <span>
                        {/* {data?.floorNo} */}
                    {
                          props?.floorList?.map((elem) => <>
                            {elem?.id == data.floorNo && elem?.floor_name}
                          </>)
                        }</span>
                <span className='flex gap-2 py-1'>
                        <button className='text-xs font-normal px-2 py-1 rounded-sm bg-green-500 hover:bg-green-600 focus:bg-green-600' onClick={() => editFloor(index)}>Edit</button>
                        <button className='text-xs font-normal px-2 py-1 rounded-sm bg-red-500 hover:bg-red-600 focus:bg-red-600' onClick={() => removeFloor(index)}>Delete</button>
                    </span>
                </div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Usage Type</span>
                        <span className='col-span-6'>
                            {/* {data?.useType == '' ? 'N/A' : data?.useType} */}
                            {
                          props?.usageList?.map((elem) => <>
                            {elem?.id == data.useType && elem?.usage_type}
                          </>)
                        }
                            </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Occupancy Type</span>
                        <span className='col-span-6'>
                            {/* {data?.occupancyType == '' ? 'N/A' : data?.occupancyType} */}
                            {
                          props?.occupancyList?.map((elem) => <>
                            {elem?.id == data.occupancyType && elem?.occupancy_type}
                          </>)
                        }
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Construction Type</span>
                        <span className='col-span-6'>
                            {/* {data?.constructionType == '' ? 'N/A' : data?.constructionType} */}
                            {
                          props?.constructionList?.map((elem) => <>
                            {elem?.id == data.constructionType && elem?.construction_type}
                          </>)
                        }
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Built Up Area (in Sq. Ft.)</span>
                        <span className='col-span-6'>{data?.buildupArea == '' ? 'N/A' : data?.buildupArea}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Date From</span>
                        <span className='col-span-6'>{data?.dateFrom == '' ? 'N/A' : data?.dateFrom}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Date Upto</span>
                        <span className='col-span-6'>{data?.dateUpto == '' ? 'N/A' : data?.dateUpto}</span>
                    </div>
                    
                </div>
            </div>

           
                                    </>
                                ))
                            }
 </div>
                </div>

                  {/* ==========Button========= */}
     <div className='w-full flex justify-between m-2'>
                <div onClick={props?.back} className='px-4 py-1.5 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 cursor-pointer'>
                    Back
                </div>
                <button onClick={toggleForm} type="button" className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-green-500 hover:bg-green-600 focus:bg-green-600">Add Floor <BiAddToQueue className=' hidden md:inline font-semibold text-sm md:text-lg' /></button>
            <button onClick={checkMinimumFloor} className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600">Save & Next</button>
            </div>

            </div>
        </>
    )
}

export default FloorDetails