//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 18th Nov., 2022  12:45 PM
// Project     : JUIDCO
// Component   : ObjectionAssessmentApi
// Description : Objection Assessment Error api list
//////////////////////////////////////////////////////////////////////

const ObjectionAssessmentApi = () => {

    const baseUrl = 'http://192.168.0.16:8000'
  
    let apiLinks = {
        
                // 1. to get property assessment data
                getAssessment : `${baseUrl}/api/property/saf/get-prop-byholding`,  //POST

                // 2. post assessment objection
                postAssessment : `${baseUrl}/api/property/objection/apply-objection`,  //POST
        
                //3. for list 
                getWardList: `${baseUrl}/api/property/saf/master-saf`,  //POST
    }
  
    return apiLinks;

}

export default ObjectionAssessmentApi

//////////////////////////////////////////////////////////////////////////
// Export to : ObjectionRectification.js, ObjectionRectificationTable.js
//////////////////////////////////////////////////////////////////////////