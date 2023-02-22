//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 18/11/2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - PropReAssessmentScreen
// >DESCRIPTION - PropReAssessmentScreen Component
//////////////////{*****}//////////////////////////////////////////

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList'
import axios from 'axios'


function PropReAssessmentScreen() {

  const { safId } = useParams()
  console.log("param", safId)

  const { api_getAppicationFullDetail } = CitizenApplyApiList()

  const [applicationFullData, setapplicationFullData] = useState()


  const getApplicationDetail = (id) => {

    // navigate(`/re/${id}`)

    // let token = window.localStorage.getItem('token')
    let token = "1807|ezuUxW0nAm1A5MkHp8QW4etEfUWhaTG1xC5k0NLN"
    const header = {
      headers:
      {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }

    }
    // { id: e.target.value }
    axios.post(`${api_getAppicationFullDetail}`,
      {
        id: safId
      },
      header)
      .then(function (response) {
        console.log('Application detail for re assesment...', response.data.data)
        setapplicationFullData(response.data.data)
      })
      .catch(function (error) {
        console.log('==2 details by id error...', error)
      })
  }

  useEffect(() => {
    getApplicationDetail()
  }, [safId])


  console.log("Re assessment", applicationFullData )

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12'>
        <div className='col-span-3'>

        </div>
        <div className='col-span-9'>
          <div className={` block p-4 mt-4 w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg shadow-lg bg-white md:w-full mx-auto  overflow-x-auto`}>

            <h1 className='px-2 font-semibold mt-0 bg-gray-400 text-center text-white font-serif py-2 text-lg shadow-lg border border-white mb-10'>Re-Assessment</h1>

            <div className='mt-4'>
              <div>
                <h1 className='px-1 font-semibold font-serif text-xs'><img alt="pin" className='w-5 inline' /> Basic Details</h1>


                <div className='bg-white rounded-lg shadow-lg py-6'>
                  <div className="flex space-x-10 pl-4 ">
                    <div className='flex-1 text-xs'>
                      <div className='text-gray-500'>Ward No.</div>
                      <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.old_ward_no}</div>
                    </div>
                    <div className='flex-1 text-xs'>
                      <div className='text-gray-500'>New Ward No</div>
                      <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.old_ward_no}</div>
                    </div>
                    <div className='flex-1 text-xs'>
                      <div className='text-gray-500'>Ownership Type</div>
                      <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.ownership_type}</div>
                    </div>
                    <div className='flex-1 text-xs'>
                      <div className='text-gray-500'>Property Type</div>
                      <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.property_type}</div>
                    </div>

                  </div>


                  <div className="flex space-x-10  pl-4 mt-4">
                    <div className='flex-1 text-xs'>
                      <div className='text-gray-500'>Property has Mobile Tower(s) ?</div>
                      <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.is_mobile_tower}</div>
                    </div>
                    <div className='flex-1 text-xs'>
                      <div className='text-gray-500'>Property has Hoarding Board(s) ?</div>
                      <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.is_hoarding_board}</div>
                    </div>
                    <div className='flex-1 text-xs'>
                      <div className='text-gray-500'>Is property a Petrol Pump ?</div>
                      <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.is_petrol_pump}</div>
                    </div>
                    <div className='flex-1 text-xs'>
                      <div className='text-gray-500'>Rainwater harvesting provision ?</div>
                      <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.is_water_harvesting}</div>
                    </div>

                  </div>
                  <div className="flex space-x-10  pl-4 mt-4">
                    <div className='flex-1 text-xs'>
                      <div className='text-gray-500'>Zone</div>
                      <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.zone_mstr_id}</div>
                    </div>
                    <div className='flex-1 text-xs'>

                    </div>
                    <div className='flex-1 text-xs'>

                    </div>
                    <div className='flex-1 text-xs'>

                    </div>
                    <div className='flex-1 text-xs'>

                    </div>
                  </div>
                </div>
              </div>

              {/* Property  details */}
              <h1 className='px-1 font-semibold font-serif text-xs mt-10'><img alt="pin" className='w-5 inline' /> Property Address & Details</h1>
              <div className='bg-white rounded-lg shadow-lg py-6'>
                <div className="flex space-x-10 pl-4 ">
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Khata No.</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.khata_no}</div>

                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Plot No</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.plot_no}</div>
                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Village/Mauja Name</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.village_mauja_name}</div>
                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Area of Plot</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.area_of_plot}</div>
                  </div>

                </div>

                <div className="flex space-x-10  pl-4 mt-4">
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>City</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.prop_city}</div>
                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>District</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.prop_dist}</div>
                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>State</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.prop_state}</div>
                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Pin</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.prop_pin_code}</div>
                  </div>

                </div>

                <div className="flex space-x-10  pl-4 mt-4">
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Road Width</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.road_type_mstr_id}</div>
                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Locality</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.old_ward_no}</div>
                  </div>
                  <div className='flex-1 text-xs'>

                  </div>
                  <div className='flex-1 text-xs'>

                  </div>
                </div>

                <div></div>
                {/* coressponding address */}
                <div className="col-span-4 grid grid-cols-5 justify-center items-center mt-4 mb-4">
                  <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                  <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="block mt-1 text-xs text-gray-400 inline md:px-4 font-mono text-center">Corresponding Address</small></label></div>
                  <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                </div>

                <div className="flex space-x-10  pl-4 mt-4">
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>City</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.corr_city}</div>
                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>District</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.old_ward_no}</div>
                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>State</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.old_ward_no}</div>
                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Pin</div>
                    <div className='font-bold text-sm bg-gray-50 py-1 border rounded-md shadow-md'>{applicationFullData?.old_ward_no}</div>
                  </div>

                </div>

                <div className="flex space-x-10  pl-4 mt-4">

                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Locality</div>
                    <div className='font-bold text-sm'><input type='text' className='bg-gray-50 py-1 border rounded-md shadow-md ' readOnly ></input></div>
                  </div>
                  <div className='flex-1 text-xs'>

                  </div>
                  <div className='flex-1 text-xs'>

                    <div className='flex-1 text-xs'>

                    </div>
                    <div className='flex-1 text-xs'>

                    </div>
                  </div>
                </div>
              </div>


              {/* electricity details */}
              {/* <FcFlashOn className="text-xl inline" /> */}


              <h1 className='px-1 font-semibold font-serif text-xs mt-6'> Electricity & Water Details</h1>
              <div className='bg-whiterounded-lg shadow-lg py-6'>
                <div className="flex space-x-10 pl-4 ">
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Electricity K. No</div>
                    <div className='font-bold text-sm'><input type='text' className='bg-gray-50 py-1 border rounded-md shadow-md ' readOnly ></input></div>

                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>ACC No.</div>
                    <div className='font-bold text-sm'><input type='text' className='bg-gray-50 py-1 border rounded-md shadow-md ' readOnly ></input></div>

                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>BIND/BOOK No.</div>
                    <div className='font-bold text-sm'><input type='text' className='bg-gray-50 py-1 border rounded-md shadow-md ' readOnly ></input></div>

                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Electricity Consumer Category</div>
                    <div className='font-bold text-sm'><input type='text' className='bg-gray-50 py-1 border rounded-md shadow-md ' readOnly ></input></div>

                  </div>
                  <div className='flex-1 text-xs'>

                  </div>
                </div>


                <div className="flex space-x-10  pl-4 mt-4">
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Building Plan Approval No.</div>
                    <div className='font-bold text-sm'><input type='text' className='bg-gray-50 py-1 border rounded-md shadow-md ' readOnly ></input></div>

                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Building Plan Approval Date</div>
                    <div className='font-bold text-sm'><input type='text' className='bg-gray-50 py-1 border rounded-md shadow-md ' readOnly ></input></div>

                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Water Consumer No.</div>
                    <div className='font-bold text-sm'><input type='text' className='bg-gray-50 py-1 border rounded-md shadow-md ' readOnly ></input></div>

                  </div>
                  <div className='flex-1 text-xs'>
                    <div className='text-gray-500'>Water Connection Date</div>
                    <div className='font-bold text-sm'><input type='text' className='bg-gray-50 py-1 border rounded-md shadow-md ' readOnly ></input></div>

                  </div>
                  <div className='flex-1 text-xs'>

                  </div>
                </div>
              </div>

              {/* owner details */}
              {/* <FcBusinessman className='inline text-xl' />  */}

              <div className='mt-8'>
                <h1 className='px-1 font-semibold font-serif text-xs'>Owner Details</h1>

                <table className='min-w-full leading-normal mt-2'>
                  <thead className='font-bold text-left text-sm bg-white text-gray-600'>
                    <tr>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">#</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Owner Name</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Gender</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">DOB</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Guardian Name</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Relation</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Mobile No.</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Aadhar</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">PAN </th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">email </th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Is-Armed-Force </th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Is-Specially-Abled? </th>

                    </tr>
                  </thead>
                  <tbody className="text-sm">


                    <>
                      <tr className="bg-white shadow-lg border-b border-gray-200">
                        <img src='https://cdn-icons-png.flaticon.com/512/2919/2919592.png' className='h-6 bg-green-300 p-1' />
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>

                      </tr>
                    </>



                  </tbody>
                </table>
              </div>

              {/* floor details */}
              <div className='mt-8'>
                <h1 className='px-1 font-semibold font-serif text-xs'><img alt="building image" className='inline w-4' /> Floor Details</h1>

                <table className='min-w-full leading-normal mt-2'>
                  <thead className='font-bold text-left text-sm bg-white text-gray-600'>
                    <tr>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">#</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Floor </th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Usage Type</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Occupancy Type</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Construction Type</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Built Up Area</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">From Date</th>
                      <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Upto Date</th>


                    </tr>
                  </thead>
                  <tbody className="text-sm">

                    <>
                      <tr className="bg-white shadow-lg border-b border-gray-200">
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>
                        <td className="px-2 py-2 text-sm text-left"></td>

                      </tr>
                    </>



                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default PropReAssessmentScreen