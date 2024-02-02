"use client"


import { usePathname } from "next/navigation"

import ButtonBack from "@elements/ButtonBack"



const TitlePagesMobile = ({ title }: { title: string }) => {
    // pathname ur
    const pathName = usePathname()

    return (
        <div className='fixed top-0 left-0 w-full md:hidden h-[4.8125rem] z-[15] flex justify-start items-center bg-primary'>
            <div className="container w-full flex justify-center items-center">
                <div className="absolute top-[calc(50%-1.25rem)] rtl:right-[1.25rem] ltr:left-[1.25rem]">
                    {pathName === "/" || pathName === "/en" ? "" : <ButtonBack />}
                </div>
                <p className="text-white font-bold text-lg ">{title}</p>
            </div>
        </div>
    )
}

export default TitlePagesMobile