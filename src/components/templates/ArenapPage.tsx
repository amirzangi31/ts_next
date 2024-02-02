
import React from 'react'


import TitlePagesMobile from '@modules/titles/TitlePagesMobile'
import LinkProfilePageCard from '@modules/cards/Link/LinkProfilePageCard'

const ArenapPage = () => {

      return (
            <>
                  <TitlePagesMobile title={"آرناپ"} />
                  <div className="container max-w-[1000px] pb-5 mt-4 flex justify-start items-start gap-4 flex-col">
                        <LinkProfilePageCard title={"قوانین و مقررات آرناپ"} link={`/arenap/rules`} />
                        <LinkProfilePageCard title={"تماس با ما"} link={`/arenap/contact`} />
                        <LinkProfilePageCard title={"درباره ما (آرناپ)"} link={`/arenap/about`} />
                        <LinkProfilePageCard title={"پرسش های متداول"} link={`/arenap/faq`} />
                  </div>
            </>
      )
}

export default ArenapPage