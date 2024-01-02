import React from 'react'
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import { useTranslations } from 'next-intl'
import BottomNavigation from '../modules/menu/BottomNavigation';

const HomePage = () => {

    const g = useTranslations("global");
    const t = useTranslations("Routes_name_m");



    return (
        <>
            <TitlePagesMobile title={t("home")} />
            <BottomNavigation route='home' />
        </>
    )
}

export default HomePage