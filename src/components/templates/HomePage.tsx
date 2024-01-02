"use client"

import React from 'react'
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import { useTranslations } from 'next-intl'
import BottomNavigation from '../modules/menu/BottomNavigation';
import SectionTitle from '../modules/titles/SectionTitle';

import SwiperContainerFreeMode from '@modules/swiper/SwiperContianerFreeMode';

import CategoryPrimaryCard from '@modules/cards/CategoryPrimaryCard';


const HomePage = () => {

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

    return (
        <>
            <TitlePagesMobile title={t("home")} />
            <section>
                <SectionTitle
                    title={g("most-visited-specializations")}
                    textLink={g("View-more")}
                    link='/search'
                    btn={true}
                />
                <SwiperContainerFreeMode gap={10} data={categories} CardComponent={CategoryPrimaryCard} />
            </section >
            <BottomNavigation route='home' />
        </>
    )
}

export default HomePage