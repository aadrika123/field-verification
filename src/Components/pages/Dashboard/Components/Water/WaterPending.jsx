///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/Fonts.css'
import water2 from '../../../../../assets/images/water2.png'
import drop from '../../../../../assets/images/drop.png'
import CitizenMessageScreenModified from '../../../../../Components/CitizenMessageScreenModified'
import { BiChevronsRight } from 'react-icons/bi'
import { AiFillInfoCircle } from 'react-icons/ai'
import { MdSend } from 'react-icons/md'
import WaterDeleteApplicationModal from '../../../../Water/Modals/WaterDeleteApplicationModal'
import WaterPendingAppModal from '../../../../Water/Modals/WaterPendingAppModal'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import EmptyList from '../EmptyList'

const WaterPending = (props) => {

  // ============NAVIGATION CONSTANT=================
  const navigate = useNavigate()

  // ==============STATE VARIABLES==============
  const [selectedApplicationId, setselectedApplicationId] = useState()
  const [selectedWorkflowId, setselectedWorkflowId] = useState()
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(0)
  const [dataTobeDeleted, setDataTobeDeleted] = useState()
  const [openPendingModal, setOpenPendingModal] = useState(0)
  const [viewApplicationData, setViewApplicationData] = useState()

  function openModal2() {
    console.log('modal open 2')
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }
  const handleDeleteApplication = (data) => {
    console.log("handleDeleteApplication", data)
    setDataTobeDeleted(data)
    setOpenDeleteModal(prev => prev + 1)
  }

  const notify = (message) => {
    toast.dismiss(message)
    toast.info(message)
  }

  const handleViewPendingApplication = (data) => {
    setOpenPendingModal(prev => prev + 1)
    setViewApplicationData(data)
  }

  const reFetch = () => {
    props.refechList();
  }

  return (
    <>

      {/* ============WATER DELETE MODAL=============== */}
      <WaterDeleteApplicationModal openDeleteModal={openDeleteModal} dataTobeDeleted={dataTobeDeleted} reFetch={reFetch} />

      <WaterPendingAppModal openModal={openPendingModal} viewApplicationData={viewApplicationData} />

      <div className="flex items-center gap-2 md:text-base  font-serif font-semibold text-gray-700 2xl:text-base text-sm mb-2 animate__animated animate__fadeIn">
        {" "}
        <img src={drop} alt="" srcset="" className='2xl:w-8 w-6' /> Pending Water Applications{" "}
      </div>

      {/* ===========BLANK SCREEN========= */}
      {(props?.appliedList?.length == 0 || props?.appliedList == undefined) &&
        <EmptyList length={props?.approvedApplications?.length} image={water2} title={"You don't have any pending applications. Click below button to apply."} subtitle={"All your pending water applications  will be visible here."} btnApply={"Apply New Connection"} btnView={"View Water Connections"} apply={"/water-apply"} view={"/view-water"} />
      }

      {
        (props?.appliedList?.length != 0 && props?.appliedList != undefined) && <>

          {/* ================MAIN CONTAINER============== */}
          {props?.appliedList != "" &&
            props?.appliedList?.map((application) => (
              <>
                {/* =============BUTTONS================ */}
                <div className='flex flex-row flex-wrap gap-x-4 gap-y-2 absolute top-4 2xl:top-8 right-[23.5rem] 2xl:right-[32rem]'>
                  <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-xs 2xl:text-md' onClick={() => navigate(`/water-apply`)}>Appy New Connection</button>
                  <button className=' border border-indigo-400 bg-indigo-500 text-white hover:bg-white font-semibold transition-all duration-200 px-4 poppins py-2 shadow-lg cursor-pointer hover:scale-105 hover:text-indigo-500 rounded-sm shadow-indigo-400 text-xs 2xl:text-md relative' onClick={() => navigate(`/view-water`)}>View Water Connections
                    <span className='absolute bg-amber-200 text-black rounded-full p-1 px-2 -top-2 -right-2 shadow-md font-semibold poppins'>{(props?.approvedApplications?.length == null || props?.approvedApplications?.length == undefined || props?.approvedApplications?.length == '') ? 0 : props?.approvedApplications?.length}</span></button>
                </div>

                <div className='w-full pb-0 pt-10 bg-white rounded-lg border border-gray-100 shadow-xl mb-6 relative overflow-hidden animate__animated animate__fadeIn animate__faster'>
                  <div className='w-full pb-4 pt-0 px-4'>
                    <div className='w-full rounded-lg  space-b-2'>

                      {/* ============DETAILS========= */}
                      <div className='w-full  grid grid-cols-12'>
                        <div className='col-span-12 md:col-span-6 grid grid-cols-12'>
                          <div className='col-span-6'>
                            <div className='font-semibold text-gray-700 2xl:text-base text-sm'>
                              {application?.application_no == ""
                                ? "N/A"
                                : application?.application_no}
                            </div>
                            <div className="text-xs text-gray-600 font-serif italic">
                              Application No.
                            </div>
                          </div>

                          <div className="col-span-6">
                            <div className="font-semibold text-gray-700 2xl:text-base text-sm">
                              {application?.apply_date == ""
                                ? "N/A"
                                : application?.apply_date}
                            </div>
                            <div className="text-xs text-gray-600 font-serif italic">
                              Apply Date
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 grid grid-cols-12 mt-4 md:mt-0">
                          <div className="col-span-6">
                            <div className="font-semibold text-gray-700 2xl:text-base text-sm">
                              {application?.ward_name == "" ? (
                                "N/A"
                              ) : (
                                <>
                                  {application?.ward_name} (
                                  {application?.ward_id})
                                </>
                              )}
                            </div>
                            <div className="text-xs text-gray-600 font-serif italic">
                              Ward No. (ID)
                            </div>
                          </div>

                          <div className="col-span-6">
                            <div className="font-semibold text-gray-700 2xl:text-base text-sm">
                              ₹ {application?.amount}
                            </div>
                            <div className="text-xs text-gray-600 font-serif italic">
                              Total Tax
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ============APPLICATION INFORMATION========== */}
                      {(application?.upload_status == true && application?.payment_status == true) &&
                        <div className="w-full poppins 2xl:text-sm text-xs italic mt-4 text-gray-800 pr-10">
                          Your application form is <span className="font-semibold poppins">in verification process</span> . Don't worry, after the successful verification, you will soonly get your holding number. <br /> Thank You for your patience !!
                        </div>}

                      {(application?.upload_status == false) &&
                        <div className="w-full poppins 2xl:text-sm text-xs italic mt-4 text-gray-800 pr-10">
                          Your application form is <span className="font-semibold poppins">in progress</span> and you have to upload your proper documents so that your form progress will proceed. We are waiting for you to upload documents. Thank You !!
                        </div>}

                      {(application?.upload_status == true && application?.payment_status == false) &&
                        <div className="w-full poppins 2xl:text-sm text-xs italic mt-4 text-gray-800 pr-10">
                          Your application form is <span className="font-semibold poppins">in progress</span> and you have to complete the payment process so that your form progress will proceed. We are waiting for your payment. Thank You !!
                        </div>}

                      {/* =========DIVIDER========= */}
                      <hr className='2xl:h-[0.2rem] 2xl:my-4 h-[0.1rem] my-2' />

                      {/* ==============ACTION BUTTONS============= */}
                      <div className='w-full pl-2 text-sm poppins'>
                        <div className='font-semibold 2xl:text-base text-md 2xl:mb-2 mb-1 poppins'>Action</div>
                        <div className='flex flex-wrap items-center flex-row gap-8'>
                          {application?.upload_status == true ?

                            application?.payment_status == false && (
                              <div className='2xl:text-sm text-xs text-amber-600 poppins'>
                                {" "}
                                <AiFillInfoCircle
                                  fontSize={14}
                                  className="inline"
                                />{" "}
                                Payment is pending{" "}
                                <span
                                  className='float-right ml-4 cursor-pointer bg-indigo-500 text-white px-4  2xl:text-sm text-xs shadow-lg py-[0.2rem] hover:bg-indigo-600 hover:scale-105 rounded-sm border border-white'
                                  onClick={() =>
                                    props?.handlePayBtn(
                                      application
                                      // ?.id,
                                      // application?.type
                                    )
                                  }
                                >
                                  &nbsp;&nbsp;Pay&nbsp;&nbsp;&nbsp;
                                </span>
                              </div>
                            )
                            : <div className='2xl:text-sm text-xs text-amber-600 poppins'>
                              <AiFillInfoCircle
                                fontSize={14}
                                className="inline"
                              />First Upload Document Than Payment </div>
                          }

                          {application?.payment_status == true && (
                            <div className='2xl:text-sm text-xs text-amber-600 poppins'>
                              <AiFillInfoCircle
                                fontSize={14}
                                className="inline"
                              />
                              View Payment Receipt
                              <span className='float-right ml-4 cursor-pointer bg-indigo-500 text-white px-4  text-sm shadow-lg hover:bg-indigo-600 py-[0.2rem] hover:scale-105 rounded-sm border border-white'
                                onClick={() => navigate(`/waterConnReceipt/${application?.transDetails?.tran_no}`)}
                              >
                                Receipt
                              </span>
                            </div>
                          )}

                          {application?.doc_status == false && (
                            <div className="2xl:text-sm text-xs text-amber-600 poppins">
                              {" "}
                              <AiFillInfoCircle
                                fontSize={14}
                                className="inline"
                              />{" "}
                              Document is pending{" "}
                              <span
                                className='float-right ml-4 cursor-pointer bg-indigo-500 text-white px-4  2xl:text-sm text-xs shadow-lg py-[0.2rem] hover:bg-indigo-600 hover:scale-105 rounded-sm border border-white'
                                onClick={() => {
                                  // props.handleUploadBtn(application?.id)
                                  // props.uploadDocId(application?.id)
                                  navigate(`/water-doc-upload/${application?.id}`)
                                }
                                }
                              >
                                Upload
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='flex'>
                      <p onClick={() => handleViewPendingApplication({ "application_no": application?.application_no, "id": application?.id })} className=' text-white px-2 2xl:px-4 py-[0.2rem] text-xs 2xl:text-sm md:absolute bottom-3 2xl:bottom-2 right-2 rounded-sm bg-indigo-500 border-indigo-400 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm  cursor-pointer poppins md:mt-0 mt-2'>
                        View Details
                        <BiChevronsRight className="inline font-semibold text-xl" />
                      </p>

                      {application?.payment_status == false &&
                        <p onClick={() => handleDeleteApplication({ "application_no": application?.application_no, "id": application?.id })} className="px-2 text-white text-xs absolute top-2 right-2  py-1 rounded-sm bg-red-500 border-red-400 hover:border-red-600 hover:bg-red-600 hover:text-white shadow-sm  cursor-pointer poppins">
                          Delete Application
                          <BiChevronsRight className="inline font-semibold text-xl" />
                        </p>
                      }
                    </div>

                  </div>
                  {(application?.doc_status == true && application?.payment_status == true) && <button
                    onClick={() => {
                      setselectedApplicationId(application?.id);
                      setselectedWorkflowId(application?.workflow_id);
                      openModal2();
                    }}
                    className='md:absolute relative md:ml-0 ml-8 2xl:bottom-2 md:right-40 right-6 cursor-pointer bg-indigo-500 text-white px-2 2xl:px-4 py-[0.2rem] text-xs 2xl:text-sm shadow-lg bottom-3 hover:bg-indigo-600 rounded-sm border border-white'>
                    Send Message <MdSend className="inline" />
                  </button>}
                </div>
              </>
            ))}

        </>
      }

      {/* ===========MESSAGE MODAL========== */}
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
        contentLabel="Example Modal"
      >

        <div class="z-50 rounded-lg shadow-lg shadow-indigo-200 relative bg-[#f4fffe] px-0 w-max h-max border-t-2 border-l-2 border-white overflow-auto" >
          <CitizenMessageScreenModified notify={notify} closeModalFun={closeModal2} applicationId={selectedApplicationId} workflowId={selectedWorkflowId} />
        </div>
      </Modal>

    </>
  )
}

export default WaterPending

// export to : WaterIndex.jsx