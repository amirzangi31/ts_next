"use client"
import React, { useRef, useState } from 'react'
import ButtonElement from './ButtonElement'
import LocationIcon from '../icons/LocationIcon'
import useCity from '@/hooks/useCity'
import Loader from './Loader'
import cn from '@/utils/clsxFun'
import Modal from '../modules/modals/Modal'
import BottomSheetAndCenterContent from '../modules/modals/BottomSheetAndCenterContent'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import MagnifierIcon from '../icons/menu/MagnifierIcon'


const ChnageCityButton = () => {
  const { provinces, isLoadingProvince, step, cities, priviousHandler, cityName, setCityHandler, isLoadingCity, setAllProvince } = useCity()
  const contentRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const [searchText, setSearchText] = useState("")

  const showHandler = () => {
    setShow(!show)
  }

  const searchProvince = provinces?.filter((item: {
    id: number;
    name: string;

  }) => item.name.toLowerCase().includes(searchText.toLocaleLowerCase()))

  const serachCities = cities?.data?.value?.filter((item: {
    id: number;
    name: string;
    cities?: any;
  }) => item.name.toLowerCase().includes(searchText.toLocaleLowerCase()))

  return (
    <div className='relative  md:z-[51]'>
      <ButtonElement typeButton='primary' handler={showHandler} customStyle='group'>
        <span>{isLoadingCity ? <Loader size='size-[1.8rem]' color='border-white' /> : cityName}</span>
        <LocationIcon color='fill-white' />
      </ButtonElement>
      <span className={cn('fixed top-0 left-0 w-full h-screen bg-black/30 ', {
        "hidden": !show
      })} onClick={() => {
        setShow(false)
        priviousHandler()
      }}>

      </span>
      <div className='absolute top-full left-0 w-[10rem] h-[18.75rem] z-10  py-2'>
        {
          show ?
            <div ref={contentRef} className='hidden md:block bg-white shadow-shadow_category p-2 h-full rounded-sm overflow-y-auto'>
              {
                isLoadingProvince || cities.isLoading ? (<div className='h-full flex justify-center items-center'>
                  <Loader color='border-primary' size='size-[3.125rem]' />
                </div>) : null
              }
              <ul>
                {
                  step === 1 ? (
                    <>
                      <li
                        className="text-center  hover:font-bold hover:text-primary  py-2 cursor-pointer transition-all duration-500 relative after:absolute after:bottom-0 after:left-1/2 hover:after:left-0 after:transition-all after:duration-300 after:block after:w-0 hover:after:w-full after:h-[1px]  gradient_after"
                        onClick={() => {
                          setAllProvince()
                          setShow(false)
                        }}
                      >
                        همه استان ها
                      </li>
                      {
                        provinces?.map((item: {
                          id: number;
                          name: string;
                          cities?: any;
                        }, index: number) => <li
                          key={item.id}
                          className="text-center  hover:font-bold hover:text-primary  py-2 cursor-pointer transition-all duration-500 relative after:absolute after:bottom-0 after:left-1/2 hover:after:left-0 after:transition-all after:duration-300 after:block after:w-0 hover:after:w-full after:h-[1px]  gradient_after"
                          onClick={() => {
                            cities.mutate({ provinceId: item.id, provinceName: item.name })
                            contentRef?.current?.scrollTo({ top: 0, behavior: "smooth" })
                          }}
                        >
                            {item.name}
                          </li>)
                      }
                    </>
                  ) : null
                }

                {
                  step === 2 ? (
                    <>
                      <li

                        className="text-center  hover:font-bold hover:text-primary  py-2 cursor-pointer transition-all duration-500 relative after:absolute after:bottom-0 after:left-1/2 hover:after:left-0 after:transition-all after:duration-300 after:block after:w-0 hover:after:w-full after:h-[1px]  gradient_after"
                        onClick={priviousHandler}
                      >
                        انتخاب استان دیگر
                      </li>
                      {cities.data.value?.map((item: {
                        id: number;
                        name: string;
                        cities?: any;
                      }, index: number) => <li
                        key={item.id}
                        className="text-center  hover:font-bold hover:text-primary  py-2 cursor-pointer transition-all duration-500 relative after:absolute after:bottom-0 after:left-1/2 hover:after:left-0 after:transition-all after:duration-300 after:block after:w-0 hover:after:w-full after:h-[1px]  gradient_after"
                        onClick={() => {
                          setCityHandler(item.name, item.id)
                          priviousHandler()
                          setShow(false)
                        }}
                      >
                          {item.name}
                        </li>)}
                    </>
                  ) : null
                }
              </ul>
            </div> : null
        }


        <div className='md:hidden'>
          <Modal show={show} closeHandler={() => setShow(false)}>
            <BottomSheetAndCenterContent show={show}>


              <InputSearch value={searchText} changeHandler={(e) => setSearchText(e.target.value)} /> 


              {
                step === 1 ? (
                  <Swiper
                    modules={[EffectCoverflow]}
                    spaceBetween={10}
                    slidesPerView={5}
                    speed={1000}
                    effect='coverflow'
                    grabCursor={true}
                    centeredSlides={true}
                    direction={'vertical'}
                    className='swiper-vertical overflow-hidden'
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 20,

                      modifier: 3,
                      slideShadows: false
                      // slideShadows : true
                    }}
                  >
                    <SwiperSlide  >
                      <li
                        className="border-b border-gray-550 py-2 cursor-pointer text-center"
                        onClick={() => {
                          setAllProvince()
                          setShow(false)
                          setSearchText("")
                        }}
                      >
                        همه استان ها
                      </li>
                    </SwiperSlide>
                    {
                      searchProvince?.map((item: { id: number, name: string }) => (
                        <SwiperSlide key={item.id} >
                          <li
                            className="border-b border-gray-550 py-2 cursor-pointer text-center"
                            onClick={() => {
                              cities.mutate({ provinceId: item.id, provinceName: item.name })
                              setSearchText("")
                            }}
                          >
                            {item.name}
                          </li>
                        </SwiperSlide>
                      ))
                    }


                  </Swiper>
                ) : null
              }
              {
                step === 2 ? (
                  <Swiper
                    modules={[EffectCoverflow]}
                    spaceBetween={10}
                    slidesPerView={5}
                    speed={1000}
                    effect='coverflow'
                    grabCursor={true}
                    centeredSlides={true}
                    direction={'vertical'}
                    className='swiper-vertical overflow-hidden'
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 20,

                      modifier: 3,
                      slideShadows: false
                      // slideShadows : true
                    }}
                  >
                    <SwiperSlide  >
                      <li
                        className="border-b border-gray-550 py-2 cursor-pointer text-center"
                        onClick={
                          () => {
                            priviousHandler()
                            setSearchText("")
                          }
                        }
                      >
                        انتخاب استان دیگر
                      </li>
                    </SwiperSlide>
                    {
                      serachCities.map((item: {
                        id: number;
                        name: string;
                        cities?: any;
                      }, index: number) => (
                        <SwiperSlide key={item.id} >
                          <li
                            className="border-b border-gray-550 py-2 cursor-pointer text-center"
                            onClick={() => {
                              setCityHandler(item.name, item.id)
                              priviousHandler()
                              setSearchText("")
                              setShow(false)
                            }}
                          >
                            {item.name}
                          </li>
                        </SwiperSlide>
                      ))
                    }


                  </Swiper>
                ) : null
              }


            </BottomSheetAndCenterContent>
          </Modal>
        </div>

      </div>
    </div >
  )
}

export default ChnageCityButton



const InputSearch = ({ value, changeHandler }: { value: string, changeHandler: (e : React.ChangeEvent<HTMLInputElement>) => void }) => {


  return (
    <div className="bg-gray-100 rounded-xl w-full flex items-center">
      <input className="bg-gray-100 h-[2.5rem] rtl:pr-4 ltr:pl-4 rounded-xl w-[calc(100%-2.8125rem)]" value={value} onChange={changeHandler} type="text" placeholder={"جستجو"} />

      <div className="flex justify-center w-[2.8125rem]">
        <MagnifierIcon active={false} />
      </div>
    </div>
  )
}