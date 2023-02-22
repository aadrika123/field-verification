import React from 'react'
import { Link } from 'react-router-dom'

function RegistrationSuccess() {
    return (
        <>
            <div className='text-center bg-white shadow-xl w-full md:w-6/12 mx-auto mt-10 md:mt-48'>
                <div className='pt-10 z-50'>
                    <h1 className='text-4xl text-gray-700'>Registration Successfull</h1>
                    <div className='py-5'>
                        Please Login with your Registered Email Id and Password.
                    </div>
                    <div>
                        <Link to="/login" className='font-semibold bg-indigo-500 rounded-lg shadow-lg hover:bg-indigo-600 text-white px-4 py-3 cursor-pointer hover:scale-105'>Login Page</Link>
                    </div>
                </div>
                <div className="md:inline-flex justify-center z-0 mt-10">
                    <img className='opacity-75 h-60' src='https://img.freepik.com/premium-vector/online-registration-sign-up-concept-with-man-character_268404-98.jpg?w=740' alt="Registration Complated Image" />
                </div>
            </div>
        </>
    )
}

export default RegistrationSuccess