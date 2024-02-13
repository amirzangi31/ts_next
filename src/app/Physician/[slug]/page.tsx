import React from 'react'
import PhysicianDetailesPage from '@templates/PhysicianDetailesPage';
import { getProfilePhysician } from '@/services/physicians/physician';
import { redirect } from 'next/navigation';

export async function generateMetadata(props: {
  params: {
    local: string,
    slug: string
  },
  searchParams: {}
}) {
  const physician = await getProfilePhysician(props.params.slug)



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

  const physician = await getProfilePhysician(props.params.slug)

  // if (physician?.resultCode !== 200) {
  //   redirect("/404")
  // }



  return (
    <PhysicianDetailesPage physician={physician.value} />
  )
}

export default PhysicainDetailes