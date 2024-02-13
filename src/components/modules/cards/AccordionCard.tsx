
import ArrowLeft from "@/components/icons/ArrowLeft";
import cn from "@/utils/clsxFun";

export type AccordionCardType = {
      title: string,
      description: string,
      active: number | null,
      handler: (id : number) => void,
      id: number
}


const AccordionCard = ({ title, description, active, handler, id } : AccordionCardType) => {
      return (
            <div
                  className={`bg-white  p-5 shadow-shadow_category relative rounded-sm w-full cursor-pointer hover:bg-primary
                        transition-all duration-300 group
                  `}
                  onClick={() => handler(id)}
            >
                  <div className="text-lg flex justify-between items-center font-bold relative after:absolute after:rtl:-right-[1.25rem] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full">
                        <h2 className="group-hover:text-white transition-all duration-300">{title}</h2>
                        <span
                              className={cn(` transition-all duration-500`, {
                                    "rotate-90": active === id,
                              })}
                        >
                              <ArrowLeft />{" "}
                        </span>
                  </div>
                  <div
                        className={cn(`mt-6 animate-opacity group-hover:text-white transition-all duration-300`, {
                              "hidden": active !== id,
                        })}
                  >
                        {description}
                  </div>
            </div>
      );
};


export default AccordionCard