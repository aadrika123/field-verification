import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';

const InputBox = (props) => {

    const [propName, setpropName] = useState()

    let commonInputStyle = `form-control w-full px-3 text-xs 2xl:text-sm py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md w-max`;

    const validationSchema = yup.object({
        propName : yup.string().required("Required field")
    })

    const formik = useFormik({
        initialValues: {
            [propName] : ''
        },
        onSubmit: (values) => {
            console.log('getting values => ', values)
        }, validationSchema
    })

    useEffect(() => {
        setpropName(props?.name)
        // console.log('getting name => ', props?.name)
    }, [props?.name])

  return (
    <>
    
   {propName != undefined && <form className="col-span-12 w-screen poppins  2xl:text-base text-xs" onSubmit={formik.handleSubmit}>
                  <span className="poppins">{props?.label} :</span> <br />
                  <span>
                  <select name={`${propName}`} onChange={formik.handleChange} value={formik.values.propName}
                   className={commonInputStyle + ` poppins  2xl:text-base text-xs`}
                >
                  <option value="" selected>==Select==</option>
                  {props?.mapData?.map((elem) => <>
                    <option value={elem?.id} className='poppins'>{elem?.value}</option>
                  </>)}
                </select>
                  </span>
                  <div className="text-red-600 text-xs poppins">
                  {formik.touched.propName || formik.errors.propName
                    ? formik.errors.propName
                    : null}
                </div>

                </form>}
    
    </>
  )
}

export default InputBox