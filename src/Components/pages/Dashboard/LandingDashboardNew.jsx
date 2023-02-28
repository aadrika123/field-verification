///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import {useState} from 'react'
import Bar from './Components/Bar'
import HelpAndSupport from './Components/HelpAndSupport';
// import Count from './Components/Count';
import Modules from './Components/Modules';
import { contextDash } from './context/contextDash';
import 'animate.css'
// import WaterIndex from './Components/Water/WaterIndex';
// import TradeIndex from './Components/Trade/TradeIndex';
import 'react-tooltip/dist/react-tooltip.css'
// import BlankSection from './Components/BlankSection';
// import grievance from './assets/images/grievance.jpg'
import { useLocation } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

function LandingDashboardNew() {

    // ===============Context==================
    const [action, setaction] = useState('home')
    const location = useLocation()

    const [loader, setloader] = useState(false)

    const contextData = {
        action , setaction
    }

    return (
        <>

        {/* ============LOADER============= */}
        {loader && <BeatLoader />}

        {!loader &&  <>

        <contextDash.Provider value={contextData}>
        
            {/* =========CONTAINER================= */}
             <div className=' grid grid-cols-12 mt-4 md:mt-4 bg-white poppins animate__animated animate__fadeIn animate__faster select-none'>
                
            {/* ========(MAIN SECTION)================ */}
             <div className=' px-6 col-span-12  overflow-y-auto pb-2'>

                {/* ===========HEADING================= */}
                  <div className='text-xl 2xl:text-3xl font-semibold text-gray-700 text-center font-serif mt-0 poppins mb-10'>All Municipal Services at your FingerTip</div>

                    {/* =============MODULES CARDS=========== */}
                    <Modules />

                {/* {(location.pathname == '/track-water' || location.pathname == '/view-water') && <WaterIndex />} */}

                {/* ================TRADE SECTION=============== */}
                {/* {(location.pathname == '/track-trade' || location.pathname == '/view-trade') && <TradeIndex />} */}
                    
                </div>

            </div>

        </contextDash.Provider>

        </>}
           
        </>
    )
}

export default LandingDashboardNew

// export to : NewDashboardRoutes.jsx