import PhysiciansPage from '@/components/templates/PhysiciansPage'
import { apiDomainNobat } from '@/services/getApiUrlServer'
import urls from '@/services/urls'
import { DiseaseType, SignType } from '@/types/search'
import convertParams from '@/utils/convertParams'
import React from 'react'

const DoctorsSearch = async (props: {
    params: { locale: string, slug: string[] }, searchParams: {
        search_key: string,
        page: string,
        disease: string,
        sign: string,
        service: string,
        gender: string,
        city : string
    }
}) => {
    const { params, searchParams } = props
    const slugs = convertParams(props.params.slug)
    const specialities = await fetch(`${apiDomainNobat}${urls.specialities.getSpecialities.url}`, { next: { revalidate: 60 * 60 * 1 } })//one day
    const specialitiesData = await specialities.json()
    const services = await fetch(`${apiDomainNobat}${urls.services.url}`, { next: { revalidate: 60 * 60 * 1 } }) //one day
    const servicesData = await services.json()
   
    
    
  const serach = await fetch(`${apiDomainNobat}${urls.advanceSearch.serach.url}?Gender=0&ConsultingPlan=All&PageNumber=1&ItemsCountPerPage=10`)
  const searchData = await serach.json()

    

    const parametrs = {
        cityName: searchParams.city ? searchParams.city : "",
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
        <PhysiciansPage  searchParams={props.searchParams} slugs={parametrs} searchKey={searchParams.search_key} specialities={specialitiesData.value} services={servicesData.value} searchData={searchData?.value?.items} />
    )
}

export default DoctorsSearch