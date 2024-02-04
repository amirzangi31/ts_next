import convertParams from '@/utils/convertParams'
import React from 'react'

const DoctorsSearch = ({ params }: { params: { locale: string, slug: string[] } }) => {
    const {city , service , speciality ,region } = convertParams(params.slug)
    
    
    


    return (
        <div>DoctorsSearch</div>
    )   
}

export default DoctorsSearch