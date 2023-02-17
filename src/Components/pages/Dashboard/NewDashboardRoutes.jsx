///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingDashboardNew from './LandingDashboardNew'

const NewDashboardRoutes = () => {
  return (
    
    <Routes>

        <Route path='/dashboard' element={<LandingDashboardNew />} />

        <Route path='/track-water' element={<LandingDashboardNew/>} />
        <Route path='/view-water' element={<LandingDashboardNew/>} />

        <Route path="/track-trade" element={<LandingDashboardNew/>} />
        <Route path="/view-trade" element={<LandingDashboardNew/>} />

    </Routes>
    

  )
}

export default NewDashboardRoutes

// export to : App.js