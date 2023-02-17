///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import React from 'react'
import '../assets/Fonts.css'
import home from '../../../assets/images/home.png'
import water2 from '../../../assets/images/water2.png'
import team from '../../../assets/images/team.png'
import ModuleCard from './ModuleCard'

const Modules = () => {

  return (
    <>
    
        <div className='flex flex-col md:flex-row flex-wrap gap-x-2 gap-y-4 justify-evenly items-center mt-4'>

            <ModuleCard image={home} label={'Property'} search={'/search/property'} />
            <ModuleCard image={water2} label={'Water'} search={'/search/water'} />
            <ModuleCard image={team} label={'Trade'} search={'/search/trade'} />

        </div>

    </>
  )
}

export default Modules

// export to : LandingDashboardNew