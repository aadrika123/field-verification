export default function CitizenApplyApiList() {
    let baseUrl = "http://192.168.0.16:8000"
    // let baseUrlT = "http://192.168.0.205:8000"
    let apiList = {
        //1
        api_safInboxList: `${baseUrl}/api/saf/inbox`,
        //2
        api_getSafDetailsById: `${baseUrl}/api/saf/details`,
        //3
        api_getMasterData: `${baseUrl}/api/property/saf/master-saf`,
        //4
        api_postNewAssissment: `${baseUrl}/api/property/saf/apply`,
        //5
        api_getProfileDetails: `${baseUrl}/api/my-profile-details`,
        //6
        api_EditMyProfile: `${baseUrl}/api/edit-my-profile`,
        //7
        api_getAllUlb: `${baseUrl}/api/get-all-ulb`,
        //login
        api_citizenLogin: `${baseUrl}/api/login`,
        //7
        api_citizenRegister: `${baseUrl}/api/citizen-register`,
        //8
        api_getSafDetailsById2: `${baseUrl}/api/property/saf-details`,
        //9
       

        //application list by module
        api_applicationListByModule: `${baseUrl}/api/citizens/applied-applications`,
        //application list by module
        api_getAllApplicationList: `${baseUrl}/api/citizens/applied-applications`,
        //application list by module
        api_independentComment: `${baseUrl}/api/citizens/independent-comment`,

        //transcation history by module
        api_getTranscationHistory: `${baseUrl}/api/property/saf/prop-transactions`,

        //applicaton full detail
        api_getAppicationFullDetail: `${baseUrl}/api/property/saf-details`,

        //holding verification
        api_getHoldingDetails: `${baseUrl}/api/property/saf/get-prop-byholding`,

        //water harvesting master data
        api_getMasterDataWaterHarvesting: `${baseUrl}/api/property/get-wardmaster-data`,
        //water harvesting post data
        api_postWaterHarvestingData: `${baseUrl}/api/property/water-harvesting-application`,

        //all transcation history 
        api_getAllModuleTranscation: `${baseUrl}/api/payment/all-module-transaction`,


        //razor pay api
        verifyPaymentStatus: `${baseUrl}/api/payment/verify-payment-status`, //POST // use to store the data if payment failed or success=> 

        // get Order Id
        propertyGenerateOrderId: `${baseUrl}/api/property/saf/generate-order-id`, //POST

        //application demand detail in demand screen
        api_DemandDetailById: `${baseUrl}/api/property/saf/calculate-by-saf-id`,

        //application holding property demand
        api_getHoldingDemandById: `${baseUrl}/api/property/saf/get-demand-by-id`, //POST

        //application list of property generated holding
        api_getPropertyApplicationList: `${baseUrl}/api/property/saf/get-prop-byholding`, //POST

        //safdocument
        api_safDocument: `${baseUrl}/api/property/safDocumentUpload`, //POST

    }

    return apiList
}