///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import { useContext } from 'react'
import '../../assets/Fonts.css'
import { contextDash } from '../../context/contextDash'
import TradeList from './TradeList'
import TradePending from './TradePending'
import ApiHeader from '../../../../../Components/ApiList/ApiHeader'
import {TRADE} from '../../../../Trade/tradeComponent/TradeApiListFile';
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import BarLoader from '../../../../../Components/Common/BarLoader'
import { useLocation, useNavigate } from 'react-router-dom'
import { buttonStyle } from '../../../../../Components/Common/CommonTailwind/CommonTailwind'

const TradeIndex = () => {
  
  const {setaction, action} = useContext(contextDash)
  const location = useLocation()

  const navigate = useNavigate()

  const [applicationData, setapplicationData] = useState()
  const [licenses, setlicenses] = useState()
  const [loaderStatus, setloaderStatus] = useState(false)

  useEffect(() => {
    setloaderStatus(true)
    setTimeout(() => {
      setloaderStatus(false)
  }, 10000);
    axios.post(TRADE.GET_CITIZEN_APPLICATION_LIST, { ulbId: 2 }, ApiHeader())
              .then((response) => {
                console.log("trade response => " , response);
                if (response.data.status) {
                  let temp = response?.data?.data
                  setapplicationData(temp.filter(item => (item?.pending_status != 5 && item?.license_type != 'approved')));
                  setlicenses(temp.filter(item => (item?.pending_status == 5 && (item?.license_type == 'approved' || item?.license_type == 'old'))))
                } else {
        
                }
                setloaderStatus(false)
              })
              .catch((error) => {
                console.log(error);
                setloaderStatus(false)
              })
  },[])

  // let buttonStyle = 'px-4 py-1 text-xs 2xl:text-sm rounded-md hover:shadow-md bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer poppins'

  return (
    <>

    {loaderStatus && <BarLoader/>}

    <button className={buttonStyle + `z-10 animate__animated animate__fadeIn animate__faster`} onClick={() => navigate('/landingDashboard')}>Back</button>

    <div className='pt-6 w-full animate__animated animate__fadeIn animate__faster poppins'>

        {(location.pathname == '/view-trade' && !loaderStatus) && <TradeList applicationData={licenses} application={applicationData}/>}
        {(location.pathname == '/track-trade' && !loaderStatus) && <TradePending applicationData={applicationData} licenses={licenses}/>}

    </div>
      
    </>
  )
}

export default TradeIndex

// export to : LandingDashboardNew.jsx