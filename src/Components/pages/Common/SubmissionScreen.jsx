import React,{useEffect, useState} from "react";
import {ImCross} from 'react-icons/im'
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom";
import check from '../../assets/images/check.png'

const SubmissionScreen = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("enter in submission screen with application no.  =>  ", props?.appNo)
    props?.openSubmit == true && openModal()
  }, [props?.openSubmit])
  

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };
  const afterOpenModal = () => {};

  const closeAction = () => {
    closeModal()
    props.navigation()
  }

  const forwardAction = () => {
    closeModal()
    props.forward()
  }

  const navigate = useNavigate()

  const role = localStorage.getItem('roles')
//   console.log('roles => ', role)

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
        contentLabel="Example Modal"
      >
        <div class=" rounded-lg shadow-lg shadow-indigo-300 md:w-[50vw] md:h-max w-full relative border-2 border-indigo-500 bg-gray-50 px-2 m-2 py-4 h-max border-t-2 border-l-2 overflow-auto">
        <div className="absolute top-2 z-10 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={() => closeAction()}>
                    <ImCross fontSize={10}/>
                </div>

          <div className="poppins text-xl font-semibold w-full pt-6 md:px-8 px-2">
            <div className="bg-indigo-600 font-semibold rounded-sm w-full 2xl:text-2xl text-lg text-center shadow-sm text-white px-4 py-2 poppins uppercase">
              {props?.heading}
            </div>

            <div className="bg-white grid grid-cols-12 my-4 rounded-md shadow-lg">
              
              <div className="col-span-12 grid grid-cols-12 px-6 pt-4 gap-4 items-center">
                <img src={check} alt="" srcset="" className="w-[10rem] col-span-3"/>
                <div className="col-span-9 poppins text-green-500 font-semibold 2xl:text-2xlxl text-lg">Successfully completed {props?.process == 'verify' && 'verification'}{props?.process == 'geoTagging' && 'geo-tagging'} process.</div>
              </div>

              <div className="col-span-12 p-4 px-6 poppins font-normal">
                
                <div className="poppins mt-4 text-sm 2xl:text-lg">Application No. : <span className="poppins font-semibold">{props?.appNo}</span></div>
                <div className="poppins mt-4 text-sm 2xl:text-lg"> You can track this application through the application number.</div>
                <div></div>
                <div></div>
              </div>

            </div>

            <div className="flex items-center justify-between my-6">
                <button className="2xl:px-6 px-3 py-1.5 2xl:py-2.5 cursor-pointer bg-indigo-500 text-white font-medium text-xs  poppins rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => closeAction()}>Close</button>
                {(props?.process == 'verify' && role == '["Tax Collector"]') && <button className="2xl:px-6 px-3 py-1.5 2xl:py-2.5 cursor-pointer bg-green-500 text-white font-medium text-xs  poppins rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => navigate('/geoTagging/' + props?.id)}>Proceed to Geo-Tagging</button>}
                {(props?.process == 'geoTagging' && role == '["Tax Collector"]') && <button className="2xl:px-6 px-3 py-1.5 2xl:py-2.5 cursor-pointer bg-green-500 text-white font-medium text-xs  poppins rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => forwardAction()}>Forward Application</button>}
                {(props?.process == 'verify' && role == '["ULB Tax Collector"]') && <button className="2xl:px-6 px-3 py-1.5 2xl:py-2.5 cursor-pointer bg-green-500 text-white font-medium text-xs  poppins rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => forwardAction()}>Forward Application</button>}
            </div>

          </div>
        </div>
      </Modal>
    </>
  );
};

export default SubmissionScreen;
