
import Link from 'next/link'
import React from 'react'

import TitlePagesMobile from '@modules/titles/TitlePagesMobile'
import TitleHeading from '@modules/titles/TitleHeading'
import BaseH2Card from '@modules/cards/BaseH2Card'

const ContactUsPage = () => {


    return (
        <>
            <TitlePagesMobile title={"تماس با ما"} />
            <header className='py-4'>
                <TitleHeading title="تماس با آرناپ" />
            </header>
            <div className="container max-w-[62.5rem] pb-5 mt-4">
                <BaseH2Card title={"تماس با ما"}>
                    <div className='text-md  flex justify-start items-start gap-2 flex-col'>
                        <p>شماره تماس: <Link href={"tel:021910966760"}>6760 - 9109 - 021</Link> </p>
                        <p>اینستاگرام ما : <Link target='_blank' href={"https://www.instagram.com/arenap_team"} >Arenap_team@</Link> </p>
                        <p>لینکدین ما : <Link target='_blank' href={"https://www.linkedin.com/company/arenap-team"} >Arenap-team@</Link> </p>

                    </div>
                </BaseH2Card>
            </div>
            
        </>
    )
}

export default ContactUsPage