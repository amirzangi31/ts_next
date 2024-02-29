"use client"
import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';



import { FreeMode, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import { ArticleCardType, AutohrCardType, CategoryPrimaryType, CommentCardPrimaryType, PhysicainCardPrimaryType } from '@/types/cards';
import { RelatedPhysicianType } from '@/types/physicianProfile';
import { PhysicianSpecialityType, SearchSmallCardType, SpecialitySearchTagType } from '@/types/search';
import { ServicesDataType } from '@/data/servicesData';
import { FilterTagProps } from '@/components/elements/FilterTag';



interface SwiperContainerFreeModeType {
    CardComponent: React.ComponentType<any>;
    gap?: number;
    data: CategoryPrimaryType[] | PhysicainCardPrimaryType[] | ArticleCardType[] | CommentCardPrimaryType[] | RelatedPhysicianType[] | SearchSmallCardType[] | SpecialitySearchTagType[] | PhysicianSpecialityType[] | AutohrCardType[] | ServicesDataType[] | FilterTagProps[]
}


const SwiperContainerFreeMode = ({ data, gap, CardComponent }: SwiperContainerFreeModeType) => {

    return (
        <Swiper
            spaceBetween={gap}
            slidesPerView="auto"
            speed={1000}
            modules={[FreeMode, Autoplay]}
            freeMode={true}
            centerInsufficientSlides={true}
            dir="rtl"
        >
            {
                data?.map((item, index) => (
                    <SwiperSlide className='swiper_width_auto' key={item.id ? item.id : index}>
                        <CardComponent {...item} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default SwiperContainerFreeMode
