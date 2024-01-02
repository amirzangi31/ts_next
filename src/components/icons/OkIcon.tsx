import React from 'react'
import Image from 'next/image'

const OkIcon = ({ disabled }: { disabled: boolean }) => {
    return (
        <>
            {
                disabled ?
                    <Image src={"/OkIcon.png"} width={500} height={500} alt='okIcon' className='w-[24px] h-[24px]' />
                    :
                    <Image src={"/OkGray.png"} width={500} height={500} alt='okIcon' className='w-[24px] h-[24px]' />
            }
        </>
    )
}

export default OkIcon;