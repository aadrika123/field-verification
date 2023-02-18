import React, { useContext } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { FiAlertCircle } from 'react-icons/fi'
import './TopBar.css'
import {ImCross} from 'react-icons/im'
import {GoThreeBars} from 'react-icons/go'
import logo1 from '../assets/images/logo1.png'
import { contextVar } from '../services/contextVar';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: 'none'
  },
};
Modal.setAppElement('#root');


const TopBar = () => {

    const {notify, setisLoggedIn} = useContext(contextVar)

  const [dropDown1, setdropDown1] = useState(false)
  const [dropDown2, setdropDown2] = useState(false)
  const [dropDown3, setdropDown3] = useState(false)
  const [navToggle, setnavToggle] = useState(false)

  const dropFun1 = () => {
    setdropDown1(!dropDown1)
    setdropDown2(false)
    setdropDown3(false)
  }

  const dropFun2 = () => {
    setdropDown2(!dropDown2)
    setdropDown1(false)
    setdropDown3(false)
  }

  const dropFun3 = () => {
    setdropDown3(!dropDown3)
    setdropDown2(false)
    setdropDown1(false)
  }

  const menuFalseFun = () => {
    setdropDown3(false)
    setdropDown2(false)
    setdropDown1(false)
  }

  const [modalIsOpen, setIsOpen] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()

    function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }
    const logOutUser = () => {
        navigate('/')
        closeModal()
        window.localStorage.removeItem('menuList')
        window.localStorage.removeItem('userName')
        window.localStorage.removeItem('roles')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('isLoggedIn')
    }

    const menuBtn = `block py-3 2xl:py-4 px-4 hover:text-white focus:text-white 2xl:text-base cursor-pointer text-sm `
    const dropMenuBtn = `block w-full py-2 px-6 clear-both whitespace-nowrap 2xl:text-base hover:text-indigo-600 text-sm`

    const mobileMenuBtn = `block py-3 px-4 hover:text-indigo-500 c focus:text-indigo-500`

  return (
    <>
    
      <header className='block select-none md:mb-16 mb-16'>

{/* =======navbar======== */}
          <nav className='nav-top flex flex-nowrap lg:flex-start items-center z-20 fixed top-0 left-0 right-0 bg-indigo-600 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500 overflow-y-auto  lg:overflow-visible'>
            <div class="container mx-auto px-4 xl:max-w-6xl ">

{/* ========mobile navigation========= */}
            <div class="flex flex-row justify-between lg:hidden">
            
            {/* ======logo======== */}
            <span class="flex items-center py-2 mr-4 text-xl cursor-pointer" onClick={() => {
              setnavToggle(false)
              navigate('/dashboard')
            }}>

            <h2 class="text-2xl font-semibold text-gray-200 px-4  overflow-hidden">
                
                <span>    <img src={logo1} alt="" className='w-10 inline mr-2'/></span>

              <span className='text-white'>RMC</span>

            </h2>

            </span>

            <div class="right-0 flex items-center cursor-pointer text-2xl z-10 text-white font-bold" onClick={() => setnavToggle(!navToggle)}>
            <GoThreeBars fontSize='large'/>
            </div>

            </div>

            {/* ======Mobile Menu========== */}
            {navToggle && <div class="lg:hidden fixed w-full h-full inset-0 z-40" id="mobile-menu">
            <span class="fixed bg-gray-900 bg-opacity-70 w-full h-full inset-x-0 top-0"></span>

            <nav id="mobile-nav" class="flex flex-col ltr:right-0 rtl:left-0 w-64 fixed top-0 py-4 bg-white text-gray-700 h-full overflow-auto z-40">

            <div class="mb-auto">

{/* ========logo========== */}
            <div class="mh-18 text-center px-12 mb-8">

            <span  class="flex relative">
            <h2 class="text-2xl font-semibold text-gray-200 max-h-9 flex flex-row items-center justify-between relative">
              <span className='absolute -left-9 z-10 text-lg cursor-pointer' onClick={() => setnavToggle(false)}><ImCross className='text-gray-600'/></span>
                  
                  <span  onClick={() => {
                    setnavToggle(false)
                    navigate('/dashboard')
                  }}>    <img src={logo1} alt="" className='w-10 inline mr-2'/></span>
                  <span  onClick={() => {
                    setnavToggle(false)
                    navigate('/dashboard')
                  }} className='text-indigo-600'>RMC</span>

            </h2>
            </span>

            </div>

{/* =====menus====== */}
<div class="mb-4 px-4">
                <nav class="relative flex flex-wrap items-center justify-between">
                  <ul id="side-menu" class="w-full float-none flex flex-col">
                    <li class="relative cursor-pointer">
                      <span  className={`${mobileMenuBtn}`} onClick={() => {
                        setnavToggle(false)
                        navigate('/dashboard')
                      }}>Home</span>
                    </li>

                    <li class="relative cursor-pointer">
                      <span id="mobiledrop-03" class="block py-3 px-4 hover:text-indigo-500 focus:text-indigo-500" onClick={() => dropFun1()}>
                        Property
                       
                        <span class="inline-block ltr:float-right rtl:float-left mt-1 pt-1">
                        </span>
                      </span>

                      {dropDown1 && <ul class="block rounded rounded-t-none top-full z-50 py-0.5 ltr:text-left rtl:text-right mb-4 bg-indigo-50" >
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Field Verification</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Water Harvesting <br /> Field Verification</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Missing Geotagging</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Form Distribution</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Pay Property Tax</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Reports</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/safform/new/0')
                          }}>Holding Apply</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Search Assesment</span>
                        </li>
                      </ul>}
                    </li>

                    <li class="relative cursor-pointer">
                      <span id="mobiledrop-03" class="block py-3 px-4 hover:text-indigo-500 focus:text-indigo-500" onClick={() => dropFun2()}>
                        Water
                       
                        <span class="inline-block ltr:float-right rtl:float-left mt-1 pt-1">
                        </span>
                      </span>

                      {dropDown2 && <ul class="block rounded rounded-t-none top-full z-50 py-0.5 ltr:text-left rtl:text-right mb-4 bg-indigo-50" >
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/water-apply')
                          }}>Apply Connection</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/water')
                          }}>Search Consumer</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/water')
                          }}>Water Connection Payment</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/water')
                          }}>Reports</span>
                        </li>
                      </ul>}
                    </li>

                    <li class="relative cursor-pointer">
                      <span id="mobiledrop-03" class="block py-3 px-4 hover:text-indigo-500 focus:text-indigo-500" onClick={() => dropFun3()}>
                        Trade
                       
                        <span class="inline-block ltr:float-right rtl:float-left mt-1 pt-1">
                        </span>
                      </span>

                      {dropDown3 && <ul class="block rounded rounded-t-none top-full z-50 py-0.5 ltr:text-left rtl:text-right mb-4 bg-indigo-50" >
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/trade-new-apply')
                          }}>Apply New License</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Search Application</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Search License</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Denial</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Report</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Apply Surrender</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Apply Amendment</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Apply Renewal</span>
                        </li>
                      </ul>}
                    </li>

                    <li class="relative cursor-pointer">
                      <span  className={`${mobileMenuBtn}`} onClick={() => navigate('/advertisement')}>Advertisement</span>
                    </li>
                    <li class="relative cursor-pointer">
                      <span  className={`${mobileMenuBtn}`} onClick={() => navigate('/editProfile')}>Visiting Detail</span>
                    </li>
                    <li class="relative cursor-pointer">
                      <span  className={`${mobileMenuBtn}`} onClick={() => navigate('/changePassword')}>Change Password</span>
                    </li>
                    <li className='relative'>
                      <button className='py-2 px-4 w-full text-sm inline-block text-center rounded leading-5 text-gray-100 bg-red-500 border border-pink-500 hover:text-gray-300 hover:bg-red-600 hover:ring-0 hover:border-red-600 focus:bg-red-600 focus:border-pink-600 focus:outline-none focus:ring-0 cursor-pointer' onClick={() => {
                        setnavToggle(false)
                        openModal()
                      }}>Log Out</button>
                    </li>
                  </ul>
                </nav>
              </div>

            </div>

              </nav>

            </div>}
            
             {/*End mobile */}

            {/* =========desktop====== */}

            <div onMouseLeave={() => menuFalseFun()} class="hidden lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between lg:mt-0" id="desktp-menu">

