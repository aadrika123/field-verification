import React, { useState, useRef, useEffect } from "react";
import EXIF from 'exif-js'
import {ImCross} from 'react-icons/im'
import SubmissionScreen from '../../Common/SubmissionScreen';
import ForwardScreen from '../../Common/ForwardScreen';
import CommonLoader from '../../Common/CommonLoader'
import PropertyApiList from '../../../api/PropertyApiList'
import ApiHeader from '../../../api/ApiHeader'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {FcCamera} from 'react-icons/fc'
import Photo from '../../../assets/images/photo.png'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Modal from 'react-modal'
import ApiHeader2 from "../../../api/ApiHeader2";
import { toast } from "react-toastify";

const HarvestingVerificationIndex = () => {
    
    const [loader, setloader] = useState(false)
    const [applicationData, setapplicationData] = useState()
    const [imageUrl, setimageUrl] = useState(null)
    const [harvestingImageData, setharvestingImageData] = useState()
    const [imageUpload, setimageUpload] = useState()
    const [imageCheck, setimageCheck] = useState(true)
    const [forwardStatus, setforwardStatus] = useState(false)
    const [frontCamera, setfrontCamera] = useState(false)
    const [forward, setforward] = useState(false)

    const {get_HarvestingDetailsById, harvestingSiteVerification} = PropertyApiList()

    const {id} = useParams()

    const navigate = useNavigate()

    const validationSchema = yup.object({
        harvestingImage : yup.mixed().required('image required'),
    })

    const formik = useFormik({
        initialValues: {
            harvestingImage: ""
        },
        onSubmit : (values) => {
            console.log('submitting image => ', values)
            setforwardStatus(true)
        },
        validationSchema
    })

    const submitFun = () => {
        setloader(true)

        let fd = new FormData();

        fd.append('applicationId', id)
        {!frontCamera ? fd.append('harvestingImage', imageUpload) 
        :
        fd.append("harvestingImage", dataURLtoFile(imageUrl, "HarvestingImage.jpg"))}
        {
            imageCheck ? fd.append('verificationStatus', 1) : fd.append('verificationStatus', 0)
        }
        // fd.append('longitude', harvestingImageData?.longitude)
        // fd.append('latitude', harvestingImageData?.latitude)

        axios.post(harvestingSiteVerification, fd, ApiHeader2())
        .then((res) => {
            if(res?.data?.status == true){
                console.log('successfully submitted...')
                // toast.success("Submitted Successfully !!!")
                setloader(false)
                setforward(true)
            }
            if(res?.data?.status == false){
                console.log('error submitted...')
                toast.error("Something went wrong, please try after sometime !!!")
                setforward(false)
                setforwardStatus(false)
                setloader(false)
            }
        })
        .catch((error) => {
            console.log('errrorr rwh => ', error)
            toast.error("Something went wrong, please try after sometime !!!")
            setforward(false)
            setforwardStatus(false)
            setloader(false)
        })
    }

    useEffect(() => {
        setloader(true)

      axios.post(get_HarvestingDetailsById, {applicationId : id}, ApiHeader())
      .then((res) => {
        console.log('success => ', res)
        setapplicationData(res?.data?.data)
        setloader(false)
      })
      .catch((err) => {
        console.log("errror => ", err)
        setloader(false)
      })
    }, [])

    const handleImage = async (e) => {
        if (e.target.name == "harvestingImage"){
            setfrontCamera(false)
            let file = e.target.files[0];
            // const geoLocation = await getGeoLocation(file); // for location from image
            // console.log("1 Image geo location:", geoLocation); // for location from image
            // setharvestingImageData(geoLocation)
            setimageUpload(e.target.files[0]);
            setimageUrl(URL.createObjectURL(e.target.files[0]))
            formik.setFieldTouched('flongitude', harvestingImageData?.longitude)
            formik.setFieldValue('flatitude', harvestingImageData?.latitude)
            console.log("--1-- name file on change..", file);
        }
    }

    const handleStatus = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        {name == 'imageCheck' && <>{value == 'true' ? (setimageCheck(true), formik.setFieldValue('harvestingImgae', 'dddd')) : setimageCheck(false)}</>}

    }


    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setmodalType] = useState('')
    const openModal = (val) => {
      setIsOpen(true)
      {val == 'camera' && startCamera()}
      setimageData(null)
      setmodalType(val)
    }
    const closeModal = () => setIsOpen(false)
    const afterOpenModal = () => { }
    // ===========Modal End=========

    // =====download image==========
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = imageData;
            setfrontCamera(true)
            setimageUrl(imageData)
            formik.setFieldValue('harvestingImage', imageData)
        link.click();
        closeModal()
      };


      function dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      }

    // ================to turn on location==================

    const [position, setPosition] = useState(null);
    const [repeat, setrepeat] = useState(0)
    const [imageData, setimageData] = useState()

    const enableLocation = () => {
        // Get the user's location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition(position);
            setharvestingImageData(position?.coords);
          },
          () => {
            // alert("Please enable location first.");
            // setrepeat(repeat+1)
          }
        );
      }

    // ================to turn on location end==================
    
     //   ====enable camera========
     const videoRef = useRef(null);
     const canvasRef = useRef(null);
    //  const [imageData, setImageData] = useState(null);

   
     const startCamera = async () => {
       navigator.mediaDevices
         .getUserMedia({ video: true })
         .then((stream) => {
             videoRef.current.srcObject = stream;
             videoRef.current.onloadedmetadata = () => {
               // set the canvas size to match the video stream size
               canvasRef.current.width = videoRef.current.videoWidth;
               canvasRef.current.height = videoRef.current.videoHeight;
               enableLocation()
             };
         })
         .catch((error) => {
             if (error.name === 'NotAllowedError') {
                 alert('Permission to access camera was not granted');
               } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                 alert('No camera found');
               } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
                 alert('Could not start camera');
               } else {
                 alert('Error accessing camera');
               }
           console.log("Error accessing camera:", error);
         });
     };
     const captureImage = () => {
         const context = canvasRef.current.getContext("2d");
         context.drawImage(videoRef.current, 0, 0);
         const data = canvasRef.current.toDataURL("image/jpg");
         setimageData(data);
         // console.log('image data captured => ', data)
       };
     //   ====enable camera end ========
 
    //  useEffect(() => {
    //     enableLocation()
    // },[startCamera])
 
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

       let baseUrl = "http://192.168.0.16:8000"

  return (
    <>
    
    {loader && <CommonLoader />}

    <ForwardScreen openScreen={forwardStatus} id={id} navigation={() => submitFun()} closePopUp={() => setforwardStatus(false)} canSubmit={forward} />

        <div className='w-full'>
            <h1 className=' text-center font-bold text-xl border-b-2 border-gray-700 mx-4'>Field Verification <br />
            Rain Water Harvesting </h1>
        <div className='p-4 flex flex-col gap-y-4'>
            {/* <div className='w-full items-center justify-center px-4 shadow-sm flex md:flex-row flex-col flex-wrap gap-2 md:justify-evenly bg-indigo-50'>
                <span className="grid grid-cols-12 w-full text-sm gap-2 my-1"><span className='col-span-6'>Your Application No.:</span> <span className="font-semibold text-base col-span-6">{applicationData?.saf_no}</span></span>
                <span className="grid grid-cols-12 w-full text-sm  gap-2 my-1"><span className='col-span-6'>Application Type:</span> <span className="font-semibold text-base col-span-6">{applicationData?.assessment_type}</span></span>
                <span className="grid grid-cols-12 w-full text-sm  gap-2 my-1"><span className='col-span-6'>Apply Date:</span> <span className="font-semibold text-base col-span-6">{applicationData?.application_date}</span></span>
            </div> */}
            

            <div className={` bg-indigo-50 border-2 border-indigo-500 my-2 mx-1`}>
            <h1 className='text-center font-semibold bg-blue-700 text-white uppercase text-lg'>
                    <span>Water Harvesting Declaration</span>
                </h1>

                <div className="p-2">

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6'>Application No.</span>
                        <span className='col-span-6 font-semibold'>{applicationData?.applicationNo == '' ? 'N/A' : applicationData?.applicationNo}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 '>Does Completion of Water Harvesting is done before 31-03-2017?</span>
                        <span className='col-span-6 font-semibold'>{applicationData?.completionBefore2017 ? 'Yes' : 'No'}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 '>Holding No.</span>
                        <span className='col-span-6 font-semibold'>{applicationData?.holdingNo == '' ? 'N/A' : applicationData?.holdingNo}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 '>Name</span>
                        <span className='col-span-6 font-semibold'>{applicationData?.applicantName == '' ? 'N/A' : applicationData?.applicantName}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 '>Guardian Name</span>
                        <span className='col-span-6 font-semibold'>{applicationData?.guardianName == '' ? 'N/A' : applicationData?.guardianName}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 '>Ward No.</span>
                        <span className='col-span-6 font-semibold'>{applicationData?.wardNo == '' ? 'N/A' : applicationData?.wardNo}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 '>Address</span>
                        <span className='col-span-6 font-semibold'>{applicationData?.propertyAddress == '' ? 'N/A' : applicationData?.propertyAddress}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 '>Mobile No.</span>
                        <span className='col-span-6 font-semibold'>{applicationData?.mobileNo == '' ? 'N/A' : applicationData?.mobileNo}</span>
                    </div> 

                    <div className="grid grid-cols-12 text-sm pb-2">
                        <span className=' col-span-6 '>Date of Completion of Water Harvesting Structure</span>
                        <span className='col-span-6 font-semibold'>{applicationData?.dateOfCompletion == '' ? 'N/A' : applicationData?.dateOfCompletion}</span>
                    </div> 

                    <form className="grid grid-cols-12 text-sm pb-2 border-2 border-indigo-400 rounded-md mt-4" onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                        <span className=' col-span-12 font-semibold bg-indigo-500 text-white uppercase px-2 py-1 text-md'>Water Harvesting Image</span>

                        <span className='col-span-12 my-2'>
                        <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-12 text-center flex justify-center'><img src={imageUrl == null ? `${baseUrl}/${applicationData?.harvestingImage}` : imageUrl} alt="Harvesting Image" srcset="" className='w-32 cursor-pointer rounded-md shadow-md' onClick={() => openModal('image')} /></span>
                    </div> 
                        </span>

                        <div className="col-span-12 px-2">
                        <div className="grid grid-cols-12 text-sm pb-2">
                        <span className='col-span-5 font-semibold'>Check</span>
                        <span className='col-span-7 flex gap-2' onClick={handleStatus}>
                            <span className='flex gap-1'>
                            <input type="radio" name="imageCheck" required id="check1" value={true} />
                            <label htmlFor="check 1">Correct</label>
                            </span>
                            <span className='flex gap-1'>
                            <input type="radio" name="imageCheck" required id="check2" value={false} />
                            <label htmlFor="check 2">Incorrect</label>
                            </span>
                        </span>
                    </div>
                        </div>

                        <div className="col-span-12 px-2">
                        <div className="grid grid-cols-12 text-sm pb-2">
                           
                                <span className='col-span-12 grid grid-cols-12 mb-2'>
                                    <span className="col-span-4 text-sm flex items-center font-semibold">Upload :</span>
                                    <span className="col-span-5 text-sm"><input onChange={(e) => handleImage(e)} type="file" name="harvestingImage" id="" accept='.jpg, .jpeg' className=' bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span>
                                    <span className='text-red-500 text-xs col-span-2 flex justify-center items-center'>OR</span>
                                    <span className="col-span-1 text-sm flex items-center justify-end"><abbr title='Click to capture image' onClick={() => openModal('camera')} className='cursor-pointer'><span className='text-xl'><FcCamera /></span></abbr> </span>
                                </span>
                                <span className="col-span-12 text-center mb-2">
                                    {formik.touched.harvestingImage && formik.errors.harvestingImage && <><span className="text-red-600 text-xs">{formik.errors.harvestingImage}</span></>}
                                </span>
                                
                        
                        {/* <span className='col-span-12 grid grid-cols-12'>
                            <span className="col-span-6 text-sm flex items-center font-semibold">Latitude :</span>
                            <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{harvestingImageData?.latitude}</span></span>
                        </span>
                        <span className='col-span-12 grid grid-cols-12'>
                            <span className="col-span-6 text-sm flex items-center font-semibold">Longitude :</span>
                            <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{harvestingImageData?.longitude}</span></span>
                        </span> */}
                            
                    </div> 
                        </div>

                        <span className=' col-span-12 font-semibold text-center my-4 px-2'>
                            <button type="submit" className="px-4 py-1.5 mr-4 text-sm text-white rounded-sm shadow-md bg-green-500 hover:bg-green-600 focus:bg-green-600">Forward</button>
                        </span>

                    </form>

                </div>
                

            </div>

        </div>
        
        </div>

    {/* ========Modal==========*/}
    <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
                contentLabel="Example Modal"
            >

                <div className=" relative rounded-lg shadow-xl border-2 border-gray-50 px-0" style={{ 'width': '95vw', 'height': '80vh' }}>
                
                <div className="absolute top-2 z-40 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                    <ImCross fontSize={10}/>
                </div>

                {/* ========To view image=========== */}
                {
                    modalType == 'image' &&
                    <iframe className='w-full h-full' src={imageUrl == null ? `${baseUrl}/${applicationData?.harvestingImage}` : imageUrl} frameborder="0"></iframe>
                }

                {/* =======To open camera and take picture */}
                {modalType == 'camera' && 
                <div className='mt-6 w-full'>
                    <video ref={videoRef} autoPlay className='' />
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                    <div className='w-full text-center my-4'>
                    <button onClick={() => (captureImage(), enableLocation())} className="text-sm px-4 py-1 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 text-white rounded-md shadow-md">Capture</button>
                    </div>
                    {imageData && <>
                        <img src={imageData} alt="Captured Image" />
                        <div className='w-full text-center my-4'>
                    <button onClick={() => handleDownload()} className="text-sm px-4 py-1 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 text-white rounded-md shadow-md">Save</button>
                    </div>
                    </>}

                </div>}

                </div>
            </Modal>

    </>
  )
}

export default HarvestingVerificationIndex