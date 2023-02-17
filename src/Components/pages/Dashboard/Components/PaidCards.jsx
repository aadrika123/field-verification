///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import ModuleCard from './ModuleCard'

const PaidCards = () => {
  return (
    <>
    
    <div className='flex flex-col md:flex-row flex-wrap gap-x-2 gap-y-4 justify-evenly items-center mt-4'>
    
    <ModuleCard image={'https://cdn-icons-png.flaticon.com/512/1728/1728543.png'} label={'Paid Service 1'} apply={''} track={''} />
    <ModuleCard image={'https://cdn-icons-png.flaticon.com/512/1622/1622764.png'} label={'Paid Service 2'} apply={''} track={''} />
    <ModuleCard image={'https://cdn-icons-png.flaticon.com/512/7102/7102072.png'} label={'Paid Service 3'} apply={''} track={''} />

    </div>
    
    </>
  )
}

export default PaidCards

// export : LandingDashboardNew.jsx