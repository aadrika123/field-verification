//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - CitizenPropElectricityWaterDetails
// >DESCRIPTION - CitizenPropElectricityWaterDetails Component
//////////////////{*****}//////////////////////////////////////////

import { useState, useEffect } from 'react'
import { RiBuilding2Fill } from 'react-icons/ri'
import { GiWaterTank } from 'react-icons/gi'
import { BsLightningChargeFill } from 'react-icons/bs'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowCharacterNumberInput, getCurrentDate } from '../../Common/PowerUps/PowerupFunctions'

function CitizenPropElectricityWaterDetails(props) {

    const [formHide, setFormHide] = useState(false)
    const validationSchema = yup.object({
        elecToggleCheckbox: yup.boolean(),
        electricityKNo: yup.string(),
        accNo: yup.string(),
        bindBookNo: yup.string(),
        electrictyConsumerNo: yup.string(),
        bpApprovalNo: yup.string(),
        bpApprovalDate: yup.string(),
        waterConsumerNo: yup.string(),
        waterConnectionDate: yup.string(),

    })
    const formik = useFormik({
        initialValues: {
            elecToggleCheckbox: false,
            electricityKNo: '',
            accNo: '',
            bindBookNo: '',
            electrictyConsumerNo: '',
            bpApprovalNo: '',
            bpApprovalDate: '',
            waterConsumerNo: '',
            waterConnectionDate: '',
        },

        onSubmit: (values, resetForm) => {
            console.log('electricity ', values)
            //>sending ElectricityWaterDetails data to parent to store all form data at one container
            props.collectFormDataFun('electricityWaterDetails', values)
            //>forwarding to next form level
            props.nextFun(3)
        }
        , validationSchema
    })

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        { name == 'elecToggleCheckbox' && setFormHide(e.target.checked) }
        { name == 'electricityKNo' && formik.setFieldValue("electricityKNo", allowCharacterNumberInput(value, formik.values.electricityKNo, 100)) }
        { name == 'accNo' && formik.setFieldValue("accNo", allowCharacterNumberInput(value, formik.values.accNo, 100)) }
        { name == 'bindBookNo' && formik.setFieldValue("bindBookNo", allowCharacterNumberInput(value, formik.values.bindBookNo, 100)) }
        { name == 'bpApprovalNo' && formik.setFieldValue("bpApprovalNo", allowCharacterNumberInput(value, formik.values.bpApprovalNo, 100)) }
        { name == 'waterConsumerNo' && formik.setFieldValue("waterConsumerNo", allowCharacterNumberInput(value, formik.values.waterConsumerNo, 100)) }
    }

    useEffect(() => {
        // setLocationByUlb()
        if (props?.safType == 're' || props?.safType == 'mu') {
            feedPropertyData()
        }
    }, [props?.existingPropertyDetails])

    const feedPropertyData = () => {
        formik.setFieldValue('electricityKNo', props?.existingPropertyDetails?.data?.data?.elect_consumer_no)
        formik.setFieldValue('accNo', props?.existingPropertyDetails?.data?.data?.elect_acc_no)
        formik.setFieldValue('bindBookNo', props?.existingPropertyDetails?.data?.data?.elect_acc_no)
        formik.setFieldValue('electrictyConsumerNo', props?.existingPropertyDetails?.data?.data?.elect_cons_category)
        formik.setFieldValue('bpApprovalNo', props?.existingPropertyDetails?.data?.data?.building_plan_approval_no)
        formik.setFieldValue('bpApprovalDate', props?.existingPropertyDetails?.data?.data?.building_plan_approval_date)
        formik.setFieldValue('waterConsumerNo', props?.existingPropertyDetails?.data?.data?.water_conn_no)
        formik.setFieldValue('waterConnectionDate', props?.existingPropertyDetails?.data?.data?.water_conn_date)

        console.log('auto feed data.....elec...', formik.values)
        props.collectFormDataFun('electricityWaterDetails', formik.values)

    }
    
    return (
        <>
             <form  onChange={handleChange} onSubmit={formik.handleSubmit} >

                {/* Electricity */}
                <div className='border-2 border-blue-700 bg-blue-50 mb-4 m-2'>

                    <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>Electricity Detatils</h1>

                    <div className="p-6">
                        
                    <div className="grid grid-cols-12 text-sm text-gray-700 mb-6">
                                <input {...formik.getFieldProps('elecToggleCheckbox')} type="checkbox"
                                    className="col-span-1 appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                                <label className="text-gray-800 col-span-11" > <span className='inline text-red-400 text-sm font-semibold'>Note : </span><small className="block mt-1 text-xs text-gray-600 inline ">In case, there is no Electric Connection. You have to upload Affidavit Form-I. (Please Tick)</small></label>
                            </div>

                            <div className="grid grid-cols-12 text-sm text-gray-700 mb-6">
                               
                                    <label className="col-span-12 font-semibold mb-2">Electricity K. No</label>
                                    <span className="col-span-12">
                                    <input {...formik.getFieldProps('electricityKNo')} type="text" className="bg-white px-2 py-1 w-full rounded-sm shadow-md border-[1px] border-gray-400 cursor-pointer"
                                        placeholder="Enter Electricity K. No" />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.electricityKNo && formik.errors.electricityKNo ? formik.errors.electricityKNo : null}</span></span>
                                </div>

                                <div className="col-span-12 text-red-400 font-semibold pl-28 font-mono text-lg mb-0 mt-0">or</div>

                                <div className="grid grid-cols-12 text-sm text-gray-700 mb-6">
                                    <label className="col-span-12 font-semibold mb-2">ACC No.</label>
                                    <span className="col-span-12">
                                    <input {...formik.getFieldProps('accNo')} type="text" className="bg-white px-2 py-1 w-full rounded-sm shadow-md border-[1px] border-gray-400 cursor-pointer"
                                        placeholder="Enter ACC No." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.accNo && formik.errors.accNo ? formik.errors.accNo : null}</span></span>
                                </div>

                                <div className="grid grid-cols-12 text-sm text-gray-700 mb-6">
                                    <label className="col-span-12 font-semibold mb-2">BIND/BOOK No.</label>
                                    <span className="col-span-12">
                                    <input {...formik.getFieldProps('bindBookNo')} type="text" className="bg-white px-2 py-1 w-full rounded-sm shadow-md border-[1px] border-gray-400 cursor-pointer"
                                        placeholder="Enter BIND/BOOK No." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.bindBookNo && formik.errors.bindBookNo ? formik.errors.bindBookNo : null}</span></span>
                                </div>

                                <div className="grid grid-cols-12 text-sm text-gray-700 mb-6">
                                    <label className="col-span-12 font-semibold mb-2">Electricity Consumer Category</label>
                                    <span className="col-span-12">
                                    <select {...formik.getFieldProps('electrictyConsumerNo')} className="bg-white px-2 py-1 w-full rounded-sm shadow-md border-[1px] border-gray-400 cursor-pointer"
                                    >
                                        <option value="">SELECT</option>
                                        <option value="DS I/II/III">DS I/II/III</option>
                                        <option value="NDS II/III">NDS II/III</option>
                                        <option value="IS I/II">IS I/II</option>
                                        <option value="LTS">LTS</option>
                                        <option value="HTS">HTS</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.electrictyConsumerNo && formik.errors.electrictyConsumerNo ? formik.errors.electrictyConsumerNo : null}</span></span>
                                </div>

                                </div>
                            </div>

                            {/* Building */}
                            <div className='border-2 border-blue-700 bg-blue-50 mb-4 m-2'>

                                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg mb-6'>Buidling Detatils</h1>

                            <div className="grid grid-cols-12 text-sm text-gray-700 mb-6 px-6">
                                <label className="col-span-12 font-semibold mb-2">Building Plan Approval No.</label>
                                <span className="col-span-12">
                                <input {...formik.getFieldProps('bpApprovalNo')} type="text" className="bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400"
                                    placeholder="Enter Building Plan Approval No." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.bpApprovalNo && formik.errors.bpApprovalNo ? formik.errors.bpApprovalNo : null}</span></span>
                            </div>

                            <div className="grid grid-cols-12 text-sm text-gray-700 mb-6 px-6">
                                <label className="col-span-12 font-semibold mb-2">Building Plan Approval Date</label>
                                <span className="col-span-12">
                                <input {...formik.getFieldProps('bpApprovalDate')} type="date" className="bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400"
                                />
                                <span className="text-red-600 absolute text-xs">{formik.touched.bpApprovalDate && formik.errors.bpApprovalDate ? formik.errors.bpApprovalDate : null}</span></span>
                            </div>

                            </div>

                            {/* Water */}
                            <div className='border-2 border-blue-700 bg-blue-50 mb-4 m-2'>

                                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg mb-6'>Water Detatils</h1>

        <div className="grid grid-cols-12 text-sm text-gray-700 mb-6 px-6">
                                <label className="col-span-12 font-semibold mb-2">Water Consumer No.</label>
                                <span className="col-span-12">
                                <input {...formik.getFieldProps('waterConsumerNo')} type="text" className="bg-white px-2 py-1 w-full rounded-sm shadow-md border-[1px] border-gray-400 cursor-pointer"
                                    placeholder="Water Consumer No." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.waterConsumerNo && formik.errors.waterConsumerNo ? formik.errors.waterConsumerNo : null}</span></span>
                            </div>

                            <div className="grid grid-cols-12 text-sm text-gray-700 mb-6 px-6">
                                <label className="col-span-12 font-semibold mb-2">Water Connection Date</label>
                                <span className="col-span-12">
                                <input {...formik.getFieldProps('waterConnectionDate')} type="date" className="bg-white px-2 py-1 w-full rounded-sm shadow-md border-[1px] border-gray-400 cursor-pointer"
                                />
                                <span className="text-red-600 absolute text-xs">{formik.touched.waterConnectionDate && formik.errors.waterConnectionDate ? formik.errors.waterConnectionDate : null}</span></span>
                            </div>

                            </div>

                            <div className="grid grid-cols-12 mt-6 px-6 mb-10">
                                <div className='col-span-6'>
                                    <button onClick={() => props.backFun(3)} type="button" className=" px-4 py-1.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                                </div>
                                <div className='col-span-6 text-right'>
                                    <button type='submit' className="cypress_next3_button px-4 py-1.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                                </div>
                            </div>


                </form>
            
        </>
    )
}

export default CitizenPropElectricityWaterDetails