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
  physicianSpecialities: PhysicianSpecialityType[];
  bg?: string;
}

export interface PhysicianSpecialityType {
  id?:string
  specialityTitle: string;
}

export interface SpecialitySearchTagType {
  id: number;
  name: string;
  enName?: any;
  link: string;
}


export interface Specialty {
  id: number;
  name: string;
  enName?: any;
}

export interface PhysicianProfileType {
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
  aboutDr?: string;
  physicianSpecialities: PhysicianSpecialityType[];
  bg? : string
} 