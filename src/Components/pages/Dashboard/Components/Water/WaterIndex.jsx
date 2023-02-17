///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import WaterApiList from '../../../../../Components/ApiList/WaterApiList'
import '../../assets/Fonts.css'
import { contextDash } from '../../context/contextDash'
import WaterList from './WaterList'
import WaterPending from './WaterPending'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import BarLoader from '../../../../../Components/Common/BarLoader'
import WaterPaymentModal from '../../../../Water/Modals/WaterPaymentModal'
import { buttonStyle } from '../../../../../Components/Common/CommonTailwind/CommonTailwind'

const WaterIndex = () => {

  // ========NAVIGATION CONSTANT============
  const navigate = useNavigate()

  //=============LOCATION CONSTANT================
  const location = useLocation()

  //==========DESTRUCTING API'S========================
  const { api_citizenApplications, api_citizenApprovedApplications, header } = WaterApiList();

  //===========STATE VARIABLES=========================
const [openPaymentModal, setOpenPaymentModal] = useState(0);
const [openDocumentModal, setOpenDocumentModal] = useState(0);
const [appliedList, setAppliedList] = useState();
const [approvedApplications, setApprovedApplications] = useState();
const [paymentData, setPaymentData] = useState();
const [refetchApplicationList, setRefetchApplicationList] = useState(0);
const [loaderStatus, setloaderStatus] = useState(false);

//==============PAYMENT FUNCTION===============
const handlePayBtn = (paymentData) => {
  console.log("Clicked PAy");
  setOpenPaymentModal((prev) => prev + 1);
  setPaymentData(paymentData);
};

// ==============GETTING WATER CONNECTION LIST=======================
useEffect(() => {
  setloaderStatus(true);
  setTimeout(() => {
    setloaderStatus(false)
}, 10000);
  axios
    .post(api_citizenApprovedApplications, {}, header)
    .then((res) => {
      if (res.data.status == true) {
        console.log("Approved Application Listst", res.data);
        setApprovedApplications(res.data.data);
        setloaderStatus(false);
      } else {
        console.log("Error Approced Application Listst", res);
        setloaderStatus(false);
      }
    })
    .catch((err) => {
      console.log("error ecxewption", err);
      setloaderStatus(false);
    });
}, [refetchApplicationList]);

// =================GETTING WATER APPLICATION LIST==================
useEffect(() => {
  setloaderStatus(true);
  setTimeout(() => {
    setloaderStatus(false)
}, 10000);
  axios
    .get(api_citizenApplications, header)
    .then((res) => {
      if (res.data.status == true) {
        console.log("Application Listst", res);
        setAppliedList(res.data.data);
        setloaderStatus(false);
      } else {
        console.log("Error its FALSE", res);
        setloaderStatus(false);
      }
    })
    .catch((err) => {
      console.log("error ecxewption", err);
      setloaderStatus(false);
    });
}, [refetchApplicationList]);

// ===============CSS BUTTON STYLE CONSTANT===============
  // let buttonStyle = 'px-4 py-1 text-xs 2xl:text-sm rounded-md hover:shadow-md bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer poppins'

  return (
    <>

    {/* ============LOADER=================== */}
    {loaderStatus && <BarLoader/>}

    <button className={buttonStyle + `fixed z-10 animate__animated animate__fadeIn animate__faster`} onClick={() => navigate('/landingDashboard')}>Back</button>

    {/* ============WATER PAYMENT============ */}
    <WaterPaymentModal
        openPaymentModal={openPaymentModal}
        paymentData={paymentData}
        refechList={() => setRefetchApplicationList((prev) => prev + 1)}
      />

    {/* ============MAIN================ */}
    <div className='pt-6 w-full animate__animated animate__fadeIn animate__faster poppins'>

        {/* ================WATER CONNECTION LIST================ */}
        {(location.pathname == '/view-water' && !loaderStatus) && <WaterList approvedApplications={approvedApplications} appliedList={appliedList} />}
        
        {/* ===============WATER APPLICATIN LIST============= */}
        {(location.pathname == '/track-water' && !loaderStatus) && <WaterPending approvedApplications={approvedApplications} appliedList={appliedList} handlePayBtn={handlePayBtn}
refechList={() => setRefetchApplicationList((prev) => prev + 1)}/>}

    </div>
      
    </>
  )
}

export default WaterIndex

// export to : LandingDashboardNew.jsx