"use client";
import React, { useState } from "react";

import TitlePagesMobile from "@components/modules/titles/TitlePagesMobile";
import SelectAppointmentStep from "./SelectAppointmentStep";
import PaymentAppointmentStep from "./PaymentAppointmentStep";
import {
  Firstppointment,
  PhysicianProfile,
  PhysicianProfileCalendar,
} from "@/types/appointment";
import useSelectAppointment from "@/hooks/useSelectAppointment";

export type AppointmentPageType = {
  calendar: PhysicianProfileCalendar[];
  physician: PhysicianProfile;
  firstAppointment: Firstppointment | null;
  ramainingTime: number;
  times: string[];
};

const AppointmentPage = ({
  calendar,
  physician,
  ramainingTime,
  times,
  firstAppointment,
}: AppointmentPageType) => {
  const { step } = useSelectAppointment();
  
  return (
    <>
      <TitlePagesMobile title="صفحه ی نوبت دهی اینترنتی دکتر حسین کرمی" />
      {step === 1 ? (
        <SelectAppointmentStep
          calendar={calendar}
          physician={physician}
          ramainingTime={ramainingTime}
          times={times}
          firstAppointment={firstAppointment}
        />
      ) : null}
      {step === 2 ? <PaymentAppointmentStep /> : null}
    </>
  );
};

export default AppointmentPage;
