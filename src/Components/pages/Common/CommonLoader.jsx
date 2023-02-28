import React from 'react'
import { BeatLoader } from "react-spinners";

const CommonLoader = () => {
  return (
    <div className='h-screen w-screen absolute overflow-hidden backdrop-blur-sm'>
        <BeatLoader className='absolute z-10 top-[50%] right-[50%] backdrop-blur-sm' />
    </div>
  )
}

export default CommonLoader