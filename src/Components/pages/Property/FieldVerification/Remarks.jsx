import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const Remarks = (props) => {

  const validationSchema = yup.object({
    remarks : yup.string().required('required field !!!')
  })

  const formik = useFormik({
    initialValues: {
      remarks: props?.preData?.remarks
    },
    onSubmit: (values) => {
      props.collectData('remarks', values)
      props.next()
    }, validationSchema
  })

  return (
    <>
    
    <form className='border-2 border-blue-700 bg-blue-50 mb-4' onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>Remarks</h1>
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <textarea name="remarks" value={formik.values.remarks} id="" rows="3" className='w-full px-2 py-1' placeholder='Enter your remarks here...'></textarea>
               </div>
               <div className='mx-2'>{formik.touched.remarks && formik.errors.remarks && <><span className="text-red-600 text-xs">{formik.errors.remarks}</span></>}</div>
            </form>

            {/* ==========Button========= */}
     <div className='w-full flex justify-between m-2'>
                <div onClick={props?.back} className='px-4 py-1.5 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 cursor-pointer'>
                    Back
                </div>
            <button onClick={formik.handleSubmit} type='submit' className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600">Next & Preview</button>
            </div>
    
    </>
  )
}

export default Remarks