import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AppointmentType = {
  appointmentSelectInfo: AppointmentSelectInfoType;
  isSelectAppointment: boolean;
  isRules: boolean;
  rules: {
    ruleOne: boolean;
    ruleTwo: boolean;
  };
  isLocked: boolean;
  lockedAppointmentInfo: {
    index: number;
    chrageAmount: number;
    remainingSeconds: number;
    status: boolean;
    id: number;
  };
};

type AppointmentSelectInfoType = {
  year: number | null;
  month: number | null;
  day: number | null;
  index: number | null;
  calendarId: string;
  physicianProfileId: string;
};

const initialState: AppointmentType = {
  appointmentSelectInfo: {
    year: null,
    month: null,
    day: null,
    index: null,
    calendarId: "",
    physicianProfileId: "",
  },
  isSelectAppointment: false,
  isRules: false,
  isLocked: false,
  rules: {
    ruleOne: false,
    ruleTwo: false,
  },
  lockedAppointmentInfo: {
    index: 0,
    chrageAmount: 0,
    remainingSeconds: 0,
    status: false,
    id: 0,
  },
};

const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState,
  reducers: {
    selectAppointment: (state, { payload }): void => {
      const data = {
        year: payload.year,
        month: payload.month,
        day: payload.day,
        index: payload.index,
        calendarId: payload.calendarId,
        physicianProfileId: payload.physicianProfileId,
      };
      state.appointmentSelectInfo = data;
      state.isSelectAppointment = true;
    },
    offSelectAppointment: (state) => {
      state.appointmentSelectInfo = {
        year: null,
        month: null,
        day: null,
        index: null,
        calendarId: "",
        physicianProfileId: "null",
      };
      state.isSelectAppointment = false;
    },
    acceptRuleOne: (state) => {
      state.rules.ruleOne = !state.rules.ruleOne;
      if (state.rules.ruleOne && state.rules.ruleTwo) {
        state.isRules = true;
      } else {
        state.isRules = false;
      }
    },
    acceptRuleTwo: (state) => {
      state.rules.ruleTwo = !state.rules.ruleTwo;
      if (state.rules.ruleOne && state.rules.ruleTwo) {
        state.isRules = true;
      } else {
        state.isRules = false;
      }
    },
    lockedAppointmentRedux: (state, { payload }) => {
      state.lockedAppointmentInfo = {
        index: payload.index,
        chrageAmount: payload.chargeAmount,
        id: payload.id,
        remainingSeconds: payload.remainingSeconds,
        status: payload.status,
      };

      state.isLocked = true;
    },
    
  },
});

export const {
  selectAppointment,
  offSelectAppointment,
  acceptRuleOne,
  acceptRuleTwo,
  lockedAppointmentRedux,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
