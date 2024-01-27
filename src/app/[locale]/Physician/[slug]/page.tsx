import React from 'react'
import PhysicianDetailesPage from '@templates/PhysicianDetailesPage';
import { getProfilePhysician } from '@/services/physicians/physician';
import { redirect } from 'next/navigation';

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