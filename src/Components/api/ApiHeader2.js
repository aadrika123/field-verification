//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 16th Nov., 2022  01:30 PM
// Project     : JUIDCO
// Component   : ApiHeader2
// Description : ApiHeader2 for post documents
//////////////////////////////////////////////////////////////////////

export default function ApiHeader2() {
  // let token = JSON.parse(window.localStorage.getItem("token"));
  // let token2 = token.replace(/^"(.*)"$/, '$1');
  let token2 = window.localStorage.getItem("token");
  const header = {
    headers: {
      "Authorization": `Bearer ${token2}`,
      "Accept": "application/json",
      "Content-Type": "multipart/form-data",
    },
  };
  return header;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Export to: ConcessionForm.js, ObjectionRectification.js, ObjectionRectificationTable.js
/////////////////////////////////////////////////////////////////////////////////////////////////////
