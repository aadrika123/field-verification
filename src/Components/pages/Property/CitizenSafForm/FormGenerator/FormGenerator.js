import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'

function FormGenerator(props) {
  // CASE HANDLE 
  // 1 EDIT FEEDED DATA
  // 2 SELECT LIST DATA

  console.log('list....', props?.inputList)

  function vso() {
    let vs = {
    }
    props?.inputList?.map((data) => {
      if (data?.required) {
        vs = { ...vs, [data.id]: yup.string().required(data.validationMsg) }
      }
      if (data?.required == false) {
        vs = { ...vs, [data.id]: yup.string() }
      }
    })
    return vs
  }

  function ino() { // MAPPING THROUGH INPUT LIST TO PUSH DATA IN INTIALVALUE OBJECT
    let inv = {
    }
    props?.inputList?.map((data) => {
      inv = { ...inv, [data.id]: '' }
    })
    return inv
  }
  const validationSchema = yup.object(vso())


  const formik = useFormik({
    initialValues: ino()
    ,

    onSubmit: (values, resetForm) => {
      console.log('at submit form....', values)
      alert('form submitted..')
    }
    , validationSchema
  })

  useEffect(() => {

  }, [])

  const handleChange = () => {

  }

  console.log('intial values...', ino())
  console.log('validation schema...', vso())



  return (
    <>
      <form onSubmit={formik.handleSubmit} onChange={handleChange} className="bg-white w-1/3 mx-auto mt-10 p-10 shadow-xl rounded-lg">
        <div className="col-span-12 grid grid-cols-12 md:grid-cols-5">
          {
            props?.inputList?.map((input) => (
              <>

                {input?.type != 'select' && <div className="form-group col-span-12  mb-6 md:px-4">
                  <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>{input?.name}</label>
                  <input {...formik.getFieldProps(input.id)} type={input?.type} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    placeholder="Enter Khata No." />
                  <span className="text-red-600 absolute text-xs">{formik.touched[input?.id] && formik.errors[input?.id] ? formik.errors[input?.id] : null}</span>
                </div>}
                {input?.type == 'select' && <div className={`form-group col-span-12 md:col-span-12 mb-4 md:px-4`}>
                  <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>{input.name}</label>
                  <select  {...formik.getFieldProps(input?.id)} className={`form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md cursor-pointer `}>
                    <option value="1" >select ULB</option>
                    <option value="1" >Ward-1</option>
                    {/* {
                      props?.ulbList?.map((data) => (
                        <option value={data.id}>{data.ulb_name}</option>
                      ))
                    } */}
                  </select>
                  <span className="text-red-600 absolute text-xs">{formik.touched.id && formik.errors.id ? formik.errors.id : null}</span>
                </div>
                }
              </>
            ))
          }

          <div className="col-span-12">
            <button type="submit" className="float-right px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Save</button>
          </div>

        </div>


      </form>
    </>
  );
}

export default FormGenerator;
