export default function AdvertisementApiList() {
    let baseUrl = "http://192.168.0.140:8000"
    // let baseUrl = "http://192.168.0.205:8000"
    let apiList = {

        verifyPaymentStatus: `${baseUrl}/api/payment/verify-payment-status`, //POST // use to store the data if payment failed or success=> 

        //login
        api_login: `${baseUrl}/api/login`,
        //1
        api_safInboxList: `${baseUrl}/api/property/saf/inbox`,
        //1
        api_safBTCList: `${baseUrl}/api/property/saf/btc-inbox`,
        //2
        api_getSafDetailsById: `${baseUrl}/api/property/saf-details`,
        //3
        api_getWorkflowCandidates: `${baseUrl}/api/workflow/getRoleByWorkflow`,
        //4
        api_postEscalateStatus: `${baseUrl}/api/property/saf/escalate`,
        //comment
        api_postComment: `${baseUrl}/api/property/saf/independent-comment`,
        //sending application to level
        api_postApplicationToLevel: `${baseUrl}/api/property/saf/post/level`,
        //escalate to speacial List
        api_getsafSpecialList: `${baseUrl}/api/property/saf/escalate/inbox`,
        //role details
        api_fetchRoleDetail: `${baseUrl}/api/workflow/getroledetails`,
        //outBox list
        api_safOutboxList: `${baseUrl}/api/property/saf/outbox`,

        //Approve Reject
        api_approveRejectForm: `${baseUrl}/api/property/saf/approvalrejection`,

        //back to citizen
        api_backToCitizen: `${baseUrl}/api/property/saf/back-to-citizen`,

        //Apply Saf
        api_getPostSafFormData: `${baseUrl}/api/property/saf/apply`,

        // Saf master data
        api_getSafMasterData: `${baseUrl}/api/property/saf/master-saf`,

        //applicaton full detail
        api_getAppicationFullDetail: `${baseUrl}/api/property/saf-details`,


        //water master
        api_getMasterDataWaterHarvesting: `${baseUrl}/api/property/get-wardmaster-data`,
        //water post
        api_postWaterHarvestingData: `${baseUrl}/api/property/water-harvesting-application`,

        api_getWardListByLogin: `${baseUrl}/api/get-all-wards`,  // Get All Wardlist BY Login  => GET

        api_filterPropertyDetails: `${baseUrl}/api/property/get-filter-property-details `,  // Get All Wardlist BY Login  => POST

        api_filterPropertyAppliedApplications: `${baseUrl}/api/property/get-filter-safs-details `,  // Get All Wardlist BY Login  => POST

        //find holding
        api_getHoldingDetails: `${baseUrl}/api/property/saf/get-prop-byholding`,

        // get Order Id
        propertyGenerateOrderId: `${baseUrl}/api/property/saf/generate-order-id`, //POST
        // Bifurcation API List Start

        api_bifurcationInboxList: `${baseUrl}/api/property/bifurcationInbox`,
        api_bifurcationOutboxList: `${baseUrl}/api/property/bifurcationOutbox`,

        api_bifurcationDetailsById: `${baseUrl}/api/property/getSafDtls`, // GET

        // Bifurcation API List End

        //application list of property generated holding
        api_getPropertyApplicationList: `${baseUrl}/api/property/saf/get-prop-byholding`, //POST

        //application demand detail in demand screen
        api_DemandDetailById: `${baseUrl}/api/property/saf/calculate-by-saf-id`,
        //application demand detail in demand screen
        api_getTcVerifyData: `${baseUrl}/api/property/saf/get-tc-verifications`,
        //application demand detail in demand screen
        api_getWorkflowPermission: `${baseUrl}/api/workflow/role-map/permission`,
        //application demand detail in demand screen
        api_uploadDocument: `${baseUrl}/api/property/upload-document`,
        api_uploadDocumentShow: `${baseUrl}/api/property/get-doc-list`,
        //application demand detail in demand screen
        api_workflowInfo: `${baseUrl}/api/workflow/role-map/workflow-info`,
        //application demand detail in demand screen
        api_verifyDocuments: `${baseUrl}/api/property/saf/doc-status`,
        //application demand detail in demand screen
        api_postDepartmental: `${baseUrl}/api/property/post-custom-data`,
        api_getDepartmentalData: `${baseUrl}/api/property/get-all-custom-tab-data`,
        getDocumentList: `${baseUrl}/api/property/getSafUploadDocuments`,
        api_fieldVerificationList: `${baseUrl}/api/property/saf/field-verified-inbox`,




        api_advertDocumentVerification: `${baseUrl}/api/advertisements/document-verification`,

        ///////{*******ADVERTISEMENT API LIST********}////////
        api_advertInboxList: `${baseUrl}/api/advertisement/self-advert/inbox`, // list of application in inbox
        api_advertOutboxList: `${baseUrl}/api/advertisement/self-advert/outbox`,//list of application in outbox
        api_advertApplicationFullDetailById: `${baseUrl}/api/advertisement/self-advert/details`,//application full details
        api_advertEscalateApplication: `${baseUrl}/api/advertisement/self-advert/escalate`,//escalate application
        api_advertIndependentComment: `${baseUrl}/api/advertisement/self-advert/comment-independent`,//independent comment
        api_advertSpecialboxList: `${baseUrl}/api/advertisement/self-advert/special-inbox`,//special inbox list
        api_advertPostNextLevel: `${baseUrl}/api/advertisement/self-advert/post-next-level`,//forward and backward application
        api_advertViewDocuments: `${baseUrl}/api/advertisement/self-advert/workflow-view-documents`,//view uploaded document in workflow
        api_advertUploadDocuments: `${baseUrl}/api/advertisement/self-advert/workflow-upload-document`,//upload document 
        api_advertApproveReject: `${baseUrl}/api/advertisement/self-advert/approval-rejection`,//approval and rejection of an application


        ///////{*******Movable API LIST********}////////
        api_movableInboxList: `${baseUrl}/api/advertisement/movable-vehicle/inbox`,// list of application in inbox
        api_movableOutboxList: `${baseUrl}/api/advertisement/movable-vehicle/outbox`,//list of application in outbox
        api_movableApplicationFullDetailById: `${baseUrl}/api/advertisement/movable-vehicle/details`,//application full details
        api_movableEscalateApplication: `${baseUrl}/api/advertisement/movable-vehicle/escalate`,//escalate application
        api_movableIndependentComment: `${baseUrl}/api/advertisement/movable-vehicle/comment-independent`,//independent comment
        api_movableSpecialboxList: `${baseUrl}/api/advertisement/movable-vehicle/special-inbox`,//special inbox list
        api_movablePostNextLevel: `${baseUrl}/api/advertisement/movable-vehicle/post-next-level`,//forward and backward application
        api_movableViewDocuments: `${baseUrl}/api/advertisement/movable-vehicle/vehicle-document-view`,//view uploaded document in workflow
        api_movableUploadDocuments: `${baseUrl}/api/advertisement/self-advert/workflow-upload-document`,//upload document 
        api_movableApprovedReject: `${baseUrl}/api/advertisement/movable-vehicle/approval-rejection`,//approval and rejection of an application


        ///////{*******Agency API LIST********}////////
        api_agencyInboxList: `${baseUrl}/api/advertisement/agency/inbox`,// list of application in inbox
        api_agencyOutboxList: `${baseUrl}/api/advertisement/agency/outbox`,//list of application in outbox
        api_agencyApplicationFullDetailById: `${baseUrl}/api/advertisement/agency/details`,//application full details
        api_agencyEscalateApplication: `${baseUrl}/api/advertisement/agency/escalate`,//escalate application
        api_agencyIndependentComment: `${baseUrl}/api/advertisement/agency/comment-independent`,//independent comment
        api_agencySpecialboxList: `${baseUrl}/api/advertisement/agency/special-inbox`,//special inbox list
        api_agencyPostNextLevel: `${baseUrl}/api/advertisement/agency/post-next-level`,//forward and backward application
        api_agencyViewDocuments: `${baseUrl}/api/advertisement/agency/agency-document-view`,//view uploaded document in workflow
        api_agencyUploadDocuments: `${baseUrl}/api/advertisement/self-advert/workflow-upload-document`,//upload document 
        api_agencyApproveReject: `${baseUrl}/api/advertisement/agency/approval-rejection`,//approval and rejection of an application



        ///////{*******Hoarding API LIST********}////////
        api_hoardingInboxList: `${baseUrl}/api/advertisement/agency/license-inbox`,// list of application in inbox
        api_hoardingOutboxList: `${baseUrl}/api/advertisement/agency/license-outbox`,//list of application in outbox
        api_hoardingApplicationFullDetailById: `${baseUrl}/api/advertisement/agency/license-details`,//application full details
        api_hoardingEscalateApplication: `${baseUrl}/api/advertisement/agency/license-escalate`,//escalate application
        api_hoardingIndependentComment: `${baseUrl}/api/advertisement/agency/comment-independent`,//independent comment
        api_hoardingSpecialboxList: `${baseUrl}/api/advertisement/agency/license-special-inbox`,//special inbox list
        api_hoardingPostNextLevel: `${baseUrl}/api/advertisement/agency/license-post-next-level`,//forward and backward application
        api_hoardingViewDocuments: `${baseUrl}/agency/license-hording-document-view`,//view uploaded document in workflow
        api_hoardingUploadDocuments: `${baseUrl}/api/advertisement/self-advert/workflow-upload-document`,//upload document 
        api_hoardingApproveReject: `${baseUrl}/api/advertisement/agency/license-approval-rejection`,//approval and rejection of an application



        ///////{******* Private Land API LIST********}////////
        api_privateLandInboxList: `${baseUrl}/api/advertisement/private-land/inbox`,// list of application in inbox
        api_privateLandOutboxList: `${baseUrl}/api/advertisement/private-land/outbox`,//list of application in outbox
        api_privateLandApplicationFullDetailById: `${baseUrl}/api/advertisement/private-land/details`,//application full details
        api_privateLandEscalateApplication: `${baseUrl}/api/advertisement/private-land/escalate`,//escalate application
        api_privateLandIndependentComment: `${baseUrl}/api/advertisement/agency/comment-independent`,//independent comment
        api_privateLandSpecialboxList: `${baseUrl}/api/advertisement/private-land/special-inbox`,//special inbox list
        api_privateLandPostNextLevel: `${baseUrl}/api/advertisement/private-land/post-next-level`,//forward and backward application
        api_privateLandViewDocuments: `${baseUrl}/api/advertisement/private-land/private-land-document-view`,//view uploaded document in workflow
        api_privateLandUploadDocuments: `${baseUrl}/api/advertisement/self-advert/workflow-upload-document`,//upload document 
        api_PrivateLandApproveReject: `${baseUrl}/api/advertisement/private-land/approval-rejection`,//approval and rejection of an application

    }




    return apiList
}


