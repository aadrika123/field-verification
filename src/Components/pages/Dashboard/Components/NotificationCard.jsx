///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from "react";
import { useNavigate } from "react-router-dom";

const NotificationCard = (props) => {

    const navigate = useNavigate()
  return (
    <>
      <div className="poppins flex items-center gap-2 bg-yellow-50 hover:bg-yellow-100 shadow-lg py-2 text-xs 2xl:text-sm transition-all duration-500 md:pl-4 my-2 flex-row flex-wrap justify-between md:pr-6 md:px-0 px-2">
        <div className="poppins">
        🔔&nbsp;&nbsp;{props?.message}
        </div>{" "}
        <button className="rounded-sm bg-indigo-500 hover:bg-indigo-600 text-white transition-all duration-200 ease-in-out px-3 py-[0.2rem] text-xs shadow-md shadow-indigo-200" onClick={() => navigate(`${props?.action}`)}>
          Action
        </button>
      </div>
    </>
  );
};

export default NotificationCard;

// export to: Notification
