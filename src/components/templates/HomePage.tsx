"use client"

import React from 'react'
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import { useTranslations } from 'next-intl'
import BottomNavigation from '../modules/menu/BottomNavigation';
import SectionTitle from '../modules/titles/SectionTitle';

import SwiperContainerFreeMode from '@modules/swiper/SwiperContianerFreeMode';

import CategoryPrimaryCard from '@modules/cards/CategoryPrimaryCard';
import { PhysicainCardPrimaryType } from '@/types/cards';
import PhysicainCardPrimary from '@modules/cards/Physicain/PhysicianCardPrimary';
import articleData from '@/data/articleData';
import ArticleCardPrimary from '../modules/cards/Articles/ArticleCardPrimary';




interface HomePagePropType {
    physicians: PhysicainCardPrimaryType[]
}


const HomePage = (props: HomePagePropType) => {
    const { physicians } = props

    const g = useTranslations("global");
    const t = useTranslations("Routes_name_m");

    const categories = [
        {
            id: "1",
            title: "عمومی",
            image: "/orthoped.png",
            link: "dsafs"
        },
        {
            id: "2",
            title: "عمومی",
            image: "/orthoped.png",
            link: "dsafs"
        },
        {
            id: "3",
            title: "عمومی",
            image: "/orthoped.png",
            link: "dsafs"
        },
        {
            id: "4",
            title: "عمومی",
            image: "/orthoped.png",
            link: "dsafs"
        },
        {
            id: "5",
            title: "عمومی",
            image: "/orthoped.png",
            link: "dsafs"
        },
    ]

  const articles = [...articleData]


    return (
        <>
            <TitlePagesMobile title={t("home")} />
            {/* Best Specialities  */}
            <section>
                <SectionTitle
                    title={g("most-visited-specializations")}
                    textLink={g("View-more")}
                    link='/search'
                    btn={true}
                />
                <SwiperContainerFreeMode gap={10} data={categories} CardComponent={CategoryPrimaryCard} />
            </section >
            {/* Best Physicians */}
            {/* <section className='mt-6'>
                <SectionTitle
                    title={g("most-visited-specializations")}
                    textLink={g("View-more")}
                    link='/search'
                    btn={true}
                />
                <SwiperContainerFreeMode gap={10} data={physicians} CardComponent={PhysicainCardPrimary} />
            </section > */}
            {/* Newest Articles  */}
            <section className="mt-6">
                <SectionTitle
                    title={g("latest-articles")}
                    textLink={g("View-more")}
                    link='/search'
                    btn={true}
                />
                <SwiperContainerFreeMode gap={10} data={articles} CardComponent={ArticleCardPrimary} />
            </section>
            {/* User Comments  */}
            {/* <section className="mt-6">
                <SectionTitle
                    title={g("User-comments")}
                    textLink={g("View-more")}
                    link='/search'
                    btn={true}
                />
                <SwiperContainerFreeMode gap={10} data={physicians} CardComponent={PhysicainCardPrimary} />
            </section> */}
            <BottomNavigation route='home' />
        </>
    )
}

export default HomePage