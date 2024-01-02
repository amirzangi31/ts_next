"use client"


import { usePathname } from "next/navigation"

import ButtonBack from "@elements/ButtonBack"



const TitlePagesMobile = ({ title }: { title: string }) => {
    // pathname ur
    const pathName = usePathname()

    return (
        <div className='fixed top-0 left-0 w-full md:hidden h-[77px] z-[53] flex justify-start items-center bg-primary'>
            <div className="container w-full flex justify-center items-center">
                <div className="absolute top-[calc(50%-20px)] rtl:right-[20px] ltr:left-[20px]">
                    {pathName === "/" || pathName === "/en" ? "" : <ButtonBack />}
                </div>
                <p className="text-white font-bold text-lg ">{title}</p>
            </div>
        </div>
    )
}

export default TitlePagesMobile