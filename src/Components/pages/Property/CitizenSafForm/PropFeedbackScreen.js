import React from 'react'
import ThemeStyle from '../../Common/ThemeStyle'
import FormCheckStatus from './FormCheckStatus'

function PropFeedbackScreen(props) {
    // let props?.allFormData = props.props?.allFormData
    let assTypeText = props.assTypeText

    console.log("preview data in feedback screen", props?.allFormData)

    ///////////{***THEME STYLE***}//////////
    const { bgCardColor, headingTxtTheme, paraTextTheme, btnTextColor, btnBgColor, headBgColor, titleHeadTxtTheme } = ThemeStyle()
    return (
        <>
            <div className='bg-white px-4 shadow-xl'>
                {/* ///////////{*** Basic Detail ***}////////// */}
                <div>
                    <div className='mt-4'>
                        <h1 className='h-10 rounded-lg py-1 text-slate-500 text-md capitalize'><strong>Form Preview </strong></h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t-4 border-gray-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 2 && true} active={props?.formIndex >= 2 && true} /> Basic Details</h1>
                        </div>
                        {
                            props?.allFormData?.basicDetails?.ulbId == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>ULB -</h1></div>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.ulbId}</h1></div>
                                    </div>
                                </div>
                        }
                        {
                            props?.allFormData?.basicDetails?.wardNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>Ward No -</h1></div>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.wardNo}</h1></div>
                                    </div>
                                </div>
                        }
                        {
                            props?.allFormData?.basicDetails?.newWardNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>New Ward No -</h1></div>
                                        <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}> {props?.allFormData?.basicDetails?.newWardNo}</h1></div>


                                    </div>
                                </div>
                        }
                        {props?.allFormData?.basicDetails?.ownerShiptype == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'>  <h1 className={`${paraTextTheme} `}>Ownership Type -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.ownerShiptype}</h1></div>


                                </div>
                            </div>
                        }
                        {props?.allFormData?.basicDetails?.propertyType == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property Type -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.propertyType}</h1></div>


                                </div>
                            </div>
                        }

                       

                        {/* {props?.allFormData?.basicDetails?.mobileTowerStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property has Mobile Tower(s) ? -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.mobileTowerStatus}</h1></div>


                                </div>
                                {props?.allFormData?.basicDetails?.mobileTowerStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row bg-gray-200 p-1'>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} `}>Total Area Covered -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.mobileTowerArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row bg-gray-200 p-1'>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} `}>Installation Date -</h1></div>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.mobileTowerDate}</h1></div>


                                        </div>
                                    </>
                                }
                            </div>
                        }
                        {props?.allFormData?.basicDetails?.hoardingStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property has Hoarding Board(s) ? -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.hoardingStatus}</h1></div>


                                </div>
                                {props?.allFormData?.basicDetails?.hoardingStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Total Area -</h1></div>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.hoardingArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'>   <h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Installation Date ? -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.hoardingDate}</h1></div>


                                        </div>
                                    </>

                                }
                            </div>
                        }

                        {props?.allFormData?.basicDetails?.petrolPumpStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} `}>Is property a Petrol Pump ? -</h1></div>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.petrolPumpStatus}</h1></div>


                                </div>
                                {props?.allFormData?.basicDetails?.petrolPumpStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} bg-gray-200 p-1 `}>Total Area -</h1></div>
                                            <div className='flex-1'>  <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.petrolPumpArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'>  <h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Completion Date -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.petrolPumpDate}</h1></div>


                                        </div>
                                    </>

                                }
                            </div>
                        }
                        {props?.allFormData?.basicDetails?.waterHarvestingStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Rainwater harvesting provision ? -</h1></div>
                                    <div className='flex-1'>  <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.waterHarvestingStatus}</h1></div>


                                </div>
                            </div>
                        } */}
                    </div>
                </div>


                {/* ///////////{*** Property Address & Details ***}////////// */}
                <div className='mt-4'>

                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t bordz`er-gray-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 3 && true} active={props?.formIndex >= 3 && true} />Property Address & Details</h1>
                        </div>
                        {
                            props?.allFormData?.propertyAddressDetails?.khataNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Khata No. -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.khataNo}</h1>
                                    </div>
                                </div>
                        }
                        {
                            props?.allFormData?.propertyAddressDetails?.plotNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Plot No-</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}> {props?.allFormData?.propertyAddressDetails?.plotNo}</h1>
                                    </div>
                                </div>
                        }
                        {props?.allFormData?.propertyAddressDetails?.village_mauja == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Village/Mauja Name -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.village_mauja}</h1>
                                </div>
                            </div>
                        }
                        {props?.allFormData?.propertyAddressDetails?.plotArea == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Area of Plot(decimal) -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.plotArea}</h1>
                                </div>
                            </div>
                        }

                        {props?.allFormData?.propertyAddressDetails?.roadWidth == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Road Width(sqt) -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.roadWidth}</h1>
                                </div>
                            </div>
                        }
                        <div className='col-span-4'><hr /></div>

                        {props?.allFormData?.propertyAddressDetails?.city == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>City -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.city}</h1>
                                </div>

                            </div>
                        }
                        {props?.allFormData?.propertyAddressDetails?.district == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>District -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.district}</h1>
                                </div>

                            </div>
                        }

                        {props?.allFormData?.propertyAddressDetails?.state == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>State -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.state}</h1>
                                </div>
                            </div>
                        }
                        {props?.allFormData?.propertyAddressDetails?.pin == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Pin -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.pin}</h1>
                                </div>
                            </div>
                        }
                        {props?.allFormData?.propertyAddressDetails?.locality == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Address -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.locality}</h1>
                                </div>
                            </div>
                        }
                    </div>

                    {/* In Case of coressponding address */}
                    {
                        props?.allFormData?.propertyAddressDetails?.addressCheckbox!=true ?<div className='  p-2  border-t border-gray-100' >
                            <h1 className={`${titleHeadTxtTheme} font-bold`}>Corresponding Address & Details</h1>
                            <h1 className={`${paraTextTheme} font-semibold`}>Same as Property Address</h1>
                        </div>:<div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t border-gray-100' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}>Corresponding Address & Details</h1>
                        </div>
                       
                        {props?.allFormData?.propertyAddressDetails?.city == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>City -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.c_city}</h1>
                                </div>

                            </div>
                        }
                        {props?.allFormData?.propertyAddressDetails?.district == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>District -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.c_district}</h1>
                                </div>

                            </div>
                        }

                        {props?.allFormData?.propertyAddressDetails?.state == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>State -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.c_state}</h1>
                                </div>
                            </div>
                        }
                        {props?.allFormData?.propertyAddressDetails?.pin == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Pin -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.c_pin}</h1>
                                </div>
                            </div>
                        }
                        {props?.allFormData?.propertyAddressDetails?.locality == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Address -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.propertyAddressDetails?.c_locality}</h1>
                                </div>
                            </div>
                        }
                    </div>
                    }
                </div>

                {/* ///////////{*** Electricity & Water Details ***}////////// */}
                <div className='mt-4'>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t border-gray-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 4 && true} active={props?.formIndex >= 4 && true} />Electricity & Water Details</h1>
                        </div>
                        {
                            props?.allFormData?.electricityWaterDetails?.electricityKNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Electricity K. No -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.electricityWaterDetails?.electricityKNo}</h1>
                                    </div>
                                </div>
                        }
                        {
                            props?.allFormData?.electricityWaterDetails?.accNo == null ? "N/A" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>ACC No.-</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}> {props?.allFormData?.electricityWaterDetails?.accNo}</h1>
                                    </div>
                                </div>
                        }
                        {props?.allFormData?.electricityWaterDetails?.village_mauja == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Village/Mauja Name -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.electricityWaterDetails?.village_mauja}</h1>
                                </div>
                            </div>
                        }
                        {props?.allFormData?.electricityWaterDetails?.bindBookNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>BIND/BOOK No. -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.electricityWaterDetails?.bindBookNo}</h1>
                                </div>
                            </div>
                        }

                        {props?.allFormData?.electricityWaterDetails?.electrictyConsumerNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Electricity Consumer Category -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.electricityWaterDetails?.electrictyConsumerNo}</h1>
                                </div>
                            </div>
                        }

                        {props?.allFormData?.electricityWaterDetails?.bpApprovalNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Building Plan Approval No. -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.electricityWaterDetails?.bpApprovalNo}</h1>
                                </div>

                            </div>
                        }
                        {props?.allFormData?.electricityWaterDetails?.bpApprovalDate == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Building Plan Approval Date -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.electricityWaterDetails?.bpApprovalDate}</h1>
                                </div>

                            </div>
                        }

                        {props?.allFormData?.electricityWaterDetails?.waterConsumerNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Water Consumer No. -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.electricityWaterDetails?.waterConsumerNo}</h1>
                                </div>
                            </div>
                        }
                        {props?.allFormData?.electricityWaterDetails?.waterConnectionDate == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Water Connection Date -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.electricityWaterDetails?.waterConnectionDate}</h1>
                                </div>
                            </div>
                        }

                    </div>
                </div>

                {/* ///////////{*** Owner Details ***}////////// */}
                {/* {props?.allFormData?.ownerDetails == null ? "" : */}
                <div className='p-2 '>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t border-gray-400'>
                        <div className='col-span-4 '>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 5 && true} active={props?.formIndex >= 5 && true} />Owners Detail</h1>
                        </div>

                    </div>
                    {
                        props?.allFormData?.ownerDetails?.map((items) => (

                            <div className=''>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500`} >OWNER NAME</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.ownerName}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500`} >GENDER</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.gender}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500`} >DOB</label>

                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.dob}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500`} >GUARDIAN NAME</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.guardianName}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500`} >RELATION</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.relation}</label>
                                        </div>
                                    </div>
                                </div>

                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500`} >MOBILE NO.</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.mobileNo}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500`} >AADHAR</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.aadhar}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500`} >PAN</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.pan}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500`} >EMAIL</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.email}</label>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))
                    }
                </div>
                {/* } */}

                {/* ///////////{*** Owner Details ***}////////// */}
                {/* {props?.allFormData?.floorDetails == null ? "" : */}
                <div className='p-2 '>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t border-gray-400'>
                        <div className='col-span-4'>
                            <div className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 6 && true} active={props?.formIndex >= 6 && true} />Floors Detail</div>
                        </div>

                    </div>
                    {
                        props?.allFormData?.floorDetails?.map((items) => (

                            <>
                                <div className=''>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >FLOOR</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.floorNo}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >USAGE TYPE</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.useType}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >OCCUPANCY TYPE</label>

                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.occupancyType}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >CONSTRUCTION TYPE</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.constructionType}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >BUILT UP AREA(sqt.)</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.buildupArea}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >FROM DATE</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.dateFrom}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >UPTO DATE</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.dateUpto}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </>

                        ))
                    }
                </div>

                <div>
                  
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t-4 border-gray-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 7 && true} active={props?.formIndex >= 7 && true} /> Additional Details</h1>
                        </div>
                        {props?.additionalDetails?.basicDetails?.zone == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} `}>Zone -</h1></div>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.basicDetails?.zone}</h1></div>


                                </div>
                            </div>
                        }
                        {props?.additionalDetails?.basicDetails?.mobileTowerStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property has Mobile Tower(s) ? -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetails?.basicDetails?.mobileTowerStatus}</h1></div>


                                </div>
                                {props?.additionalDetails?.basicDetails?.mobileTowerStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row bg-gray-200 p-1'>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} `}>Total Area Covered -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetails?.basicDetails?.mobileTowerArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row bg-gray-200 p-1'>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} `}>Installation Date -</h1></div>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetails?.basicDetails?.mobileTowerDate}</h1></div>


                                        </div>
                                    </>
                                }
                            </div>
                        }
                        {props?.additionalDetails?.basicDetails?.hoardingStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property has Hoarding Board(s) ? -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetails?.basicDetails?.hoardingStatus}</h1></div>


                                </div>
                                {props?.additionalDetails?.basicDetails?.hoardingStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Total Area -</h1></div>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetails?.basicDetails?.hoardingArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'>   <h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Installation Date ? -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetails?.basicDetails?.hoardingDate}</h1></div>


                                        </div>
                                    </>

                                }
                            </div>
                        }

                        {props?.additionalDetails?.basicDetails?.petrolPumpStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} `}>Is property a Petrol Pump ? -</h1></div>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetails?.basicDetails?.petrolPumpStatus}</h1></div>


                                </div>
                                {props?.additionalDetails?.basicDetails?.petrolPumpStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} bg-gray-200 p-1 `}>Total Area -</h1></div>
                                            <div className='flex-1'>  <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetails?.basicDetails?.petrolPumpArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'>  <h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Completion Date -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetails?.basicDetails?.petrolPumpDate}</h1></div>


                                        </div>
                                    </>

                                }
                            </div>
                        }
                        {props?.additionalDetails?.basicDetails?.waterHarvestingStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Rainwater harvesting provision ? -</h1></div>
                                    <div className='flex-1'>  <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetails?.basicDetails?.waterHarvestingStatus}</h1></div>


                                </div>
                            </div>
                        }
                    </div>
                </div>
                {/* } */}
                <div className='w-full h-10'></div>
            </div>
            <div className='w-full h-40'></div>


        </>
    )
}

export default PropFeedbackScreen