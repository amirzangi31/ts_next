export interface MyAppointmentType {
  id: string;
  calendarId: string;
  physicianProfileId: string;
  index: number;
  physicianName: string;
  physicianProfileUrl: string;
  status: string;
  passedOrFuture: string;
  hour: string;
  minute: string;
  hasImage: boolean;
  onlineAppointment: boolean 
  textConsultation: boolean 
  voiceConsultation: boolean 
  immediateConsultation: boolean 
  calendar: Calendar;
  specialities: Speciality[];
  [key: string]: any;
}

export interface Calendar {
  id: string;
  dayOffset: number;
  year: number;
  month: number;
  dayOfMonth: number;
  dayOfWeek: number;
  isHoliday: boolean;
}

export interface Speciality {
  id: number;
  specialityTitle: string;
  counter: number;
  enName: any;
  parentId: any;
  parent: any;
  citySpecialties: any;
}
