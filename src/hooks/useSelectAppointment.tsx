import {
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

import { createAppointment, createPayment } from "@/services/payment/payment";
import { useRouter } from "next/navigation";


const useSelectAppointment = () => {
  const {
    appointmentSelectInfo,
    isSelectAppointment,
    lockedAppointmentInfo,
    patient
  } = useAppSelector((state) => state.appointment);
  const { isLogin } = useUserInfo();
  const dispatch = useAppDispatch();
  const { user } = useUserInfo()
  const router = useRouter()

  const selectAppointmentHandler = (
    year: string,
    month: string,
    day: string,
    index: number,
    calendarId: string,
    physicianProfileId: string,
    physicianProfileUrl: string
  ) => {
    
    dispatch(
      selectAppointment({
        year,
        month,
        day,
        index,
        calendarId,
        physicianProfileId,
        physicianProfileUrl
      })
    );
  };
  const offSelectHandler = () => {
    dispatch(offSelectAppointment());
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
          lockedAppointmentRedux({
            chargeAmount, id, remainingSeconds, status, firstName: user.firstName,
            lastName: user.lastName,
            nationalNumber: user.nationalNumber, phoneNumber: user.phoneNumber
          })
        );
      }
      return res.data;
    },
  });

  const firstAppointment = useMutation({
    mutationFn: async ({
      physicianProfileId,
      physicianProfileUrl,
    }: {
      physicianProfileId: string;
      physicianProfileUrl: string;
    }) => {
      const res = await getFirstForce(physicianProfileId);
      selectAppointmentHandler(
        res.year,
        res.month,
        res.dayOfMonth,
        res.index,
        res.calendarId,
        res.physicianProfileId,
        physicianProfileUrl
      );
      return res;
    },
  });
  const payment = useMutation({
    mutationFn: async () => {
      if (lockedAppointmentInfo.chrageAmount === 0) {
        const res = await createAppointment(appointmentSelectInfo.physicianProfileId, appointmentSelectInfo.calendarId, appointmentSelectInfo.index)
        
        if (res.resultCode === 200) {
          router.replace(
            `/Check/Payment/${appointmentSelectInfo.physicianProfileurl}?Status=Success&AppointmentId=${res?.value.id}`
          );
        }
        return res
      } else {
        const res = await createPayment(lockedAppointmentInfo.id, lockedAppointmentInfo.chrageAmount, 1)
        window.location.href = res
        return res
      }
    },
  });








  return {
    appointmentInfo: appointmentSelectInfo,
    selectIndex: appointmentSelectInfo.index,
    selectAppointment: selectAppointmentHandler,
    selectCalendarId: appointmentSelectInfo.calendarId,
    isSelectAppointment,
    isNextStep: isSelectAppointment &&  isLogin === "authorization",

    lockedAppointmentHandler: locked,
    firstAppointmentHandler: firstAppointment,
    offSelectHandler,
    lockAppointmentInfo: lockedAppointmentInfo,
    patient,
    payment
  };
};

export default useSelectAppointment;
