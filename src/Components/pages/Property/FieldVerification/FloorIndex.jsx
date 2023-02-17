import React from 'react'
import FloorDetails from './FloorDetails'

const FloorIndex = (props) => {
  return (
    <>

            <FloorDetails data={props?.applicationData} usageList={props?.usageType} occupancyList={props?.occupancyType} constructionList={props?.constructionList} floorList={props?.floorList} next={() => props.next()} back={() => props.back()} collectData={(type, data) => {
                props.collectData(type, data)
            }}/>
    
    </>
  )
}

export default FloorIndex