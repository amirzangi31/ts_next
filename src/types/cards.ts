export interface CategoryPrimaryType {
  id?: string;
  title: string;
  link: string;
  image: string;
}

export interface PhysicainCardPrimaryType {
  id: string;
  firstName: string;
  lastName: string;
  provinceName: string;
  cityName: string;
  hasImage: boolean;
  physicianProfileUrl: string;
  onlineAppointment: boolean;
  textConsultation: boolean;
  voiceConsultation: boolean;
  immediateConsultation: boolean;
  rate: number;
  physicianSpecialities: PhysicianSpeciality[];
}

export interface PhysicianSpeciality {
  id: number;
  specialityTitle: string;
  counter: number;
  enName: any;
  parentId: any;
  parent: any;
  citySpecialties: any;
}
