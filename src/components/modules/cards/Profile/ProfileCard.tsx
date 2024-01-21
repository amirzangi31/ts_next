"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AppointmentIcon from '@icons/profile/AppointmentIcon'
import EditIcon from '@icons/profile/EditIcon'
import MessageIcon from '@icons/profile/MessageIcon'
import MoreIcon from '@icons/profile/MoreIcon'
import WalletIcon from '@icons/profile/WalletIcon'
import { useLocale, useTranslations } from 'next-intl'
import LogoutIcon from '@/components/icons/LogoutIcon'

import ContentModalCenter from '../modal/ContentModalCenter'
import CloseButtonCom from '@/components/elements/buttons/CloseButtonCom'
import ButtonElement from '@/components/elements/buttons/ButtonElement'
import { removeCookies } from '@/services/cookie/cookiesOperation'

import { usePathname, useRouter } from 'next/navigation'


import UserIcon from '@/components/icons/menu/UserIcon'
import cn from '@/utils/clsxFun'
import Modal from '../../modals/Modal'






const ProfileCard = ({ user, type, showLogoutModal }) => {
    const { firstName, lastName, phoneNumber, nationalNumber } = user
    const t = useTranslations("profile")
    const p = useTranslations("person")
    const local = useLocale()


    const pathName = usePathname()


    return (
        <>
            <div className={cn(`relative w-full `, {

            })}>

                <div className='bg-white rounded-sm p-3.5 relative'>
                    <div className='flex justify-between items-center '>
                        <Link href={`/${local}/profile/edit`} className={cn(`z-[10]`, {
                            "-mt-6": pathName === "/profile" || pathName === "/en/profile" || pathName === "/fa/profile"
                        })}    ><EditIcon /></Link>
                        {/* <Link href={"/"}><MoreIcon /> </Link> */}
                        <div className={cn("", {
                            "absolute flex justify-center items-end w-full bg-white rounded-sm left-0  h-[80px]": pathName === "/profile" || pathName === "/en/profile" || pathName === "/fa/profile"
                        })}>
                            <div className='bg-white  rounded-full w-20 h-20 flex justify-center items-center -mt-[54px] '>
                                <Image src={"/user.png"} alt='user_picture' width={700} height={700} className=' h-[73px] rounded-lg w-[73px]' />
                            </div>
                        </div>


                        <button type='button' className={cn(`z-[10]`, {
                            "-mt-6": pathName === "/profile" || pathName === "/en/profile" || pathName === "/fa/profile"
                        })} onClick={showLogoutModal}><LogoutIcon /> </button>


                    </div>
                    <p className='flex justify-center items-center py-1 font-bold'>{firstName} {lastName}</p>
                    <div className={cn(`flex justify-center items-center gap-2 mt-4`, {
                        "flex-col": type
                    })}>
                        <div className='bg-gray-100 py-1 px-2 rounded-sm text-md'>
                            {p("nationalNumber")} : <span className='text-sm min-[430px]:text-md'>{nationalNumber}</span>
                        </div>
                        <div className='bg-gray-100 py-1 px-2 rounded-sm text-md'>
                            {p("phoneNumber")} : <span className='text-sm min-[430px]:text-md'>{phoneNumber}</span>
                        </div>
                    </div>
                    <div className={cn(`grid  mt-6  `, {
                        "grid-cols-3 h-[90px]": !type,
                        "grid-cols-1": type,

                    })} >
                        {
                            type && pathName !== "/profile" && pathName !== "/en/profile" && pathName !== "/fa/profile" ? (
                                <Link href={`/${local}/profile`} className={cn(`flex  items-center flex-col  gap-3 text-md font-bold text-primary   `, {
                                    "flex-col justify-center": !type,
                                    "flex-row justify-start py-3": type,
                                })} >
                                    <span><UserIcon /> </span>
                                    <span>{t("profile")}</span>
                                </Link>
                            ) : null
                        }
                        <Link href={"/"} className={cn(`flex  items-center flex-col  gap-3 text-md font-bold text-primary   `, {
                            "flex-col justify-center": !type,
                            "flex-row justify-start py-3": type,
                        })} >
                            <span><MessageIcon /> </span>
                            <span>{t("My-messages")}</span>
                        </Link>

                        <Link href={`/${local}/profile/myappointments`} className={cn(`flex  items-center flex-col  gap-3 text-md font-bold text-primary   `, {
                            "flex-col justify-center border-l-2 border-r-2 border-dashed": !type,
                            "flex-row justify-start py-3": type,
                        })} >
                            <span><AppointmentIcon /> </span>
                            <span>{t("appointments")}</span>
                        </Link>

                        <Link href={`/${local}/profile/wallet`} className={cn(`flex  items-center flex-col  gap-3 text-md font-bold text-primary   `, {
                            "flex-col justify-center": !type,
                            "flex-row justify-start py-3": type,
                        })} >
                            <span><WalletIcon /> </span>
                            <span>{t("wallet")}</span>
                        </Link>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfileCard