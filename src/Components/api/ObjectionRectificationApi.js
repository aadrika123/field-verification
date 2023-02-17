//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 18th Nov., 2022  12:45 PM
// Project     : JUIDCO
// Component   : ObjectionRectificationApi
// Description : Objection Rectification api list
//////////////////////////////////////////////////////////////////////

const ObjectionRectificationApi = () => {
  const baseUrl = "http://192.168.0.16:8000";

  let apiLinks = {
    
      //1. to get property data
      getPropData: `${baseUrl}/api/property/saf/get-prop-byholding`, //POST

      // 2. to get owner data
      getOnwerData : `${baseUrl}/api/property/objection/owner-detailById`, //POST

      //3. post clerical objection form
      postClericalData: `${baseUrl}/api/property/objection/apply-objection`, //POST

      // 4. post add member clerical objection
      clerical_add_member : `${baseUrl}/api/property/objection/add-members`, //POST

      // 5. to get document code
      getClericalDocCode : `${baseUrl}/api/property/objection/citizen-doc-list` //POST
  };

  return apiLinks;
};

export default ObjectionRectificationApi;

//////////////////////////////////////////////////////////////////////////
// Export to : ObjectionRectification.js, ObjectionRectificationTable.js
//////////////////////////////////////////////////////////////////////////
