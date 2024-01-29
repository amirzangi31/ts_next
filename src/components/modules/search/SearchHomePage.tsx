"use client"


import ChnageCityButton from '@/components/elements/ChangeCityButton'
import CloseButton from '@/components/elements/CloseButton'
import cn from '@/utils/clsxFun'
import React, { useState } from 'react'
import SwiperContainerFreeMode from '../swiper/SwiperContianerFreeMode'

const SearchHomePage = () => {
    const [showSearchContent, setShowSearchContent] = useState(true)
    const focusHandler = () => {
        setShowSearchContent(true)
    }

    // const data =[
    //     {

    //     }
    // ]
    return (
        <div className='h-[3.3125rem] bg-white max-w-[50rem] mx-auto rounded-[10rem] p-2 flex justify-between items-center relative'>
            <input className='md:hiddn text-md text-gray-300 flex-1 text-right h-full' placeholder='نام پزشک، تخصص ...' onFocus={focusHandler} />
            <div>
                <ChnageCityButton />
            </div>

            <span className={cn(
                "fixed w-0 h-0  block top-0 left-0 z-[50]",
                {
                    "w-full h-screen": showSearchContent
                }
            )} onClick={() => setShowSearchContent(false)}></span>

            {/* ----------Search Content------------- */}
            {/* Content */}
            <div className={cn(
                "transition-all duration-500",
                "fixed top-full left-full w-full h-screen z-[50]",//mobile
                "md:absolute md:top-full md:left-0 md:w-full md:h-0  md:pt-4",//descktop
                {
                    "top-0 left-0": showSearchContent,//mobile
                    "md:h-[40vh]": showSearchContent//descktop
                }
            )}>
                <div className={cn(
                    "w-full h-full overflow-hidden p-4",
                    " bg-bg_content shadow-shadow_category",//mobile
                    " md:rounded-sm md:bg-white md:shadow-shadow_category",//descktop
                )}>

                    <div className='p-4 flex justify-end items-center md:hidden'>
                        <CloseButton closeHanlder={() => setShowSearchContent(false)} />
                    </div>
                    {/* specialities */}
                    <div>
                        <p className='flex justify-start items-start text-gray-300 font-bold text-sm'>تخصص ها </p>
                        <SwiperContainerFreeMode   /> 
                    </div>
                    {/* physicians */}
                    {/* cliniks */}
                </div>
            </div>
            {/* ----------Search Content------------- */}
        </div>
    )
}

export default SearchHomePage