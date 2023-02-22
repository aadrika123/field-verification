import { useEffect, useState } from "react";
import newSvg from "./new.svg";
import re from "./re.svg";
import mu from "./mu.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import { TiArrowBack } from "react-icons/ti";
import { TbSearch } from "react-icons/tb";
import { FcHome } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectApiList from "Components/ApiList/ProjectApiList";
import ApiHeader from "Components/ApiList/ApiHeader";
import useSetTitle from "Components/GlobalData/useSetTitle";

function SafEntryScreen() {
  const { api_getHoldingDetails, api_getSafMasterData } = ProjectApiList();

  useSetTitle('SAF Application')

  const [newStatus, setnewStatus] = useState("col-span-12 md:col-span-4 py-6"); // to maintain the hide show state of new-assessment
  const [reStatus, setreStatus] = useState("col-span-12 md:col-span-4 py-6"); // to maintain the hide show state of re-assessment
  const [mutationStatus, setmutationStatus] = useState(
    "col-span-12 md:col-span-4 py-6"
  ); // to maintain the hide show state of mutation
  const [dataListStatus, setDataListStatus] = useState(false); //to toggle hide show of data list table after finding the holding data from search holding
  const [holdingData, setholdingData] = useState(); //to hold found holding data
  const [asstypeStatus, setasstypeStatus] = useState("both"); //to hold found holding data
  const [masterData, setmasterData] = useState();

  const navigate = useNavigate();
  //function to hide and show and animate assessment options
  const assStatus = (type) => {
    setasstypeStatus(type);
    if (type == "new") {
      setnewStatus("col-span-12 md:col-span-12 py-0 block");
      setreStatus("w-0 col-span-0 md:col-span-0 hidden");
      setmutationStatus("w-0 col-span-0 md:col-span-0 hidden");
    }
    if (type == "re") {
      setnewStatus("w-0 col-span-0 md:col-span-0 hidden");
      setreStatus("col-span-12 md:col-span-12 py-0 block");
      setmutationStatus("w-0 col-span-0 md:col-span-0 hidden");
    }
    if (type == "mu") {
      setnewStatus("w-0 col-span-0 md:col-span-0 hidden");
      setreStatus("w-0 col-span-0 md:col-span-0 hidden");
      setmutationStatus("col-span-12 md:col-span-12 py-0 block");
    }
    if (type == "back") {
      setDataListStatus(false);
      setnewStatus("col-span-12 md:col-span-4 py-6");
      setreStatus("col-span-12 md:col-span-4 py-6");
      setmutationStatus("col-span-12 md:col-span-4 py-6");
    }
  };

  ///////////{*** GETTING MASTER DATA***}/////////

  useEffect(() => {
    const header = ApiHeader()

    axios
      .get(`${api_getSafMasterData}`, header)
      .then(function (response) {
        console.log("saf master data ....", response.data.data);
        setmasterData(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr....getMasterData ", error);
      });
  }, []);

  const validationSchema = yup.object({
    holdingNo: yup.string().required("Enter holding no."),
  });
  const formik = useFormik({
    initialValues: {
      holdingNo: "",
      wardNo: "",
    },

    onSubmit: (values, resetForm) => {
      alert(JSON.stringify(values, null, 2));
      console.log("propertyaddressdetails ", values);
      findHolding(values);
    },
    validationSchema,
  });

  // let holdingNo = Hol / Ward / 001

  //function to fetch holding data and set into data table
  const findHolding = (values) => {
    // let holdingNo = formik.holdingNo

    const header = ApiHeader()
    const requestBody = {
      wardId: values.wardNo,
      holdingNo: values.holdingNo,
    };
    console.log("form request body....", requestBody);

    // return
    axios
      .post(`${api_getHoldingDetails}`, requestBody, header)
      .then(function (response) {
        console.log("verified holding no", response.data);
        setholdingData(response.data);
      })
      .catch(function (error) {
        console.log("errorrr....holding ", error);
      });
  };

  console.log("-------data-------", holdingData?.data?.prop_address);

  return (
    <>
      <div className="grid grid-cols-12 gap-2 mt-4 gap-x-6">
        {(reStatus == "col-span-12 md:col-span-12 py-0 block" ||
          mutationStatus == "col-span-12 md:col-span-12 py-0 block") && (
            <div
              className="col-span-12 cursor-pointer font-semibold text-gray-700"
              onClick={() => assStatus("back")}
            >
              <TiArrowBack className="text-2xl hover:text-green-500 inline" />{" "}
              Back
            </div>
          )}
        <div
          className={` ${newStatus} rounded overflow-hidden shadow-lg relative bg-white cursor-pointer hover:scale-105 transition-all duration-500`}
          onClick={() => navigate("/safform/new/0")}
        >
          <img
            className={`md:w-32 w-20 absolute bottom-0 right-0`}
            src={newSvg}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl text-indigo-500">New-Assessment</div>
            <p className="text-gray-700 text-sm w-3/5">
              Choose if fresh assessment
            </p>
          </div>
        </div>
        <div
          className={`${reStatus} rounded overflow-hidden shadow-lg relative bg-white cursor-pointer hover:scale-105 transition-all duration-500`}
          onClick={() => navigate("/search/re/direct/direct")}
        >
          <img
            className={`${reStatus == "col-span-12 md:col-span-12 py-0 block"
                ? "md:w-14 w-14"
                : "md:w-20 w-16"
              } absolute bottom-0 right-5`}
            src={re}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl text-indigo-500">Re-Assessment</div>
            <p className="text-gray-700 text-sm w-3/5">
              Choose if some updates in property
            </p>
          </div>
        </div>
        <div
          className={`${mutationStatus} rounded overflow-hidden shadow-lg relative bg-white cursor-pointer hover:scale-105 transition-all duration-500`}
          onClick={() => navigate("/search/mu/direct/direct")}
        >
          <img
            className={`${mutationStatus == "col-span-12 md:col-span-12 py-0 block"
                ? "md:w-14 w-14"
                : "md:w-20 w-16"
              } absolute bottom-0 right-5`}
            src={mu}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl text-indigo-500">Mutation</div>
            <p className="text-gray-700 text-sm w-3/5">
              Choose if owner has been changed
            </p>
          </div>
        </div>
      </div>

      <div className="p-10 text-center text-lg font-semibold text-gray-600">
        <span>For fresh holding choose first option <span onClick={() => navigate('/safform/new/direct/direct')} className="font-bold text-gray-900 hover:text-indigo-400 cursor-pointer">New-Assessment</span></span><br />
        <span>For Changes in property click to <span onClick={() => navigate('/search/re/direct/direct')} className="font-bold text-gray-900 hover:text-indigo-400 cursor-pointer">Re-Assessment</span></span><br />
        <span>For Transfer of Owner <span onClick={() => navigate('/search/mu/direct/direct')} className="font-bold text-gray-900 hover:text-indigo-400 cursor-pointer">Mutation</span></span>
      </div>


    </>
  );
}

export default SafEntryScreen;