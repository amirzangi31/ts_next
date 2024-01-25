import React from "react";
import ArrowLeft from "@icons/ArrowLeft";
import { useLocale } from "next-intl";
import cn from "@/utils/clsxFun";
import ButtonElement from "@/components/elements/ButtonElement";
import LinkElement from "@/components/elements/LinkElement";

export type TitlePrimaryType = {
    title?: string,
    link?: string,
    textLink?: string,
    btn?: boolean,
    prefix?: boolean,
    handler?: () => void,
    subTitle?: string
}


const TitlePrimary = ({
    title,
    link,
    textLink,
    btn,
    prefix = false,
    handler,
    subTitle
}: TitlePrimaryType) => {
    return (
        <div className="flex justify-between items-center">
            <h3
                className={cn(`text-lg font-bold `, {
                    "rtl:mr-[20px] ltr:ml-[20px] relative after:absolute after:rtl:-right-[20px] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full":
                        prefix,
                })}
            >
                {title} {subTitle ? `(${subTitle})` : ""}
            </h3>
            {btn && link && (
                <LinkElement link={`/${link}`} >
                    <div className="w-[120px]">
                        <ButtonElement
                            typeButton="gray-light"
                            fontSize="sm"
                            type={"button"}
                            size="sm"
                        >
                            {textLink}
                            <span className="ltr:rotate-180">
                                <ArrowLeft />
                            </span>
                        </ButtonElement>
                    </div>
                </LinkElement>
            )}
            {btn && !link && (
                <div className="w-[120px]">
                    <ButtonElement
                        typeButton="gray-light"
                        fontSize="sm"


                        type={"button"}
                        size="sm"

                        handler={handler}
                    >
                        {textLink}
                        <span className="ltr:rotate-180">
                            <ArrowLeft />
                        </span>
                    </ButtonElement>
                </div>
            )}
        </div>
    );
};

export default TitlePrimary;
