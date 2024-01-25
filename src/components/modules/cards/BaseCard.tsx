
import cn from '@/utils/clsxFun'
import React, { ReactNode } from 'react'

export type BaseCardType = {
    title: string,
    children: ReactNode,
    radius?: string
}


const BaseCard = ({ title, children, radius = "rounded-sm" }: BaseCardType) => {
    return (
        <div className={cn(`bg-white p-5 shadow-shadow_category relative h-full w-full`, radius)}>
            <div className='text-lg font-bold relative after:absolute after:rtl:-right-[1.25rem] after:ltr:-left-[1.25rem] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full'>{title}</div>
            <div className='mt-6'>
                {children}
            </div>
        </div>
    )
}

export default BaseCard