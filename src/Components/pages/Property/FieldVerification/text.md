<div className='border-2 border-blue-700 bg-blue-50 mb-4'>
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>{data?.floor_name}</h1>

                {/* =======Usage Type========= */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Usage Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{data?.usage_type == '' ? 'N/A' : data?.usage_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            <span className='flex gap-1'>
                            <input type="radio" name="usageTypeCheck" id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="usageTypeCheck" id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               { usageType?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.usage_type}</option>
                                </>)}
                            </select>
                        </span>
                    </div>
                </div>
            </div>

            {/* =====Occupancy Type======== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Occupancy Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{data?.occupancy_type == '' ? 'N/A' : data?.occupancy_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               { occupancyType?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.occupancy_type}</option>
                                </>)}
                            </select>
                        </span>
                    </div>
                </div>
            </div>

            {/* ========Construction Type===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Construction Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{data?.construction_type == '' ? 'N/A' : data?.construction_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               {
                                constructionList?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.construction_type}</option>
                                </>)
                                }
                            </select>
                        </span>
                    </div>
                </div>
            </div>

            {/* =========Built Up Area=========== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Build Up Area</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{data?.builtup_area == '' ? 'N/A' : data?.builtup_area}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <input type="text" name='builtUpArea' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                        </span>
                    </div>
                </div>
            </div>

            {/* ======Date From===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Date From</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{data?.date_from == '' ? 'N/A' : data?.date_from}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <input type="date" name='dateFrom' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                        </span>
                    </div>
                </div>
            </div>

            </div>

            <!-- floor details -->
             <div className='border-2 border-blue-700 bg-blue-50 mb-4'>
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>{props?.data?.floor_name}</h1>

                {/* =======Usage Type========= */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Usage Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.usage_type == '' ? 'N/A' : props?.data?.usage_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            <span className='flex gap-1'>
                            <input type="radio" name="usageTypeCheck" id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="usageTypeCheck" id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               { props?.usageType?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.usage_type}</option>
                                </>)}
                            </select>
                        </span>
                    </div>
                </div>
            </div>

            {/* =====Occupancy Type======== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Occupancy Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.occupancy_type == '' ? 'N/A' : props?.data?.occupancy_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               { props?.occupancyType?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.occupancy_type}</option>
                                </>)}
                            </select>
                        </span>
                    </div>
                </div>
            </div>

            {/* ========Construction Type===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Construction Type</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.construction_type == '' ? 'N/A' : props?.data?.construction_type}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <select className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400'>
                                <option value="">--Select--</option>
                               {
                                props?.constructionList?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.construction_type}</option>
                                </>)
                                }
                            </select>
                        </span>
                    </div>
                </div>
            </div>

            {/* =========Built Up Area=========== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Build Up Area</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.builtup_area == '' ? 'N/A' : props?.data?.builtup_area}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <input type="text" name='builtUpArea' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                        </span>
                    </div>
                </div>
            </div>

            {/* ======Date From===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Date From</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 font-semibold'>Self Assessed</span>
                        <span className='col-span-6'>{props?.data?.date_from == '' ? 'N/A' : props?.data?.date_from}</span>
                    </div>
                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-6 font-semibold'>Check</span>
                        <span className='col-span-6 flex gap-2'>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="check" id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                        <span className='col-span-6 font-semibold'>Verification</span>
                        <span className='col-span-6'>
                            <input type="date" name='dateFrom' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' />
                        </span>
                    </div>
                </div>
            </div>

            </div>