import { useFormik } from 'formik'
import React, { useState, useRef, useEffect } from "react";
import Photo from '../../../assets/images/photo.png'
import EXIF from 'exif-js'
import { toast, ToastContainer } from 'react-toastify'
import ProjectApiList from '../../../api/ProjectApiList'
import ApiHeader from '../../../api/ApiHeader'
import ApiHeader2 from '../../../api/ApiHeader2'
import axios from 'axios'
import CommonLoader from '../../Common/CommonLoader'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import Modal from 'react-modal'
import {FcCamera} from 'react-icons/fc'
import {ImCross} from 'react-icons/im'

const GeoIndex = (props) => {

    const {post_geoDocUpload} = ProjectApiList()

    const navigate = useNavigate()

    const [frontImageUpload, setfrontImageUpload] = useState()
    const [frontUrl, setfrontUrl] = useState(null)
    const [frontData, setfrontData] = useState()
    const [rightImageUpload, setrightImageUpload] = useState()
    const [rightUrl, setrightUrl] = useState(null)
    const [rightData, setrightData] = useState()
    const [leftImageUpload, setleftImageUpload] = useState()
    const [leftUrl, setleftUrl] = useState(null)
    const [leftData, setleftData] = useState()
    const [imageNo, setimageNo] = useState(0)

    const [loader, setloader] = useState(false)

    const validationSchema = yup.object({
        frontImage : yup.mixed().required('required to upload'),
        leftImage : yup.mixed().required('required to upload'),
        rightImage : yup.mixed().required('required to upload'),
    })

    const formik = useFormik({
        initialValues : {
            frontImage : '',
            // flongitude : '',
            // flatitude : '',
            leftImage : '',
            // llongitude : '',
            // llatitude : '',
            rightImage : '',
            // rlongitude : '',
            // rlatitude : ''
        }, 
        onSubmit : (values) => {
            // setloader(true)
            console.log('submitting images => ', values)
            submitDocFun(values)
        }
        // , validationSchema
    })

    // const submitDataFun = () => {
    
    // console.log('getting all data => ', props?.body)
        
    // axios.post(post_SiteVerification, props?.body, ApiHeader())
    // .then((res) => {
    //   console.log("success => ", res)
    //   toast.success('Submitted Successfully !!!')
    //   navigate('/search/property')
    //   setloader(false)
    // })
    // .catch((err) => {
    //   console.log('error', err)
    //   toast.error('Something went wrong !!!')
    //   setloader(false)
    // })

    // }

    const submitDocFun = () => {

        setloader(true)

        let fd = new FormData();

        fd.append('safId', props?.applicationData?.id)

        fd.append("directionType[2]", 'Front')
        fd.append('imagePath[2]', frontImageUpload)
        fd.append('longitude[2]', frontData?.longitude)
        fd.append('latitude[2]', frontData?.latitude)

        fd.append('directionType[1]', 'Right')
        fd.append('imagePath[1]', rightImageUpload)
        fd.append('longitude[1]', rightData?.longitude)
        fd.append('latitude[1]', rightData?.latitude)

        fd.append('directionType[0]', 'Left')
        fd.append('imagePath[0]', leftImageUpload)
        fd.append('longitude[0]', leftData?.longitude)
        fd.append('latitude[0]', leftData?.latitude)

        axios.post(post_geoDocUpload, fd, ApiHeader2())
        .then((res) => {
            if(res?.data?.status == true){
                console.log("success images", res)
                // props?.next('true')
                setloader(false)
                toast.success('Document Uploaded Successfully !!!')
                navigate('/search/property')
            }
            if(res?.data?.status == false){
                console.log("error images", res)
                // props?.next('false')
                setloader(false)
                toast.error("Something Went Wrong !!!")
            }
        })
        .catch((err) => {
            console.log('error images => ', err)
            // props?.next('false')
            setloader(false)
            toast.error("Something Went Wrong !!!")
        })
    }

    // ================to turn on location==================

    const [position, setPosition] = useState(null);
    const [repeat, setrepeat] = useState(0)

    const enableLocation = () => {
        // Get the user's location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition(position);
          },
          () => {
            alert("Please enable location first.");
            setrepeat(repeat+1)
          }
        );
      }

    //   <div>
    //   {position ? (
    //     <p>
    //       Your current position is:
    //       <br />
    //       Latitude: {position.coords.latitude}
    //       <br />
    //       Longitude: {position.coords.longitude}
    //     </p>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>

    // ================to turn on location end==================


    //   ====enable camera========
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    const [display, setdisplay] = useState('hidden')
  
    const startCamera = () => {
        enableLocation()
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          setdisplay('visible');
        })
        .catch((error) => {
          console.log("Error accessing camera:", error);
        });
    };

    const endCamera = () => {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            videoRef.current.srcObject = stream;
            setdisplay('visible');
          })
          .catch((error) => {
            console.log("Error accessing camera:", error);
          });
      };

    const captureImage = () => {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, 1366, 768);
        const data = canvasRef.current.toDataURL("image/jpg");
        setImageData(data);
        imageNo == 1 && setfrontUrl(data)
        imageNo == 2 && setrightUrl(data)
        imageNo == 3 && setleftUrl(data)
        console.log('image data captured => ', data)
        closeModal()
      };
    //   ====enable camera end ========


    // ===========to get location from image==================
    function getGeoLocation(file) {
        return new Promise((resolve, reject) => {
          EXIF.getData(file, function() {
            const lat = EXIF.getTag(this, "GPSLatitude");
            const latRef = EXIF.getTag(this, "GPSLatitudeRef");
            const lng = EXIF.getTag(this, "GPSLongitude");
            const lngRef = EXIF.getTag(this, "GPSLongitudeRef");
      
            if (lat && latRef && lng && lngRef) {
              const latitude = convertToDecimalDegrees(lat, latRef);
              const longitude = convertToDecimalDegrees(lng, lngRef);
              resolve({latitude, longitude});
            } else {
              alert('Image does not have location. Turn on location first and then take a picture to upload...');
            }
          });
        });
      }
      
      function convertToDecimalDegrees(coordinates, direction) {
        const degrees = coordinates[0];
        const minutes = coordinates[1];
        const seconds = coordinates[2];
        const decimalDegrees = degrees + minutes / 60 + seconds / 3600;
        return direction === "S" || direction === "W" ? -decimalDegrees : decimalDegrees;
      }

       // ===========to get location from image end here==================

    const handleImage = async (e) => {
        if (e.target.name == "frontImage"){
            let file = e.target.files[0];
            const geoLocation = await getGeoLocation(file); // for location from image
            console.log("1 Image geo location:", geoLocation); // for location from image
            setfrontData(geoLocation)
            setfrontImageUpload(e.target.files[0]);
            setfrontUrl(URL.createObjectURL(e.target.files[0]))
            formik.setFieldValue('frontImage', frontImageUpload)
            formik.setFieldTouched('flongitude', frontData?.longitude)
            formik.setFieldValue('flatitude', frontData?.latitude)
            console.log("--1-- name file on change..", file);
        }

        if (e.target.name == "rightImage") {
            let file = e.target.files[0];
            const geoLocation = await getGeoLocation(file);
            console.log("2 Image geo location:", geoLocation);
            setrightData(geoLocation)
            setrightImageUpload(e.target.files[0]);
            setrightUrl(URL.createObjectURL(e.target.files[0]))
            formik.setFieldValue('rightImage', rightImageUpload)
            formik.setFieldValue('rlongitude', rightData?.longitude)
            formik.setFieldValue('rlatitude', rightData?.latitude)
            console.log("--2-- name file on change..", file);
        }

        if (e.target.name == "leftImage") {
            let file = e.target.files[0];
            const geoLocation = await getGeoLocation(file);
            console.log("3 Image geo location:", geoLocation);
            setleftData(geoLocation)
            setleftImageUpload(e.target.files[0]);
            setleftUrl(URL.createObjectURL(e.target.files[0]))
            formik.setFieldValue('leftImage', leftImageUpload)
            formik.setFieldValue('llongitude', leftData?.longitude)
            formik.setFieldValue('llatitude', leftData?.latitude)
            console.log("--3-- name file on change..", file);
        }
    }

    // ==========Modal==============
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = (val) => {
      setIsOpen(true)
      startCamera()
      setImageData(null)
      setimageNo(val)
    }
    const closeModal = () => setIsOpen(false)
    const afterOpenModal = () => { }
    // ===========Modal End=========

  return (
    <>

    {loader && <CommonLoader /> }

    <ToastContainer position="top-right" autoClose={2000} />
    
    {!loader && <form className='border-2 border-blue-700 bg-blue-50 mb-4' onChange={formik.onChange} onSubmit={formik.handleSubmit} >
                <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>Upload Image</h1>

            {/* =====Front======== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Front Image</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2 px-4">
                        <span className=' col-span-12 font-semibold flex justify-center items-center mb-2'>
                            {frontUrl == null ? <abbr title='Click to capture image' onClick={() => openModal(1)} className='cursor-pointer'><span className='text-[80px]'><FcCamera /></span></abbr> : <img src={frontUrl} alt="Front Image" srcset="" className='w-32' />}
                        </span>
                        <span className='col-span-12 grid grid-cols-12 mb-2'>
                            <span className="col-span-6 text-sm flex items-center">Upload an Image :</span>
                            <span className="col-span-6 text-sm"><input type="file" onChange={handleImage} name="frontImage" id="" accept='.jpg, .jpeg' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span>
                        </span>
                        <span className='col-span-12 grid grid-cols-12'>
                            <span className="col-span-6 text-sm flex items-center">Latitude :</span>
                            <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{frontData?.latitude}</span></span>
                        </span>
                        <span className='col-span-12 grid grid-cols-12'>
                            <span className="col-span-6 text-sm flex items-center">Longitude :</span>
                            <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{frontData?.longitude}</span></span>
                        </span>
                        <span className='col-span-12 mt-2 text-center'>
                        {formik.touched.frontImage && formik.errors.frontImage && <><span className="text-red-600 text-xs">{formik.errors.frontImage}</span></>}
                        </span>
                    </div>
                    
                    
                </div>
            </div>

            {/* =======Right========= */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Right Image</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2 px-4">
                    <span className=' col-span-12 font-semibold flex justify-center items-center mb-2'>
                            {rightUrl == null ? <abbr title='Click to capture image' onClick={() => openModal(2)} className='cursor-pointer'><span className='text-[80px]'><FcCamera /></span></abbr> : <img src={rightUrl} alt="Front Image" srcset="" className='w-32' />}
                        </span>
                        <span className='col-span-12 grid grid-cols-12 mb-2'>
                            <span className="col-span-6 text-sm flex items-center">Upload an Image :</span>
                            <span className="col-span-6 text-sm"><input type="file" onChange={handleImage} name="rightImage" id="" accept='.jpg, .jpeg' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span>
                        </span>
                        <span className='col-span-12 grid grid-cols-12'>
                            <span className="col-span-6 text-sm flex items-center">Latitude :</span>
                            <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{rightData?.latitude}</span></span>
                        </span>
                        <span className='col-span-12 grid grid-cols-12'>
                            <span className="col-span-6 text-sm flex items-center">Longitude :</span>
                            <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{rightData?.longitude}</span></span>
                        </span>
                        <span className='col-span-12 mt-2 text-center'>
                        {formik.touched.rightImage && formik.errors.rightImage && <><span className="text-red-600 text-xs">{formik.errors.rightImage}</span></>}
                        </span>
                    </div>
                    
                    
                </div>
            </div>

            {/* ====Left Image===== */}
            <div className='bg-indigo-50 border-2 border-indigo-500 my-2 mx-1'>
                <div className='text-white bg-indigo-500 px-2 font-semibold'>Left Image</div>
                <div className='px-2 py-2'>
                    <div className="grid grid-cols-12 text-sm pb-2 px-4">
                    <span className=' col-span-12 font-semibold flex justify-center items-center mb-2'>
                            {leftUrl == null ? <abbr title='Click to capture image' onClick={() => openModal(3)} className='cursor-pointer'><span className='text-[80px]'><FcCamera /></span></abbr> : <img src={leftUrl} alt="Front Image" srcset="" className='w-32' />}
                        </span>
                        <span className='col-span-12 grid grid-cols-12 mb-2'>
                            <span className="col-span-6 text-sm flex items-center">Upload an Image :</span>
                            <span className="col-span-6 text-sm"><input type="file" onChange={handleImage} name="leftImage" id="" accept='.jpg, .jpeg' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span>
                        </span>
                        <span className='col-span-12 grid grid-cols-12'>
                            <span className="col-span-6 text-sm flex items-center">Latitude :</span>
                            <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{leftData?.latitude}</span></span>
                        </span>
                        <span className='col-span-12 grid grid-cols-12'>
                            <span className="col-span-6 text-sm flex items-center">Longitude :</span>
                            <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{leftData?.longitude}</span></span>
                        </span>
                        <span className='col-span-12 mt-2 text-center'>
                        {formik.touched.leftImage && formik.errors.leftImage && <><span className="text-red-600 text-xs">{formik.errors.leftImage}</span></>}
                        </span>
                    </div>
                    
                    
                </div>
            </div>

           {/* ==========Button========= */}
     <div className='w-full flex justify-center m-2'>
                {/* <div onClick={props?.back} className='px-4 py-1.5 text-sm text-white rounded-sm shadow-md bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 cursor-pointer'>
                    Back
                </div> */}
            <button type='submit' onClick={formik.handleSubmit} className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-green-500 hover:bg-green-600 focus:bg-green-600">Submit</button>
            </div>

            </form>}

            {/* ========Modal==========*/}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
                contentLabel="Example Modal"
            >

                <div class=" rounded-lg md:ml-24 shadow-lg relative bg-gray-50 px-6 py-4 w-[90vw] z-50 border-t-2 border-l-2 border-white overflow-auto" >
                
                <div className="absolute top-2 z-10 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                    <ImCross fontSize={10}/>
                </div>

                {/* =======To open camera and take picture */}
                <div className='mt-6 w-full'>
                    <video ref={videoRef} autoPlay className='' />
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                    {/* <button onClick={startCamera}>Start Camera</button> */}
                    {/* <button onClick={endCamera}>End Camera</button> */}
                    <div className='w-full text-center my-4'>
                    <button onClick={captureImage} className="text-sm px-4 py-1 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 text-white rounded-md shadow-md">Capture</button>
                    </div>
                    {/* {imageData && (
                        <img src={imageData} alt="Captured Image" />
                    )} */}

                    {/* {
                        imageData && 
                        <>
                        {imageNo == 1 && setfrontUrl(imageData)}
                        {imageNo == 2 && setrightUrl(imageData)}
                        {imageNo == 3 && setleftUrl(imageData)}
                        </>
                    } */}

                </div>

                </div>
            </Modal>
    
    </>
  )
}

export default GeoIndex