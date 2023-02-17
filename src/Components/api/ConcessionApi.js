//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 16th Nov., 2022  01:30 PM
// Project     : JUIDCO
// Component   : ConcessionApi
// Description : Concession api list
//////////////////////////////////////////////////////////////////////

const ConcessionApi = () => {
   
  const baseUrl = 'http://192.168.0.16:8000/api/property/concession'

  let apiList = {

      // getting owner list
      getConcessionOwners : `${baseUrl}/owner-details`,

      getDocMaster : `${baseUrl}/get-doc-type`,
      
      // uploading concession form
      postConcessionForm : `${baseUrl}/apply-concession`,

  }

  return apiList;
};

export default ConcessionApi;

////////////////////////////////////////////////////////////////////////
// Export to : ConcessionFormIndex.js, ConcessionForm.js
////////////////////////////////////////////////////////////////////////
