"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import "react-loading-skeleton/dist/skeleton.css";




import ButtonElement from "@elements/ButtonElement";
import CloseButton from "@elements/CloseButton";
import Modal from "@modules/modals/Modal";
import BottomSheetAndCenterContent from "@modules/modals/BottomSheetAndCenterContent";
import useUserInfo from "@/hooks/useUserInfo";
import BottomNavigation from "@modules/menu/BottomNavigation";
import SidebarProfile from "@modules/cards/Profile/SidebarProfile";


const ProfileLayout = ({ children }: { children: ReactNode }) => {

    const local = useLocale();

    const { isLogin, getUser } = useUserInfo()
    const router = useRouter()
    const [logoutHintModalShow, setLogoutHintModalShow] = useState(false)
    const [finalLogoutModalShow, setFinalLogoutModalShow] = useState(false)

    const logoutHintModalHandler = () => {
        setLogoutHintModalShow(true)
    }
    const finalLogoutModalHandler = () => {
        closeHintModalHandler()
        setFinalLogoutModalShow(true)
    }

    const closeHintModalHandler = () => {
        setLogoutHintModalShow(false)
    }
    const closeFinalLogoutModalHandler = () => {
        setFinalLogoutModalShow(false)
    }

    const logoutHandler = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        getUser()
        router.replace(`/${local}/login`)
    }

    useEffect(() => {
        if (isLogin === "unauthorization") {
            router.replace(`/${local}/login`)
        }
    }, [isLogin])

    return (
        <div className=" max-w-[1300px] relative pb-5 container flex justify-start items-start gap-2">
            <SidebarProfile showLogoutModal={logoutHintModalHandler} />
           
            <div className="flex-1">
                {children}
            </div>
            <BottomNavigation
                route={"profile"}

            />
            
            <Modal show={logoutHintModalShow} closeHandler={closeHintModalHandler} >
                <BottomSheetAndCenterContent show={logoutHintModalShow}>
                    <span className='absolute top-[30px] rtl:left-[15px] ltr:right-[15px] xs:rtl:left-[30px] xs:ltr:right[30px]' ><CloseButton closeHanlder={closeHintModalHandler} /></span>

                    <p className="font-bold">
                        خارج شدن از حساب کاربری
                    </p>
                    <p className="text-md text-gray-600 mt-10">
                        در صورت خارج شدن از حساب کاربری بایستی برای وارد شدن دوباره به اپلیکیشن شماره تلفن خود را وارد کرده ئ سپس کد تاییدی که به صورت پیام به شما ارسال میشود را وارد کنید.
                    </p>
                    <div className="w-full mt-7">
                        <ButtonElement typeButton="primary" size="sm" handler={finalLogoutModalHandler}>خارج شدن از حساب کاربری</ButtonElement>
                    </div>
                </BottomSheetAndCenterContent>
            </Modal>
            <Modal show={finalLogoutModalShow} closeHandler={closeFinalLogoutModalHandler}>
                <div className='w-full h-full flex justify-center items-center z-10  '>
                    <div className='bg-white p-5 w-[300px] rounded-sm max-w-full'>
                        <div className='flex justify-end items-center '>
                            <CloseButton closeHanlder={closeFinalLogoutModalHandler} />
                        </div>
                        <div className='mt-1'>
                            حساب کاربری خود را ترک میکنید؟
                        </div>
                        <div className='mt-8 flex justify-between items-center gap-2 '>
                            <ButtonElement typeButton="gray" fontWeight="bold" size={"sm"} handler={logoutHandler}>
                                ترک کردن
                            </ButtonElement>
                            <ButtonElement typeButton="gray" fontWeight="bold" size={"sm"} handler={closeFinalLogoutModalHandler} >
                                انصراف
                            </ButtonElement>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ProfileLayout;
