//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 18 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - OtpScreen
// >DESCRIPTION - OtpScreen Component
//////////////////{*****}//////////////////////////////////////////

import React, { useState } from 'react'
import Modal from 'react-modal'
import {TiDelete} from 'react-icons/ti'
import otpsvg from 'Components/Media/otpsvg.svg'

function OtpScreen(props) {

    const [showFormOne, setshowFormOne] = useState('')
    const [showForm2, setshowForm2] = useState('hidden')
    const [otpText, setotpText] = useState()
    const [InputOtp, setInputOtp] = useState()
    const [modalIsOpen, setIsOpen] = useState(true);
    // const [MobileNo, setMobileNo] = useState()
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: '800',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            border: 'none'
        },
    };

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const confirmSubmit = () => {
        if (InputOtp == otpText) {
            // alert('Mobile number verified');
            setshowForm2('hidden');
            setshowFormOne('');
            console.log('after verification calling submit form')
            // return
            props.submitFun()
            props.closeOtpModaal();
         

        } else {
            alert('check OTP')
        }

        setIsOpen(false);

    }

    const handleSubmit = (e) => {
        setotpText(Math.floor(Math.random() * (9999 - 1000 + 1)));
        setshowForm2('');
        setshowFormOne('hidden');
        e.preventDefault();

    }



    return (
        <div>
            {/* <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                // shouldCloseOnOverlayClick={false}

                contentLabel="Example Modal"
            > */}
                <div className="rounded-lg  shadow-xl pt-4 text-white text-center z-20  mx-auto" style={{ 'width': '50vw', 'height': '70vh' }}>


                    <div className='grid grid-cols-6 gap-2 mx-auto p-4'>
                        <div className='col-span-3 '>
                            <img src={otpsvg} />
                        </div>
                        <div className='col-span-3  shadow-2xl border-2 border-gray-400 rounded-t-xl rounded-b-xl flex justify-center items-center'>
                            <div className='w-80 h-96 p-4'>
                            <button onClick={()=>props?.closeOtpModaal()}><TiDelete className='absolute top-2 right-5 text-red-500 text-3xl hover:scale-125' /></button>
                                <div className=''>
                                    <img src='https://cdn-icons-png.flaticon.com/512/1773/1773239.png' className='h-10 mx-auto mt-8 ' />
                                </div>
                                <h1 className='text-center text-sm text-gray-600 p-4 font-semibold'>Mobile Number</h1>
                                <h1 className='text-center text-xs text-gray-500 '>We need to send otp to authenticate your number</h1>
                                <div className=' p-6 '>
                                    <form onSubmit={handleSubmit} className={showFormOne}>

                                        <div>
                                            <input type="number" maxLength={10} name='mobile' placeholder='Enter your mobile no' className='px-3 py-1 rounded-md shadow-md text-gray-500' />
                                            <br /><br />
                                            <button type='submit' className='w-44 py-1 rounded-md shadow-sm bg-sky-400 text-gray-50 text-sm'> NEXT</button>
                                        </div>
                                    </form>
                                    <form className={showForm2}>
                                        <p htmlFor="forMobile">Enter OTP</p>
                                        <h5 className='text-green-600 text-md '> YOUR OTP IS {otpText} </h5> <br />

                                        <div>
                                            <input type="number" maxLength={10} name='otp' placeholder='Enter your OTP' className='px-3 py-1 rounded-md shadow-md text-gray-500' onChange={(e) => setInputOtp(e.target.value)} />
                                            <br /><br />
                                            <button type='button' className='w-44 py-1 rounded-md shadow-sm bg-sky-400 text-gray-50 text-sm' onClick={confirmSubmit}>CONFIRM</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            {/* </Modal> */}
        </div>
    )
}

export default OtpScreen