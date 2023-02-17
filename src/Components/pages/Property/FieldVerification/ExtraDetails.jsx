import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const ExtraDetails = (props) => {

    const [hoardingStatus, sethoardingStatus] = useState(false)
    const [mobileStatus, setmobileStatus] = useState(false)
    const [petrolStatus, setpetrolStatus] = useState(false)
    const [waterStatus, setwaterStatus] = useState(false)

    const validationSchema = yup.object({
      hoardingBoard : yup.string().when([],{
          is : () => hoardingStatus == false,
          then : () => yup.string().required('required field !!!')
      }),
mobileTower : yup.string().when([],{
  is : () => mobileStatus == false,
  then : () => yup.string().required('required field !!!')
}),
petrolPump : yup.string().when([],{
  is : () => petrolStatus == false,
  then : () => yup.string().required('required field !!!')
}),
waterHarvesting : yup.string().when([],{
  is : () => waterStatus == false,
  then : () => yup.string().required('required field !!!')
}),
// hoardingInstallation : yup.string().when('hoardingBoard', {
//   is : 'true',
//   then : yup.string().required('required field !!!')
// }),
// hoardingArea : yup.string().when('hoardingBoard', {
//   is : 'true',
//   then : yup.string().required('required field !!!')
// }),
// mobileInstallation : yup.string().when('mobileTower', {
//   is : 'true',
//   then : yup.string().required('required field !!!')
// }),
// mobileArea : yup.string().when('mobileTower', {
//   is : 'true',
//   then : yup.string().required('required field !!!')
// }),
// petrolCompletion : yup.string().when('petrolPump', {
//   is : 'true',
//   then : yup.string().required('required field !!!')
// })
  })

    const formik = useFormik({
        initialValues : {
            hoardingBoard: props?.preData?.hoardingBoard,
            hoardingInstallation: props?.preData?.hoardingInstallation,
            hoardingArea: props?.preData?.hoardingArea,
            mobileTower: props?.preData?.mobileTower,
            mobileInstallation : props?.preData?.mobileInstallation,
            mobileArea: props?.preData?.mobileArea,
            petrolPump: props?.preData?.petrolPump,
            petrolCompletion : props?.preData?.petrolCompletion,
            waterHarvesting: props?.preData?.waterHarvesting,
            petrolArea : props?.preData?.petrolArea
        },
        
        onSubmit: (values) => {
            console.log('submitting values => ', values)
            props.collectData('extra', values)
            props.next()
        }, validationSchema
    })


    const handleStatus = (e) => {
       const name = e.target.name;
       const value = e.target.value;

       console.log(name, value)

       {name == 'hoardingCheck' && <>{value == 'true' ? (sethoardingStatus(true), formik.setFieldValue('hoardingBoard', props?.applicationData?.is_hoarding_board), formik.setFieldValue('hoardingInstallation', props?.applicationData?.hoarding_installation_date), formik.setFieldValue('hoardingArea',props?.applicationData?.hoarding_area)) : sethoardingStatus(false)}</>}

       {name == 'mobileCheck' && <>{value == 'true' ? (setmobileStatus(true), formik.setFieldValue('mobileTower', props?.applicationData?.is_mobile_tower), formik.setFieldValue('mobileInstallation', props?.applicationData?.tower_installation_date), formik.setFieldValue('mobileArea',props?.applicationData?.tower_area)) : setmobileStatus(false)}</>}

       {name == 'petrolCheck' && <>{value == 'true' ? (setpetrolStatus(true), formik.setFieldValue('petrolPump', props?.applicationData?.is_petrol_pump), formik.setFieldValue('petrolCompletion', props?.applicationData?.petrol_pump_completion_date), formik.setFieldValue('petrolArea', props?.applicationData?.under_ground_area)) : setpetrolStatus(false)}</>}

       {name == 'waterCheck' && <>{value == 'true' ? (setwaterStatus(true), formik.setFieldValue('waterHarvesting', props?.applicationData?.is_water_harvesting)) : setwaterStatus(false)}</>}

    }

  return (
    <>

    <form className='border-2 border-blue-700 bg-blue-50 mb-4'  onChange={formik.handleChange} onSubmit={formik.handleSubmit} >
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>Extra Detatils</h1>

                {/* =======Hoarding Board========= */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Is Hoarding Board(s) ?</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.is_hoarding_board ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="hoardingCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="hoardingCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='hoardingBoard' disabled={hoardingStatus} value={hoardingStatus ? props?.applicationData?.is_hoarding_board : formik.values.hoardingBoard} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                            </select>
                            <span>{formik.touched.hoardingBoard && formik.errors.hoardingBoard && <><span className="text-red-600 text-xs">{formik.errors.hoardingBoard}</span></>}</span>
                        </span>
                    </div>

                    {
                      formik.values.hoardingBoard == 'true' && <>
                      
                      <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Installation Date of Hoarding Board(s) :</span>
                        <span className='col-span-6'>
                            <input name='hoardingInstallation' type="date" disabled={hoardingStatus} value={hoardingStatus ? props?.applicationData?.hoarding_installation_date : formik.values.hoardingInstallation} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                            <span>{formik.touched.hoardingInstallation && formik.errors.hoardingInstallation && <><span className="text-red-600 text-xs">{formik.errors.hoardingInstallation}</span></>}</span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Total Floor Area of Roof / Land (in Sq. Ft.)</span>
                        <span className='col-span-6'>
                        <input name='hoardingArea' type="number" disabled={hoardingStatus} value={hoardingStatus ? props?.applicationData?.hoarding_area : formik.values.hoardingArea} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                            <span>{formik.touched.hoardingArea && formik.errors.hoardingArea && <><span className="text-red-600 text-xs">{formik.errors.hoardingArea}</span></>}</span>
                        </span>
                    </div>
                      
                      </>
                    }
                    
                </div>
            </div>

            {/* =====Mobile Tower======== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Is Mobile Tower ?</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.is_mobile_tower ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="mobileCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="mobileCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='mobileTower' disabled={mobileStatus} value={mobileStatus ? props?.applicationData?.is_mobile_tower : formik.values.mobileTower} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                            </select>
                            <span>{formik.touched.mobileTower && formik.errors.mobileTower && <><span className="text-red-600 text-xs">{formik.errors.mobileTower}</span></>}</span>
                        </span>
                    </div>

                    {
                      formik.values.mobileTower == 'true' && <>
                      
                      <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Installation Date of Mobile Tower(s)</span>
                        <span className='col-span-6'>
                            <input name='mobileInstallation' type="date" disabled={mobileStatus} value={mobileStatus ? props?.applicationData?.tower_installation_date : formik.values.mobileInstallation} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                            <span>{formik.touched.mobileInstallation && formik.errors.mobileInstallation && <><span className="text-red-600 text-xs">{formik.errors.mobileInstallation}</span></>}</span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Total Floor Area of Roof / Land (in Sq. Ft.)</span>
                        <span className='col-span-6'>
                        <input name='mobileArea' type="number" disabled={mobileStatus} value={mobileStatus ? props?.applicationData?.tower_area : formik.values.mobileArea} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                            <span>{formik.touched.mobileArea && formik.errors.mobileArea && <><span className="text-red-600 text-xs">{formik.errors.mobileArea}</span></>}</span>
                        </span>
                    </div>
                      
                      </>
                    }
                    
                </div>
            </div>

            {/* ========Petrol Pump===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Is Petrol Pump ?</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.is_petrol_pump ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="petrolCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="petrolCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='petrolPump' disabled={petrolStatus} value={petrolStatus ? props?.applicationData?.is_petrol_pump : formik.values.petrolPump} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                            </select>
                            <span>{formik.touched.petrolPump && formik.errors.petrolPump && <><span className="text-red-600 text-xs">{formik.errors.petrolPump}</span></>}</span>
                        </span>
                    </div>

                    {
                      formik.values.petrolPump == 'true' && <>
                      
                      <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Completion Date of Petrol Pump</span>
                        <span className='col-span-6'>
                            <input name='petrolCompletion' type="date" disabled={petrolStatus} value={petrolStatus ? props?.applicationData?.petrol_pump_completion_date : formik.values.petrolCompletion} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                            <span>{formik.touched.petrolCompletion && formik.errors.petrolCompletion && <><span className="text-red-600 text-xs">{formik.errors.petrolCompletion}</span></>}</span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Total Underground Area (in Sq. Ft.)</span>
                        <span className='col-span-6'>
                        <input name='petrolArea' type="number" disabled={petrolStatus} value={petrolStatus ? props?.applicationData?.under_ground_area : formik.values.petrolArea} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                            <span>{formik.touched.petrolArea && formik.errors.petrolArea && <><span className="text-red-600 text-xs">{formik.errors.petrolArea}</span></>}</span>
                        </span>
                    </div>
                      </>
                    }
                    
                </div>
            </div>

            {/* ======Water Harvesting===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Is Rain Water Harvesting ?</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.applicationData?.is_water_harvesting ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="waterCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="waterCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select name='waterHarvesting' disabled={waterStatus} value={waterStatus ? props?.applicationData?.is_water_harvesting : formik.values.waterHarvesting} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                            <option value="">--Select--</option>
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                            </select>
                            <span>{formik.touched.waterHarvesting && formik.errors.waterHarvesting && <><span className="text-red-600 text-xs">{formik.errors.waterHarvesting}</span></>}</span>
                        </span>
                    </div>
                </div>
            </div>

           {/* ==========Button========= */}
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

export default ExtraDetails