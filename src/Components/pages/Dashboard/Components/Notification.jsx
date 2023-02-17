////////////////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Date : 10th Jan., 2023
// Version : 1.0
// Project : JUIDCO
// Component : Property Dashboard
////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import {MdArchive} from 'react-icons/md'
import {HiSpeakerphone} from 'react-icons/hi'
import '../assets/Fonts.css'
import NotificationCard from './NotificationCard'

const Notification = () => {
  return (
    <>

                {/* =========MAIN=================== */}
                        <div className='bg-white  py-2 px-6 mt-4 mb-2 rounded-lg relative animate__animated animate__fadeIn animate__faster grid grid-cols-12 poppins text-gray-800'>
                                    
                                    {/* ==============CURRENT  NOTIFICATIONSS=============== */}
                                    <div className='poppins md:col-span-6 col-span-12 md:border-r-2 border-b-2 md:border-b-0 border-gray-400 md:pr-[5rem] pb-4 animate__animated animate__fadeInLeft'>
                                        
                                        {/* ============HEADING============== */}
                                        <div className='font-semibold flex flex-row items-center gap-2 text-indigo-900 mt-2 2xl:mb-4 mb-2 2xl:text-base text-sm poppins'>
                                            <HiSpeakerphone fontSize={18}/> Current Notifications
                                        </div>

                                        {/* ============NOTIFICATIONS=========== */}
                                        <NotificationCard message={'You have a new notification.'} action={''}/>
                                        <NotificationCard message={'You have a new notification.'} action={''}/>
                                        <NotificationCard message={'You have a new notification.'} action={''}/>
                                        <NotificationCard message={'You have a new notification.'} action={''}/>
                                        
                                    </div>
                                    
                                    {/* ===========ARCHIVED NOTIFICATIONS============ */}
                                    <div className='poppins md:col-span-6 col-span-12 md:pl-[5rem] pb-4 animate__animated animate__fadeInRight'>
                                        
                                        {/* ===========HEADING============== */}
                                        <div className='font-semibold flex flex-row items-center 2xl:text-base text-sm gap-2 text-indigo-900 2xl:mb-4 mb-2 mt-2 poppins'>
                                            <MdArchive fontSize={18}/>  Archived Notifications
                                        </div>

                                        {/* ============NOTIFICATIONS============== */}
                                        <NotificationCard message={'You have a new notification.'} action={''}/>
                                        <NotificationCard message={'You have a new notification.'} action={''}/>
                                        <NotificationCard message={'You have a new notification.'} action={''}/>
                                        <NotificationCard message={'You have a new notification.'} action={''}/>
                                      
                                    </div>
                                    
                                </div>
    
    </>
  )
}

export default Notification

// export to : LandingDashboardNew