import { useContext, useState } from "react";
// import { contextVar } from "../../../Components/Context/Context";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import folders from "../../../Components/Media/folders.png";
import Modal from "react-modal";
import { useEffect } from "react";
import axios from "axios";
import ApiHeader2 from "../../../Components/ApiList/ApiHeader2";
import { toast, ToastContainer } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import BarLoader from "../../../Components/Common/BarLoader";
import ApiHeader from "../../../Components/ApiList/ApiHeader";
import { FcDocument } from 'react-icons/fc'
import { ImCross } from 'react-icons/im'
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList';
import { useParams } from "react-router-dom";
import TopTabs from "./SafFormReview/TopTabs";
import '../../../Components/Common/CommonTailwind/Fonts.css'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: "#78B2FB",
    border: "none",
  },
};

Modal.setAppElement("#root");

function SafDocumentUpload(props) {
  const base_url = 'http://192.168.0.16:8000'


  //destructuring notify function to activate toast
//   const { notify } = useContext(contextVar);
  const [loader, setloader] = useState(false);
  const [propertyDocuments, setPropertyDocuments] = useState();
  const [ownerList, setownerList] = useState();
  const [ownerDoc, setownerDoc] = useState();
  const [docUpload, setdocUpload] = useState('');
  const [docUploadName, setdocUploadName] = useState("");
  const [docId, setdocId] = useState(0);
  const [docInd, setdocInd] = useState(0);
  const [refresh, setrefresh] = useState(0);
  const [modal, setmodal] = useState(false);
  const [doc, setdoc] = useState()
  const [docUrl, setdocUrl] = useState('')
  const [preview, setpreview] = useState(1)
  const [valRefresh, setvalRefresh] = useState(0)
  const [submitVal, setsubmitVal] = useState(0)
  const [imageUrl, setimageUrl] = useState()
  const [fileName, setfileName] = useState('')
  const [isImage, setisImage] = useState(true)
  const [tempDoc, settempDoc] = useState(false)
  const [ownerId, setownerId] = useState(null)
  const [documentListToUpload, setdocumentListToUpload] = useState()
  const [currentOwnerUploadModalData, setcurrentOwnerUploadModalData] = useState()
  const [applicationFullData, setapplicationFullData] = useState()
  const [currentOwnerId, setcurrentOwnerId] = useState(null)
  const [currentDocMstrId, setcurrentDocMstrId] = useState(null)
  const [currenDocRefName, setcurrenDocRefName] = useState(null)
  const [applicationData2, setapplicationData2] = useState()

  const { api_uploadSafDocument, api_listSafDocument, api_getAppicationFullDetail } = CitizenApplyApiList();

  let docIndex = 2;

  const {id} = useParams()

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);

  const openModal2 = () => setIsOpen2(true)
  const afterOpenModal = () => { }

  // THIS MODAL FIRST FILTER OUT THE CLICKED OWNER DOC LIST AND OWNER ID WITH filterModalDocumentData 
  const openModal = (ownerId, rowIndex) => {
    filterModalDocumentData(rowIndex)
    setcurrentOwnerId(ownerId)
    // console.log("owner id => ", index)
    // setownerId(index)
    setvalRefresh(valRefresh + 1)
    setmodal(true)
    setIsOpen(true);
    // console.log("modal m1 => ", modal)
  }

  const closeModal = () => {
    settempDoc(false)
    setIsOpen(false);
    setmodal(false)
    setIsOpen2(false)
    setpreview(preview + 1)
    console.log('modal m end => ', modal, tempDoc)
  }

