import React, { useState } from 'react'

const ExtraPreview = (props) => {
console.log('extra ============>>>>>>>>' ,props?.data)
  return (
    <>
    
    <div className='border-2 border-blue-700 bg-blue-50 mb-4 '>
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>Extra Detatils (Preview)</h1>

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
                        <span className='col-span-6 flex gap-2'>
                           {props?.data?.hoardingCheck == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {/* {props?.data?.waterHarvesting == 'true' && 'Yes'}
                            {props?.data?.waterHarvesting == 'false' && 'No'} */}
                            {props?.data?.waterHarvesting ? 'Yes' : 'No'}
                            </span>
                    </div>

                    {
                      (props?.data?.hoardingBoard == 'true' || props?.data?.hoardingBoard) && <>
                      
                      <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Installation Date of Hoarding Board(s) :</span>
                        <span className='col-span-6'>
                            {props?.data?.hoardingInstallation}
                            </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Total Floor Area of Roof / Land (in Sq. Ft.)</span>
                        <span className='col-span-6'>
                            {props?.data?.hoardingArea}
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
                        <span className='col-span-6 flex gap-2'>
                        {props?.data?.mobileCheck == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {/* {props?.data?.mobileTower == 'true' && 'Yes'}
                            {props?.data?.mobileTower == 'false' && 'No'} */}
                            {props?.data?.mobileTower ? 'Yes' : 'No'}
                            </span>
                    </div>

                    {
                      (props?.data?.mobileTower == 'true' || props?.data?.mobileTower) && <>
                      
                      <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Installation Date of Mobile Tower(s)</span>
                        <span className='col-span-6'>
                            {props?.data?.mobileInstallation}
                             </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Total Floor Area of Roof / Land (in Sq. Ft.)</span>
                        <span className='col-span-6'>
                            {props?.data?.mobileArea}
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
                        <span className='col-span-6 flex gap-2'>
                        {props?.data?.petrolCheck == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                        {/* {props?.data?.petrolPump == 'true' && 'Yes'}
                            {props?.data?.petrolPump == 'false' && 'No'} */}
                            {props?.data?.petrolPump ? 'Yes' : 'No'}
                            </span>
                    </div>

                    {
                      (props?.data?.petrolPump == 'true' || props?.data?.petrolPump) && <>
                      
                      <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Completion Date of Petrol Pump</span>
                        <span className='col-span-6'>
                            {props?.data?.petrolCompletion}
                           </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm my-2">
                        <span className='col-span-6 font-semibold'>Total Underground Area (in Sq. Ft.)</span>
                        <span className='col-span-6'>
                            {props?.data?.petrolArea}
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
                        <span className='col-span-6 flex gap-2'>
                        {props?.data?.waterCheck == 'true' ? 'Correct' : 'Incorrect'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            {/* {props?.data?.waterHarvesting == 'true' && 'Yes'}
                            {props?.data?.waterHarvesting == 'false' && 'No'} */}
                            {props?.data?.waterHarvesting ? 'Yes' : 'No'}
                            </span>
                    </div>
                </div>
            </div>
</div>
    
    </>
  )
}

export default ExtraPreview