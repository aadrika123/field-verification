//////////////////{*****}//////////////////////////////////////////
// Author - swati sharma
// Version - 1.0
// Date - 7 oct 2022
// Revision - 1
// Project - JUIDCO
// Component  - SafFormDemand
// DESCRIPTION - SafFormDemand Component
//////////////////{*****}//////////////////////////////////////////

import { useState } from "react";
import rupee from "../../../../assets/images/rupee.png";
import brief from "../../../../assets/images/brief.png";
import pay2 from "../../../../assets/images/pay2.png";
import { useNavigate } from "react-router-dom";
import CitizenTaxCard from "./CitizenTaxCard";
import { MdContentCopy } from "react-icons/md";
import { MdViewInAr } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import RazorpayPaymentScreen from "../../../Common/Payment/RazorpayPaymentScreen";
import CitizenApplyApiList from "../../../../api/CitizenApplyApiList";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import moment from "moment";
import CommonLoader from "../../../Common/CommonLoader";

function SafFormDemand(props) {
  const { propertyGenerateOrderId } = CitizenApplyApiList();
  const [loaderStatus, setloaderStatus] = useState(false);

  const [loader, setLoader] = useState(false); // Used when click on Pay Now

  const [taxDescriptionState, setTaxDescriptionState] = useState(false);
  const navigate = useNavigate();
  console.log(
    "saf submit response data at safformdemand...",
    props?.safSubmitResponse
  );
  const toggleTaxDescription = () => {
    setTaxDescriptionState(!taxDescriptionState);
  };

  ////// PAYMENT METHOD  ////
  const dreturn = (data) => {
    // In (DATA) this function returns the Paymen Status, Message and Other Response data form Razorpay Server
    console.log("Payment Status =>", data);
    if (data?.status) {
      toast.success("Payment Success....", data);
      // return
      navigate(`/paymentReceipt/${data?.data?.razorpay_payment_id}/saf`);
    } else {
      toast.error("Payment failed....");
      navigate("/propertyDashboard");
    }
  };

  const getOrderId = async () => {
    // This Function is used to Order Id Generation
    console.log("loader clicked...");
    const orderIdPayload = {
      id: props?.safSubmitResponse?.data?.safId,
      amount: props?.safSubmitResponse?.data?.demand?.amounts?.payableAmount,
      departmentId: 1,
      workflowId: 4,
      uldId: 2,
    };

    // setLoader(true)

    let token = window.localStorage.getItem("token");
    console.log("token at basic details is post method...", token);
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    console.log("before order id creation....", orderIdPayload);
    axios
      .post(propertyGenerateOrderId, orderIdPayload, header) // This API will generate Order ID
      .then((res) => {
        console.log("Order Id Response ", res.data);
        if (res.data.status === true) {
          console.log("OrderId Generated True", res.data);
          setloaderStatus(false);

          RazorpayPaymentScreen(res.data.data, dreturn); //Send Response Data as Object (amount, orderId, ulbId, departmentId, applicationId, workflowId, userId, name, email, contact) will call razorpay payment function to show payment popup
          setTimeout(() => {
            props.showLoader(false);
          }, 500);
        } else {
          setloaderStatus(false);

          props.showLoader(false);
        }
      })
      .catch((err) => {
        alert("Backend Server error. Unable to Generate Order Id");
        console.log("ERROR :-  Unable to Generate Order Id ", err);

        props.showLoader(false);
      });
  };

  console.log(
    "demand detail",
    props?.safSubmitResponse?.data?.demand?.amounts?.rebatePerc
  );

  return (
    <>
      {loaderStatus && <CommonLoader />}

      <div
        className={` block p-4 mt-4 w-full md:py-4 md:px-20 md:pt-0  md:w-full mx-auto  overflow-x-auto `}
      >
        <ToastContainer position="top-right" autoClose={2000} />

        {/* <h1 className='px-2 font-semibold mt-0 bg-green-400 text-center text-white font-serif py-2 text-lg shadow-lg border border-white'>Saf Demand</h1> */}
        <h1 className="px-2 font-semibold mt-0 bg-green-400 text-center text-white font-serif py-2 text-lg shadow-lg border border-white">
          <BsFillCheckCircleFill className="text-white inline text-3xl" /> Your
          form has been submitted successfully
        </h1>

        <div className="mt-4 px-20">
          {/* <div className="grid grid-cols-3 mt-8 bg-yellow-100 py-6"> */}
          <div className="grid grid-cols-3 mt-8">
            <div className="px-4 py-4 text-sm">
              {/* <div>SAF No. :<span onClick={(e) => copy(props?.safSubmitResponse?.data?.safNo)} className='text-sm text-black font-semibold font-mono ml-2 bg-amber-100 px-2 py-1 rounded-lg cursor-pointer hover:bg-amber-200'>{props?.safSubmitResponse?.data?.safNo} <span><MdContentCopy className='inline' /></span> </span></div> */}
              <div>
                SAF No. :
                <span className="text-sm text-black font-semibold font-mono ml-2 bg-amber-100 px-2 py-1 rounded-lg cursor-pointer hover:bg-amber-200">
                  {props?.safSubmitResponse?.data?.safNo}{" "}
                  <span>
                    <MdContentCopy className="inline" />
                  </span>{" "}
                </span>
              </div>
              <div>
                Apply date :
                <span className="text-sm text-black font-semibold font-mono ml-2">
                  {moment(
                    props?.safSubmitResponse?.data?.applyDate,
                    "YYYY-MM-DD"
                  ).format("DD-MMM-yy")}
                </span>
              </div>
              <div>
                Rebate (Rs)
                <span className="text-sm text-black font-semibold font-mono ml-2">
                  {
                    props?.safSubmitResponse?.data?.demand?.amounts
                      ?.rebateAmount
                  }
                </span>
              </div>
              <div>
                Late Assessment Penalty(Rs)
                <span className="text-sm text-black font-semibold font-mono ml-2">
                  {
                    props?.safSubmitResponse?.data?.demand?.amounts
                      ?.lateAssessmentPenalty
                  }
                </span>
              </div>

              <div>
                1% Penalty Rebate
                <span className="text-sm text-black font-semibold font-mono ml-2">
                  {
                    props?.safSubmitResponse?.data?.demand?.amounts
                      ?.totalOnePercPenalty
                  }
                </span>
              </div>
              {/* <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                <div className='bg-sky-100 w-2/3 text-center rounded-lg shadow-lg py-1'><span>Total Amount :</span> <span className='font-mono font-semibold'>{props?.safSubmitResponse?.data?.demand?.amounts?.payableAmount}</span></div>
              </div> */}
            </div>
            <div className="">
              <CitizenTaxCard
                time="Total Tax"
                tax={
                  props?.safSubmitResponse?.data?.demand?.amounts?.payableAmount
                }
              />
            </div>
            {/* <div className=''><CitizenTaxCard time="quaterly" tax="50" /></div> */}
          </div>

          {taxDescriptionState && (
            <>
              <div className="mt-10">
                <h1 className="px-1 font-semibold font-serif text-xs">
                  <img src={rupee} alt="pin" className="w-5 inline" /> Tax
                  Details
                </h1>
                <div className="flex font-mono text-xs py-2 px-1 text-gray-900">
                  <div className="flex-initial px-2 font-bold">
                    Total Payable Amount
                  </div>
                  <div className="flex-initial px-2">= </div>
                  <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                    {" "}
                    ( Tax Amount
                  </div>
                  <div className="flex-initial px-2">+</div>
                  <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                    Late Assessment Penalty
                  </div>
                  <div className="flex-initial px-2">+</div>
                  <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                    1% Penalty )
                  </div>
                  <div className="flex-initial px-2">-</div>
                  <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                    {" "}
                    ( Rebate
                  </div>
                  <div className="flex-initial px-2">+</div>
                  <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                    Special Rebate )
                  </div>
                </div>

                <table className="min-w-full leading-normal mt-2">
                  <thead className="font-bold text-left text-sm bg-green-50 text-gray-600">
                    <tr>
                      <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                        #
                      </th>
                      <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                        Tax Amount (Rs)
                      </th>
                      <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                        Late Assessment Penalty (Rs)
                      </th>
                      <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                        1% Penalty (Rs)
                      </th>
                      <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                        Rebate({" "}
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.rebatePerc
                        }
                        % in Rs)
                      </th>
                      <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                        Special Rebate({" "}
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.specialRebatePerc
                        }
                        % in Rs)
                      </th>
                      <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                        Payable Amount (Rs)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <>
                      <tr className="bg-white shadow-lg border-b border-gray-200">
                        <td className="px-2 py-2 text-sm text-left">1</td>
                        <td className="px-2 py-2 text-sm text-left">
                          {
                            props?.safSubmitResponse?.data?.demand?.amounts
                              ?.totalDemand
                          }
                        </td>
                        <td className="px-2 py-2 text-sm text-left">
                          {
                            props?.safSubmitResponse?.data?.demand?.amounts
                              ?.lateAssessmentPenalty
                          }
                        </td>
                        <td className="px-2 py-2 text-sm text-left">
                          {
                            props?.safSubmitResponse?.data?.demand?.amounts
                              ?.totalOnePercPenalty
                          }
                        </td>
                        <td className="px-2 py-2 text-sm text-left">
                          {
                            props?.safSubmitResponse?.data?.demand?.amounts
                              ?.rebateAmount
                          }
                        </td>
                        <td className="px-2 py-2 text-sm text-left">
                          {
                            props?.safSubmitResponse?.data?.demand?.amounts
                              ?.specialRebateAmount
                          }
                        </td>
                        <td className="px-2 py-2 text-sm text-left">
                          <span className="px-2 bg-green-600 shadow-lg rounded-lg text-white">
                            {
                              props?.safSubmitResponse?.data?.demand?.amounts
                                ?.payableAmount
                            }
                          </span>
                        </td>
                      </tr>
                    </>
                  </tbody>
                </table>
              </div>

              <div className="mt-10">
                {/* RULESET-1 */}
                {props?.safSubmitResponse?.data?.demand?.details?.RuleSet1 && (
                  <div>
                    <h1 className="px-1 font-semibold font-serif text-md mt-10">
                      <img src={brief} alt="pin" className="w-5 inline" /> Tax
                      Description of Annual Rental Value - As Per Old Rule
                      (Effect Upto 31-03-2016)
                    </h1>
                    <div className="flex font-mono text-xs py-2 px-1 text-gray-900">
                      <div className="flex-initial px-2 font-bold">
                        Annual Rental Value (ARV)
                      </div>
                      <div className="flex-initial px-2">=</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Builtup Area
                      </div>
                      <div className="flex-initial px-2">x</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Rental Rate
                      </div>
                    </div>
                    <table className="min-w-full leading-normal mt-2">
                      <thead className="font-bold text-left text-sm bg-green-50 text-gray-600">
                        <tr>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            #
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            ARV
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Quater
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Quarter / Year
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Holding Tax (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            1% penalty (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Water Tax (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Latrine/Conservancy Tax (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Education Cess (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Health Cess (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Quarterly Tax (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Due Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <>
                          {props?.safSubmitResponse?.data?.demand?.details?.RuleSet1?.map(
                            (items, index) => (
                              <tr className="bg-white shadow-lg border-b border-gray-200">
                                <td className="px-2 py-2 text-sm text-left">
                                  {index + 1}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.arv}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.qtr}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.quarterYear}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.holdingTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.onePercPenaltyTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.waterTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.latrineTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.educationTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.healthTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.totalTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.dueDate}
                                </td>
                              </tr>
                            )
                          )}
                        </>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* RULESET - 2 */}
                {props?.safSubmitResponse?.data?.demand?.details?.RuleSet2 && (
                  <div>
                    <h1 className="px-1 font-semibold font-serif text-md mt-10">
                      <img src={brief} alt="pin" className="w-5 inline" /> Tax
                      Description Annual Rental Value - As ARV Rule (Effect From
                      01-04-2016 to 31-03-2022)
                    </h1>
                    <div className="flex font-mono text-xs py-3 px-1 text-gray-900">
                      <div className="flex-initial px-2 font-bold">
                        Annual Rental Value (ARV)
                      </div>
                      <div className="flex-initial px-2">=</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Carpet Area
                      </div>
                      <div className="flex-initial px-2">x</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Usage Factor
                      </div>
                      <div className="flex-initial px-2">x</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Occupancy Factor
                      </div>
                      <div className="flex-initial px-2">x</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Tax Percentage
                      </div>
                      <div className="flex-initial px-2">x</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Rental Rate
                      </div>
                    </div>
                    <table className="min-w-full leading-normal mt-2">
                      <thead className="font-bold text-left text-sm bg-green-50 text-gray-600">
                        <tr>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            #
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            ARV
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Quater
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Quarter / Year
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Holding Tax (Rs){" "}
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            1% penalty (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Additional Tax(RWH Penalty) (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Quarterly Tax (Total) (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Due Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <>
                          {props?.safSubmitResponse?.data?.demand?.details?.RuleSet2?.map(
                            (items, index) => (
                              <tr className="bg-white shadow-lg border-b border-gray-200">
                                <td className="px-2 py-2 text-sm text-left">
                                  {index + 1}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.arv}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.qtr}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.quarterYear}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.holdingTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.onePercPenaltyTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.rwhPenalty}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.totalTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.dueDate}
                                </td>
                              </tr>
                            )
                          )}
                        </>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* RULESET-3 */}
                {props?.safSubmitResponse?.data?.demand?.details?.RuleSet3 && (
                  <div>
                    <h1 className="px-1 font-semibold font-serif text-md mt-10">
                      <img src={brief} alt="pin" className="w-5 inline" /> Tax
                      Description of Capital Value - As Per Current Rule (Effect
                      From 01-04-2022)
                    </h1>

                    <div className="flex font-mono text-xs py-3 px-1 text-gray-900">
                      <div className="flex-initial px-2 font-bold">
                        Property Tax
                      </div>
                      <div className="flex-initial px-2">=</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Capital Value Rate
                      </div>
                      <div className="flex-initial px-2">x</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Builtup Area
                      </div>
                      <div className="flex-initial px-2">x</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Occupancy Factor
                      </div>
                      <div className="flex-initial px-2">x</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Tax Percentage
                      </div>
                      <div className="flex-initial px-2">x</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Calculation Factor
                      </div>
                      <div className="flex-initial px-2">x</div>
                      <div className="flex-initial px-2 bg-gray-100 rounded-lg">
                        Matrix Factor Rate
                      </div>
                    </div>
                    <table className="min-w-full leading-normal mt-2">
                      <thead className="font-bold text-left text-sm bg-green-50 text-gray-600">
                        <tr>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            #
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Arv
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Quater
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Quarter / Year
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Holding Tax (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            1% penalty (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Additional Tax (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Total Tax (Rs)
                          </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                            Due Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <>
                          {props?.safSubmitResponse?.data?.demand?.details?.RuleSet3?.map(
                            (items) => (
                              <tr className="bg-white shadow-lg border-b border-gray-200">
                                <td className="px-2 py-2 text-sm text-left">
                                  1
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.arv}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.qtr}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.quarterYear}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.holdingTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.onePercPenaltyTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.rwhPenalty}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.totalTax}
                                </td>
                                <td className="px-2 py-2 text-sm text-left">
                                  {items.dueDate}
                                </td>
                              </tr>
                            )
                          )}
                        </>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="w-full flex mb-10 mt-10">
          <div className="flex justify-center mt-1">
            <RotatingLines
              strokeColor="#e87f0e"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={loader}
            />
          </div>
          <div className="md:px-4 text-center">
            <button
              onClick={toggleTaxDescription}
              type="button"
              className="cypress_view_demand_toggle w-full px-6 py-1 bg-gray-200 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-amber-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
            >
              <MdViewInAr className="inline text-lg mr-2" />
              {!taxDescriptionState
                ? "View demand details"
                : "Hide demand details"}
            </button>
          </div>
          {/* <div className='md:px-10 text-right flex-1'>
          <button onClick={() => props.nextFun(7)} type="button" className=" px-6 py-1 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Pay Now <img src={pay2} alt="pay image" className='inline w-5' /></button>
        </div> */}

          {!loader && (
            <div className="md:px-10 text-right flex-1">
              <button
                onClick={() => {
                  setloaderStatus(true);
                  getOrderId();
                }}
                type="submit"
                className="cypress_pay_now px-6 py-1 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Pay Now{" "}
                <img src={pay2} alt="pay image" className="inline w-5" />
              </button>
            </div>
          )}
        </div>
        {/* <SafDocumentUpload/> */}
        <div className="mt-40"></div>
      </div>
    </>
  );
}

export default SafFormDemand;
