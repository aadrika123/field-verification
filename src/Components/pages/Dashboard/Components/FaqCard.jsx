///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from "react";
import 'animate.css'
import { useState } from "react";
import '../assets/Fonts.css'
import { useEffect } from "react";

const FaqCard = (props) => {

  const [document, setdocument] = useState()

  useEffect(() => {
    setdocument(props?.document)
  },[props?.document])

    const [toggle, settoggle] = useState(false)

    let buttonStyle = 'px-2 py-1 text-xs 2xl:text-sm rounded-md hover:shadow-md bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer poppins'

  return (
    <>
      <div
        className="bg-indigo-100 hover:bg-amber-100 shadow-sm py-2 text-xs 2xl:text-sm transition-all duration-200 flex flex-col pl-4 mt-2 poppins cursor-pointer"
        onClick={() => settoggle(!toggle)}
      >
        👉&nbsp;{props?.question}
        {toggle && <>
          <div className="font-light 2xl:font-normal text-xs mt-2 px-4 italic animate__animated animate__fadeInDown animate__faster poppins">
            {props?.answer} <br />
          </div>
          {document != undefined && <a href={props?.document} download target="_blank" className={buttonStyle + ` mx-4 my-2 w-max`}>Know More</a>}
        </>}
      </div>
    </>
  );
};

export default FaqCard;

// export to : HelpAndSupport
