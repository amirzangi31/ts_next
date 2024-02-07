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
import CommentCardPrimary from '@modules/cards/Comments/CommentCardPrimary';
import SwiperContainerFreeMode from '@modules/swiper/SwiperContianerFreeMode';
import PhysicainCardPrimary from '@modules/cards/Physicain/PhysicianCardPrimary';
import BottomNavigation from '@modules/menu/BottomNavigation';
import SectionTitle from '@modules/titles/SectionTitle';
import TitlePagesMobile from '@modules/titles/TitlePagesMobile'
import SearchHomePage from '../modules/search/SearchHomePage';
import FaqPage from './FaqPage';
import cn from '@/utils/clsxFun';
import BestSpeciality from '../modules/BestSpeciality';
import TitleHeading from '../modules/titles/TitleHeading';



interface HomePagePropType {
    physicians: PhysicainCardPrimaryType[]
}


const HomePage = (props: HomePagePropType) => {
    const { physicians } = props

    // translations
    const g = useTranslations("global");
    const t = useTranslations("Routes_name_m");

    // Static Data

    const articles = [...articleData]
    const comments = [...commentsList]



    return (
        <>
            <TitlePagesMobile title={t("home")} />
            {/* ----------header------------- */}
            {/* Best Specialities  */}
            <header className='py-4'>
               
                <TitleHeading title="آرناپ : نوبت دهی اینترنتی پزشکان | مشاوره و ویزیت آنلاین" />

                <SearchHomePage physicians={physicians} />
            </header>
            {/* ----------header------------- */}

            {/* ----------section------------- */}
            {/* Best Specialities  */}
            <section>
                <BestSpeciality />
            </section >
            {/* ----------section------------- */}

            {/* ----------section------------- */}
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
            {/* ----------section------------- */}

            {/* ----------section------------- */}
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
            {/* ----------section------------- */}

            {/* ----------section------------- */}
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
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* faq */}
            <section className='mt-6'>
                <SectionTitle
                    title={"سوالات متداول"}
                    textLink={g("View-more")}
                    link='/faq'
                    btn={true}
                />
                <FaqPage />
            </section>
            {/* ----------section------------- */}



            <BottomNavigation route='home' />
        </>
    )
}

export default HomePage