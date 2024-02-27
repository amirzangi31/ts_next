"use client"

import React from 'react'

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
import SearchHomePage from '@modules/search/SearchHomePage';
import FaqPage from './FaqPage';
import BestSpeciality from '@modules/BestSpeciality';
import TitleHeading from '@modules/titles/TitleHeading';
import ServicesSectionHome from '@modules/ServicesSectionHome';
import CommentSectionHomePage from '../modules/CommentSectionHomePage';



interface HomePagePropType {
    physicians: PhysicainCardPrimaryType[]
}


const HomePage = (props: HomePagePropType) => {
    const { physicians } = props





    // Static Data

    const articles = [...articleData]
    const comments = [...commentsList]



    return (
        <>
            <TitlePagesMobile title={"آرناپ، پلتفرم آنلاین سلامت"} />

            {/* ----------header------------- */}
            {/* Best Specialities  */}
            <header className='py-4'>

                <TitleHeading title="نوبت دهی اینترنتی پزشکان، مشاوره و ویزیت آنلاین" />

                <SearchHomePage physicians={physicians} />
            </header>
            {/* ----------header------------- */}

            {/* ----------section------------- */}
            {/* services  */}
            <section className='mt-6'>
                {/* <SectionTitle
                    title={"خدمات آرناپ"}
                    textLink={"مشاهده بیشتر"}
                    link='/'
                    btn={false}
                /> */}
                <ServicesSectionHome />
            </section>
            {/* ----------section------------- */}



            {/* ----------section------------- */}
            {/* Best Specialities  */}
            <section className='mt-6'>
                <BestSpeciality />
            </section >
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* Best Physicians */}
            <section className='mt-6'>
                <SectionTitle
                    title={"پربازدیدترین پزشکان"}
                    textLink={"مشاهده بیشتر"}
                    link='physicians'
                    btn={true}
                />
                <SwiperContainerFreeMode gap={10} data={physicians} CardComponent={PhysicainCardPrimary} />
            </section >
            {/* ----------section------------- */}



            {/* ----------section------------- */}
            {/* Newest Articles  */}
            <section className="mt-6">
                <SectionTitle
                    title={"جدیدترین مقالات"}
                    textLink={"مشاهده بیشتر"}
                    link='blog'
                    btn={true}
                />
                <SwiperContainerFreeMode gap={10} data={articles} CardComponent={ArticleCardPrimary} />
            </section>
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* User Comments  */}
            <section className="mt-6">
                <SectionTitle
                    title={"نظرات کاربران"}
                    textLink={"مشاهده بیشتر"}
                    link='/search'
                    btn={false}
                />
                {/* <SwiperContainerFreeMode gap={10} data={comments} CardComponent={CommentCardPrimary} /> */}
                <CommentSectionHomePage /> 
            </section>
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* faq */}
            <section className='mt-6'>
                <SectionTitle
                    title={"سوالات متداول"}
                    textLink={"مشاهده بیشتر"}
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