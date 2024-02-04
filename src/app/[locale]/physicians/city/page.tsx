import { redirect } from 'next/navigation'
import React from 'react'

const DoctorsCityNotFound = () => {
    redirect("/doctors")
  return (
    <div>DoctorsCityNotFound</div>
  )
}

export default DoctorsCityNotFound