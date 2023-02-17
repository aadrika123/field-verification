////////////////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Date : 10th Jan., 2023
// Version : 1.0
// Project : JUIDCO
// Component : Property Dashboard
////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import {BsQuestionCircleFill, BsEnvelope} from 'react-icons/bs'
import {RiKakaoTalkFill} from 'react-icons/ri'
import {BiPhoneCall} from 'react-icons/bi'
import {GoLocation} from 'react-icons/go'
import '../assets/Fonts.css'
import FaqCard from './FaqCard'
import Document from './Document.pdf'

const HelpAndSupport = () => {

  return (
    <>

    {/* =============MAIN==================== */}
      <div className='shadow-lg col-span-12 md:col-span-3 pt-4 border-2 border-white mt-10 md:mt-0 hidden md:block relative overflow-y-auto overflow-x-hidden'>
                <div className=' w-full md:mr-5 overflow-y-auto overflow-x-hidden poppins animate__animated animate__fadeInRight animate__faster px-2'>

               {/* ===================FAQ================== */}
            <div className='p-2 animate__animated animate__fadeIn animate__slow'>

                {/* ============HEADING============= */}
                <div className='mb-2 font-semibold flex items-center gap-2 text-blue-900 2xl:text-base text-sm poppins'> <BsQuestionCircleFill fontSize={18}/>FAQ</div>
                
                {/* ========FAQs================ */}
                <FaqCard question={'How to apply Property ?'} answer={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim veniam repellendus recusandae quidem reiciendis laudantium ducimus sapiente sed officia ut.'} document={Document}/>
                <FaqCard question={'How to apply Water ?'} answer={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim veniam repellendus recusandae quidem reiciendis laudantium ducimus sapiente sed officia ut.'} document={Document}/>
                <FaqCard question={'How to apply trade ?'} answer={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim veniam repellendus recusandae quidem reiciendis laudantium ducimus sapiente sed officia ut.'} document={Document}/>
                <FaqCard question={'How to apply grievance ?'} answer={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim veniam repellendus recusandae quidem reiciendis laudantium ducimus sapiente sed officia ut.'}/>
                <FaqCard question={'How to view payment history ?'} answer={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim veniam repellendus recusandae quidem reiciendis laudantium ducimus sapiente sed officia ut.'}/>
                
                 </div>

            {/* ============GET IN TOUCH==================== */}
            <div className='w-full 2xl:h-[0.2rem] h-[0.1rem] shadow-lg bg-white 2xl:my-4 my-2 animate__animated animate__fadeIn animate__slow'></div>
                    
                    <div className='p-2 animate__animated animate__fadeIn '>

                        {/* ===============HEADING==================== */}
                        <div className='mb-2 text-blue-900 font-semibold flex items-center gap-2 2xl:text-base text-sm poppins'> <RiKakaoTalkFill fontSize={20} /> Get In Touch</div>
                            
                            {/* ============CONTACT INFORMATION============== */}
                            <div className='flex items-center gap-2 bg-indigo-100 hover:bg-amber-100 shadow-sm py-2 text-xs 2xl:text-sm transition-all duration-200 pl-4 mt-2 cursor-pointer'>
                                <span>
                                    <BiPhoneCall fontSize={16}/>
                                </span><span className='text-xs 2xl:text-sm poppins'> <a href="tel:+">+91 99999 99999</a>  </span>
                            </div>

                            <div className='flex items-center gap-2 bg-indigo-100 hover:bg-amber-100 shadow-sm py-2 text-xs 2xl:text-sm transition-all duration-200 pl-4 mt-2 cursor-pointer'>
                                <span>
                                    <BsEnvelope fontSize={16}/>
                                </span><span className='text-xs 2xl:text-sm poppins'> <a href="mailto:"> aadrikaenterprises@gmail.com</a></span>
                            </div>

                            <div className='flex items-center gap-2 bg-indigo-100 hover:bg-amber-100 shadow-sm py-2 text-xs 2xl:text-sm transition-all duration-200 pl-4 mt-2 cursor-pointer'>
                                <span>
                                    <GoLocation fontSize={16}/>
                                </span><span className='text-xs 2xl:text-sm poppins'>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis libero odit modi nulla eligendi culpa!</span>
                            </div>


                      {/*===============MAP==================*/}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.9156808126136!2d85.35735301497394!3d23.35506918478569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e22950b0a3f9%3A0xacf963a8f8f3db7f!2sSTPI%20RANCHI!5e0!3m2!1sen!2sin!4v1673344319072!5m2!1sen!2sin" className='flex items-center gap-2 bg-indigo-100 hover:bg-amber-100 shadow-sm  text-sm transition-all duration-200 mt-2 cursor-pointer w-full shadow-md'></iframe>
                            

                    </div>
                    </div>
                    </div>
            
    </>
  )
}

export default HelpAndSupport

// export to : LandingDashboardNew