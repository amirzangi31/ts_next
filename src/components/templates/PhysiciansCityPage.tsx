"use client"
import React from 'react'
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import useCity from '@/hooks/useCity'
import LinkElement from '../elements/LinkElement'
import Image from 'next/image'

const PhysiciansCityPage = ({ data, city }: {
    data: {
        specialtyId: number
        specialtyName: string
        specialtyEnName: string
        physicianCount: number
    }[], city: string
}) => {


    const { provinces, isLoadingCity } = useCity()

    return (
        <>
            <TitlePagesMobile title={`تخصص های شهر ${provinces.find((item: {
                cityId: number,
                cityName: string,
                centerName: string,
                provinceId: number,
                provinceName: string,
                cityEnName: string
            }) => item.cityEnName === city)?.cityName}`} />

            <div className=" mt-4 rounded-sm bg-white max-w-[118.75rem] w-full border overflow-x-scroll breadcrumb">
                <div className="  p-2 flex justify-start items-center gap-2 w-fit text-primary rounded-sm">
                    <LinkElement link="" className="text-sm text-primary min-w-fit">
                        <Image src={"/favicon.png"} width={500} height={500} alt='icon' className='size-[2rem]' />
                    </LinkElement>
                    <LinkElement link="physicians" className="text-sm text-primary min-w-fit">دکترها </LinkElement>/
                    <div className="text-sm text-primary min-w-fit">دکترهای {provinces.find((item: {
                        cityId: number,
                        cityName: string,
                        centerName: string,
                        provinceId: number,
                        provinceName: string,
                        cityEnName: string
                    }) => item.cityEnName === city)?.cityName}</div>


                </div>
            </div>


            {/* ----------header------------- */}
            
            {/* ----------header------------- */}


        </>
    )
}

export default PhysiciansCityPage