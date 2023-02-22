
//////////////////////////////////////////////////////////////////////////////////////
//    Author - Anshuman
//    Version - 1.0
//    Date - 04 Dec 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - PropertySafDocumentView (closed)
//    DESCRIPTION - PropertySafDocumentView Component
import { useState, useEffect } from 'react'
// import TradeDocumentRow from "./TradeDocumentRow"
import Modal from 'react-modal';
// import dummy from './dummy.pdf'
import axios from 'axios';
// import { HEADER, TRADE } from 'Pages/Trade/tradeComponent/TradeApiListFile';
// import TradeNonBlockingLoader from 'Pages/Trade/tradeComponent/TradeNonBlockingLoader';
import { ToastContainer, toast } from 'react-toastify';
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList';
import { useNavigate, useParams } from 'react-router-dom';
import TradeNonBlockingLoader from './NonBlockingLoader.js';
import NonBlockingLoader from './NonBlockingLoader.js';
import TopTabs from './SafFormReview/TopTabs';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'grey',
        border: 'none'
    },
};
Modal.setAppElement('#root');
function SafDocumentUpload(props) {

    const navigate = useNavigate()

    const { id } = useParams()
    console.log("param safid...", id)

    const { api_uploadSafDocument, api_listSafDocument } = CitizenApplyApiList();

    const [ownerId, setownerId] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [DocUrl, setDocUrl] = useState('')
    let subtitle;
    const [show, setshow] = useState(false);
    const [docVals, setdocVals] = useState([{ id: 1, docName: "dummy doc" }]);
    const [docName, setdocName] = useState('...');
    const [FileName, setFileName] = useState();
    const [MyFile, setMyFile] = useState();
    const [docList, setDocList] = useState(
        [
            { docName: 'Property Document', docUrl: '/dd', docStatus: 'Rejected', docRemarks: 'Upload Proper Document' },
        ]
    )
    const openModal = () => setIsOpen(true)
    const openModal2 = () => setIsOpen2(true)
    const closeModal = () => setIsOpen(false)
    const closeModal2 = () => setIsOpen2(false)
    const afterOpenModal = () => { }
    const afterOpenModal2 = () => { }

    const modalAction = (incomingDocUrl) => {
        // alert(incomingDocUrl)
        setDocUrl(incomingDocUrl)
        openModal()
    }
    useEffect(() => {
        getRequiredDocuments()
    }, [1])

    const getRequiredDocuments = () => {
        showLoader(true);
        // let id = props?.applicationData?.licenceDtl?.id;
        let token = window.localStorage.getItem('token')
        console.log('token at basic details is post method...', token)
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }
        const requestBody = {
            applicationId: id
        }

        // axios.post(api_listSafDocument + "/" + id, header)
        axios.post(`${api_listSafDocument}`, requestBody, header)
            .then(function (response) {
                console.log("Required documents ", response.data.data);
                if (response.data.status) {
                    setDocList(response.data.data)

                    setTimeout(() => {
                        showLoader(false);
                    }, 500);
                } else {
                    showLoader(false);

                }


            })
            .catch(function (error) {
                showLoader(false);
                console.log(error);
            })
    }

    // console.log("trade document view", props?.applicationData);

    const showLoader = (status) => {
        setshow(status);
    }

    const handleModel2 = (doc_name, values, ownerId) => {
        setdocName(doc_name);
        setdocVals(values);
        setownerId(ownerId);
        openModal2();
    }



    const handleUpload = (event) => {
        event.preventDefault();
        let formData = new FormData();

        formData.append('id', id)
        formData.append('doc_for0', docName);  //document for name
        formData.append('doc_mstr_id0', FileName);  //doucment master id
        formData.append('btn_doc', 0);            //Btn name
        formData.append('doc0', MyFile);            //File information
        formData.append('owner_id', ownerId);   //ownerID

        console.log("docName MyFile", MyFile)


        setTimeout(() => {
            formData.forEach(function (value, key) {
                console.log(key, value);
            });
        }, 500);

        const HEADER = () => {
            let token = window.localStorage.getItem('token');
            const header = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    enctype: 'multipart/form-data',
                }
            }
            return header;

        }

        axios.post(`${api_uploadSafDocument}`, formData, HEADER())
            .then(res => {
                console.log("upload message", res.data);
                if (res.data.status) {

                    showLoader(false)
                    notify("File Uploaded Successfully", "success");
                    // props.fun(0);
                    closeModal2()
                    getRequiredDocuments()
                } else {
                    showLoader(false)
                    notify(res.data.message, "notice")

                }

            })
            .catch((error) => {
                console.log("error while upload", error);
                showLoader(false);
                notify("Something went wrong", "error")
            })
    }

    const notify = (toastData, actionFlag) => {
        toast.dismiss();
        { actionFlag == 'escalated' && toast.success(toastData) }
        { actionFlag == 'success' && toast.success(toastData) }
        { actionFlag == 'de-escalated' && toast.warn(toastData) }
        { actionFlag == 'notice' && toast.warn(toastData) }
        { actionFlag == 'error' && toast.error(toastData) }
    };

    return (
        <>
            <div className='p-8 px-40 '>

                {/* <h1 className='px-2 font-semibold text-center text-gray-600 font-serif py-2 xl md:text-3xl mt-2'>UPLOAD DOCUMENT</h1> */}

                <TopTabs title="Upload-Documents" type="application" id={id} safNo={''} active="document" />

            </div>


            <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-2 container mx-auto bg-white shadow-lg p-6'>
                <div className='col-span-4  p-2'>
                    <h1 className='font-semibold uppercase font-mono text-gray-500 text-xl text-center mt-1'>Applicant Detail</h1>
                    <div className=' rounded leading-5 shadow-lg md:p-8 lg:p-8'>
                        <div className='grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 p-1 mt-4'>
                            <div className='col-span-2 text-gray-500 text-sm'>Saf No. -</div>
                            <div className='col-span-3 font-bold text-gray-800 text-lg -mt-1'>{docList?.safDtl?.saf_no}</div>
                        </div>
                        <div className='grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 p-1 '>
                            <div className='col-span-2  text-gray-500 text-sm'>Assessment Type -</div>
                            <div className='col-span-3 font-bold text-gray-800 text-lg -mt-1'>
                                {docList?.safDtl?.assessment_type == 1 || docList?.safDtl?.assessment_type == 'New Assessment' && 'NEW ASSESSMENT'}
                                {docList?.safDtl?.assessment_type == 2 || docList?.safDtl?.assessment_type == 'Re Assessment' && 'RE ASSESSMENT'}
                                {docList?.safDtl?.assessment_type == 3 || docList?.safDtl?.assessment_type == 'Mutation' && 'MUTATION'}
                            </div>
                        </div>
                        <div className='grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 p-1'>
                            <div className='col-span-2  text-gray-500 text-sm'>Apply Date -</div>
                            <div className='col-span-3 font-bold text-gray-800 text-lg -mt-1'>{docList?.safDtl?.application_date}</div>
                        </div>
                        <div className='grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 p-1'>
                            <div className='col-span-2  text-gray-500 text-sm'>Property Type -</div>
                            <div className='col-span-3 font-bold text-gray-800 text-lg -mt-1'>{docList?.safDtl?.property_type}</div>
                        </div>
                        <div className='grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 p-1'>
                            <div className='col-span-2  text-gray-500 text-sm'>Ownership Type -</div>
                            <div className='col-span-3 font-bold text-gray-800 text-lg -mt-1'>{docList?.safDtl?.ownership_type
                            }</div>
                        </div>
                    </div>

                </div>
                <div className='col-span-8'>
                    <div className='p-2'>
                        <h1 className='font-semibold uppercase font-mono text-gray-500 text-xl'>Owner documents : </h1>
                        <table className="min-w-full rounded leading-5 shadow-md w-full">
                            <thead className='bg-sky-200'>
                                <tr className='font-semibold'>
                                    {/* <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        #
                                    </th> */}
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        Document Name
                                    </th>

                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        Owner Name
                                    </th>
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        View
                                    </th>
                                    {/* <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            Status
                                        </th> */}
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        Remarks
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <NonBlockingLoader show={show} />

                                {
                                    docList?.ownersDocList?.map((data) => (
                                        <>
                                            {/* <TradeDocumentRow openModal={modalAction} docList={data} index={index} key={index}/>
                                                         */}
                                            {data?.map((data, index) => (
                                                <tr>

                                                    {/* <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {index + 1}
                                                        </p>
                                                    </td> */}
                                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {data?.docName}  <span className='text-red-500'>{data?.isMadatory == 0 ? "" : "*"}</span>
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {data?.ownerName}  <span className='text-red-500'></span>
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm" onClick={() => modalAction(data?.uploadDoc?.doc_path)}>
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0">

                                                                {data?.uploadDoc?.doc_path == '' || data?.uploadDoc?.doc_path == null || data?.uploadDoc?.doc_path == undefined ? <img src='https://cdn-icons-png.flaticon.com/512/4076/4076549.png' className='h-10' /> :

                                                                    <a href="#" className="block relative">
                                                                        {data?.uploadDoc?.doc_path?.split('.').pop() == "pdf" &&
                                                                            <img alt="profil" src="http://192.168.0.16:822/RMCDMC/public/assets/img/pdf_logo.png" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                                        }
                                                                        {data?.uploadDoc?.doc_path?.split('.').pop() == "jpg" &&
                                                                            <img alt="profil" src="https://cdn-icons-png.flaticon.com/512/9034/9034378.png" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                                        }
                                                                        {data?.uploadDoc?.doc_path?.split('.').pop() == "png" &&
                                                                            <img alt="profil" src="https://cdn-icons-png.flaticon.com/512/2266/2266832.png" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                                        }
                                                                    </a>
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                        <span className="relative inline-block px-3 py-1 font-semibold text-sky-900 leading-tight">
                                                            <span aria-hidden="true" className="absolute inset-0 bg-slate-50 opacity-50 rounded-full">
                                                            </span>
                                                            {data?.uploadDoc == '' ?
                                                                <span className="relative">
                                                                    <button className='bg-sky-200 py-1.5 px-2' onClick={() => handleModel2(data?.docName, data?.docVal, data?.ownerId)}>Upload Fresh Document</button>
                                                                </span> : <>
                                                                    <p className='font-mono text-emerald-500 opacity-50'> Document Uploaded Successfully... </p>
                                                                    <span className="relative">
                                                                        <button className='bg-slate-200 py-1.5 px-2' onClick={() => handleModel2(data?.docName, data?.docVal, data?.ownerId)}>Re - Upload Document ?</button>
                                                                    </span>
                                                                </>
                                                            }
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>

                                    ))


                                }

                            </tbody>
                        </table>
                    </div>
                    <div className='p-2 mt-4'>
                        <h1 className='font-semibold uppercase font-mono text-gray-500 text-xl '>Other documents : </h1>
                        <table className="min-w-full rounded leading-5 border ">
                            <thead className='bg-sky-200'>
                                <tr className='font-semibold mx-auto'>
                                    {/* <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        #
                                    </th> */}
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        Document Name
                                    </th>
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        View
                                    </th>
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        Remarks
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <TradeNonBlockingLoader show={show} />

                                {
                                    docList?.documentsList?.map((data, index) => (
                                        <>
                                            {/* <TradeDocumentRow openModal={modalAction} docList={data} index={index} key={index}/> */}
                                            <tr>

                                                {/* <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {index + 1}
                                                    </p>
                                                </td> */}
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {data?.docName}  <span className='text-red-500'>{data?.isMadatory == 0 ? "" : "*"}</span>
                                                    </p>
                                                </td>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm" onClick={() => modalAction(data?.uploadDoc?.doc_path)}>
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            {data?.uploadDoc?.doc_path == '' || data?.uploadDoc?.doc_path == null || data?.uploadDoc?.doc_path == undefined ? <img src='https://cdn-icons-png.flaticon.com/512/4076/4076549.png' className='h-10' /> :

                                                                <a href="#" className="block relative">
                                                                    {data?.uploadDoc?.doc_path?.split('.').pop() == "pdf" &&
                                                                        <img alt="profil" src="http://192.168.0.16:822/RMCDMC/public/assets/img/pdf_logo.png" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                                    }
                                                                    {data?.uploadDoc?.doc_path?.split('.').pop() == "jpg" &&
                                                                        <img alt="profil" src="https://cdn-icons-png.flaticon.com/512/9034/9034378.png" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                                    }
                                                                    {data?.uploadDoc?.doc_path?.split('.').pop() == "png" &&
                                                                        <img alt="profil" src="https://cdn-icons-png.flaticon.com/512/2266/2266832.png" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                                    }
                                                                </a>
                                                            }

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <span className="relative inline-block px-3 py-1 font-semibold text-sky-900 leading-tight">
                                                        <span aria-hidden="true" className="absolute inset-0 bg-slate-50 opacity-50 rounded-full">
                                                        </span>
                                                        {data?.uploadDoc == '' ?
                                                            <span className="relative">
                                                                <button className='bg-sky-200 py-1.5 px-2' onClick={() => handleModel2(data?.docName, data?.docVal)}>Upload Fresh Document</button>
                                                            </span> : <>
                                                                <p className='font-mono text-emerald-500 opacity-50'> Document Uploaded Successfully... </p>
                                                                <span className="relative">
                                                                    <button className='bg-slate-200 py-1.5 px-2' onClick={() => handleModel2(data?.docName, data?.docVal)}>Re - Upload Document ?</button>
                                                                </span>
                                                            </>
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <div class=" rounded-lg shadow-xl border-2 border-gray-50 mx-auto px-0" style={{ 'width': '70vw', 'height': '80vh' }}>
                        <iframe className='w-full h-full mx-auto' src={DocUrl} frameborder="0">
                            <object data={DocUrl} type="application/pdf">
                                <div>No online PDF viewer installed</div>
                            </object>
                        </iframe>

                    </div>

                </Modal>
                <Modal
                    isOpen={modalIsOpen2}
                    onAfterOpen={afterOpenModal2}
                    onRequestClose={closeModal2}
                    style={customStyles}
                    contentLabel="Example Modal2"
                >

                    <div class=" rounded-lg shadow-xl border-2 bg-slate-50  px-0" style={{ 'width': '50vw', 'height': '20vh' }}>
                        <form encType="multipart/form" onSubmit={handleUpload} >
                            <div className='text-center grid grid-cols-1 md:grid-cols-4 gap-1 p-1 font-mono text-xs md:text-[10px'>
                                <label htmlFor="" className=' col-span-1 font-bold text-center'>{docName} : </label>
                                <select name={`${docName}`} id="owner_doc" className='px-4 py-1.5 border rounded bg-white' onChange={(e) => setFileName(e.target.value)}>
                                    <option value="">SELECT</option>
                                    {docVals?.map((item, index) => (
                                        <option value={item?.id} key={index}>{item?.doc_name}</option>
                                    ))}

                                </select>
                                <input type="file" name='file' id='file' className='px-3 py-1.5 border rounded bg-white' onChange={(e) => setMyFile(e.target.files[0])} />
                            </div>
                            <button type='submit' className='px-3 py-1.5 float-right m-4 bg-fuchsia-500 text-slate-100 rounded-sm uppercase text-xs'>Upload document</button>
                            <samll className='text-amber-600 text-xs mt-4 text-center capitalize hidden md:block'>You can upload any one of the document listed in the select box</samll>
                        </form>

                    </div>

                </Modal>
            </div>
        </>
    )
}

export default SafDocumentUpload
/**
 * Exported to :
 * 1. PropertySafDetailsTabs Component
 * 
 */