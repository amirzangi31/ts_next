import PhysiciansPage from '@/components/templates/PhysiciansPage'
import convertParams from '@/utils/convertParams'
import React from 'react'

const DoctorsSearch = async(props: { params: { locale: string, slug: string[] }, searchParams: { search_key: string  } }) => {
    const { params, searchParams } = props
    const slugs = convertParams(props.params.slug)

    

    


    return (
        <PhysiciansPage slugs={slugs} searchKey={searchParams.search_key}  />
    )
}

export default DoctorsSearch