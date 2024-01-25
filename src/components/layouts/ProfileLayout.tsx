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

    useEffect(() => {
        
        if (isLogin === "unauthorization") {
            router.replace(`/${local}/login`)
        }
    }, [isLogin])

    return (
        <div className=" max-w-[81.25rem] relative pb-5 container flex justify-start items-start gap-2">
            <SidebarProfile  />
           
            <div className="flex-1">
                {children}
            </div>
            <BottomNavigation
                route={"profile"}

            />
            
           
        </div>
    );
};

export default ProfileLayout;
