import React from 'react'
import Image from 'next/image'

import LinkElement from '@/components/elements/LinkElement'
import { CategoryPrimaryType } from '@/types/cards'
import cn from '@/utils/clsxFun'

const CategoryPrimaryCard = ({ link, title, image }: CategoryPrimaryType) => {
    return (
        <LinkElement link={`${link}`} className={cn(` border rounded-md shadow-shadow_category flex justify-center items-center  bg-white p-2 text-center text-lg font-[400] group`,
            "hover:font-bold hover:border hover:border-gray-400  ",
            "transition-all duration-500",
            {
                "flex-col size-[6.25rem]": image,
                "size-[5.625rem]": !image
            })}>
            {image && <Image src={image} width={500} height={500} alt='category_image' className='w-[2.1875rem] group-hover:scale-110 transition-all duration-500 ' />}
            {title}
        </LinkElement>
    )
}

export default CategoryPrimaryCard