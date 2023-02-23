import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { contextVar } from "./Components/services/contextVar";
import Login from "./Components/pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import TopBar from "./Components/pages/TopBar";
import NewDashboardRoutes from "./Components/pages/Dashboard/NewDashboardRoutes";
import CommonLoader from "./Components/pages/Common/CommonLoader";
import PropertyVerificationForm from "./Components/pages/Property/PropertyVerificationForm";
import SearchApplications from "./Components/pages/Common/SearchApplications";
import VerifyForm from "./Components/pages/Property/FieldVerification/VerifyForm";
import GeoIndex from "./Components/pages/Property/GeoTagging/GeoIndex";
import CitizenPropSafApplicationFormIndex from "./Components/pages/Property/CitizenSafForm/CitizenPropSafApplicationFormIndex";

const App = () => {
  const [loader, setloader] = useState(false);

  const location = useLocation();

  const contextData = {
    notify: (toastData, actionFlag) => {
      toast.dismiss();
      {
        actionFlag == "error" && toast.error(toastData);
      }
      {
        actionFlag == "info" && toast.info(toastData);
      }
      {
        actionFlag == "success" && toast.success(toastData);
      }
      {
        actionFlag == "warn" && toast.warn(toastData);
      }
    },
  };

  return (
    <>
      {loader && <CommonLoader />}

      <ToastContainer position="top-right" autoClose={2000} />

      <contextVar.Provider value={contextData}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>

        {location.pathname != "/" && (
          <>
            <TopBar />
            <NewDashboardRoutes />
            <Routes>
              <Route path="/propertyVerification/:id" element={<PropertyVerificationForm />} />
              
              <Route path="/search/:type" element={<SearchApplications />} />

              <Route path="/propVerify/:id" element={<VerifyForm />} />

              <Route path="/geoTagging/:id" element={<GeoIndex /> } />

              <Route path="/safform/:safType/:safId" element={<CitizenPropSafApplicationFormIndex /> } />

            </Routes>
          </>
        )}
      </contextVar.Provider>
    </>
  );
};

export default App;
