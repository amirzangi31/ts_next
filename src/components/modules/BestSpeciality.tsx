import React from 'react'
import SwiperContainerFreeMode from './swiper/SwiperContianerFreeMode'
import TitlePrimary from './titles/TitlePrimary'
import CategoryPrimaryCard from './cards/CategoryPrimaryCard'
import categoryData from '@/data/categoryData'

const BestSpeciality = () => {
    const categories = [...categoryData]

    return (
        <>
            <div className="py-4">
                <TitlePrimary
                    title={"پربازدیدترین تخصص ها"}
                    btn={false}
                    textLink={"مشاهده بیشتر"}
                />
            </div>

            <SwiperContainerFreeMode gap={10} data={categories} CardComponent={CategoryPrimaryCard} />
        </>
    )
}

export default BestSpeciality