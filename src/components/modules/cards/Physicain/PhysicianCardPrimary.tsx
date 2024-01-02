import React from "react";
import Image from "next/image";
import Link from "next/link";
import PathLine from "@elements/PathLine";

import StarIcon from "@icons/StarIcon";
import ArrowLeftL from "@icons/ArrowLeftL";


import cn from "@utils/clsxFun";
import { getUrlImage } from "@services/getImageUrl/getImageUrl";




import TagPhysician from "@elements/TagPhysician";
import LinkElement from "@elements/LinkElement";
import { PhysicainCardPrimaryType } from "@/types/cards";






const PhysicainCardPrimary = ({
    id,
    link,
    name,
    category,
    freeMode,
    consultationPlanItems,
    city,
    rate,
    image,
}: PhysicainCardPrimaryType ) => {
    const consultationPlanItemsObj = consultationPlanItems;
    const imageURL = image ? getUrlImage(id) : "/noImage.jfif";

    return (
        <LinkElement
            link={`/${link}`}
            className={cn(
                `bg-white rounded-sm shadow-shadow_category min-h-[230px]  flex justify-between items-start flex-col`,
                {
                    "w-[320px]": freeMode,
                    "w-full": !freeMode,
                }
            )}
        >
            <div className="p-4  w-full flex justify-between items-start">
                <div className="relative">
                    <Image
                        src={imageURL}
                        width={500}
                        height={500}
                        alt="doctor_profile"
                        className="w-[60px] h-[60px] rounded-full"
                    />
                    <span className="w-[16px] h-[16px] bg-white rounded-full absolute bottom-0 rtl:right-0 ltr:left-0 flex justify-center items-center ">
                        <span
                            className={cn(`w-[12px] h-[12px] rounded-full `,
                                {
                                    "bg-primary-100": consultationPlanItemsObj.immediateConsultation.active,
                                    "bg-gray-400": !consultationPlanItemsObj.immediateConsultation.active,
                                }
                            )
                            }
                        ></span>
                    </span>
                </div>
                <div className="flex-1 rtl:pr-4 ltr:pl-4 flex justify-between items-start flex-col min-h-[60px]">
                    <p className="text-lg font-bold ">{name}</p>
                    <p className="text-md short-text-2">{category}</p>
                </div>
            </div>
            <div className="px-4 w-full">
                <PathLine color={"stroke-bg_content"} />
            </div>
            <div className="px-4 w-full grid grid-cols-2 gap-1">
                <TagPhysician
                    title={consultationPlanItemsObj.onlineAppointment.title}
                    disabled={consultationPlanItemsObj.onlineAppointment.active}
                />
                <TagPhysician
                    title={consultationPlanItemsObj.textConsultation.title}
                    disabled={consultationPlanItemsObj.textConsultation.active}
                />
                <TagPhysician
                    title={consultationPlanItemsObj.voiceConsultation.title}
                    disabled={consultationPlanItemsObj.voiceConsultation.active}
                />
                <TagPhysician
                    title={consultationPlanItemsObj.immediateConsultation.title}
                    disabled={consultationPlanItemsObj.immediateConsultation.active}
                />
            </div>
            <div className="px-2 pb-2 w-full">
                <div className="bg-gray-700 p-1 rounded-ss flex justify-between items-center min-h-[46px]">
                    <p className="px-5 relative border-l border-black border-dashed ">
                        {city}
                    </p>

                    <div className="flex px-5 justify-start items-center gap-1 ">
                        <span>
                            <StarIcon />
                        </span>
                        <span>{rate === 0 ? "-" : rate}</span>
                    </div>

                    <div className="flex-1">
                        <button
                            type="button"
                            className="w-full flex justify-end items-center gap-1 text-primary font-bold"
                        >
                            دریافت نوبت
                            <ArrowLeftL />
                        </button>
                    </div>
                </div>
            </div>
        </LinkElement>
    );
};

export default PhysicainCardPrimary;
