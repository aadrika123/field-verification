import ApiHeader from "./ApiHeader";

export default function WaterApiList() {
    let baseUrl = "http://192.168.0.16:8000"
    // let baseUrl = "http://192.168.0.148:81"

    const header = ApiHeader()


    let apiList = {
        header: header,
        api_ulbList: `${baseUrl}/api/get-all-ulb`, //GET
        api_getSafHoldingDetails: `${baseUrl}/api/water/get-related-saf-holding`,
        api_getPendingApplicationDetails: `${baseUrl}/api/water/get_application_details`,
        api_waterApprovedApplicationDetails: `${baseUrl}/api/water/get-approved-water-application-details`,
        api_waterConsumerPaymentHistory: `${baseUrl}/api/water/get-consumer-payment-history`,



        // -------------------- Workflow ----------------

        api_waterInbox: `${baseUrl}/api/water/list-inbox`, //POST => Water Workflow Inbox List
        api_waterOutbox: `${baseUrl}/api/water/list-outbox`, //POST => Water Workflow Outbox List
        api_waterSpecialInbox: `${baseUrl}/api/water/list-special-inbox`, //POST => Water Workflow Special List
        api_waterPendingApplicationById: `${baseUrl}/api/water/get-pending-application-by-id`,// => Get Pending Applicatin BY Id
        api_waterPostMessage: `${baseUrl}/api/water/post-message`, // => Send Message
        api_waterPostNextLevel: `${baseUrl}/api/water/post-next-level`, //=> Send Applicaion To Next Level
        api_waterEsclate: `${baseUrl}/api/water/escalate`, // => Escalate Application
        api_waterApproveRejectApplication: `${baseUrl}/api/water/approval-rejection-application`, // => Approve / Reject Application
        api_waterVerifyDoc: `${baseUrl}/api/workflow/document/verify-reject`, // => Water Workflow Document Verification
        api_waterDocList: `${baseUrl}/api/water/get_upload_documents`, // Water Workflow Show Uploaded Documents
        api_waterListFieldVerifyInbox: `${baseUrl}/api/water/list-field-verified-inbox`, // => Water Workflow List of Vieled Verification Inbox
        api_waterBtcListInbox: `${baseUrl}/api/water/list_btc_inbox`, //POST => Water BTC Inbox List
        api_backToCitizen: `${baseUrl}/api/water/back_to_citizen`, //POST    => Water Send to BTC
        api_waterPostCustomData: `${baseUrl}/api/post-custom-data`, //POST => Water Post Custom Data
        api_waterGetCustomDataTab: `${baseUrl}/api/get-all-custom-tab-data`, //POST => Water Get All Custom Tab Data
        api_waterListDocToUpload: `${baseUrl}/api/water/getDocList`, //POST => Water Get Documenet List
        api_waterSearchConsumer: `${baseUrl}/api/water/search-water-consumer`, //POST => Watar Search Consumer
        api_waterSearchActiveApplication: `${baseUrl}/api/water/search-active-applictaions`, //POST => Water Search Active Application


        // ------------ Menu master --------

        api_menuMasterDelete: `${baseUrl}/api/crud/menu/delete-menues`, // => Delete Menu
        api_addNewMenu: `${baseUrl}/api/crud/menu/add-new-menues`, // => Add New Menu
        api_listParentSetial: `${baseUrl}/api/menu-roles/list-parent-serial`, // => List of Parent Serial
        api_getChildrenNode: `${baseUrl}/api/sub-menu/get-children-node`, // => Get Children Node

        api_getRolesByid: `${baseUrl}/api/workflow/role-user-maps/get-roles-by-id`, // => 
        api_updateUserRoles: `${baseUrl}/api/workflows/role-user-maps/update-user-roles`, // => 
        api_getMenuById: `${baseUrl}/api/menu/get-menu-by-id`, // => 
        api_getAllMenu: `${baseUrl}/api/crud/menu/get-all-menues`, // => Method - GET  Shows List of All Menus
        api_updateMenu: `${baseUrl}/api/crud/menu/update-menues`, // =>  Update Menu



        // ------ Cash Verificatiopn -------
        api_listofEmployees: `${baseUrl}/api/list-employees`, //=> List of employees

        api_listUnverifiedCashVerification: `${baseUrl}/api/payment/list-cash-verification`, //=> Show List of Unverified User and Amount
        api_listVerifiedCashVerification: `${baseUrl}/api/payment/verified-cash-verification`, //=> Show List of Verified User and Amount

        api_tcCollection: `${baseUrl}/api/payment/tc-collections`,

        api_cashVerification: `${baseUrl}/api/payment/verify-cash`,


    }

    return apiList
}