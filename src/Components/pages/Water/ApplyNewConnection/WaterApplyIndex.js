import React, { useEffect, useState } from 'react'
import { useFormik, Formik, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import WaterApiList from '../../../api/WaterApiList'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const WaterApplyIndex = () => {
    const [ulbList, setUlbList] = useState()

    const { header, api_ulbList } = WaterApiList();

    const navigate = useNavigate()


    //Formik Start
    const validationSchema = yup.object({

        typeofConnection: yup.string().required('Require'),
    })

    const initialValues = {

    }

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values, resetForm) => {


            console.log("Value.....", values)
            // finalSubmitData(values)
        },
        // validationSchema
    })

    const handleOnChange = (event) => {
    }

    // Formik End


    useEffect(() => {
        fetchULBList();
    }, [])



    const fetchULBList = () => {
        axios.get(`${api_ulbList}`, header)
            .then((res) => {
                console.log("LIst of ULB", res)
                setUlbList(res.data.data)
            })
            .catch((err) => console.log("Exception while feting ULB LIst", err))
    }

    return (

        <>
            <div className='text-center font-bold text-gray-700 text-lg border-b-2 border-gray-700 mx-4 mb-4'>
                <p> Applying For New Water Connection </p>
            </div>
            <form className='border-2 border-blue-700 bg-blue-50 mb-4 m-2' onChange={handleOnChange} onSubmit={formik.handleSubmit} >
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>Application Form</h1>

                <div className='p-6'>

                    <div className="grid grid-cols-12 text-sm text-gray-700 mb-6">
                        <label className='col-span-12 font-semibold mb-2'>Select ULB<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                        <span className='col-span-12'>
                            <select type='date' {...formik.getFieldProps('ulb')} value={formik.values.ulb} className='bg-white px-2 py-1 w-full rounded-sm shadow-md border-[1px] border-gray-400 cursor-pointer'>
                                <option value="">Select</option>
                                {
                                    ulbList?.map((item) => (
                                        <option value={item.id}>{item.ulb_name}</option>
                                    ))
                                }
                            </select>
                            <span className="text-red-600 text-xs">{formik.touched.ulb && formik.errors.ulb ? formik.errors.ulb : null}</span>
                        </span>
                    </div>


                </div>

                <div className='text-center space-x-5 my-5'>
                    <button onClick={() => navigate(-1)} type='button' className='bg-red-500 hover:bg-red-600 px-2 py-1 text-white text-sm'>Cancel</button>
                    <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 px-2 py-1 text-white text-sm'>Submit</button>
                </div>

            </form>
        </>
    )
}

export default WaterApplyIndex
