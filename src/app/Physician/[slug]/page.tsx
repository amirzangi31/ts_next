import React from 'react'
import PhysicianDetailesPage from '@templates/PhysicianDetailesPage';
import { getProfilePhysician } from '@/services/physicians/physician';
import { redirect } from 'next/navigation';
import { apiDomainNobat } from '@/services/getApiUrlServer';
import { PhysicainProfileType } from '@/types/physicianProfile';
import urls from '@/services/urls';

export async function generateMetadata(props: {
  params: {
    local: string,
    slug: string
  },
  searchParams: {}
}) {
  const res = await fetch(`${apiDomainNobat}${urls.physician.physicianProfile.url}${props.params.slug}`, { cache: "no-store" })
  const physician = await res.json()



  const title = `نوبت دهی اینترنتی دکتر ${physician?.value?.firstName} ${physician?.value?.lastName} | ${physician?.value?.physicianSpecialities[0]?.specialityTitle} | در شهر ${physician?.value?.cityName}`
  const description = `${physician?.value?.firstName}`

  return {
    title,
    description,
    authors: [{ name: title }]
  }
}



const PhysicainDetailes = async (props: {
  params: {
    local: string,
    slug: string
  },
  searchParams: {}
}) => {

  const res = await fetch(`${apiDomainNobat}${urls.physician.physicianProfile.url}${props.params.slug}`, { cache: "no-store" })
  const data = await res.json()


  if (data?.resultCode === 404) {
    redirect(`/physicians`)
  }


  return (
    <PhysicianDetailesPage physician={data.value} />
  )
}

export default PhysicainDetailes