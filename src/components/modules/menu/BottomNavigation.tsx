"use client"
import { useTranslations } from "next-intl";

import cn from "@utils/clsxFun";

import LinkElement from "@/components/elements/LinkElement";

// import useAuth from "@/hooks/useAuth";

import HomeIcon from "@icons/menu/HomeIcon";
import BlogIcon from "@icons/menu/BlogIcon";
import MagnifierIcon from "@icons/menu/MagnifierIcon";
import ProfileIcon from "@icons/menu/ProfileIcon";

const BottomNavigation = ({ route }: { route: string }) => {
    const t = useTranslations("Menu");
    // const { isLogin } = useAuth(true)

    return (
        <div className="fixed bottom-0 left-0 w-full h-[4.875rem] bg-white flex justify-between items-center flex-row-reverse md:hidden px-8 z-[10] shadow-shadow_bottom_nav">

            {/* Blog button */}
            <LinkElement
                link={`/blog`}
                className={cn(
                    `flex justify-center items-center gap-1 flex-col-reverse text-sm `,
                    {
                        "text-primary font-bold": route === "blog",
                        "text-black font-normal": route !== "blog",
                    }
                )}
            >
                <span>{t("blog")}</span>
                <span>
                    <BlogIcon active={route === "blog" ? true : false} />
                </span>
            </LinkElement>
            {/* Home button */}
            <LinkElement
                link={`/`}
                className={cn(
                    `flex justify-center items-center gap-1 flex-col-reverse text-sm `,
                    {
                        "text-primary font-bold": route === "home",
                        "text-black font-normal": route !== "home",
                    }
                )}
            >
                <span>{t("home")}</span>
                <span>
                    <HomeIcon active={route === "home"} />{" "}
                </span>
            </LinkElement>
            {/* Search button */}
            <LinkElement
                link={`/search`}
                className={cn(
                    `flex justify-center items-center gap-1 flex-col-reverse text-sm `,
                    {
                        "text-primary font-bold": route === "search",
                        "text-black font-normal": route !== "search",
                    }
                )}
            >
                <span>{t("search")}</span>
                <span>
                    <MagnifierIcon active={route === "search" ? true : false} />
                </span>
            </LinkElement>
            {/* if authorization === true profile button else login button */}
            {false ? (
                <LinkElement
                    link={`/profile`}

                    className={cn(
                        `flex justify-center items-center gap-1 flex-col-reverse text-sm `,
                        {
                            "text-primary font-bold": route === "profile",
                            "text-black font-normal": route !== "profile",
                        }
                    )}
                >
                    <span>{t("profile")}</span>
                    <span>
                        <ProfileIcon active={route === "profile"} />
                    </span>
                </LinkElement>
            ) : (
                <LinkElement
                    link={`/login`}

                    className={cn(
                        `flex justify-center items-center gap-1 flex-col-reverse text-sm `,
                        {
                            "text-primary font-bold": route === "login",
                            "text-black font-normal": route !== "login",
                        }
                    )}
                >
                    <span>{t("sign")}</span>
                    <span>
                        <ProfileIcon active={route === "login" ? true : false} />
                    </span>
                </LinkElement>
            )}
        </div>
    );
};

export default BottomNavigation;
