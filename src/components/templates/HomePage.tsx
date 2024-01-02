import React from 'react'
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import { useTranslations } from 'next-intl'
import BottomNavigation from '../modules/menu/BottomNavigation';
import SectionTitle from '../modules/titles/SectionTitle';

const HomePage = () => {

    const g = useTranslations("global");
    const t = useTranslations("Routes_name_m");



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
                
            </section>
            <BottomNavigation route='home' />
        </>
    )
}

export default HomePage