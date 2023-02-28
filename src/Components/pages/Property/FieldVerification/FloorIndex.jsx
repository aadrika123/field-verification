import React, { useEffect, useState } from 'react'
import FloorDetails from './FloorDetails'
import FloorRow from './FloorRow'

const FloorIndex = (props) => {

  const [floorIndex, setfloorIndex] = useState(0)

  const [addFloorStatus, setaddFloorStatus] = useState(false)

  const [floorList, setfloorList] = useState([])
  const [prevFloor, setprevFloor] = useState([])
  const [prevAddFloor, setprevAddFloor] = useState([])

  console.log('floor length => ', props?.applicationData?.length)

  const nextFun = () => {

    console.log('floor indexx => ', floorIndex)

    if(floorIndex < props?.applicationData?.length){
      setfloorIndex(floorIndex+1)
      setaddFloorStatus(false)
    }

    if(floorIndex == (props?.applicationData?.length-1)) {
      setaddFloorStatus(true)
    }
  }

  const backFun = () => {
    if(floorIndex != 0) {
      setfloorIndex(floorIndex-1)
      setaddFloorStatus(false)
    }
    if(floorIndex == 0) {
      props?.back()
      setaddFloorStatus(false)
    }
  }

//   const collectData = (values) => {
//     let tempFloorList = [...floorList, values] 
//     setfloorList([...floorList, values])
//     console.log('tempfloor list before add.....', tempFloorList)
// }

const collectData = (values) => {
  const index = floorList.findIndex(item => item.id === values.id);
  if (index !== -1) {
    const updatedFloorList = [...floorList];
    updatedFloorList[index] = values;
    setfloorList(updatedFloorList);
    console.log('updated floor list.....', updatedFloorList);
  } else {
    const updatedFloorList = [...floorList, values];
    setfloorList(updatedFloorList);
    console.log('updated floor list.....', updatedFloorList);
  }
};

useEffect(() => {
  {floorIndex == (props?.applicationData?.length) && props?.collectData('floor', floorList)}
}, [floorIndex])


useEffect(() => {
  props?.preData?.floor != undefined && props?.preData?.floor?.length > 0 && setprevFloor(props?.preData?.floor)
  props?.preData?.addFloor != undefined && props?.preData?.addFloor?.length > 0 && setprevAddFloor(props?.preData?.addFloor)
},[props?.preData])


  return (
    <>

            {addFloorStatus && <FloorDetails usageList={props?.usageType} occupancyList={props?.occupancyType} constructionList={props?.constructionList} floorList={props?.floorList} next={() => props.next()} back={() => backFun()} preData={prevAddFloor} collectData={(type, data) => {
                props?.collectData(type, data)
            }}/>}


        { 
          !addFloorStatus &&  props?.applicationData?.map((data, index) => (
            <>
              {index == floorIndex && <FloorRow data={data} preData={prevFloor} index={index} next={nextFun} back={backFun} usageList={props?.usageType} occupancyList={props?.occupancyType} constructionList={props?.constructionList} floorList={props?.floorList} collectData={collectData}/>}
            </>
            ))
        }

    
    </>
  )
}

export default FloorIndex