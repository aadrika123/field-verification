import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import logo1 from '../assets/images/logo1.png'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { contextVar } from '../services/contextVar'
import 'animate.css'
import ProjectApiList from '../api/ProjectApiList'
import CommonLoader from './Common/CommonLoader'
import ApiHeader from '../api/ApiHeader'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'

const Login = () => {

    const navigate = useNavigate()

    const {notify, setisLoggedIn} = useContext(contextVar)

    const {api_login} = ProjectApiList()

    const [loader, setloader] = useState(false)

    const validationSchema = yup.object({
        email: yup.mixed().required("Enter email"),
        password : yup.string().required("Enter password")
    })

    const formik = useFormik({
        initialValues : {
            email : '',
            password : ''
        },

        onSubmit : (values) => {
            submitData(values)
        },

        validationSchema

    })

    const submitData = () => {

        setloader(true)
        let requestBody = {
            email: formik.values.email,
            password: formik.values.password
        }
        console.log('--1--before login send...', requestBody)
        axios.post(api_login, requestBody, ApiHeader())
            .then(function (response) {
                console.log('login response => ', response)
                if (response.data.status == true) {
                    console.log('--2--login response...', response)
                    window.localStorage.setItem('token', response?.data?.data?.token)
                    window.localStorage.setItem('menuList', JSON.stringify(response?.data?.data?.userDetails?.menuPermission))
                    window.localStorage.setItem('userName', JSON.stringify(response?.data?.data?.userDetails?.userName))
                    window.localStorage.setItem('roles', JSON.stringify(response?.data?.data?.userDetails?.role))
                    window.localStorage.setItem('isLoggedIn', true)

                    // setmenuList(response?.data?.data?.userDetails?.menuPermission)
                    // setuserName(response?.data?.data?.userDetails?.userName)
                    // setroles(response?.data?.data?.userDetails?.role)

                    navigate('/dashboard') //navigate to home page after login

                    notify('Login Successfull !!! ', 'success')

                } else {
                    setloader(false)
                    notify('Something went wrong !!! ', 'error')
                }
            })
            .catch(function (error) {
                setloader(false)
                console.log('--2--login error...', error)
                notify('Something went wrong !!! ', 'error')
            })

    }

  return (
    <>

        <div className=' h-screen bg-zinc-100 flex flex-row flex-wrap justify-center items-center'>

<form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className='flex flex-col gap-2 w-max h-max shadow-lg rounded-md px-10 py-4 bg-white text-zinc-700 animate__animated animate__fadeInDown'>
    
    <div className='flex flex-row flex-wrap gap-2 items-center'>
    <img src={logo1} alt="" className='w-16'/>
    <div className='text-xl uppercase tracking-wide font-semibold'>Urban Development & <br /> Housing Department</div>
    </div>

    <hr />

    <div className='mt-6 flex flex-col flex-wrap gap-2'>
        <label htmlFor="email" className='text-sm'>Email :</label>
        <input type="email" name="email" id="email" className=' rounded-md bg-transparent border-t-[1px] border-l-[1px] shadow-md bg-indigo-50 focus:bg-white px-4 py-2 text-sm focus:outline-indigo-600' placeholder='Enter email' />
        {formik.errors.email && formik.touched.email && <span className='text-red-600 text-xs'>{formik.errors.email}</span>}
    </div>

    <div className='mt-4 flex flex-col flex-wrap gap-2'>
        <label htmlFor="password" className='text-sm'>Password :</label>
        <input type="password" name="password" id="password" className=' rounded-md bg-transparent border-t-[1px] border-l-[1px] shadow-md bg-indigo-50 focus:bg-white px-4 py-2 text-sm focus:outline-indigo-600' placeholder='Enter password' />
        {formik.errors.password && formik.touched.password && <span className='text-red-600 text-xs'>{formik.errors.password}</span>}
    </div>

    {/* <div className='text-center text-xs my-4 text-indigo-600 hover:underline'>
       <span  onClick={ () => navigate('/register')} className="cursor-pointer"> Create a new account </span>
    </div> */}

    <div className='text-center mb-6 mt-4' >
        {
            loader ? 
            <div className='flex justify-center'>
                                            <RotatingLines
                                                strokeColor="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="25"
                                                visible={true}
                                            />
                                        </div>
                                         :
            <button type="submit" className="px-4 py-1.5 bg-green-200 hover:bg-green-300 rounded-md shadow-md text-sm"> Login </button>
        }
    </div>
</form>

</div>
    </>
  )
}

export default Login