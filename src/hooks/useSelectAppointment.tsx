import {
  acceptRuleOne,
  acceptRuleTwo,
  selectAppointment,
  lockedAppointmentRedux,
  offSelectAppointment,
  
} from "@/store/features/appointmentSlice";
import { useAppDispatch, useAppSelector } from "./useRedux";
import useUserInfo from "./useUserInfo";
import { useMutation } from "@tanstack/react-query";
import {
  lockedAppointment,
  getFirstForce,
} from "@/services/appointments/appointment";
import { useState } from "react";


const useSelectAppointment = () => {
  const {
    appointmentSelectInfo,
    isRules,
    rules,
    isSelectAppointment,
  } = useAppSelector((state) => state.appointment);
  const { isLogin } = useUserInfo();
  const dispatch = useAppDispatch();


  const selectAppointmentHandler = (
    year: string,
    month: string,
    day: string,
    index: number,
    calendarId: string,
    physicianProfileId: string
  ) => {
    dispatch(
      selectAppointment({
        year,
        month,
        day,
        index,
        calendarId,
        physicianProfileId,
      })
    );
  };
  const offSelectHandler = () => {
    dispatch(offSelectAppointment());
  };

  const acceptRuleOneHandler = () => {
    dispatch(acceptRuleOne());
  };
  const acceptRuleTwoHandler = () => {
    dispatch(acceptRuleTwo());
  };

  const locked = useMutation({
    mutationFn: async () => {
      const res = await lockedAppointment(
        appointmentSelectInfo.calendarId,
        appointmentSelectInfo.physicianProfileId,
        appointmentSelectInfo.index
      );
      
      if (res.resultCode === 200) {
        const { chargeAmount, id, remainingSeconds, status } = res.value;
        dispatch(
          lockedAppointmentRedux({ chargeAmount, id, remainingSeconds, status })
        );
      }
      return res.data;
    },
  });

  const firstAppointment = useMutation({
    mutationFn: async ({
      physicianProfileId,
    }: {
      physicianProfileId: string;
    }) => {
      const res = await getFirstForce(physicianProfileId);

      selectAppointmentHandler(
        res.year,
        res.month,
        res.day,
        res.index,
        res.calendarId,
        res.physicianProfileId
      );
      return res;
    },
  });

  return {
    appointmentInfo: appointmentSelectInfo,
    selectIndex: appointmentSelectInfo.index,
    selectAppointment: selectAppointmentHandler,
    selectCalendarId: appointmentSelectInfo.calendarId,
    isRules,
    isSelectAppointment,
    isNextStep: isSelectAppointment && isRules && isLogin === "authorization",
    rules,
    acceptRules: {
      acceptRuleOneHandler,
      acceptRuleTwoHandler,
    },
    lockedAppointmentHandler: locked,
    firstAppointmentHandler: firstAppointment,
    offSelectHandler,
  };
};

export default useSelectAppointment;
