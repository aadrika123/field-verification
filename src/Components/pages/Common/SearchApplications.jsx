import React, { useEffect, useState } from 'react'
import ProjectApiList from '../../api/ProjectApiList'
import ApiHeader from '../../api/ApiHeader'
import * as yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import CommonLoader from '../Common/CommonLoader'
import { useNavigate } from 'react-router-dom'
import search from '../../assets/images/search.png'
import {RiFilter2Line} from 'react-icons/ri'
import { RotatingLines } from 'react-loader-spinner'
import PropertyView from '../Property/PropertyView'

const SearchApplications = () => {
    const [readymadeListData, setreadymadeListData] = useState();
  const [readymadeListStatus, setreadymadeListStatus] = useState(false);
  const [readymadeListColumns, setreadymadeListColumns] = useState();
  const [searchBy, setSearchBy] = useState();
  const [loader, setloader] = useState(false);
  const [viewAll, setviewAll] = useState(false)


  // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
//   useSetTitle('Search Applied Applications')

  const {
    api_filterPropertyAppliedApplications, api_safInboxList
  } = ProjectApiList();

  const header = ApiHeader()

  const validationSchema = yup.object({
    filterBy: yup.string().required("This is a required field !"),
    // wardNo: yup.string().required("This is a required field !"),
    entry: yup.string().required("This is a required field !"),
  });
  const formik = useFormik({
    initialValues: {
      filterBy: "",
      entry: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      fetchData(values)
    //   setSerarachType(values.filterBy);
    },
    validationSchema,
  });


  const navigate = useNavigate();

  //Fetch Data API

  const fetchData = (data) => {
    setloader(true)
    setreadymadeListStatus(false)
    const requestBody = {
      filteredBy: data.filterBy,
      applicationNo: data.entry,
    };


    console.log('before fetch applied application..', requestBody)

    axios
      .post(api_filterPropertyAppliedApplications, requestBody, ApiHeader())
      .then((res) => {
        console.log('applied application. in ...', res?.data)
        if (data.filterBy == 'saf') {
        //   setreadymadeListColumns(COLUMNS_SAF)
        } else {
        //   setreadymadeListColumns(COLUMNS_OTHER)
        }
        // changeUrl(`/admin/searchAppliedProperty/${encodeURIComponent(data?.filterBy)}/${encodeURIComponent(data?.entry)}`)
        setreadymadeListData(res.data?.data)
        setreadymadeListStatus(true)
        setloader(false)
        setviewAll(true)
      })
      .catch((err) => {
        console.log("Error while fetching Filter Data", err)
        setreadymadeListStatus(false)
        setloader(false)

      });
  };

  useEffect(() => {
    getAllList()
  },[])

    const getAllList = () => {
      setloader(true)
    axios.get(api_safInboxList, ApiHeader())
    .then((res) => {
      console.log('applied application. in ...', res?.data)
      setreadymadeListData(res.data?.data)
      setreadymadeListStatus(true)
      setloader(false)
      setviewAll(false)
    })
    .catch((err) => {
      console.log("Error while fetching Filter Data", err)
      setreadymadeListStatus(false)
      setloader(false)

    });
  }



  const handleFilterBy = (e) => {
    formik.values.filterBy = e.target.value;

    if (e.target.value == "holdingNo") {
      setSearchBy("15 Digit Holding No");
    //   setDisableWard(true);
    }
    if (e.target.value == "ownerDetails") {
      setSearchBy("Owner Details");
    //   setDisableWard(false);
    }
    if (e.target.value == "address") {
      setSearchBy("Address");
    //   setDisableWard(false);
    }
  };



  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    { name == 'filterBy' && handleFilterBy(e) }
  }

  return (
     <>

      <div className="border shadow-xl bg-white mt-2">
        <div className="flex ml-5 mt-2 items-center">
          <img src={search} alt="" className="w-10 h-10" />
          <p className="font-semibold md:text-2xl text-xl ml-4 mt-1 text-gray-600">
            Search Applied Applications
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} onChange={handleChange}>
          <div className="flex flex-row flex-wrap justify-center items-center gap-x-8 gap-y-2 my-5 m-10">
            <div className='w-full md:w-max'>
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                Application Type<span className="text-red-500">*</span>
              </label>
              <select
                {...formik.getFieldProps('filterBy')}
                className="cursor-pointer w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
              >
                <option value="">--Select--</option>
                <option value="saf">SAF</option>
                {/* <option value="concession">Concession</option>
                <option value="objection">Objection</option>
                <option value="rainWaterHarvesting">Rainwater Harvesting</option>
                <option value="holdingDeactivation">Holding Deactivation</option>
                <option value="amalgamation">Amalgamtion</option>
                <option value="bifurcation">Bifurcation</option> */}
              </select>
              <p className="text-red-500 text-xs">
                {formik.touched.filterBy && formik.errors.filterBy
                  ? formik.errors.filterBy
                  : null}
              </p>
            </div>
            <div>
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                
                SAF No. {searchBy}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...formik.getFieldProps('entry')}
                className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
              />
              <p className="text-red-500 text-xs">
                {formik.touched.entry && formik.errors.entry
                  ? formik.errors.entry
                  : null}
              </p>
            </div>
            <div className="mt-4 w-full md:w-max flex-col items-center justify-center">
                {
                                loader ? 
                                <>
                                {
                                  !viewAll && <div className='flex justify-center'>
                                  <RotatingLines
                                      strokeColor="grey"
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      width="25"
                                      visible={true}
                                  />
                              </div>
                                }
                                </>
                                                             :
                                                             <button
                type="submit"
                className="w-full border border-green-600 bg-green-500 hover:bg-green-600 text-white shadow-lg rounded-sm text-base font-semibold px-5 py-1"
              >
                <p className="flex items-center gap-x-4 justify-center">
                  
                  <span className=""><RiFilter2Line fontSize={'large'}/></span>
                  Search Record
                </p>
              </button>
                }

{viewAll && <div className='w-full mt-2' onClick={() => getAllList()}>
{
                                loader ? 
                                <div className='flex justify-center'>
                                                                <RotatingLines
                                                                    strokeColor="grey"
                                                                    strokeWidth="5"
                                                                    animationDuration="0.75"
                                                                    width="25"
                                                                    visible={true}
                                                                />
                                                            </div>
                                                             :
<div 
                className="cursor-pointer text-center w-full border border-indigo-600 bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg rounded-sm text-base font-semibold px-5 py-1"
              >
                
                  View All Applications
              </div>}
</div>}
              
            </div>
          </div>
        </form>

        {/* View Search Result in List Table */}
        <div className="mt-10 mx-4">
 {(readymadeListStatus && readymadeListData?.length != 0) &&
           readymadeListData?.map((dataList) => 
            <>
                    <PropertyView dataList={dataList} />
            </>)
          }
          {
            readymadeListStatus && readymadeListData?.length == 0 &&
            <div className="text-xl font-semibold text-red-400 text-center">Data Not Found</div>
          }
        </div>
      </div>
    </>
  )
}

export default SearchApplications