//   console.log(
//     ".............data in full details card in bo doc upload.........",
//     applicationData2
//   );

  useEffect(() => {
    fetchDocumentsToUpload()
  }, [refresh])

  const fetchDocumentsToUpload = () => {
    
    setloader(true)

    axios.post(api_listSafDocument, { applicationId: id }, ApiHeader())
      .then((res) => {
        console.log("list of doc to upload at SafDocumentUpload => ", res?.data);
        setdocumentListToUpload(res?.data?.data)
        setloader(false)
      })
      .catch((err) => {
        console.log("data submission error bo doc upload => ", err);
        setmodal(false);
        setloader(false)
      })

    //   axios.get(getSafDoc + "/" + id, ApiHeader())
    //   .then((res) => {
    //     console.log("bo doc upload data success => ", res)
    //     setapplicationData2(res?.data?.data)
    //   })
    //   .catch((err) => {
    //     console.log("bo doc upload data error => ", err)
    //   })
  }

  useEffect(() => {
    axios.post(api_getAppicationFullDetail,
        {
            applicationId: id
        },
        ApiHeader())
        .then(function (response) {
            setloader(false)
            console.log('view full details...', response.data.data)
            setapplicationFullData(response?.data?.data?.fullDetailsData)
        })
        .catch(function (error) {
            setloader(false)
            console.log('==2 details by id error...', error)
        })
  },[])

  useEffect(() => {
  }, [refresh])

  console.log('temp doc => ', tempDoc)

//   useEffect(() => {
//     setdoc(applicationData2?.uploadDocument)
//     setvalRefresh(valRefresh + 1)
//     // props.refresh()
//   }, [applicationData2])

