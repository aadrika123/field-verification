import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {ImCross} from 'react-icons/im'
import { RotatingLines } from 'react-loader-spinner';
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import ApiHeader from '../../../api/ApiHeader';
import ProjectApiList from '../../../api/ProjectApiList';

const ForwardScreen = (props) => {

    const navigate = useNavigate()
    
    const {api_postApplicationToLevel} = ProjectApiList()

    const [comment, setcomment] = useState('')
    const [loader, setloader] = useState(false)

    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => {
      setIsOpen(false);
    };
    const afterOpenModal = () => {};

    useEffect(() => {
        console.log("enter in submission screen with application no.  =>  ", props?.id)
        props?.openScreen == true && openModal()
      }, [props?.openScreen])

      const closeAction = () => {
        closeModal()
        props.navigation()
      }

      const forwardFun = () => {
        
        if(comment == '') {
            toast.info('Write comment...')
            return
        }

        setloader(true)

        let body = {
            applicationId : props?.id,
            action : 'forward',
            comment : comment 
        }

        console.log('data before forward => ', body)
        axios.post(api_postApplicationToLevel, body, ApiHeader())
        .then((res) => {
            setloader(false)
            console.log('success forward => ', res)
            toast.success('Forwarded Successfully !!!')
            navigate('/search/property')
        })
        .catch((err) => {
            setloader(false)
            console.log('error forward => ', err)
        })
      }

  return (
    <>
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
      contentLabel="Example Modal"
    >
      <div class=" rounded-lg shadow-lg shadow-indigo-300 md:w-[50vw] md:h-max w-full relative border-2 border-indigo-500 bg-gray-50 px-2 m-2 py-4 h-max border-t-2 border-l-2 overflow-auto">
      <div className="absolute top-2 z-10 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={() => closeAction()}>
                  <ImCross fontSize={10}/>
              </div>

              <div className='flex flex-col items-center'>
                    <div className="mt-6 mb-4 bg-indigo-600 font-semibold rounded-sm w-full 2xl:text-2xl text-lg text-center shadow-sm text-white px-4 py-2 poppins uppercase">
                        Workflow Action
                    </div>
                <div>
                    <label htmlFor="comment">Comment :</label>
                    <textarea name="comment" onChange={(e) => setcomment(e.target.value)} className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' id="" cols="30" rows="3"></textarea>
                </div>
                
                {
            loader ? 
            <div className='flex justify-center'>
                                            <RotatingLines
                                                strokeColor="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="25"
                                                visible={true}
                                            />
                                        </div>
                                         :
                <button onClick={() => forwardFun()} className="2xl:px-6 px-3 py-1.5 2xl:py-2.5 cursor-pointer bg-green-500 text-white font-medium text-xs  poppins rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Forward</button>}
              </div>

        <div className="poppins text-xl font-semibold w-full pt-6 md:px-8 px-2">

        </div>
        </div>
      </Modal>
    </>
  )
}

export default ForwardScreen