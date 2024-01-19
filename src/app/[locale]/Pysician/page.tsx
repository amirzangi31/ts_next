import { redirect } from 'next/navigation'
import React from 'react'

const Physician = () => {
  redirect("/404")
  return (
    <div>Physician</div>
  )
}

export default Physician