export interface SearchSmallCardType {
  id: string;
  firstName: string;
  lastName: string;
  physicianProfileUrl: string;
  address: string;
  medicalSystemCode: string;
  provinceName: string;
  cityName: string;
  hasImage: boolean;
  patientAppointmentLimitDaysPeriod: number;
  patientAppointmentLimitTotalAppointment: number;
  aboutDr: string;
  physicianSpecialities: PhysicianSpeciality[];
  bg?: string;
}

interface PhysicianSpeciality {
  specialityTitle: string;
}

export interface SpecialitySearchTagType {
  id: number;
  name: string;
  enName?: any;
  link: string;
}
