"use client"
import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';



import { FreeMode, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import { ArticleCardType, CategoryPrimaryType, CommentCardPrimaryType, PhysicainCardPrimaryType } from '@/types/cards';
import { RelatedPhysicianType } from '@/types/physicianProfile';
import { SearchSmallCardType, SpecialitySearchTagType } from '@/types/search';



interface SwiperContainerFreeModeType {
    CardComponent: React.ComponentType<any>;
    gap?: number;
    data: CategoryPrimaryType[] | PhysicainCardPrimaryType[] | ArticleCardType[] | CommentCardPrimaryType[] | RelatedPhysicianType[] | SearchSmallCardType[] | SpecialitySearchTagType[]
}


const SwiperContainerFreeMode = ({ data, gap, CardComponent }: SwiperContainerFreeModeType) => {

    return (
        <Swiper
            spaceBetween={gap}
            slidesPerView="auto"
            speed={1000}
            modules={[FreeMode, Autoplay]}
            freeMode={true}
            dir="rtl"
        >
            {
                data?.map((item) => (
                    <SwiperSlide className='swiper_width_auto' key={item.id}>
                        <CardComponent {...item} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default SwiperContainerFreeMode
