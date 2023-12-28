import { useTranslations } from 'next-intl'
import React from 'react'

const About = () => {
    const t = useTranslations("hello")


    return (
        <>
            <div>{t("title")}</div>
            <div className='p-4 bg-red-200'>

            </div>
        </>
    )
}

export default About