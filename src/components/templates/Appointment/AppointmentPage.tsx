"use client"
import React, { useState } from 'react'

import TitlePagesMobile from '@components/modules/titles/TitlePagesMobile'
import SelectAppointmentStep from './SelectAppointmentStep'
import PaymentAppointmentStep from './PaymentAppointmentStep'
import { Firstppointment, PhysicianProfile, PhysicianProfileCalendar } from '@/types/appointment';

export type AppointmentPageType = {
  calendar: PhysicianProfileCalendar[],
  physician: PhysicianProfile,
  firstAppointment: Firstppointment | null,
  ramainingTime: number,
  times: string[]
}

const AppointmentPage = ({ calendar, physician, ramainingTime, times, firstAppointment }: AppointmentPageType) => {
  const [stepPage, setStepPage] = useState<1 | 2>(1)

  const changeStepHandler = (step: 1 | 2) => {
    setStepPage(step)
  }

  return (
    <>
      <TitlePagesMobile title='صفحه ی نوبت دهی اینترنتی دکتر حسین کرمی' />
      {stepPage === 1 ? <SelectAppointmentStep calendar={calendar} physician={physician} ramainingTime={ramainingTime} times={times} firstAppointment={firstAppointment} changeStep={changeStepHandler} /> : null}
      {stepPage === 2 ? <PaymentAppointmentStep /> : null}
    </>
  )
}

export default AppointmentPage