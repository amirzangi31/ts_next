import React from 'react'
import OkIcon from '@icons/OkIcon'

const TagPhysicain = ({ title, disabled } : {title : string , disabled : boolean}) => {
    return (
        <div className='flex justify-start  items-center gap-1 text-md'>
            <OkIcon disabled={disabled} />
            {title}
        </div>
    )
}

export default TagPhysicain