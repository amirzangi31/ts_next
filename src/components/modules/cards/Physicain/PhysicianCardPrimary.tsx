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
    firstName,
    lastName,
    cityName,
    hasImage,
    physicianProfileUrl,
    onlineAppointment,
    textConsultation,
    voiceConsultation,
    immediateConsultation,
    rate,
    physicianSpecialities,
}: PhysicainCardPrimaryType) => {

    const imageURL = hasImage ? getUrlImage(id) : "/noImage.jfif";

    return (
        <LinkElement
            link={`/Physician/${physicianProfileUrl}`}
            className={cn(
                `bg-white rounded-sm w-[320px] shadow-shadow_category min-h-[230px]  flex justify-between items-start flex-col`,

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
                                    "bg-primary-100": immediateConsultation,
                                    "bg-gray-400": !immediateConsultation,
                                }
                            )
                            }
                        ></span>
                    </span>
                </div>
                <div className="flex-1 rtl:pr-4 ltr:pl-4 flex justify-center gap-1 items-start flex-col min-h-[60px]">
                    <p className="text-lg font-bold ">{firstName} {lastName}</p>
                    <p className="text-md short-text-2">{physicianSpecialities[0]?.specialityTitle}</p>
                </div>
            </div>
            <div className="px-4 w-full">
                <PathLine color={"stroke-bg_content"} />
            </div>
            <div className="px-4 w-full grid grid-cols-2 gap-1">
                <TagPhysician
                    title={"نوبت دهی حضوری"}
                    disabled={onlineAppointment}
                />
                <TagPhysician
                    title={"مشاوره متنی"}
                    disabled={textConsultation}
                />
                <TagPhysician
                    title={"مشاوره متنی"}
                    disabled={voiceConsultation}
                />
                <TagPhysician
                    title={"مشاوره تلفنی فوری"}
                    disabled={immediateConsultation}
                />
            </div>
            <div className="px-2 pb-2 w-full">
                <div className="bg-gray-700 p-1 rounded-ss flex justify-between items-center min-h-[46px]">
                    <p className="px-5 relative border-l border-black border-dashed ">
                        {cityName}
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
