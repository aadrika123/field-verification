import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const BasicDetails = (props) => {

    const [oldWardStatus, setoldWardStatus] = useState(false)
    const [newWardStatus, setnewWardStatus] = useState(false)
    const [zoneStatus, setzoneStatus] = useState(false)
    const [propertyStatus, setpropertyStatus] = useState(false)
    const [areaStatus, setareaStatus] = useState(false)
    const [roadStatus, setroadStatus] = useState(false)

    const validationSchema = yup.object({
        oldWardNo : yup.string().when([],{
            is : () => oldWardStatus == false,
            then : () => yup.string().required('required field !!!')
        }),
newWardNo : yup.string().when([],{
    is : () => newWardStatus == false,
    then : () => yup.string().required('required field !!!')
}),
zone : yup.string().when([],{
    is : () => zoneStatus == false,
    then : () => yup.string().required('required field !!!')
}),
propertyType : yup.string().when([],{
    is : () => propertyStatus == false,
    then : () => yup.string().required('required field !!!')
}),
areaOfPlot : yup.string().when([],{
    is : () => areaStatus == false,
    then : () => yup.string().required('required field !!!')
}),
roadType : yup.string().when([],{
    is : () => roadStatus == false,
    then : () => yup.string().required('required field !!!')
}),
    })

    const formik = useFormik({
        initialValues : {
            oldWardNo: props?.preData?.oldWardNo,
            newWardNo: props?.preData?.newWardNo,
            zone: props?.preData?.zone,
            propertyType: props?.preData?.propertyType,
            areaOfPlot: props?.preData?.areaOfPlot,
            roadType: props?.preData?.roadType,
        },
        
        onSubmit: (values) => {
            console.log('submitting values => ', values)
            props.next()
            props.collectData('basic', values)
        }, validationSchema
    })

    const handleStatus = (e) => {
       const name = e.target.name;
       const value = e.target.value;

       console.log(name, value)

       {name == 'oldWardNoCheck' && <>{value == 'true' ? (setoldWardStatus(true), formik.setFieldValue('oldWardNo', props?.applicationData?.ward_mstr_id)) : setoldWardStatus(false)}</>}
       {name == 'newWardNoCheck' && <>{value == 'true' ? (setnewWardStatus(true),formik.setFieldValue('newWardNo', props?.applicationData?.new_ward_mstr_id)) : setnewWardStatus(false)}</>}
       {name == 'zoneCheck' && <>{value == 'true' ? (setzoneStatus(true),formik.setFieldValue('zone', props?.applicationData?.zone_mstr_id)) : setzoneStatus(false)}</>}
       {name == 'propertyTypeCheck' && <>{value == 'true' ? (setpropertyStatus(true),formik.setFieldValue('propertyType', props?.applicationData?.prop_type_mstr_id)) : setpropertyStatus(false)}</>}
       {name == 'areaOfPlotCheck' && <>{value == 'true' ? (setareaStatus(true),formik.setFieldValue('areaOfPlot', props?.applicationData?.area_of_plot)) : setareaStatus(false)}</>}
       {name == 'roadTypeCheck' && <>{value == 'true' ? (setroadStatus(true),formik.setFieldValue('roadType', props?.applicationData?.road_type_mstr_id)) : setroadStatus(false)}</>}
    }

  return (
    <>
    
    {/* =======Basic Details============== */}
    <form className='border-2 border-blue-700 bg-blue-50 mb-4 animate__animated animate__fadeInRight animate__faster'  onChange={formik.handleChange} onSubmit={formik.handleSubmit} >
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>Basic Detatils</h1>

                {/* =======Old Ward No.========= */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Old Ward No.</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.old_ward_no == '' ? 'N/A' : props?.applicationData?.old_ward_no}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="oldWardNoCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="oldWardNoCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='oldWardNo' disabled={oldWardStatus} value={oldWardStatus ? props?.applicationData?.ward_mstr_id : formik.values.oldWardNo} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               { props?.wardList?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.ward_name}</option>
                                </>)}
                            </select>
                            <span>{formik.touched.oldWardNo && formik.errors.oldWardNo && <><span className="text-red-600 text-xs">{formik.errors.oldWardNo}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* =====New Ward No.======== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>New Ward No.</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.new_ward_no == '' ? 'N/A' : props?.applicationData?.new_ward_no}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="newWardNoCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="newWardNoCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='newWardNo' disabled={newWardStatus} value={newWardStatus ? props?.applicationData?.new_ward_mstr_id : formik.values.newWardNo}  className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               { props?.wardList?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.ward_name}</option>
                                </>)}
                            </select>
                            <span>{formik.touched.newWardNo && formik.errors.newWardNo && <><span className="text-red-600 text-xs">{formik.errors.newWardNo}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* ========Zone===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Zone</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.zone_mstr_id == '' ? 'N/A' : <>
                            {props?.applicationData?.zone_mstr_id == 1 && <>Zone-1</>}
                            {props?.applicationData?.zone_mstr_id == 2 && <>Zone-2</>}
                        </>}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="zoneCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="zoneCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='zone' disabled={zoneStatus} value={zoneStatus ? props?.applicationData?.zone_mstr_id : formik.values.zone}  className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               <option value="1">Zone-1</option>
                               <option value="2">Zone-2</option>
                            </select>
                            <span>{formik.touched.zone && formik.errors.zone && <><span className="text-red-600 text-xs">{formik.errors.zone}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* ======Property Type===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Property Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.property_type == '' ? 'N/A' : props?.applicationData?.property_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="propertyTypeCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="propertyTypeCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='propertyType' disabled={propertyStatus} value={propertyStatus ? props?.applicationData?.prop_type_mstr_id : formik.values.propertyType} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               { props?.propertyType?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.property_type}</option>
                                </>)}
                            </select>
                            <span>{formik.touched.propertyType && formik.errors.propertyType && <><span className="text-red-600 text-xs">{formik.errors.propertyType}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* =========Area Of Plot=========== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Area Of Plot (in decimal)</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.area_of_plot == '' ? 'N/A' : props?.applicationData?.area_of_plot}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="areaOfPlotCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="areaOfPlotCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <input type="text" name='areaOfPlot' disabled={areaStatus} value={areaStatus ? props?.applicationData?.area_of_plot : formik.values.areaOfPlot} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                            <span>{formik.touched.areaOfPlot && formik.errors.areaOfPlot && <><span className="text-red-600 text-xs">{formik.errors.areaOfPlot}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* ======Road Type===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Road Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.road_type_master == '' ? 'N/A' : props?.applicationData?.road_type_master}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="roadTypeCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="roadTypeCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='roadType' disabled={roadStatus} value={roadStatus ? props?.applicationData?.road_type_mstr_id : formik.values.roadType} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               { props?.roadList?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.road_type}</option>
                                </>)}
                            </select>
                            <span>{formik.touched.roadType && formik.errors.roadType && <><span className="text-red-600 text-xs">{formik.errors.roadType}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

           {/* ==========Button========= */}
           <div className='w-full text-center my-2'>
                
            <button type="submit" className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600">Save & Next</button>
            </div>

            </form>
    
    </>
  )
}

export default BasicDetails