import PathLine from "@/components/elements/PathLine";
import cn from "@/utils/clsxFun";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PhysicianLoadingPrimaryCard = ({ freeMode }: { freeMode: boolean }) => {
  return (
    <div
      className={cn(
        `bg-white rounded-sm shadow-shadow_category min-h-[px]   flex justify-between items-start flex-col`,
        {
          "w-[320px]": freeMode,
          "w-full": !freeMode,
        }
      )}
    >
      <div className="p-4  w-full flex justify-between items-start">
        <div className="relative w-[60px]">
          <Skeleton circle={true} className=" w-[60px] h-[60px]" />
        </div>
        <div className="flex-1 rtl:pr-4 ltr:pl-4 flex justify-between items-start flex-col min-h-[60px]">
          <div className="w-2/4">
            <Skeleton />{" "}
          </div>
          <div className="w-3/4">
            <Skeleton />{" "}
          </div>
        </div>
      </div>
      <div className="px-4 w-full">
        <PathLine color={"stroke-bg_content"} />
      </div>
      <div className="px-4  w-full grid grid-cols-2 gap-1 py-2">
        <div className="w-3/4">
          <Skeleton className="h-[28px]" />{" "}
        </div>
        <div className="w-3/4">
          <Skeleton className="h-[28px]" />{" "}
        </div>
        <div className="w-3/4">
          <Skeleton className="h-[28px]" />{" "}
        </div>
        <div className="w-3/4">
          <Skeleton className="h-[28px]" />{" "}
        </div>
      </div>
      <div className="px-2 pb-2 w-full">
        <Skeleton className="h-[30px]" />
      </div>
    </div>
  );
};

export default PhysicianLoadingPrimaryCard;
