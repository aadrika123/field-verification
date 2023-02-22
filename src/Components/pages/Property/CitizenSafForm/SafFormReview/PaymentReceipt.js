
import { useState, useContext, useEffect, useRef } from 'react'
import { AiFillPrinter } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'
import moment from 'moment'
import './print.css'
import secureLocalStorage from "react-secure-storage";
import { BsCircleFill } from 'react-icons/bs'
import { QRCodeCanvas } from "qrcode.react";
import { numberToWords } from 'amount-to-words'
import { contextVar } from '../../../../Components/ContextVar';
import border_both2 from './border_both2.svg'
import adlogo from './adlogo.png'


function PaymentReceipt() {
    const navigate = useNavigate()
    const [recieptData, setRecieptData] = useState()
    const [loaderSpinner, setLoaderSpinner] = useState(false)
    const [printCount, setprintCount] = useState(0)
    // const [loginUserData, setLoginUserData] = useState()

    const qrRef = useRef();

    const text = 'Transaction No.: , Consumer Name: , Consumer No.: '

    const qrcode = (
        <QRCodeCanvas
            id="qrCode"
            value={text}
            size={130}
            bgColor={"#fff"}
            level={"H"}
        />
    );


    const { globalDataContainer, setGlobalDataContainer, setprintButtonState, extraReceiptData, receiptAddress, receiptWard, flatCount, setUlbName } = useContext(contextVar)

    

    useEffect(() => {
        setLoaderSpinner(true)
        getReceiptData()
        // getUserData()
    }, [])



    useEffect(() => {
        if (printCount < 2) {
            document.getElementById('printClick').click()
            // setprintButtonState(true)
            navigate('/payment-receipt')  //to activate bluetooth print button of android since it's working if navigate
            setprintCount(prev => prev + 1)
        }

    }, [printCount])


    
    
    console.log(globalDataContainer?.paymentReceiptCachedData)

    const getReceiptData = () => {
        let ulbName = JSON.parse(secureLocalStorage.getItem('ulbName'))
        
        if (globalDataContainer?.paymentReceiptCachedData) {

            setRecieptData(globalDataContainer?.paymentReceiptCachedData)
            //running print button for bluprint
            let dummyText
            if (globalDataContainer?.propertyType == 'individual') {
                if (extraReceiptData?.paymentMode == "Cash") {
                    dummyText = "<nc>" + ulbName + "</nc><br />" +
                        "<nc>Holding Tax</nc><br />" +
                        "<nc>(JUIDCO Private Limited)</nc><br />" +
                        "<nc>+91-6513131001</nc><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<nc>Payment Receipt</nc><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>Date           : " + moment(globalDataContainer?.paymentReceiptCachedData.transactionDate, 'YYYY-MM-DD').format('DD-MMM-yy') + "  </n><br />" +
                        "<n>Time           : " + globalDataContainer?.paymentReceiptCachedData.transactionTime + "  </n><br />" +
                        "<n>Ward No.       : " + receiptWard + "  </n><br />" +
                        "<n>Transaction No.: " + globalDataContainer?.paymentReceiptCachedData.transactionNo + "  </n><br />" +
                        "<n>Holding No.    : " + globalDataContainer?.paymentReceiptCachedData.holdingNo + "  </n><br />" +
                        "<n>Citizen Name    : " + globalDataContainer?.paymentReceiptCachedData.consumerName + "  </n><br />" +
                        "<n>Consumer No.    : " + globalDataContainer?.paymentReceiptCachedData.consumerNo + "  </n><br />" +
                        "<n>Address  : " + globalDataContainer?.paymentReceiptCachedData?.address + "  </n><br />" +
                        "<n>Monthly Charge   : " + globalDataContainer?.paymentReceiptCachedData.monthlyRate + "  </n><br />" +
                        "<n>Paid  From    : " + moment(globalDataContainer?.paymentFrom, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
                        "<n>Paid  Upto    : " + moment(globalDataContainer?.paymentReceiptCachedData?.paidUpto, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>Amount Paid   : " + globalDataContainer.paymentReceiptCachedData.receivedAmount + "  </n><br />" +
                        "<n>Payment Mode  : " + extraReceiptData?.paymentMode + "  </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        // "<n>TC Name        : " + "" + "   </n><br />" +
                        // "<n>Mobile No.     : " + "" + "   </n><br />" +
                        "<n>TC Name        : " + globalDataContainer?.paymentReceiptCachedData?.tcName + "   </n><br />" +
                        "<n>Mobile No.     : " + globalDataContainer?.paymentReceiptCachedData?.tcMobile + "   </n><br />" +
                        "<n></n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>Please keep this Bill For Future Reference</n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<nc>Thanking you</nc><br />" +
                        "<n></n><br />" +
                        "<n></n><br />" +
                        "<n></n><br />" +
                        "<n></n><br />`"
                } else {
                    dummyText = "<nc>" + ulbName + "</nc><br />" +
                        "<nc>Holding Tax</nc><br />" +
                        "<nc>(JUIDCO Private Limited)</nc><br />" +
                        "<nc>+91-6513131001</nc><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<nc>Payment Receipt</nc><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>Date           : " + moment(globalDataContainer?.paymentReceiptCachedData.transactionDate, 'YYYY-MM-DD').format('DD-MMM-yy') + "  </n><br />" +
                        "<n>Time           : " + globalDataContainer?.paymentReceiptCachedData.transactionTime + "  </n><br />" +
                        "<n>Ward No.       : " + receiptWard + "  </n><br />" +
                        "<n>Transaction No.: " + globalDataContainer?.paymentReceiptCachedData.transactionNo + "  </n><br />" +
                        "<n>Holding No.    : " + globalDataContainer?.paymentReceiptCachedData.holdingNo + "  </n><br />" +
                        "<n>Citizen Name    : " + globalDataContainer?.paymentReceiptCachedData.consumerName + "  </n><br />" +
                        "<n>Consumer No.    : " + globalDataContainer?.paymentReceiptCachedData.consumerNo + "  </n><br />" +
                        "<n>Address  : " + globalDataContainer?.paymentReceiptCachedData?.address + "  </n><br />" +

                        "<n>Monthly Charge   : " + globalDataContainer?.paymentReceiptCachedData.monthlyRate + "  </n><br />" +
                        "<n>Paid  From    : " + moment(globalDataContainer?.paymentFrom, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
                        "<n>Paid  Upto    : " + moment(globalDataContainer?.paymentReceiptCachedData?.paidUpto, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +

                        "<n>Amount Paid   : " + globalDataContainer?.paymentReceiptCachedData.receivedAmount + "  </n><br />" +
                        "<n>Payment Mode  : " + extraReceiptData?.paymentMode + "  </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>Bank Name  : " + globalDataContainer?.bankName + "  </n><br />" +
                        "<n>Cheuqe No. : " + globalDataContainer?.chequeNo + "  </n><br />" +

                        "<n>TC Name        : " + globalDataContainer?.paymentReceiptCachedData?.tcName + "   </n><br />" +
                        "<n>Mobile No.     : " + globalDataContainer?.paymentReceiptCachedData?.tcMobile + "   </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>" + "Payment is subject to realisation of cheque" + "  </n><br />" +
                        "<n>Please keep this Bill For Future Reference</n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<nc>Thanking you</nc><br />" +
                        "<n></n><br />" +
                        "<n></n><br />" +
                        "<n></n><br />" +
                        "<n></n><br />`"
                }
            } else {
                if (extraReceiptData?.paymentMode == "Cash") {
                    dummyText = "<nc>" + ulbName + "</nc><br />" +
                        "<nc>Holding Tax</nc><br />" +
                        "<nc>(JUIDCO Private Limited)</nc><br />" +
                        "<nc>+91-6513131001</nc><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<nc>Payment Receipt</nc><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>Date           : " + moment(globalDataContainer?.paymentReceiptCachedData.transactionDate, 'YYYY-MM-DD').format('DD-MMM-yy') + "  </n><br />" +
                        "<n>Time           : " + globalDataContainer?.paymentReceiptCachedData.transactionTime + "  </n><br />" +
                        "<n>Ward No.       : " + receiptWard + "  </n><br />" +
                        "<n>Transaction No.: " + globalDataContainer?.paymentReceiptCachedData.transactionNo + "  </n><br />" +
                        "<n>Apartment Name    : " + globalDataContainer?.paymentReceiptCachedData.apartmentName + "  </n><br />" +
                        "<n>Address  : " + receiptAddress + "  </n><br />" +
                        "<n>No of flats  : " + flatCount + "  </n><br />" +

                        "<n>Monthly Charge   : " + globalDataContainer?.paymentReceiptCachedData.monthlyRate + "  </n><br />" +
                        "<n>Paid  From    : " + moment(globalDataContainer?.paymentFrom, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
                        "<n>Paid  Upto    : " + moment(globalDataContainer?.paymentReceiptCachedData?.paidUpto, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>Amount Paid   : " + globalDataContainer?.paymentReceiptCachedData.receivedAmount + "  </n><br />" +
                        "<n>Payment Mode  : " + extraReceiptData?.paymentMode + "  </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +


                        "<n>TC Name        : " + globalDataContainer?.paymentReceiptCachedData?.tcName + "   </n><br />" +
                        "<n>Mobile No.     : " + globalDataContainer?.paymentReceiptCachedData?.tcMobile + "   </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>Please keep this Bill For Future Reference</n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<nc>Thanking you</nc><br />" +
                        "<n></n><br />" +
                        "<n></n><br />" +
                        "<n></n><br />" +
                        "<n></n><br />`"
                } else {
                    dummyText = "<nc>" + ulbName + "</nc><br />" +
                        "<nc>Holding Tax</nc><br />" +
                        "<nc>(JUIDCO Private Limited)</nc><br />" +
                        "<nc>+91-6513131001</nc><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<nc>Payment Receipt</nc><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>Date           : " + moment(globalDataContainer?.paymentReceiptCachedData.transactionDate, 'YYYY-MM-DD').format('DD-MMM-yy') + "  </n><br />" +
                        "<n>Time           : " + globalDataContainer?.paymentReceiptCachedData.transactionTime + "  </n><br />" +
                        "<n>Ward No.       : " + receiptWard + "  </n><br />" +
                        "<n>Transaction No.: " + globalDataContainer?.paymentReceiptCachedData.transactionNo + "  </n><br />" +
                        "<n>Apartment Name    : " + globalDataContainer?.paymentReceiptCachedData.apartmentName + "  </n><br />" +
                        "<n>Address  : " + receiptAddress + "  </n><br />" +
                        "<n>No of flats  : " + flatCount + "  </n><br />" +

                        "<n>Monthly Charge   : " + globalDataContainer?.paymentReceiptCachedData.monthlyRate + "  </n><br />" +
                        "<n>Paid  From    : " + moment(globalDataContainer?.paymentFrom, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
                        "<n>Paid  Upto    : " + moment(globalDataContainer?.paymentReceiptCachedData?.paidUpto, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +

                        "<n>Amount Paid   : " + globalDataContainer?.paymentReceiptCachedData.receivedAmount + "  </n><br />" +
                        "<n>Payment Mode  : " + extraReceiptData?.paymentMode + "  </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>Bank Name  : " + globalDataContainer?.bankName + "  </n><br />" +
                        "<n>Cheuqe No. : " + globalDataContainer?.chequeNo + "  </n><br />" +

                        "<n>TC Name        : " + globalDataContainer?.paymentReceiptCachedData?.tcName + "   </n><br />" +
                        "<n>Mobile No.     : " + globalDataContainer?.paymentReceiptCachedData?.tcMobile + "   </n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<n>" + "Payment is subject to realisation of cheque" + "  </n><br />" +
                        "<n>Please keep this Bill For Future Reference</n><br />" +
                        "<nc>-----------------------------------------</nc><br />" +
                        "<nc>Thanking you</nc><br />" +
                        "<n></n><br />" +
                        "<n></n><br />" +
                        "<n></n><br />" +
                        "<n></n><br />`"
                }

            }


            console.log(dummyText)
            
            document.getElementById('printClick').value = dummyText
            document.getElementById('printClick').click()
            // return
        }

        setLoaderSpinner(false)

    }
    return (
        <>
             <div className='text-center font-bold text-2xl flex-1'>
                {loaderSpinner &&
                    <div className='col-span-12 flex justify-center items-center'><ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                    </div>}
            </div>

            {/* <img className='absolute left-0 top-8 w-full' id='border_text' src={border_both2} alt="" /> */}
            <img className='absolute left-[550px] top-[300px]  w-[500px] z-40 opacity-10' id='receiptlogocenter' src={`http://203.129.217.243:3000/${recieptData?.logo}`} alt="" />
            <div id='contents' className='flex flex-wrap flex-col w-full px-4 z-50'>
                <img className='absolute top-24 left-80 w-20' id='receiptlogoreprint' src={`http://203.129.217.243:3000/${recieptData?.logo}`} alt="" />
                {/* <img className='absolute top-28 right-80 w-28' id='nspl_logo' src={nspl_logo} alt="" /> */}

                <div className='font-sembiold text-center text-2xl font-serif -mt-8'>Ranchi Municiapl Corporation</div>
                <div className='text-center text-xl mt-0 mb-1'>Payment Receipt</div>
                <div className='font-sembiold text-center text-lg '><span className='border border-black px-2 py-1'>Holding Tax</span></div>
                {/* Description */}
                <div className=' grid grid-cols-12 text-xs mt-[1.5rem] gap-x-2'>

                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Department/Section</div>
                        <div className='font-bold col-span-8'>: Revenue Section</div>
                    </div>
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Transaction No.</div>
                        <div className='font-bold col-span-8'>: {recieptData?.transactionNo}</div>
                    </div>
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Account Description</div>
                        <div className='font-bold col-span-8'>: Holding Tax & Others</div>
                    </div>
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Date & Time</div>
                        <div className='font-bold col-span-8'>: {moment(recieptData?.transactionDate, 'YYYY-MM-DD').format('DD-MMM-yy')} ({globalDataContainer?.paymentReceiptCachedData?.transactionTime})</div>
                    </div>
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Ward Area</div>
                        <div className='font-bold col-span-8'>: </div>
                    </div>
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Consumer No</div>
                        <div className='font-bold col-span-8'>: {recieptData?.consumerNo}</div>
                    </div>
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Ward No.</div>
                        <div className='font-bold col-span-8'>: {receiptWard}</div>
                    </div>
                    {recieptData?.apartmentName != null && <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Name</div>
                        <div className='font-bold col-span-8'>: {recieptData?.apartmentName}</div>
                    </div>
                    }
                    {recieptData?.apartmentName == null &&
                        <div className="grid grid-cols-12 col-span-6">
                            <div className='col-span-4'>Name</div>
                            <div className='font-bold col-span-8'>: {recieptData?.consumerName}</div>
                        </div>
                    }
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Mobile No.</div>
                        <div className='font-bold col-span-8'>: {recieptData?.mobileNo}</div>
                    </div>
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Address</div>
                        <div className='font-bold col-span-8'>: {recieptData?.address}</div>
                    </div>
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Holding No.</div>
                        <div className='font-bold col-span-8'>: 0450002268000A1</div>
                    </div>
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Category</div>
                        <div className='font-bold col-span-8'>: {recieptData?.consumerType}</div>
                    </div>
                    <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>Municipal License</div>
                        <div className='font-bold col-span-8'>: {recieptData?.licenseNo==''?'No':'Yes'}</div>
                    </div>
                   {recieptData?.licenseNo !='' && <div className="grid grid-cols-12 col-span-6">
                        <div className='col-span-4'>License No.</div>
                        <div className='font-bold col-span-8'>: {recieptData?.licenseNo}</div>
                    </div>}


                </div>

                {/* Table */}
                <table className='w-full mt-6 text-xs'>

                    <tr>
                        <th className='border-2 border-zinc-300 py-1.3 w-[5%]'>SI No.</th>
                        <th className='w-[20%] border-2 border-zinc-300 py-1.5 px-4'>Description</th>
                        <th className='w-[15%] border-2 border-zinc-300 py-1.5 px-4'>HSN/SAC Code</th>
                        <th className='w-[30%] border-2 border-zinc-300 py-1.5 px-4'>Bill Month</th>
                        <th className='w-[15%] border-2 border-zinc-300 py-1.5 px-4'>Rate Per Month(Rs)</th>
                        <th className='w-[15%] border-2 border-zinc-300 py-1.5 px-4'>Amount(Rs)</th>
                    </tr>

                    <tr>
                        <td className='text-center border-2 border-zinc-300 py-1.5 px-4'>1.</td>
                        <td className='text-center border-2 border-zinc-300 py-1.5 px-4'>Holding Tax</td>
                        <td className='text-center border-2 border-zinc-300 py-1.5 px-4'></td>
                        <td className='text-center border-2 border-zinc-300 py-1.5 px-4'> <span className="font-bold">{moment(globalDataContainer?.paymentFrom, 'YYYY-MM-DD').format('MMM-yy')}</span> To <span className="font-bold">{moment(recieptData?.paidUpto, 'YYYY-MM-DD').format('MMM-yy')}</span> </td>
                        <td className='text-end border-2 border-zinc-300 py-1.5 px-4'>{recieptData?.monthlyRate}</td>
                        <td className='font-bold text-center border-2 border-zinc-300 py-1.5 px-4'>{recieptData?.receivedAmount}</td>
                    </tr>

                    <tr>
                        <td className="text-end font-bold border-2 border-zinc-300 py-1.5 px-4" colSpan={5}>Total Payable Amount</td>
                        <td className="text-center font-bold border-2 border-zinc-300 py-1.5 px-4">{recieptData?.receivedAmount}</td>
                    </tr>

                    <tr>
                        <td className="text-end font-bold border-2 border-zinc-300 py-1.5 px-4" colSpan={5}>Amount Recieved</td>
                        <td className="text-center font-bold border-2 border-zinc-300 py-1.5 px-4">{recieptData?.receivedAmount}</td>
                    </tr>

                    <tfoot className='w-full'>
                        <tr>
                            <td colSpan={6}>Amount in Words : Rs <span className="font-bold">{numberToWords(recieptData?.receivedAmount)} Only.</span></td>
                        </tr>
                        <tr>
                            <td colSpan={6}>
                                Payment Mode : <span className="font-bold">{extraReceiptData?.paymentMode}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6}>
                                Net Banking/Online Payment/Cheque/Draft/Bankers Cheque are Subject to realisation.
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6}>
                                {/* *SWM user charge is not a part of holding tax. */}
                            </td>
                        </tr>

                    </tfoot>

                </table>

                {/* Note */}
                <div className="grid grid-cols-12 gap-x-1 grid-rows-3 -mt-3">

                    {/* left */}
                    <div className='col-span-9'>
                        <ul className='mt-6 text-xs' typeof='disc'>

                            <span className="font-bold">Note:-</span>

                            <li className='flex items-center'> <span className="w-[1rem] text-[0.5rem]"><BsCircleFill className='mr-2' /></span> This is a Computer generated Receipt and does not require physical signature.</li>
                            <li className='flex flex-row'> <span className="w-[1rem] text-[0.5rem]"><BsCircleFill className='mr-2' /></span> <span>You will receive SMS in your registered mobile no. for amount paid. If SMS is not received verify your paid amount by calling &nbsp;<span className="font-bold"> 6513131001</span> &nbsp; or visit</span></li>
                            {/* <li className='flex items-center'> <span className="w-[1rem] text-[0.5rem]"><BsCircleFill className='mr-2' /></span> GST No. :&nbsp; <span className="font-bold">{recieptData?.gstNo}</span></li>
                            <li className='flex items-center'> <span className="w-[1rem] text-[0.5rem]"><BsCircleFill className='mr-2' /></span> PAN No. :&nbsp; <span className="font-bold">{recieptData?.panNo}</span></li> */}
                            <li className='flex items-center'> <span className="w-[1rem] text-[0.5rem]"><BsCircleFill className='mr-2' /></span> Print Date : {moment(new Date(), 'YYYY-MM-DD').format('DD-MMM-yy')}</li>
                        </ul>
                    </div>


                    {/* QrCode */}
                    <div className='col-span-3 flex items-center'>
                        <div ref={qrRef}>{qrcode}</div>
                    </div>

                    {/* right */}
                    <div className='col-span-9 text-xs mt-2 flex flex-col items-start space-y-4'>
                        <div className='text-xs'>
                            Thanking You <br />
                            {recieptData?.ulbName}
                        </div>

                        <div className='text-xs'>
                            In Collaboration With <br />
                            ......................
                            <br/>& ...............
                        </div>
                        <div className='text-xs'>
                            {/* <img className='absolute bottom-28 right-96 w-28' id='nspl_below_logo' src={nspl_logo} alt="" /> */}
                            {/* <img className='absolute bottom-28 right-10 w-16' id='ad_logo' src={ adlogo} alt="" /> */}
                        </div>

                    </div>

                    <div className='col-span-3 text-xs flex items-center'>
                        Signature of Tax Collector
                    </div>

                </div>

                {/* User Charge */}
                <div className=''>

                    {/* Heading */}
                    <div className='font-bold underline text-center text-sm -mt-[4rem] mb-3'>
                        Payment Reciept Receiving Copy
                    </div>


                    <p className='text-sm flex flex-col space-y-1.5'>
                        <div className='text-xs'>
                            Received payment through transaction No. <span className="font-bold">{recieptData?.transactionNo}</span> at <span className="font-bold">{moment(recieptData?.transactionDate, 'YYYY-MM-DD').format('DD-MMM-yy')}</span> of <span className="font-bold">{recieptData?.paidAmount}</span> against Demand for Waste User Charge {recieptData?.apartmentName == null && <span>of Consumer no. <span className="font-bold">{recieptData?.consumerNo}</span> </span>} in Ward No. <span className="font-bold">{recieptData?.ReceiptWard}</span>.
                        </div>


                        <div className='text-xs'>Customer Remarks : </div>


                        <div className='mb-2 text-xs'>
                            Customer Mobile No :
                        </div>



                        <div className='flex justify-between'>

                            <div>
                                <span className="text-[10px] flex flex-col">
                                    <span className='' style={{'lineHeight':'13px'}}>Issued on behalf of <br/>Ranchi Municiapl Corporation <br/>...........</span>
                                </span>
                            </div>

                            <div>
                                Signature of Customer
                            </div>

                        </div>
                    </p>

                </div>

            </div>


            <div className="flex w-[80vw] justify-between mb-10 mt-4 absolute bottom-12">
                <div className='md:px-0 flex-1 '>
                    <button onClick={() => navigate('/consumer-payment')} type="button" className="pl-4 pr-6 py-1 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-amber-100 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out">back</button>
                </div>
                <div className='md:px-4 text-center'>
                    {/* <button type="button" className="w-full px-6 py-1 bg-gray-200 text-gray-800 font-medium text-xs leading-tight uppercase rounded  hover:bg-amber-100 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out"><MdViewInAr className='inline text-lg' /> Upload Doc</button> */}
                </div>
                <div className='md:px-10 text-right flex-1'>
                    <button onClick={() => window.print()} type="button" className="pl-4 pr-6 py-1 bg-sky-400 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-amber-100 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out"><AiFillPrinter className='inline text-lg' /> Print</button>


                </div>



            </div>
            {/* <div className='h-40 w-full' id='spacer'></div> */}

            {/* </div > */}
            {/* </div> */}
        </>
    )
}

export default PaymentReceipt