{/* ===logo======== */}
            <span class="hidden lg:flex items-center py-2 mr-2 text-xl" onClick={() => {
              setnavToggle(false)
              navigate('/dashboard')
            }}>
            <h2 class="text-2xl font-semibold px-4 overflow-hidden cursor-pointer">
             {/* image */}
              <span>    <img src={logo1} alt="" className='w-10 inline mr-2'/></span>
              <span className='text-white'>RMC</span>
            </h2>
          </span>

          {/* =========menu======= */}

          <ul class="flex flex-col lg:mx-auto mt-2 lg:flex-row lg:mt-0 text-gray-200">
          <li class="relative cursor-pointer">
            <span id="dropdown-01" class={`${menuBtn}`} onClick={() => {
              setnavToggle(false)
              navigate('/dashboard')
            }}>
                Home
              </span>
            </li>

          <li class="relative cursor-pointer">
              <span id="dropdown-01" class={`${menuBtn}`} onMouseEnter={dropFun1}>
                Property
                 {/* <!-- caret --> */}
                <span class="inline-block ltr:ml-2 rtl:mr-2">
                  {/* svg */}
                </span>
              </span>
              {/* <!-- dropdown menu --> */}
              {dropDown1 && <ul class="block absolute left-1/2 right-auto border-t-2 transform -translate-x-1/2 rounded top-full z-50 py-0.5 ltr:text-left rtl:text-right bg-white text-gray-700 shadow-md cursor-pointer">
                <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Field Verification</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Water Harvesting <br /> Field Verification</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Missing Geotagging</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Form Distribution</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Pay Property Tax</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Reports</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/safform/new/0')
                          }}>Holding Apply</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/search/property')
                          }}>Search Assesment</span>
                        </li>
              </ul>}
            </li>

            <li class="relative cursor-pointer">
              <span id="dropdown-01" class={`${menuBtn}`} onMouseEnter={dropFun2}>
                Water
                 {/* <!-- caret --> */}
                <span class="inline-block ltr:ml-2 rtl:mr-2">
                  {/* svg */}
                </span>
              </span>
              {/* <!-- dropdown menu --> */}
              {dropDown2 && <ul class="block absolute left-1/2 right-auto border-t-2 transform -translate-x-1/2 rounded top-full z-50 py-0.5 ltr:text-left rtl:text-right bg-white text-gray-700 shadow-md cursor-pointer">
                 <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/water-apply')
                          }}>Apply Connection</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/water')
                          }}>Search Consumer</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/water')
                          }}>Water Connection Payment</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/water')
                          }}>Reports</span>
                        </li>
              </ul>}
            </li>

            <li class="relative cursor-pointer">
              <span id="dropdown-01" class={`${menuBtn}`} onMouseEnter={dropFun3}>
                Trade
                 {/* <!-- caret --> */}
                <span class="inline-block ltr:ml-2 rtl:mr-2">
                  {/* svg */}
                </span>
              </span>
              {/* <!-- dropdown menu --> */}
              {dropDown3 && <ul class="block absolute left-1/2 right-auto border-t-2 transform -translate-x-1/2 rounded top-full z-50 py-0.5 ltr:text-left rtl:text-right bg-white text-gray-700 shadow-md cursor-pointer">
              <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`} onClick={() => {
                            setnavToggle(false)
                            navigate('/trade-new-apply')
                          }}>Apply New License</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Search Application</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Search License</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Denial</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Report</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Apply Surrender</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Apply Amendment</span>
                        </li>
                        <li class="relative cursor-pointer">
                          <span className={`${dropMenuBtn}`}onClick={() => {
                            setnavToggle(false)
                            navigate('/search/trade')
                          }}>Apply Renewal</span>
                        </li>
              </ul>}
            </li>

            <li class="relative cursor-pointer">
                      <span  className={`${menuBtn}`} onClick={() => navigate('/advertisement')}>Advertisement</span>
                    </li>
                    <li class="relative cursor-pointer">
                      <span  className={`${menuBtn}`} onClick={() => navigate('/editProfile')}>Visiting Detail</span>
                    </li>
                    <li class="relative cursor-pointer">
                      <span  className={`${menuBtn}`} onClick={() => navigate('/changePassword')}>Change Password</span>
                    </li>
          </ul>

          <div class="grid text-center lg:block my-2 lg:my-auto">
            <span class="py-2 px-4 text-sm inline-block text-center rounded leading-5 text-gray-100 bg-red-500 border border-pink-500 hover:text-gray-300 hover:bg-red-600 hover:ring-0 hover:border-red-600 focus:bg-red-600 focus:border-pink-600 focus:outline-none focus:ring-0 cursor-pointer" onClick={openModal}>
              Log Out
            </span>
          </div>


          {/* ====button====== */}

            </div>

            </div>

          </nav>

      </header>

      {/* ===========MODAL========= */}
      <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
                <button onClick={closeModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" >
                        <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div class="p-6 text-center">
                        <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
                        <h3 class="mb-5 text-lg font-normal text-gray-500">Are you sure you want to logout ?</h3>
                        <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={logOutUser}>
                            Yes, I'm sure
                        </button>

                    </div>
                </div>

            </Modal>

    </>
  )
}

export default TopBar