import { useNavigate, useParams } from "react-router-dom"

function TopTabs(props) {
    const navigate = useNavigate()
    const {id}  = useParams()
    console.log('id direct at topnav...',id)
    // conditons :
    // # for saf application
    // 1 property details
    // 2 demand details
    // 3 upload documents

    // # for holding
    // 1 property details
    // 2 payment history
    // 3 demand details
    let properyDetailsRoute = ''
    let demandDetailsRoute = ''
    let paymentHistoryRoute = ''
    let uplodDocRoute = ''

    if (props?.type == 'application') {
        properyDetailsRoute = `/propApplicationDetails/${id}`
        demandDetailsRoute = `/viewDemand/${id}`
        uplodDocRoute = `/safdocumentupload/${id}`
    } else {
        properyDetailsRoute = `/holdingPropertyDetails/${id}`
        demandDetailsRoute = `/viewDemandHoldingProperty/${id}`
        paymentHistoryRoute = `/holding-transactions/${id}`
    }

    return (
        <>
            <div className="flex py-2 justify-center items-center">
                <div className="flex-1 flex pl-2 font-bold text-2xl text-gray-700">
                  {props?.title}
                </div>
                <div className="flex justify-right items-center">
                    <button className={`mr-4 ${props?.active == 'property' ? 'bg-indigo-500  text-white' : 'bg-white border border-indigo-500 text-indigo-500'} px-4 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(properyDetailsRoute)}>Property-Details</button>

                    <button className={`mr-4 ${props?.active == 'demand' ? 'bg-indigo-500  text-white' : 'bg-white border border-indigo-500 text-indigo-500'} px-4 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(demandDetailsRoute)}>Demand-Details</button>

                    {/* {props?.type == 'holding' && <button className={`mr-4 ${props?.active == 'payment' ? 'bg-indigo-500  text-white' : 'bg-white border border-indigo-500 text-indigo-500'} px-4 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(paymentHistoryRoute)}>Payment-History</button>} */}

                    {props?.type == 'application' && <button className={`${props?.active == 'document' ? 'bg-indigo-500  text-white' : 'bg-white border border-indigo-500 text-indigo-500'} px-4 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(uplodDocRoute)}>Upload-Documents</button>
                    }
                </div>
            </div>
        </>
    )
}

export default TopTabs