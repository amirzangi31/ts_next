"use client"


import clsx from "clsx"
import RadioButton from "./inputs/RadioButton"
import cn from "@/utils/clsxFun"

export type AppointmentRadioButtonType = {
    time: string,
    active: boolean,
    selected: boolean,
    handler: () => void,
    ramainingTime: number,
    index: number,
    calendarId: string,
    name: string
}


const AppointmentRadioButton = ({ name, time, active, selected, handler, ramainingTime, index, calendarId }: AppointmentRadioButtonType) => {

    return (
        <>

            <label
                className={cn("", {
                    "cursor-pointer":
                        ramainingTime === 0,
                })}
                htmlFor={`${calendarId}-${index}`}
            >
                <div className={clsx(`flex  rounded-[28px] justify-center items-center gap-3 font-bold h-[47px] w-[90px] relative shadow-shadow_category transition-all duration-300 overflow-hidden `,


                    {
                        "text-gray-400": !active,
                        "bg-primary text-white": selected && active,
                        "bg-white": !selected && active,
                        "cursor-default": !selected && !active,
                        " after:absolute  after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-primary after:w-full after:h-full after:-z-1 hover:after:bottom-0": !selected && active,

                    }
                )}>
                    {active && <div className={cn(`rounded-full w-[19px] h-[19px] flex items-center justify-center z-10 `, {
                        "bg-green-300": selected,
                        "bg-gray-100": !selected
                    })}>
                        {selected &&
                            <div className="z-10 rounded-full w-[11px] h-[11px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.5)]" />
                        }
                    </div>}
                    <span className="z-10">{time}</span>
                </div>
                <input
                    type="radio"
                    name={name}
                    disabled={ramainingTime > 0}
                    id={`${calendarId}-${index}`}
                    value={`${calendarId}-${index}`}
                    onChange={handler}
                    hidden
                />
            </label>
        </>
    )
}

export default AppointmentRadioButton
