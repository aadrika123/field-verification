import React from 'react'
import { GiCheckMark } from 'react-icons/gi'


function FormCheckStatus(props) {
    return (
        <>
            <span className="inline mr-2">
                <span style={{ 'boxShadow': '2px 4px 2px gray' }} className={(props.verificationStatus ? `${props.active ? 'bg-indigo-400' : 'bg-sky-300 '} shadow-lg` : "bg-gray-200") + " z-1 inline-flex flex-initial items-center order-1 w-4 h-4 sm:w-6 sm:h-6 rounded-full "}>
                    <h1 className="mx-auto font-semibold text-sm text-white">{props.verificationStatus ? <GiCheckMark size={20} /> : 'X'} </h1>
                </span>
                {/* {!props.last ? <span className={(props.verificationStatus ? "bg-green-300" : "bg-gray-200") + " order-2 flex-initial w-full"} style={{ 'height': '2px' }}></span> : ''} */}
            </span>
        </>
    )
}

export default FormCheckStatus