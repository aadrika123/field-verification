///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import '../../assets/Fonts.css'
import { contextDash } from '../../context/contextDash'
import team from '../../../../../Components/Media/team.png'
import EmptyList from '../EmptyList'
import {BiChevronsRight} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import {AiFillInfoCircle} from 'react-icons/ai'
import TradePaymentModal from '../../../../Trade/Modals/TradePaymentModal'
import TradeDocumentModal from '../../../../Trade/Modals/TradeDocumentModal';
import Modal from 'react-modal'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import { HEADER, TRADE } from '../../../../Trade/tradeComponent/TradeApiListFile';

const TradePending = (props) => {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: 'none'
    },
  };

  const [openPaymentModal, setOpenPaymentModal] = useState(0)
  const [openDocumentModal, setOpenDocumentModal] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenDoc, setIsOpenDoc] = useState(false);
  const [applicationData, setapplicationData] = useState()
  const [licenseId, setlicenseId] = useState('')
  const [Abr, setAbr] = useState('IN');                   //Content abriviation
  const [show, setshow] = useState(false);
  const [NotView, setNotView] = useState(0)               // Notification view Style   0 list 1 is grid
  const [OrderResponse, setOrderResponse] = useState();

  const navigate = useNavigate()
  
  const {setaction} = useContext(contextDash)

  let buttonStyle = 'px-4 py-1 text-xs 2xl:text-sm rounded-md hover:shadow-md bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer poppins'

  function openModal() {
    setIsOpen(true);
  }
  function openModalDoc() {
    setIsOpenDoc(true);
  }
  function afterOpenModal() {

  }
  function afterOpenModalDoc() {

  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeModalDoc() {
    setIsOpenDoc(false);
  }



  const handlePayBtn = (id) => {
    console.log("Clicked PAy")
    getPaymentDetails(id);

    // setOpenPaymentModal(prev => prev + 1)
    // setlicenseId(id);
  }

  const getPaymentDetails = (id) => {

    let payload = {
      licenceId: id
    };
    axios.post('http://192.168.0.16:8000/api/trade/payOnline', payload, HEADER())
      .then((res) => {
        console.log("Oder ID Generated", res)

        if (res.data.status == true) {
          // let response = RazorpayPaymentScreen(res.data.data, dreturn)

          setOrderResponse(res.data.data);
          console.log("order response");
          setOpenPaymentModal(prev => prev + 1)
          setlicenseId(id);
          // const promise1 = Promise.resolve(response);
          // promise1.then((value) => {
          //     console.log("payment response", value);
          //     // expected output: 123
          // });
          // console.log("payment response", response);
        } else {
          console.log("order response", res.data.message)
        }
      })
      .catch((err) => console.log("Error genrating order id", err))
  }


  const handleUploadBtn = (id) => {
    console.log("Clicked Document Upload")
    // setOpenDocumentModal(true)
    openModalDoc()
    setlicenseId(id);
  }

  const getApplicationList = () => {
    axios.post(TRADE.GET_CITIZEN_APPLICATION_LIST, { ulbId: 2 }, HEADER())
      .then((response) => {
        console.log("trade response => " , response);
        if (response.data.status) {
          setapplicationData(response.data.data);
        } else {

        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getApplicationList();
  }, [1])

  const notify = (toastData, actionFlag) => {
    toast.dismiss();
    { actionFlag == 'escalated' && toast.success(toastData) }
    { actionFlag == 'success' && toast.success(toastData) }
    { actionFlag == 'de-escalated' && toast.warn(toastData) }
    { actionFlag == 'notice' && toast.warn(toastData) }
    { actionFlag == 'error' && toast.error(toastData) }
  };
  const showLoader = (value) => {
    console.log('loader is called with value ', value)
    setshow(value);
  }

  return (
    <>

<div className="flex items-center gap-2 md:text-base  font-serif font-semibold text-gray-700 2xl:text-base text-sm mb-2 animate__animated animate__fadeIn">
            {" "}
            <img src={team} alt="" srcset="" className='2xl:w-8 w-6' /> Pending Applications{" "}
          </div>

{(props?.applicationData?.length == 0 || props?.applicationData == undefined) && <EmptyList length={props?.licenses?.length} image={team} title={"You don't have any license application. Click below to apply new license."} subtitle={"All your pending license application will be visible here."} btnApply={"Apply New License"} btnView={"View My Licenses"} apply={'/trade-new-apply'} view={'/view-trade'}/>}

{(props?.applicationData?.length != 0 && props?.applicationData != undefined) && 
props?.applicationData?.map((application) => 
<>
<div className='flex flex-row flex-wrap gap-x-4 gap-y-2 absolute top-4 2xl:top-8 right-[23.5rem] 2xl:right-[32rem]'>
                <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-xs 2xl:text-md' onClick={() => navigate(`/trade-new-apply`)}>Appy New License</button>
                <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-xs 2xl:text-md relative' onClick={() => navigate(`/view-trade`)}>View My Licenses
                <span className='absolute bg-amber-200 text-black rounded-full p-1 px-2 -top-2 -right-2 shadow-md font-semibold poppins'>{(props?.licenses?.length == null || props?.licenses?.length == undefined ||props?.licenses?.length == '') ? 0 : props?.licenses?.length}</span></button>
                </div>
<div className='w-full pb-0 pt-10 bg-white rounded-lg border border-gray-100 shadow-xl mb-6 relative overflow-hidden animate__animated animate__fadeIn animate__faster'>
<div className='absolute text-center top-3 left-[10rem] md:left-[12rem] text-green-600 tracking-wider font-semibold text-xs poppins'>{application?.apply_from} Method</div>
    <div className='w-full pb-4 pt-0 px-4'>
        <div className='w-full rounded-lg  space-b-2'>
            <div className='w-full  grid grid-cols-12'>
                <div className='col-span-12 md:col-span-6 grid grid-cols-12'>
                    <div className='col-span-6'>
                        <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{application?.owner_name==''?'N/A':application?.owner_name}</div>
                        <div className='text-xs text-gray-600 font-serif italic'>Applicant Name</div>
                    </div>

                    <div className='col-span-6'>
                        <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{application?.application_date==''?'N/A':application?.application_date}</div>
                        <div className='text-xs text-gray-600 font-serif italic'>Apply Date</div>
                    </div>
                </div>
                <div className='col-span-12 md:col-span-6 grid grid-cols-12 mt-4 md:mt-0'>
                    <div className='col-span-6'>
                        <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{application?.application_no ==''?'N/A':application?.application_no }</div>
                        <div className='text-xs text-gray-600 font-serif italic'>Application No.</div>
                    </div>

                    <div className='col-span-6'>
                        <div className='font-semibold text-gray-700 2xl:text-base text-sm'>{application?.firm_name ==''?'N/A':application?.firm_name }</div>
                        <div className='text-xs text-gray-600 font-serif italic'>Firm Name</div>
                    </div>
                </div>
            </div>
            
            {(application?.document_upload_status != 0 && application?.payment_status != 0) &&
            <div className="w-full poppins 2xl:text-sm text-xs italic mt-4 text-gray-800 pr-10">
            Your application form is <span className="font-semibold poppins">in verfication process</span> . Don't worry, after the successfull verification, you will soonly get your holding number. <br /> Thank You for your patience !!
        </div>}

        {application?.document_upload_status == 0 &&
             <div className="w-full poppins 2xl:text-sm text-xs italic mt-4 text-gray-800 pr-10">
                Your application form is <span className="font-semibold poppins">in progress</span> and you have to upload your proper documents so that your form progress will proceed. We are waiting for you to upload documents. Thank You !!
            </div>}

            {(application?.payment_status == 0 && application?.document_upload_status != 0) &&
             <div className="w-full poppins 2xl:text-sm text-xs italic mt-4 text-gray-800 pr-10">
                Your application form is <span className="font-semibold poppins">in progress</span>. Please complete the payment so that your form will declared as complete and undergo in verification process. We are waiting for your payment. Thank You !!
            </div>}

           {(application?.document_upload_status == 0 || application?.payment_status == 0) &&
           <>
           <hr className='2xl:h-[0.2rem] 2xl:my-4 h-[0.1rem] my-2' />
           <div className='w-full pl-2 text-sm poppins'>
                <div className='font-semibold 2xl:text-base text-md 2xl:mb-2 mb-1 poppins'>Action</div>
            <div className='flex flex-wrap items-center flex-row gap-8'>
                {application?.document_upload_status == 0 && <div className='2xl:text-sm text-xs text-amber-600 poppins'> <AiFillInfoCircle fontSize={14} className="inline" /> Document is pending <span className='float-right ml-4 cursor-pointer bg-indigo-500 text-white px-4  2xl:text-sm text-xs shadow-lg py-[0.2rem] hover:bg-indigo-600 hover:scale-105 rounded-sm border border-white' onClick={() => handleUploadBtn(application?.id)}>Upload</span></div>}
                {(application?.payment_status == 0 && application?.document_upload_status != 0) && <div className='2xl:text-sm text-xs text-amber-600 poppins'> <AiFillInfoCircle fontSize={14} className="inline" /> Payment is pending <span className='float-right ml-4 cursor-pointer bg-indigo-500 text-white px-4  text-sm shadow-lg hover:bg-indigo-600 py-[0.2rem] hover:scale-105 rounded-sm border border-white' onClick={() => handlePayBtn(application?.id)}> &nbsp;&nbsp;Pay&nbsp;&nbsp;&nbsp;</span></div>}
                {(application?.payment_status == 2 && application?.document_upload_status != 0) && <div className='2xl:text-sm text-xs text-amber-600 poppins'> <AiFillInfoCircle fontSize={14} className="inline" /> Check not cleared</div>}
            </div>
            </div>
            </>}
        </div>
        <span onClick={() => navigate(`/trade-view/${application?.id}`)} className=' text-white px-2 2xl:px-4 py-[0.2rem] text-xs 2xl:text-sm md:absolute bottom-3 2xl:bottom-2 right-2 rounded-sm bg-indigo-500 border-indigo-400 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm  cursor-pointer poppins md:mt-0 mt-2'>View Details<BiChevronsRight className="inline font-semibold text-xl" /></span>
    </div>

            <span className='px-2 text-xs absolute top-2 left-2  py-1 rounded-sm bg-amber-500 border-amber-300 hover:border-amber-600 hover:bg-amber-500 tracking-wider text-white font-semibold shadow-sm poppins'>
              {application?.application_type_id == 1 && <>License Application</>}
              {application?.application_type_id == 2 && <>Renewal Application</>}
              {application?.application_type_id == 3 && <>Amendment Application</>}
              {application?.application_type_id == 4 && <>Surrender Application</>}
            </span>
</div>

<Modal
          isOpen={modalIsOpenDoc}
          onAfterOpen={afterOpenModalDoc}
          onRequestClose={closeModalDoc}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className='bg-emerald-300 '>
            <TradeDocumentModal openDocumentModal={openDocumentModal} closeModalDoc={closeModalDoc} id={licenseId} />
          </div>
        </Modal>

        <TradePaymentModal openPaymentModal={openPaymentModal} id={licenseId} OrderResponse={OrderResponse} toast={notify} showLoader={showLoader} />


</>
)
}
      
    </>
  )
}

export default TradePending

// export to : TradeIndex.jsx