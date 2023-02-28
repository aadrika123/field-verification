import { useFormik } from 'formik'
import React, { useState } from 'react'
import 'animate.css'

const FloorRow = (props) => {

    const [useTypeStatus, setuseTypeStatus] = useState(false)
    const [occupancyTypeStatus, setoccupancyTypeStatus] = useState(false)
    const [constructionTypeStatus, setconstructionTypeStatus] = useState(false)
    const [buildupAreaStatus, setbuildupAreaStatus] = useState(false)
    const [dateFromStatus, setdateFromStatus] = useState(false)
    const [dateUptoStatus, setdateUptoStatus] = useState(false)

    const formik = useFormik({
        initialValues: {
            id: props?.data?.id,
            floorNo: props?.data?.floor_mstr_id,
            useType: props?.preData[props?.index]?.useType,
            occupancyType: props?.preData[props?.index]?.occupancyType,
            constructionType: props?.preData[props?.index]?.constructionType,
            buildupArea: props?.preData[props?.index]?.buildupArea,
            dateFrom: props?.preData[props?.index]?.dateFrom,
            dateUpto: props?.preData[props?.index]?.dateUpto
        },

        enableReinitialize : true,

        onSubmit : (values) => {
            console.log("sending values => ", values)
            props?.next()
            props?.collectData(values)
        }
    })

    const handleStatus = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        {name == 'useTypeStatus' && <>{value == 'true' ? (setuseTypeStatus(true), formik.setFieldValue('useType', props?.data?.usage_type_mstr_id)) : setuseTypeStatus(false)}</>}
        {name == 'occupancyTypeStatus' && <>{value == 'true' ? (setoccupancyTypeStatus(true), formik.setFieldValue('occupancyType', props?.data?.occupancy_type_mstr_id)) : setoccupancyTypeStatus(false)}</>}
        {name == 'constructionTypeStatus' && <>{value == 'true' ? (setconstructionTypeStatus(true), formik.setFieldValue('constructionType', props?.data?.const_type_mstr_id)) : setconstructionTypeStatus(false)}</>}
        {name == 'buildupAreaStatus' && <>{value == 'true' ? (setbuildupAreaStatus(true), formik.setFieldValue('buildupArea', props?.data?.builtup_area)) : setbuildupAreaStatus(false)}</>}
        {name == 'dateFromStatus' && <>{value == 'true' ? (setdateFromStatus(true), formik.setFieldValue('dateFrom', props?.data?.date_from)) : setdateFromStatus(false)}</>}
        {name == 'dateUptoStatus' && <>{value == 'true' ? (setdateUptoStatus(true), formik.setFieldValue('dateUpto', props?.data?.date_upto)) : setdateUptoStatus(false)}</>}

    }

  return (
    <>
    


    <form className='border-2 border-blue-700 bg-blue-50 mb-4 animate__animated animate__fadeInRight animate__faster'  onChange={formik.handleChange} onSubmit={formik.handleSubmit} >
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>{props?.data?.floor_name}</h1>

                {/* usage type */}
                <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Usage Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.usage_type == '' ? 'N/A' : props?.data?.usage_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="useTypeStatus" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="useTypeStatus" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='useType' disabled={useTypeStatus} value={useTypeStatus ? props?.data?.usage_type_mstr_id : formik.values.useType}  className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                                {
                                                props?.usageList?.map((data) => (
                                                    <option value={data.id}>{data.usage_type}</option>
                                                ))
                                            }
                            </select>
                            <span>{formik.touched.useType && formik.errors.useType && <><span className="text-red-600 text-xs">{formik.errors.useType}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* occupancy type */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Occupancy Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.occupancy_type == '' ? 'N/A' : props?.data?.occupancy_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="occupancyTypeStatus" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="occupancyTypeStatus" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='useType' disabled={occupancyTypeStatus} value={occupancyTypeStatus ? props?.data?.occupancy_type_mstr_id : formik.values.occupancyType}  className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                                {
                                                props?.occupancyList?.map((data) => (
                                                    <option value={data.id}>{data.occupancy_type}</option>
                                                ))
                                            }
                            </select>
                            <span>{formik.touched.occupancyType && formik.errors.occupancyType && <><span className="text-red-600 text-xs">{formik.errors.occupancyType}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* construction type */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Construction Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.construction_type == '' ? 'N/A' : props?.data?.construction_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="constructionTypeStatus" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="constructionTypeStatus" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='useType' disabled={constructionTypeStatus} value={constructionTypeStatus ? props?.data?.const_type_mstr_id : formik.values.constructionType}  className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                                {
                                                props?.constructionList?.map((data) => (
                                                    <option value={data.id}>{data.construction_type}</option>
                                                ))
                                            }
                            </select>
                            <span>{formik.touched.constructionType && formik.errors.constructionType && <><span className="text-red-600 text-xs">{formik.errors.constructionType}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* builtup area */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Built Up Area</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.builtup_area == '' ? 'N/A' : props?.data?.builtup_area}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="buildupAreaStatus" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="buildupAreaStatus" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <input type='text' name='buildupArea' disabled={buildupAreaStatus} value={buildupAreaStatus ? props?.data?.builtup_area : formik.values.buildupArea}  className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                            <span>{formik.touched.buildupArea && formik.errors.buildupArea && <><span className="text-red-600 text-xs">{formik.errors.buildupArea}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* date from */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Date From</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.date_from == '' ? 'N/A' : props?.data?.date_from}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="dateFromStatus" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="dateFromStatus" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <input type='date' name='buildupArea' disabled={dateFromStatus} value={dateFromStatus ? props?.data?.date_from : formik.values.dateFrom}  className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                            <span>{formik.touched.dateFrom && formik.errors.dateFrom && <><span className="text-red-600 text-xs">{formik.errors.dateFrom}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

           {/* date upto */}
           <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Date Upto</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.date_upto == '' ? 'N/A' : props?.data?.date_upto}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="dateUptoStatus" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="dateUptoStatus" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <input type='date' name='dateUpto' disabled={dateUptoStatus} value={dateUptoStatus ? props?.data?.date_upto : formik.values.dateUpto}  className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                            <span>{formik.touched.dateUpto && formik.errors.dateUpto && <><span className="text-red-600 text-xs">{formik.errors.dateUpto}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>
                    
            {/* buttons */}
            <div className='w-full flex justify-between m-2'>
                <div onClick={props?.back} className='px-4 py-1.5 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 cursor-pointer'>
                    Back
                </div>
            <button type='submit' className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600">Save & Next</button>
            </div>

            </form>
    
    </>
  )
}

export default FloorRow