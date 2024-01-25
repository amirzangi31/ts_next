"use client";


import cn from "@/utils/clsxFun";
import React, { useState } from "react";

export type ProfileSummaryCardType = {
  title: string,
  subTitle: string,
  tags: string[],
  
  physician?: any,

}


const ProfileSummaryCard = (props: ProfileSummaryCardType) => {
  const [showMore, setShowMore] = useState(false);
  const { title, subTitle, tags } = props

  return (
    <div
      className={cn(
        `bg-white  p-5 shadow-shadow_category`,
        {
          "rounded-sm": showMore,
          "rounded-tr-sm rounded-tl-sm": !showMore,
        }
      )}
    >
      <div className="text-lg font-bold relative after:absolute after:rtl:-right-[20px] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full">
        {title}
      </div>
      <div
        className={cn(
          `mt-4  relative flex justify-start items-start gap-2 flex-col`,
          {
            "after:w-full after:h-[25px] after:absolute after:bottom-0 after:left-0 after:bg-white/70short-text-3": !showMore
          }
        )}
      >

        {/* <p>
          {`دکتر ${data.firstName} ${data.lastName} متخصص ${data.physicianSpecialities[0]?.specialityTitle} فعال در حوزه سلامت در شهر   ${data.cityName} در استان ${data.provinceName} میباشد`}
        </p>
        <p>
          {`آدرس مطب  دکتر ${data.firstName} ${data.lastName} : ${data.address}`}
        </p>
        <p>
          {`شماره تماس   دکتر ${data.firstName} ${data.lastName} : 0913xxxxxxx`}
        </p> */}
      </div>

      {showMore && (
        <div className=" animate-opacity">
          <div className="mt-4">
            <div className="text-lg font-bold relative after:absolute after:rtl:-right-[20px] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full">
              {subTitle}
            </div>
          </div>
          <div className={"flex justify-start items-center gap-2 mt-2"}>
            {tags.map((item : string, index : number) => (
              <p key={index}>#{item}</p>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-end items-center">
        <button
          type="button"
          className="text-primary text-lg font-bold"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "مشاهده کمتر" : "مشاهده بیشتر"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSummaryCard;
