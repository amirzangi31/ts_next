import React from 'react'
import LinkElement from '../elements/LinkElement'
import Image from 'next/image'
import servicesData, { ServicesDataType } from '@/data/servicesData'
import SwiperContainerFreeMode from './swiper/SwiperContianerFreeMode'

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
            <div className=' h-full w-[16.25rem]  pt-4 px-4 rounded-md shadow-shadow_category flex justify-start items-center flex-col bg-white'>
                <div className='relative'>
                    <Image src={image} width={500} height={500} alt='services_image' className='w-full rounded-[0.875rem] grayscale' />
                   
                </div>
                {/* <span className=' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-primary-100 text-sm'>(بزودی ... )</span> */}
                <h3 className='py-4 font-bold text-gray-500'>{title} </h3>
            </div>
        ) : (
            <LinkElement link={link} className=' h-full w-[16.25rem]  pt-4 px-4 rounded-md shadow-shadow_category flex justify-start items-center flex-col bg-white'>
                <div>
                    <Image src={image} width={500} height={500} alt='services_image' className='w-full rounded-[0.875rem]' />
                </div>
                <h3 className='py-4 font-bold text-gray-500'>{title}</h3>
            </LinkElement>
        )

    )
}