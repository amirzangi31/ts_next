
import AppointmentPage from '@/components/templates/Appointment/AppointmentPage'
import { apiDomainNobat } from '@/services/getApiUrlServer'
import urls from '@/services/urls'

import convertToHour from '@/utils/convertHour'

import { redirect } from 'next/navigation'
import React from 'react'

export async function generateMetadata({ params }: {
    params: {
        slug: string[],
        locale: string
    }
}) {
    if (!params.slug[1]) {
      redirect("/404")
    }
  
    let physicianCalendar;
  
    try {
        const res = await fetch(`${apiDomainNobat}${urls.appointment.calendarPhysician.url}${params.slug[1]}`, {
            cache: "no-store"
        })
        const data = await res.json()
        physicianCalendar = data.value
    } catch (error) {
        redirect("/404")
    }
    
    
    const title = `نوبت دهی دکتر ${physicianCalendar?.physicianProfile?.firstName} ${physicianCalendar?.physicianProfile?.lastName}`
    const description = `${physicianCalendar?.physicianProfile?.firstName}`
  
  
  
    return {
      title,
      description,
      authors: [{ name: title }]
    }
  }

const Appointment = async ({ params }: {
    params: {
        slug: string[],
        locale: string
    }
}) => {

    let physicianCalendar;
    let ramainingTime;

    try {
        const res = await fetch(`${apiDomainNobat}${urls.appointment.calendarPhysician.url}${params.slug[1]}`, {
            cache: "no-store"
        })
        const data = await res.json()
        physicianCalendar = data.value
    } catch (error) {
        redirect("/404")
    }
    try {
        const res = await fetch(`${apiDomainNobat}${urls.appointment.ramainingTime.url}`, { cache: "no-store" })
        const data = await res.json()

        ramainingTime = data.value.ramainigTime
    } catch (error) {
        redirect("/404")
    }



    return (
        <AppointmentPage calendar={physicianCalendar?.physicianProfileCalendars} physician={physicianCalendar.physicianProfile} ramainingTime={ramainingTime} times={convertToHour()} firstAppointment={physicianCalendar.firstppointment} />
    )
}

export default Appointment