//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 16th Nov., 2022  01:30 PM
// Project     : JUIDCO
// Component   : ConcessionApi
// Description : Concession api list
//////////////////////////////////////////////////////////////////////
import BackendUrl from './BackendUrl'
const ConcessionApi = () => {
   
    let baseUrl = BackendUrl

  let apiList = {

      // getting owner list
      getConcessionOwners : `${baseUrl}/api/property/concession/owner-details`,

      getDocMaster : `${baseUrl}/api/property/concession/get-doc-type`,
      
      // uploading concession form
      postConcessionForm : `${baseUrl}/api/property/concession/apply-concession`,

  }

  return apiList;
};

export default ConcessionApi;

////////////////////////////////////////////////////////////////////////
// Export to : ConcessionFormIndex.js, ConcessionForm.js
////////////////////////////////////////////////////////////////////////
