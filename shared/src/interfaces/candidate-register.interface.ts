export interface ICandidateRegister {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  type?: string;
  skills?: string[];
}
