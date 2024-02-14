import React from 'react'
import LinkElement from '../elements/LinkElement'
import Image from 'next/image'
import servicesData, { ServicesDataType } from '@/data/servicesData'
import SwiperContainerFreeMode from './swiper/SwiperContianerFreeMode'
import cn from '@/utils/clsxFun'

const ServicesSectionHome = () => {

    const services = [...servicesData]



    return (
        <div className='mx-auto pt-4'>
            <SwiperContainerFreeMode data={services} CardComponent={ServicesCard} gap={10} />
        </div>
    )
}

export default ServicesSectionHome;



export const ServicesCard = (props: ServicesDataType) => {
    const { disabled, link, title, image } = props
    return (

        disabled ? (
            <div className={cn(
                ' h-full w-[16.25rem]  pt-4 px-4 rounded-md shadow-shadow_category flex justify-start items-center flex-col bg-white'
            )}>
                <div className='relative'>
                    <Image src={image} width={500} height={500} alt='services_image' className='w-full rounded-[0.875rem] grayscale' />

                </div>
                {/* <span className=' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-primary-100 text-sm'>(بزودی ... )</span> */}
                <h3 className='py-4 font-bold text-gray-500'>{title} </h3>
            </div>
        ) : (
            <LinkElement link={link} className={cn(
                ' h-full w-[16.25rem]  pt-4 px-4 overflow-hidden rounded-md shadow-shadow_category flex justify-start items-center flex-col bg-white group relative',
                "after:absolute after:-top-full after:-right-0 after:w-full after:h-full after:bg-primary after:transition-all after:duration-500 after:-z-1",
                "hover:after:right-0 hover:after:top-0 hover:shadow-shadow_comment"
            )}>

                <div className='z-[3] overflow-hidden rounded-[0.875rem] '>
                    <Image src={image} width={500} height={500} alt='services_image' className={cn(
                        'w-full  group-hover:scale-[1.2] transition-all duration-500',
                    )} />
                </div>

                <h3 className={cn(
                    'py-4 font-bold text-gray-500 transition-all duration-500 delay-500 z-[1]',
                    "group-hover:text-white "
                )}>{title}</h3>

            </LinkElement>
        )

    )
}