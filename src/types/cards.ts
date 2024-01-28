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
export interface ArticleCardType {
  id: string;
  title: string;
  description: string[];
  image: string;
  author: string;
  date: string;

  speciality: string;
}

export interface CommentCardPrimaryType {
  id: string;
  name: string;
  physician: string;
  comment: string;
}

export interface AppointmentPrimaryCardType {
  firstName: string;
  lastName: string;
  hasImage: string;
  physicianProfileId: string;
  price: string;
  date: string;
  time: string;
  phoneNumber: string;
  address: string;
  location: [number, number];
  status: string;
  speciality: string;
  plans: {}[];
  lockTime : number
}
