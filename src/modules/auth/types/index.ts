export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  industry: string;
}
