import React from 'react'

function PageNo(props) {
  return (
    <div className='font-normal text-sm text-gray-500'>Page <span className='font-bold text-gray-800 text-xl'>{props?.formIndex}</span> of <span className='font-bold text-gray-800 text-xl'>6</span></div>
  )
}

export default PageNo