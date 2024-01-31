"use client"
import React, { useState } from 'react'
import ButtonElement from './ButtonElement'
import LocationIcon from '../icons/LocationIcon'
import useCity from '@/hooks/useCity'
import Loader from './Loader'
import cn from '@/utils/clsxFun'

const ChnageCityButton = () => {
  const { provinces, isLoadingProvince, step, cities, priviousHandler , cityName ,setCityHandler } = useCity()
  const [show, setShow] = useState(false)
  const showHandler = () => {
    setShow(!show)
  }



  return (
    <div className='relative z-[50]'>
      <ButtonElement typeButton='primary' handler={showHandler} customStyle='group'>
        <span>{cityName}</span>
        <LocationIcon color='fill-white' />
      </ButtonElement>
      <span className={cn('fixed top-0 left-0 w-full h-screen bg-black/30 ', {
        "hidden": !show
      })} onClick={() => setShow(false)}>

      </span>
      <div className='absolute top-full left-0 w-[10rem] h-[300px] z-10  py-2'>
        {
          show ?
            <div className='hidden md:block bg-white shadow-shadow_category p-2 h-full rounded-sm overflow-y-auto'>
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
                        onClick={() => console.log("test")}
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
                          onClick={() => cities.mutate({provinceId : item.id , provinceName : item.name})}
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
                          setCityHandler(item.name , item.id)
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

      </div>
    </div>
  )
}

export default ChnageCityButton