//   useEffect(() => {
//     console.log("owners documents list... => ", applicationData2)
//     setownerDoc(applicationData2?.ownersDocList);
//     setownerList(applicationData2?.owners);
//     console.log("owners => ", applicationData2?.owners)
//     setPropertyDocuments(applicationData2?.documentsList);
//     // setPropertyDocuments(applicationData2?.uploadDocument);
//   }, [applicationData2, valRefresh, refresh]);

  const validationSchema = yup.object({
    docId: yup.number().required("Select document type"),
    docUpload: yup.string().required("Select document")
  })

  const formik = useFormik({
    initialValues: {
      docId: '',
      docUpload: '',
      docName: ''
    },

    onSubmit: (values) => {
      console.log("use effect 2")
      console.log("values submission => ", values)
      submitData()
    }
    , validationSchema
  })

  const handleChange = (e) => {
    let file = e.target.files[0];
    setfileName(e.target.name)
    setimageUrl(URL.createObjectURL(e.target.files[0]))
    setdocUpload(e.target.files[0]);
    formik.setFieldValue('docUpload', URL.createObjectURL(e.target.files[0]))
    console.log("use effect change ", formik.values.docId, formik.values.docUpload)
    console.log(
      "file on change bo doc upload => ",
      file,
      "and doc upload => ",
      docUpload, "and url => ", imageUrl, "and name => ", file?.name, "file name => ", fileName
    );

    (file?.name).substring((file?.name).lastIndexOf(".") + 1) == 'pdf' ? setisImage(false) : setisImage(true)

  };

  console.log("and doc name => ", fileName)

  // useEffect(() => {
  //     propertyDocuments?.map((document) => {
  //         document?.docVal?.map((elem) => {
  //             elem?.id == docId && setdocUploadName(elem?.doc_name)
  //         })
  //     })
  // },[docId])

  const modalData = (index, type, ownerindex) => {
    console.log("enter 1", index, type, ownerindex, modal)
    console.log(
      "bo doc upload index => ",
      index,
      "type => ",
      type,
      "ownerindex => ",
      ownerindex
    );
    setmodal(true);
    console.log("modal m2 => ", modal)
    funsub(index, type, ownerindex);
  };

  const funsub = (index, type, ownerindex) => {
    console.log("enter 2 modal m4", index, type, ownerindex, modal)
    modal == true && submitData(index, type, ownerindex);
  };

  const submitDataTemp = (doc) => {
    console.log('at upload document middleware')
    setmodal(false)
    setdocUploadName(doc);
    setdocInd(docId);
    console.log("modal 1 => ", modal)
    setsubmitVal(submitVal + 1)
    // formik.handleSubmit()
    // console.log("docUploadName => ", docUploadName)  
  };

  useEffect(() => {
    // props.refresh()
    formik.handleSubmit();
    console.log("use effect in doc")
    console.log("use effect doc upload name => ", docUploadName, formik.values, formik.errors)
  }, [docUploadName != '', submitVal])


  // const submitData = (index, type, ownerindex) => {
  const submitData = (docRefName) => {

    if (currentDocMstrId == null) {
      toast.error("Select Document Type");
      setcurrentOwnerId(null)
      setcurrentDocMstrId(null)
      setcurrenDocRefName(null)
      return
    }

    console.log("doc ref name...", docRefName)
    let fd = new FormData();
    console.log("document  => ", docUpload);

    let requestBody = {
      applicationId: id, // done coming
      owner_id: currentOwnerId, //null for property
      docMstrId: currentDocMstrId, // from selectbox
      document: docUpload, // done coming
      docRefName: currenDocRefName // from selectbox
    }


    fd.append("applicationId", id);
    if (currentOwnerId != null) {
      fd.append("ownerId", currentOwnerId);
    }
    fd.append(`docMstrId`, currentDocMstrId);
    fd.append(`document`, docUpload);
    fd.append(`docRefName`, currenDocRefName);

    // console.log("form data bo doc upload => ", fd);
    console.log("form data bo doc upload => ", requestBody); // requestbody just for debugging

    // return
    if (docUpload != '') {
      closeModal()
      setloader(true)


      console.log('before fetch doc to upload...', fd)
      axios.post(api_uploadSafDocument, fd, ApiHeader2())
        .then((res) => {
          console.log("data submitted bo doc upload => ", res.data);

          if (res?.data?.status) {
            toast.success("Document Uploaded Successfully !!");
            setmodal(false);
            setdocUploadName("");
            setdocUpload('')
            setloader(false)
            setrefresh(refresh + 1)
            setfileName('')
            formik.setFieldValue("docUpload", "")
            // props.refresh()
            // RESETTING DATA FOR REUPLOAD
            setcurrentOwnerId(null)
            setcurrentDocMstrId(null)
            setcurrenDocRefName(null)
            // TO REFETCH UPLOAD DOCUMENT LIST TO UPDATE
            fetchDocumentsToUpload()
          }
          else {
            toast.error('Something went wrongg !!!')
            setloader(false)
          }

        })
        .catch((err) => {
          console.log("data submission error bo doc upload => ", err);
          setmodal(false);
          setloader(false)
        })
    } else {
      toast.error("Select file")
    }

  };

  useEffect(() => {
    submitDataTemp()
    console.log('refreshing data => ', refresh)
    for (var i = 0; i < 5; i++) {
      setTimeout(() => {
        // props.refresh()
        console.log('refresh =')
      }, 3000)
    }
  }, [refresh])

  const modalFun = (dn) => {
    console.log("getting doc name => ", dn)
    if (dn == '') {
      toast.error("File not uploaded !!!")
    }
    if (dn != '') {
      setdocUrl(dn)
      // settempDoc(dn)
      openModal2()
      setpreview(preview + 1)
    }
  }

  const handleChange2 = (e) => {
    setcurrentDocMstrId(e.target.value)
    setcurrenDocRefName(e.target[e.target.selectedIndex].text)
    // formik.setFieldValue('docId', e.target.value)
    // console.log('changing id use effect', e.target.value)
  }

  const filterModalDocumentData = (rowIndex) => {
    let modalDocData = documentListToUpload?.ownersDocList[rowIndex]
    setcurrentOwnerUploadModalData(modalDocData)
  }

  console.log('filterred modal data......', currentOwnerUploadModalData)
  console.log('owner doc list ===>......', documentListToUpload?.ownersDocList)

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {loader && <BarLoader/>}

        <div className='p-8 px-40 '>

        <TopTabs title="Upload-Documents" type="application" id={id} safNo={''} active="document" />

        </div>

      <div className="overflow-x-auto mx-auto w-full px-36">

      <div className="text-gray-700 py-6 ">
                                <div className="grid md:grid-cols-2 text-sm bg-white shadow-lg rounded-sm py-4">
                                    {
                                        applicationFullData?.cardArray?.data?.map((data) => (
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">{data?.displayString} : </div>
                                                <div className="px-4 py-2">{data?.value}</div>
                                            </div>
                                        ))
                                    }
                                </div>
        </div>

        <div className="bg-white">
          {/* Owner documents */}
          {
            documentListToUpload?.owners &&
            <div className=" flex md:px-4 bg-white font-sans overflow-x-auto mt-10 py-6">
              <div className="w-full">
                <h1 className="text-sm font-semibold poppins">Owner Documents</h1>
                <div className="bg-white shadow-md rounded my-2">
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="bg-indigo-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Applicant Image
                        </th>
                        {/* <th className="py-3 px-6 text-left cursor-pointer">
                      Applicant Document
                    </th> */}
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Applicant Name
                        </th>
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Guardian Name
                        </th>
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Mobile
                        </th>
                        {/* <th className="py-3 px-6 text-left">Applicant Image</th> */}
                        <th className="py-3 px-6 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light bg-white">
                      {/* front image */}
                      {documentListToUpload?.owners?.map((owner, index) => (
                        <tr className="border-b border-gray-200 ">

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center justify-center">

                              {/* {owner?.uploadoc?.map((elem) => <>
                            {
                              elem?.doc_type == "Applicant Image" && <div className="text-center cursor-pointer" onClick={() => modalFun(elem)}>
                                <img src={elem?.doc_path} alt="" className="md:w-[3vw] w-[5vw]" srcset="" />
                              </div>
                            }
                          </>)}

                          {documentListToUpload?.ownersDocList?.map((doc) =>
                            <>
                              {

                                (doc?.ownerId == owner?.id && doc?.docName == "Photo") && (doc?.uploadDoc == '' && <i className="font-semibold text-sm">N/A</i>)

                              }
                            </>)} */}
                              {owner?.uploadoc != '' &&
                                <div className="text-center cursor-pointer" onClick={() => modalFun(`${base_url}/${owner?.uploadoc}`)}>
                                  {/* {owner?.uploadoc} */}
                                  <img src={`${base_url}/${owner?.uploadoc}`} alt="" className="md:w-[3vw] w-[5vw]" srcset="" />
                                </div>
                              }
                              {
                                owner?.uploadoc == '' && <span className="text-red-500 font-semibold">Not Uploaded</span>
                              }

                              {/* {documentListToUpload?.ownersDocList?.map((doc) =>
                            <>
                              {

                                (doc?.ownerId == owner?.id && doc?.docName == "Photo") && (doc?.uploadDoc == '' && <i className="font-semibold text-sm">N/A</i>)

                              }
                            </>)} */}

                            </div>
                          </td>

                          {/* <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center justify-center text-[40px]">

                          {owner?.uploadoc?.map((elem) => <>
                            {
                              elem?.doc_type == "gender_document" && <div className="text-center cursor-pointer" onClick={() => modalFun(elem)}>
                                <FcDocument />
                              </div>
                            }
                          </>)}

                          {ownerDoc?.map((doc) => <>
                            {

                              (doc?.ownerId == owner?.id && doc?.docName == "Gender Document") && (doc?.uploadDoc == '' && <i className="font-semibold text-sm">N/A</i>)

                            }
                          </>)}

                        </div>
                      </td> */}

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">
                                {owner?.owner_name}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">
                                {owner?.guardian_name}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">
                                {owner?.mobile_no}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-6">
                            <div className="font-semibold text-sm">
                              <div className="">
                                {!loader && <button
                                  onClick={() => openModal(owner?.id, index)}
                                  type="button"
                                  className=" px-6 py-1.5 bg-indigo-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  Upload
                                </button>}
                              </div>
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }

          {/* Property type */}
          <div className=" flex md:px-4 bg-white font-sans overflow-x-auto py-6">
              <div className="w-full">
              <h1 className="text-sm font-semibold poppins">Property Documents</h1>
              <div className="bg-white shadow-md rounded my-2">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-indigo-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-center">#</th>
                      <th className="py-3 px-6 text-left cursor-pointer">
                        Document Name
                      </th>
                      <th className="py-3 px-6 text-left">Type</th>
                      <th className="py-3 px-6 text-center">Document</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Remarks</th>
                      <th className="py-3 px-6 text-center">Preview</th>
                      <th className="py-3 px-6 text-center">Upload</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light bg-white">
                    {/* front image */}
                    {documentListToUpload?.documentsList?.map((document, index) => (
                      <tr className="border-b border-gray-200 " onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
                        <td className="py-3 px-6 font-semibold">{index + 1}</td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                              <img src={folders} alt="rain" className="w-4" />
                            </div>
                            <span className="font-medium" value={document?.docName}>
                              {document?.docName}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <div className="font-semibold text-sm">
                            <div className="">
                              {/* {...formik.getFieldProps('harvesting')} */}
                              <select
                                className="form-control block w-full px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none cursor-pointer shadow-md w-36"
                                name="docId"
                                onChange={handleChange2}
                              >
                                <option value="" selected disabled>
                                  --select--
                                </option>
                                {document?.docVal?.map((data) => (
                                  <option value={data?.id}>
                                    {data?.doc_name}
                                  </option>
                                ))}
                                {/* <option value="">type</option>
                                                                <option value="">type</option> */}
                              </select>
                              {/* <span className="text-red-600 absolute text-xs">{(formik.touched.docId && formik.errors.docId) ? formik.errors.docId : null}</span> */}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center relative">
                          {(document?.uploadDoc == '') ? <i className="font-semibold">N/A</i> :

                            <div className="flex items-center justify-center font-semibold text-[26px] cursor-pointer" onClick={() => modalFun(`${base_url}/${document?.uploadDoc?.doc_path}`)}>
                              {/* <div className="flex items-center">
                                {(((document).substring(document?.uploadDoc?.doc_path.lastIndexOf('/') + 1)).substring((document?.uploadDoc?.doc_path).substring(document?.uploadDoc?.doc_path.lastIndexOf('/') + 1).lastIndexOf(".") + 1)) == 'pdf' && <div className="flex-shrink-0 text-[28px]">
                                  <FcDocument />
                                </div>
                                }
                                {(((document?.uploadDoc?.doc_path).substring(document?.uploadDoc?.doc_path.lastIndexOf('/') + 1)).substring((document?.uploadDoc?.doc_path).substring(document?.uploadDoc?.doc_path.lastIndexOf('/') + 1).lastIndexOf(".") + 1)) == 'jpg' && <div className="flex-shrink-0">
                                  <img src={document?.uploadDoc?.doc_path} alt="" className="md:w-[2vw] w-[5vw]" srcset="" />
                                </div>
                                }
                                {(((document?.uploadDoc?.doc_path).substring(document?.uploadDoc?.doc_path.lastIndexOf('/') + 1)).substring((document?.uploadDoc?.doc_path).substring(document?.uploadDoc?.doc_path.lastIndexOf('/') + 1).lastIndexOf(".") + 1)) == 'jpeg' && <div className="flex-shrink-0">
                                  <img src={document?.uploadDoc?.doc_path} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                </div>
                                }
                              </div> */}
                              <div className="flex items-center">
                                {document?.uploadDoc?.doc_path?.split('.')[1] == 'pdf' &&
                                  <div className="flex-shrink-0 text-[28px]">
                                    <FcDocument />
                                  </div>
                                }
                                {document?.uploadDoc?.doc_path?.split('.')[1] == 'jpg' &&
                                  <div className="flex-shrink-0">
                                    <img src={`${base_url}/${document?.uploadDoc?.doc_path}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                  </div>
                                }
                                {document?.uploadDoc?.doc_path?.split('.')[1] == 'jpeg' &&
                                  <div className="flex-shrink-0">
                                    <img src={`${base_url}/${document?.uploadDoc?.doc_path}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                  </div>
                                }
                                {document?.uploadDoc?.doc_path?.split('.')[1] == 'png' &&
                                  <div className="flex-shrink-0">
                                    <img src={`${base_url}/${document?.uploadDoc?.doc_path}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                  </div>
                                }

                              </div>
                            </div>

                          }


                          {/* {(document?.uploadDoc == '' && fileName == '') && <i className="font-semibold">N/A</i>} */}
                          {/* {(document?.uploadDoc == '' && document?.docName != fileName) && <i className="font-semibold">N/A</i>} */}

                        </td>

                        <td className="py-3 px-6 text-center font-semibold">
                          {document?.uploadDoc == '' ? <i className="font-semibold">N/A</i> : <>
                            <p className="whitespace-no-wrap">
                              {document?.uploadDoc?.verify_status == 0 && <>Pending</>}</p>
                            <p className="text-green-500 whitespace-no-wrap">
                              {document?.uploadDoc?.verify_status == 1 && <>Verified</>}</p>
                            <p className="text-red-500 whitespace-no-wrap">
                              {document?.uploadDoc?.verify_status == 2 && <>Rejected</>}
                            </p>
                          </>}
                        </td>

                        <td className="py-3 px-6 text-center">
                          {(document?.uploadDoc?.remarks == "" || document?.uploadDoc?.remarks == null) ? <i className="font-semibold">N/A</i> : document?.uploadDoc?.remarks}
                        </td>

                        <td className="py-3 px-6 text-center">
                          {
                            (document?.docName == fileName && isImage == true) &&

                            <div className="flex items-center justify-center font-semibold text-[26px] cursor-pointer" onClick={() => modalFun(settempDoc(!tempDoc))}>
                              <img src={imageUrl} alt="" srcset="" className="md:w-[3vw] w-[5vw] text-center" /></div>
                          }
                          {
                            (document?.docName == fileName && isImage == false) &&
                            <div className="flex items-center justify-center font-semibold text-[26px] cursor-pointer" onClick={() => modalFun(settempDoc(!tempDoc))}>
                              <div className="text-[40px] text-center"><FcDocument /></div></div>
                          }
                        </td>

                        <td className="py-3 px-6 flex flex-wrap gap-2">


                          <div className="font-semibold text-sm">
                            {document?.uploadDoc?.verify_status != 1 && <>
                              <div className="">
                                <input
                                  accept=".pdf,.jpg,.jpeg"
                                  type="file"
                                  name={document?.docName}
                                  onChange={handleChange}
                                  className="form-control block w-full px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 foc}us:outline-none cursor-pointer shadow-md w-36"
                                />
                                {/* <span className="text-red-600 absolute text-xs">{formik.touched.docUpload && formik.errors.docUpload ? formik.errors.docUpload : null}</span> */}
                              </div>
                              {(document?.uploadDoc?.verify_status != 1 || document?.uploadDoc == '') && <div className="mt-2">
                                {!loader && <button
                                  // onClick={() => submitDataTemp(document?.docName)}
                                  onClick={() => submitData(document?.docName)}
                                  type="submit"
                                  // onClick={formik.handleSubmit}
                                  className=" px-4 py-1.5 bg-indigo-400 text-white text-xs leading-tight rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  Upload for prop
                                </button>}
                              </div>} </>}

                          </div>


                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-span-5 grid grid-cols-3 px-4">
            <div className="md:pl-0">
              {/* <button onClick={() => props.backFun(3)} type="button" className=" px-6 py-2.5 bg-indigo-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save</button> */}
            </div>
            <div className="md:px-4 text-center"></div>
            <div className="md:pl-10 text-right"></div>
          </div>

        </div>

      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
          <div className="absolute top-5 right-5 bg-red-200 hover:bg-red-300 rounded-full p-2 cursor-pointer" onClick={closeModal}>
            <ImCross />
          </div>
          <div className="bg-gray-100 flex md:pl-4 bg-white font-sans overflow-x-auto mt-6">
            <div className="w-full lg:w-4/6">
              <div className="font-semibold w-full flex">
                <div className="flex-1">
                  {/* {ownerList[ownerIndex]['ownerName']} */}
                </div>
                <div className="flex-1 text-center">
                  <span className="float-none">Upload Documents</span>
                </div>
              </div>
              <div className="bg-white shadow-md rounded my-2">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-indigo-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">#</th>
                      <th className="py-3 px-6 text-left cursor-pointer">
                        Document Name
                      </th>
                      <th className="py-3 px-6 text-left">Type</th>
                      <th className="py-3 px-6 text-center">Document</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Remarks</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light bg-white">
                    {/* front image */}
                    {currentOwnerUploadModalData?.map((doc, index) =>

                      doc?.ownerId == currentOwnerId &&

                      (
                        <>

                          <tr className="border-b border-gray-200 ">
                            <td className="py-3 px-6 text-center font-semibold">{index + 1}</td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                  <img src={folders} alt="rain" className="w-4" />
                                </div>
                                <span className="font-medium">
                                  {/* {doc?.docVal[0]?.doc_name} */}
                                  {doc?.docName}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="font-semibold text-sm">
                                <div className="">
                                  {/* {...formik.getFieldProps('harvesting')} */}
                                  <select
                                    className="form-control block w-full px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none cursor-pointer shadow-md w-36"
                                    name="docId"
                                    onChange={handleChange2}
                                  >
                                    <option value="" selected disabled>
                                      --select--
                                    </option>
                                    {doc?.docVal?.map((data) => (
                                      <option value={data?.id}>
                                        {data?.doc_name}
                                      </option>
                                    ))}
                                    {/* <option value="">type</option>
                                                                <option value="">type</option> */}
                                  </select>
                                  {/* <span className="text-red-600 absolute text-xs">{(formik.touched.docId && formik.errors.docId) ? formik.errors.docId : null}</span> */}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              {doc?.uploadDoc == '' ? <i className="font-semibold">N/A</i> :
                                <div className="flex items-center justify-center font-semibold text-[26px] cursor-pointer" onClick={() => modalFun(`${base_url}/${doc?.uploadDoc?.doc_path}`)}>
                                  {/* <div className="flex items-center">
                                    {(((doc?.uploadDoc?.doc_path).substring(doc?.uploadDoc?.doc_path.lastIndexOf('/') + 1)).substring((doc?.uploadDoc?.doc_path).substring(doc?.uploadDoc?.doc_path.lastIndexOf('/') + 1).lastIndexOf(".") + 1)) == 'pdf' && <div className="flex-shrink-0 text-[28px]">
                                      <FcDocument />
                                    </div>
                                    }
                                    {(((doc?.uploadDoc?.doc_path).substring(doc?.uploadDoc?.doc_path.lastIndexOf('/') + 1)).substring((doc?.uploadDoc?.doc_path).substring(doc?.uploadDoc?.doc_path.lastIndexOf('/') + 1).lastIndexOf(".") + 1)) == 'jpg' && <div className="flex-shrink-0">
                                      <img src={doc?.uploadDoc?.doc_path} alt="" className="md:w-[2vw] w-[5vw]" srcset="" />
                                    </div>
                                    }
                                    {(((doc?.uploadDoc?.doc_path).substring(doc?.uploadDoc?.doc_path.lastIndexOf('/') + 1)).substring((doc?.uploadDoc?.doc_path).substring(doc?.uploadDoc?.doc_path.lastIndexOf('/') + 1).lastIndexOf(".") + 1)) == 'jpeg' && <div className="flex-shrink-0">
                                      <img src={doc?.uploadDoc?.doc_path} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                    </div>
                                    }
                                  </div> */}
                                  <div className="flex items-center">
                                    {doc?.uploadDoc?.doc_path?.split('.')[1] == 'pdf' &&
                                      <div className="flex-shrink-0 text-[28px]">
                                        <FcDocument />
                                      </div>
                                    }
                                    {doc?.uploadDoc?.doc_path?.split('.')[1] == 'jpg' &&
                                      <div className="flex-shrink-0">
                                        <img src={`${base_url}/${doc?.uploadDoc?.doc_path}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                      </div>
                                    }
                                    {doc?.uploadDoc?.doc_path?.split('.')[1] == 'jpeg' &&
                                      <div className="flex-shrink-0">
                                        <img src={`${base_url}/${doc?.uploadDoc?.doc_path}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                      </div>
                                    }
                                    {doc?.uploadDoc?.doc_path?.split('.')[1] == 'png' &&
                                      <div className="flex-shrink-0">
                                        <img src={`${base_url}/${doc?.uploadDoc?.doc_path}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                      </div>
                                    }

                                  </div>
                                </div>
                              }
                            </td>
                            <td className="py-3 px-6 text-center font-semibold">
                              {doc?.uploadDoc == '' ? <i className="font-semibold">N/A</i> : <>
                                <p className="whitespace-no-wrap">
                                  {doc?.uploadDoc?.verify_status == 0 && <>Pending</>}</p>
                                <p className="text-green-500 whitespace-no-wrap">
                                  {doc?.uploadDoc?.verify_status == 1 && <>Verified</>}</p>
                                <p className="text-red-500 whitespace-no-wrap">
                                  {doc?.uploadDoc?.verify_status == 2 && <>Rejected</>}
                                </p>
                              </>}
                            </td>

                            <td className="py-3 px-6">
                              {doc?.uploadDoc?.remarks == "" ? <i className="font-semibold">N/A</i> : doc?.uploadDoc?.remarks}
                              {doc?.uploadDoc == '' && <i className="font-semibold">N/A</i>}
                            </td>

                            {/* <td className="py-3 px-6 text-center">
                              {
                                (doc?.docVal[0]?.doc_name == fileName && isImage == true) &&

                                <div className="flex items-center justify-center font-semibold text-[26px] cursor-pointer" onClick={() => modalFun(settempDoc(!tempDoc))}>
                                  <img src={imageUrl} alt="" srcset="" className="md:w-[3vw] w-[5vw] text-center" /></div>
                              }
                              {
                                (doc?.docVal[0]?.doc_name == fileName && isImage == false) &&
                                <div className="flex items-center justify-center font-semibold text-[26px] cursor-pointer" onClick={() => modalFun(settempDoc(!tempDoc))}>
                                  <div className="text-[40px] text-center"><FcDocument /></div></div>
                              }
                            </td> */}

                            <td className="py-3 px-6">
                              <div className="font-semibold text-sm">
                                {(doc?.uploadDoc?.verify_status != 1) && <>
                                  <div className="">
                                    <input
                                      accept=".pdf,.jpg,.jpeg"
                                      type="file"
                                      name={doc?.docVal[0]?.doc_name}
                                      onChange={handleChange}
                                      className="form-control block w-full px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none cursor-pointer shadow-md w-36"
                                    />
                                  </div>
                                  <div className="mt-2">
                                    {!loader && <button
                                      onClick={() => submitData(doc?.docName)}
                                      type="button"
                                      className=" px-6 py-1.5 bg-indigo-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                      Upload
                                    </button>}
                                  </div> </>}
                              </div>
                            </td>
                          </tr>
                        </>
                      )

                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div class=" rounded-lg shadow-xl border-2 ml-32 px-0" style={{ 'width': '60vw', 'height': '80vh' }}>

          <div className="absolute top-10 bg-red-200 hover:bg-red-300 right-10 rounded-full p-2 cursor-pointer" onClick={closeModal}>
            <ImCross />
          </div>

          {
            tempDoc ? <iframe className='w-full h-full' src={imageUrl} frameborder="0"></iframe> : <iframe className='w-full h-full' src={docUrl} frameborder="0"></iframe>
          }

        </div>

      </Modal>

    </>
  );
}

export default SafDocumentUpload;
