import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PropertyApiList from "../../../../Components/ApiList/PropertyApiList";
import WaterApiList from "../../../../Components/ApiList/WaterApiList";
import TopTabs from "./TopTabs";
import { ColorRing } from "react-loader-spinner";
import brief from "../../../../assets/images/brief.png";

function SafPaymentDetails_Property() {
  const { id } = useParams();
  const { api_PropTransactionById } = PropertyApiList();
  const { header } = WaterApiList();
  const [loaderStatus, setloaderStatus] = useState(false);
  const [transcationList, settranscationList] = useState();

  console.log("SAF id issssssssss", id);

  // axios.post(api_PropTransactionById, { "safId": id }, header)
  // .then((res)=> console.log("Res - PropTransactionById", res))
  // .catch((err)=> console.log("Error - PropTransactionById", err))

  const fetchTranscationList = () => {
    setloaderStatus(true);
    axios
      .post(api_PropTransactionById, { propertyId: id }, header)
      .then(function (response) {
        console.log("saf transcation list----- ", response);
        settranscationList(response?.data?.data);
        setloaderStatus(false);
      })
      .catch(function (error) {
        console.log(error);
        setloaderStatus(false);
      });
  };

  useEffect(() => {
    fetchTranscationList();
  }, []);

  return (
    <>
      {loaderStatus && (
        <div className="w-full z-10 absolute mx-auto text-center flex justify-center items-center top-1/2">
          <span className="inline">
            <ColorRing
              visible={true}
              height="120"
              width="120"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-12  lg:grid-cols-12 container mx-auto">
        {/* <div className='w-full col-span-2'>
                    <PropertySidebar />
                </div> */}
        <div className="col-span-12 bg-gray-50 p-4">
          <div className="flex flex-row">
            <h1 className="px-2 font-semibold text-center text-gray-600 font-serif py-2 xl md:text-3xl mt-2">
              PAYMENT DETAILS
            </h1>
          </div>
          <TopTabs safId={id} safNo={""} active="payment" />

          <table className="min-w-full leading-normal mt-10">
            <thead className="font-bold text-left text-sm bg-green-50 text-gray-600">
              <tr>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  #
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Status
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Saf No.
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  From finanacial year
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Upto finanacial year
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  From Quater
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Upto Quater
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Transcation No.
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Transcation Date
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Amount
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Penalty Amount
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Discount Amount
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Payable Amount
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">
                  Demand Amount
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <>
                {transcationList?.length != 0 &&
                  transcationList?.map((items) => (
                    <tr className="bg-white shadow-lg border-b border-gray-200">
                      <td className="px-2 py-2 text-sm text-left">1</td>
                      <td
                        className={`px-2 py-2 text-sm text-left font-semibold ${
                          items.verify_status == 1
                            ? "text-green-500"
                            : "text-red-400"
                        }`}
                      >
                        {items.verify_status == 1 ? "Paid" : "Failed"}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.saf_no}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.from_fyear}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.upto_fyear}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.from_qtr}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.upto_qtr}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.tran_no}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.tran_date}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.amount}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.penalty_amt}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.discount_amt}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.payable_amt}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.demand_amt}
                      </td>
                    </tr>
                  ))}
              </>
            </tbody>
          </table>
          {transcationList?.length == 0 && (
            <div className="text-red-500 w-full text-center py-4 font-semibold text-xl">
              No Payment Found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SafPaymentDetails_Property;
