import React from 'react'

const DcotorsCity = ({ params }: { params: { locale: string, city: string } }) => {
    console.log(params.city)
    return (
        <div>{params.city}</div>
    )
}

export default DcotorsCity;