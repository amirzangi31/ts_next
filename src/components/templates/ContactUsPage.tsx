
import Link from 'next/link'
import React from 'react'
import BaseCard from '@modules/cards/BaseCard'
import TitlePagesMobile from '@modules/titles/TitlePagesMobile'

const ContactUsPage = () => {


    return (
        <>
            <TitlePagesMobile title={"تماس با ما"} />
            <div className="container max-w-[1000px] pb-5 mt-4">
                <BaseCard title={"تماس با ما"}>
                    <div className='text-md  flex justify-start items-start gap-2 flex-col'>
                        <p>شماره تماس: <Link href={"tel:021910966760"}>6760 - 9109 - 021</Link> </p>
                        <p>اینستاگرام ما : <Link target='_blank' href={"https://www.instagram.com/arenap_team"} >Arenap_team@</Link> </p>
                        <p>لینکدین ما : <Link target='_blank' href={"https://www.linkedin.com/company/arenap-team"} >Arenap-team@</Link> </p>

                    </div>
                </BaseCard>
            </div>
            
        </>
    )
}

export default ContactUsPage