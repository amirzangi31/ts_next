"use client"

import React from 'react'
import { useTranslations } from 'next-intl'
// data
import commentsList from '@/data/commentData';
import articleData from '@/data/articleData';
// types
import { PhysicainCardPrimaryType } from '@/types/cards';
// components
import ArticleCardPrimary from '@modules/cards/Articles/ArticleCardPrimary';
import CategoryPrimaryCard from '@modules/cards/CategoryPrimaryCard';
import CommentCardPrimary from '@modules/cards/Comments/CommentCardPrimary';
import SwiperContainerFreeMode from '@modules/swiper/SwiperContianerFreeMode';
import PhysicainCardPrimary from '@modules/cards/Physicain/PhysicianCardPrimary';
import BottomNavigation from '@modules/menu/BottomNavigation';
import SectionTitle from '@modules/titles/SectionTitle';
import TitlePagesMobile from '@modules/titles/TitlePagesMobile'
import useModalLogin from '@/hooks/useModalLogin';
import ModalLogin from '../layouts/ModalLogin/ModalLogin';



interface HomePagePropType {
    physicians: PhysicainCardPrimaryType[]
}


const HomePage = (props: HomePagePropType) => {
    const { physicians } = props

    // translations
    const g = useTranslations("global");
    const t = useTranslations("Routes_name_m");



    // Static Data
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
    const comments = [...commentsList]

    const { openModalLogin } = useModalLogin()





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
            <section className='mt-6'>
                <SectionTitle
                    title={g("most-visited-specializations")}
                    textLink={g("View-more")}
                    link='/search'
                    btn={true}
                />
                <SwiperContainerFreeMode gap={10} data={physicians} CardComponent={PhysicainCardPrimary} />
            </section >
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
            <section className="mt-6">
                <SectionTitle
                    title={g("User-comments")}
                    textLink={g("View-more")}
                    link='/search'
                    btn={true}
                />
                <SwiperContainerFreeMode gap={10} data={comments} CardComponent={CommentCardPrimary} />
            </section>


            <button type='button' className='text-xl font-bold' onClick={openModalLogin}>showModal login</button>

            <ModalLogin /> 
            <BottomNavigation route='home' />
        </>
    )
}

export default HomePage