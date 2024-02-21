import PhysiciansPage from '@/components/templates/PhysiciansPage'
import { apiDomainNobat } from '@/services/getApiUrlServer'
import urls from '@/services/urls'
import convertParams from '@/utils/convertParams'
import React from 'react'

const DoctorsSearch = async (props: {
    params: { locale: string, slug: string[] }, searchParams: {
        search_key: string,
        page: string,
        disease: string,
        sign: string,
        service: string,
        gender : string
    }
}) => {
    const { params, searchParams } = props
    const slugs = convertParams(props.params.slug)
    const specialities = await fetch(`${apiDomainNobat}${urls.specialities.getSpecialities.url}`)
    const specialitiesData = await specialities.json()

    const parametrs = {
        cityName: slugs.cityName ? slugs.cityName : "",
        specialty: slugs.specialty ? slugs.specialty : "",
        consultingPlan: slugs.consultingPlan ? slugs.consultingPlan : "",
        search_key: searchParams.search_key ? searchParams.search_key : "",
        page: searchParams.page ? searchParams.page : "",
        disease: searchParams.disease ? searchParams.disease : "",
        sign: searchParams.sign ? searchParams.sign : "",
        service: searchParams.service ? searchParams.service : "",
        gender: searchParams.gender ? searchParams.gender : ""
    }


    return (
        <PhysiciansPage slugs={parametrs} searchKey={searchParams.search_key} specialities={specialitiesData.value} />
    )
}

export default DoctorsSearch