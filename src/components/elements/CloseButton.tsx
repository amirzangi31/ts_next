import React from 'react'
import CloseIcon from '@icons/CloseIcon'

const CloseButton = ({ closeHanlder }: { closeHanlder: () => void }) => {

    return (
        <div className='w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center bg-primary cursor-pointer' onClick={closeHanlder}>
            <CloseIcon color={"stroke-white"} />
        </div>
    )
}

export default CloseButton