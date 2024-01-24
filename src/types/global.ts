export interface UserType {
  firstName: string;
  lastName: string;
  nationalNumber: string;
  shomareShenasname?: any;
  phoneNumber: string;
  cityId: number;
  cityName: string;
  gender: string;
  provinceId: number;
  provinceName: string;
  accountBalance: number;
}

export interface TransctionsType {
  id: string;
  isSuccess: boolean;
  userId: string;
  user?: any;
  accountBalanceBeforeAction: number;
  description?: any;
  amount: number;
  status?: any;
  createdAt: string;
  actionType: number;
  authority?: any;
  refId?: any;
  isValidConnectToBankForPay: boolean;
  isValidConnectToBankForResult: boolean;
  userPhysicianProfileClanedarId: string;
  userPhysicianProfileClanedar?: any;
}

