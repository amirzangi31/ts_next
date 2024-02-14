"use client"


import { usePathname } from "next/navigation"

import ButtonBack from "@elements/ButtonBack"
import Image from "next/image"
import Link from "next/link"
import useUserInfo from "@/hooks/useUserInfo"
import cn from "@/utils/clsxFun"



const TitlePagesMobile = ({ title }: { title: string }) => {
    // pathname ur
    const pathName = usePathname()
    const { isLogin } = useUserInfo()



    return (
        <div className='fixed top-0 left-0 w-full md:hidden h-[4.8125rem] z-[15] flex justify-start items-center bg-primary'>
            <div className="container w-full flex justify-center items-center">
                <div className="absolute top-[calc(50%-1.25rem)] rtl:right-[1.25rem] ltr:left-[1.25rem]">
                    {pathName === "/" || pathName === "/en" ? "" : <ButtonBack />}
                </div>
                <p className="text-white font-bold text-lg px-[42px] text-center">{title}</p>
                {
                    isLogin === "unauthorization" ?

                        <div className={cn(
                            "absolute top-[calc(50%-1.25rem)] rtl:left-[12px] ltr:right-[12px]",
                            {
                                "hidden" : pathName === "/profile"
                            }
                        )}>
                            <Link href={`/login`} className={`size-[2.5rem] rounded-full flex justify-center items-center bg-white cursor-pointer `} >
                                <Image src={"/user.png"} width={500} height={500} className="w-full h-full" alt="profile_image" />
                            </Link>
                        </div>
                        :
                        <div className={cn(
                            "absolute top-[calc(50%-1.25rem)] rtl:left-[12px] ltr:right-[12px]",
                            {
                                "hidden" : pathName === "/profile"
                            }
                        )}>
                            <Link href={`/profile`} className={`size-[2.5rem] rounded-full flex justify-center items-center bg-white cursor-pointer `} >
                                <Image src={"/user.png"} width={500} height={500} className="w-full h-full" alt="profile_image" />
                            </Link>
                        </div>
                }

            </div>
        </div>
    )
}

export default TitlePagesMobile