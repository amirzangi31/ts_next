import React from 'react'
import Image from 'next/image'

const OkIcon = ({ disabled }: { disabled: boolean }) => {
    return (
        <>
            {
                disabled ?
                    <Image src={"/OkIcon.png"} width={500} height={500} alt='okIcon' className='size-[1.5rem]' />
                    :
                    <Image src={"/OkGray.png"} width={500} height={500} alt='okIcon' className='size-[1.5rem]' />
            }
        </>
    )
}

export default OkIcon;