"use client"


import ChnageCityButton from '@/components/elements/ChangeCityButton'
import CloseButton from '@/components/elements/CloseButton'
import cn from '@/utils/clsxFun'
import React, { useEffect, useRef, useState } from 'react'
import SwiperContainerFreeMode from '../swiper/SwiperContianerFreeMode'
import { RelatedPhysicianType } from '@/types/physicianProfile'
import SearchSmallCard from '../cards/Search/SearchSmallCard'

import { useDebouncedCallback } from "use-debounce";
import axios from 'axios'
import { apiDomainNobat } from '@/services/getApiUrl'
import urls from '@/services/urls'
import Toastify from '@/components/elements/toasts/Toastify'


const SearchHomePage = ({ physicians }: { physicians: RelatedPhysicianType[] }) => {
    const input = useRef<HTMLInputElement>(null)

    const [showSearchContent, setShowSearchContent] = useState(false)
    const [searchText, setSearchText] = useState("")

    const [searchData, setSearchData] = useState({
        specialties: []
    })
    const focusHandler = () => {
        setShowSearchContent(true)
        input?.current?.focus()
    }

    console.log(searchData)

    const debouncedTextSearch = useDebouncedCallback((signal: any) => {
        if (searchText.length > 0) {
            const obj = {
                filter: searchText,
                cityId: 0,
                provinceId: 0
            }
            axios.post(`${apiDomainNobat}${urls.search.searchPrimary.url}`, obj, { signal }).then(res => {
                setSearchData(res.data.value)
            }).catch(error => {
                if (error.name === "CanceledError") {
                    return;
                }
                Toastify("error", "خطایی رخ داده است");
            })
        }
    }, 750)

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }


    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        debouncedTextSearch(signal);

        return () => {
            controller.abort();
        }
    }, [searchText])


    return (
        <div className={cn(
            'h-[3.3125rem] bg-white max-w-[50rem] mx-auto rounded-[10rem] p-2 flex justify-between items-center relative ', {
            "overflow-hidden": !showSearchContent
        }
        )}>
            <input className='md:hiddn text-md placeholder:text-gray-300 flex-1 text-right h-full z-[50]' onChange={changeHandler} value={searchText} placeholder='نام پزشک، تخصص ...' onFocus={focusHandler} />
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
                "md:absolute md:-top-[3rem] md:opacity-0 md:left-0 md:w-full md:h-0  md:pt-4 ",//descktop
                {
                    "top-0 left-0": showSearchContent,//mobile
                    "md:h-[40vh] md:top-full md:left-0 md:opacity-100 ": showSearchContent//descktop
                }
            )}>
                <div className={cn(
                    "w-full h-full overflow-hidden p-4",
                    " bg-bg_content shadow-shadow_category",//mobile
                    " md:rounded-sm md:bg-white md:shadow-shadow_category md:overflow-y-scroll ",//descktop
                )}>
                    {/* close button */}
                    <div className='p-4 flex justify-end items-center md:hidden'>
                        <CloseButton closeHanlder={() => setShowSearchContent(false)} />
                    </div>

                    {/* input search */}
                    <div className=' gap-5 h-[3.3125rem] md:hidden bg-white max-w-[50rem] mx-auto rounded-[10rem] p-2 flex justify-between items-center relative'>
                        <input ref={input} className='md:hiddn text-md placeholder:text-gray-300 flex-1 text-right h-full z-[50]' onChange={changeHandler} value={searchText} placeholder='نام پزشک، تخصص ...' />
                        <div>
                            <ChnageCityButton />
                        </div>
                    </div>

                    {/* specialities */}
                    <div>
                        <TitleSection title="تخصص ها" />
                        {/* <SwiperContainerFreeMode data={searchData?.specialties} CardComponent={} /> */}
                    </div>
                    {/* physicians */}
                    {/* cliniks */}

                    <div>
                        <TitleSection title="پزشک" />

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            {physicians.slice(0, 6).map((item, index) => <SearchSmallCard key={item.id} {...item} bg='md:bg-gray-200 bg-white' />)}
                        </div>

                    </div>


                </div>

            </div>
            {/* ----------Search Content------------- */}
        </div>
    )
}

export default SearchHomePage



const TitleSection = ({ title }: { title: string }) => {
    return (
        <p className='flex justify-start items-start  text-gray-300 font-bold text-md py-4'>{title}</p>
    )
}



