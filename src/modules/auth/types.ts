export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    // ... other user fields
  };
} 