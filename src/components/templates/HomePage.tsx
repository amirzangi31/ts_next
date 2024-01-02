import React from 'react'
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import { useTranslations } from 'next-intl'

const HomePage = () => {

    const g = useTranslations("global");
    const t = useTranslations("Routes_name_m");



    return (
        <>
            <TitlePagesMobile title={t("home")} />
        </>
    )
}

export default HomePage