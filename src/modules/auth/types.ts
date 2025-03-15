export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    // ... other user fields
  };
} 