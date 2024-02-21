import React from 'react'
import PhysiciansPage from '@templates/PhysiciansPage'
import { apiDomainNobat } from '@/services/getApiUrlServer'
import urls from '@/services/urls'

const Doctors = async (props: {
  searchParams: {
    search_key: string,
    page: string,
    disease: string,
    sign: string,
    service: string,
    gender: string
  }
}) => {

  const specialities = await fetch(`${apiDomainNobat}${urls.specialities.getSpecialities.url}`)
  const specialitiesData = await specialities.json()


  // const res = await fetch(`${apiDomainNobat}${urls.advanceSearch.serach.url}?Gender=0&ConsultingPlan=All&page=1&itemsCountPerPage=10`)
  // const data = await res.json()

  const parametrs = {
    cityName: "",
    specialty: "",
    consultingPlan: "",
    search_key: props.searchParams.search_key ? props.searchParams.search_key : "",
    page: props.searchParams.page ? props.searchParams.page : "",
    disease: "",
    sign: "",
    service: "",
    gender: props.searchParams.gender ? props.searchParams.gender : ""
  }


  return (
    <PhysiciansPage specialities={specialitiesData.value} slugs={parametrs} />
  )
}

export default Doctors