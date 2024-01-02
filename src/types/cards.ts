export interface CategoryPrimaryType {
  id?: string;
  title: string;
  link: string;
  image: string;
}



export interface PhysicainCardPrimaryType {
  id: string;
  link: string;
  name: string;
  category: string;
  freeMode: boolean;
  consultationPlanItems: {
    onlineAppointment: {
      title: string;
      active: boolean;
    };
    textConsultation: {
      title: string;
      active: boolean;
    };
    voiceConsultation: {
      title: string;
      active: boolean;
    };
    immediateConsultation: {
      title: string;
      active: boolean;
    };
  };
  city: string;
  rate: number;
  image: string;
}
