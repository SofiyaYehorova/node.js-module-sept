export enum EGender {
  male = "male",
  gender = "gender",
  mixed = "mixed",
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  gender: string;
}
