///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import CountCard from './CountCard';

const Count = (props) => {
  return (
   <>
   <div class="flex flex-wrap flex-row justify-center mx-auto 2xl:pt-4 pt-2 text-center overflow-x-hidden mt-4 w-full">
          
          <CountCard data={props?.propertyApplicationList} label={'Total Property'} location={'property'}/>
          <CountCard data={props?.applicationListByModule?.SAF} label={'Total SAF'} location={'property'}/>
          <CountCard data={props?.waterConn} label={'Total Water'} location={'water'}/>
          <CountCard data={props?.license} label={'Total Licenses'} location={'trade'}/>
          
        </div>  
   </>
  )
}

export default Count

// export to : LandingDashboardNew