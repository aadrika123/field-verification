//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 20 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - FormStatusTimeline
//    DESCRIPTION - FormStatusTimeline Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { GiCheckMark } from 'react-icons/gi'
import { ImLocation } from 'react-icons/im'

function FormStatusTimeline(props) {
    return (
        <>
      
            <div className={`relative flex-1 `}>
                <div className={" mb-2 flex items-center w-full"}>
                    <div style={{ 'boxShadow': '2px 4px 2px gray' }} className={(props.verificationStatus ? `${props.active?'bg-sky-200 border-sky-300':'bg-sky-300 border-sky-300'} border-2 shadow-lg` :"bg-gray-200") + " z-1 flex flex-initial items-center order-1 w-4 h-4 sm:w-6 sm:h-6 rounded-full"}>
                        <h1 className="mx-auto font-semibold text-sm text-white">{props.verificationStatus ? <GiCheckMark size={20} /> : 'X'} </h1>
                    </div>
                    {!props.last ? <div className={(props.verificationStatus ? "bg-green-300" : "bg-gray-200") + " order-2 flex-initial w-full"} style={{ 'height': '2px' }}></div> : ''}

                </div>
                <div className={`flex-initial text-xs text-left  pl-2 ${props.active && 'text-sky-700 font-bold'}`}>{props.index}</div>
                <div className={`flex-initial text-xs font-semibold  opacity-50 pl-0 sm:pl-2 ${props.active && ' text-sky-700 underline font-bold'}`}>{props.level}</div>
            </div>
        </>

    )
}

export default FormStatusTimeline
/**
 * Exported to :
 * 1. DetailsTabs Component
 * 
 */