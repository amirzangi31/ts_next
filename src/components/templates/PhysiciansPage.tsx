"use client"
import React, { useEffect, useState } from 'react'
import SearchSectionPrimary from '@modules/search/SearchSectionPrimary'
import LinkElement from '@elements/LinkElement'
import ChnageCityButton from '@elements/ChangeCityButton'
import FilterIcon from '@icons/FilterIcon'
import ViewOrderIcon from '@icons/ViewOrderIcon'
import CloseIcon from '@icons/CloseIcon'
import { useDebouncedCallback } from 'use-debounce'
import { useCookies } from 'react-cookie'
import { usePathname, useRouter } from 'next/navigation'
import Loader from '@elements/Loader'



export type PhysiciansPageProps = {
    slugs?: {
        city?: string,
        speciality?: string,
        service?: string,
        region?: string
    },
    searchKey?: string | undefined
}


const PhysiciansPage = (props: PhysiciansPageProps) => {
    const pathName = usePathname()
    const [loadingPage, setLoadingPage] = useState(false)

    const [searchText, setSearchText] = useState(props.searchKey ? props.searchKey : "")
    const router = useRouter()



    const [cookies] = useCookies(["cityInfo"])
    const [showFilters, setShowFilters] = useState(false)
    const [infoSearch, setInfoSearch] = useState({
        city: props.slugs ? props.slugs.city : ""
    })


    const debouncedTextSearch = useDebouncedCallback(() => {
        if (!searchText) {
            router.push(pathName)
            setLoadingPage(false)
            return
        }
        router.push(`${pathName}?search_key=${searchText}`)
        setLoadingPage(false)

    }, 750)

    useEffect(() => {
        setLoadingPage(true)
        debouncedTextSearch()

    }, [searchText, cookies?.cityInfo])






    return (
        <>
            {/* ----------section------------- */}
            {/* serach component */}
            <section className='py-4'>
                <div className='h-[3.3125rem] bg-white max-w-[50rem] mx-auto rounded-[10rem] p-2 flex justify-between items-center relative '>
                    <input value={searchText} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (searchText.length >= 30) {
                            setSearchText(prev => {
                                const textSpliter = prev.split("")
                                const sliceTextSpliter = textSpliter.slice(0, 29)
                                const resultText = sliceTextSpliter.join("")
                                return resultText
                            })
                            return
                        }
                        setSearchText(event.target.value)
                    }} className='md:hiddn text-md placeholder:text-gray-300 flex-1 text-right h-full  md:z-[15]' placeholder='نام پزشک، تخصص ...' />
                    <ChnageCityButton />
                </div>
            </section>
            {/* ----------section------------- */}

            {/* ----------Laoder------------- */}
            {loadingPage && <Loader color='border-primary' size='size-[1.5rem]' />}
            {/* ----------Laoder------------- */}

            {/* ----------header------------- */}
            {/* header */}
            <header className='w-full rounded-sm shadow-shadow_category bg-white p-4'>
                {props.slugs && (<h1 className='text-xl font-bold text-center' >پزشکان <LinkElement link='/' className='font-bold text-primary underline'>{props.slugs.speciality}</LinkElement> برتر استان <LinkElement link={`physicians/city/${props.slugs.city}`} className='font-bold text-primary underline'>{props.slugs.city}</LinkElement> در آرناپ</h1>)}
                {!props.slugs && (<h1 className='text-xl font-bold text-center' >نوبت دهی از بهترین دکتر های ایران</h1>)}
            </header>
            {/* ----------header------------- */}

            {/* ----------section------------- */}
            {/* tags in mobile */}
            <section className='md:hidden'>
                    {/* <SwiperContainerFreeMode   /> */}
            </section>
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* filter button mobile */}
            <section className='md:hidden flex justify-between items-center gap-4 mt-6'>

                <button
                    type="button"
                    onClick={() => setShowFilters(true)}
                    className="bg-white w-[8.75rem] h-[3.4375rem] rounded-sm shadow-shadow_category flex justify-center items-center gap-2"
                >
                    <FilterIcon />
                    <span className="text-lg font-bold ">فیلترها</span>
                </button>
                <button
                    type="button"

                    className="flex justify-center items-center gap-2"
                >
                    <ViewOrderIcon />
                    <span className="text-lg font-bold ">نمایش براساس</span>
                </button>

            </section>
            {/* ----------section------------- */}

            {/* ----------main------------- */}
            <main className='flex justify-between items-start gap-4 mt-4'>

                {/* ----------section------------- */}
                {/* search section */}
                <section>
                    <SearchSectionPrimary showFilters={showFilters} closeFilterHandler={() => setShowFilters(false)} />
                </section>
                {/* ----------section------------- */}

                {/* ----------section------------- */}
                {/* Search content */}
                <section className='w-full'>
                    <div className='hidden md:flex justify-start items-center  gap-2 w-full text-md p-2 bg-white rounded-sm min-h-[2.8125rem]'>
                        <p className='font-bold text-primary min-w-fit'>نتایج فیلتر : </p>
                        <div className='flex justify-start items-center gap-2 flex-wrap'>
                            <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'>
                                <span className='text-gray-500'>کرمان</span>
                                <span ><CloseIcon color='stroke-gray-500' /> </span>
                            </div>
                            <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'>
                                <span className='text-gray-500'>فلوشیپ جراحی درون بین کلیه ادراری و تناسلی</span>
                                <span ><CloseIcon color='stroke-gray-500' /> </span>
                            </div>
                            <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'>
                                <span className='text-gray-500'>سنگ کلیه</span>
                                <span ><CloseIcon color='stroke-gray-500' /> </span>
                            </div>
                            <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'>
                                <span className='text-gray-500'>خانم</span>
                                <span ><CloseIcon color='stroke-gray-500' /> </span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ----------section------------- */}
            </main>
            {/* ----------main------------- */}
        </>
    )
}

export default PhysiciansPage