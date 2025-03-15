export interface IAddress {
  street: string;
  apartment?: string | null;
  city: string;
  state?: string;
  zip: string;
  country: string;
}

// src/types.ts

export interface AvailableLocation {
  name: string;
  lat: number;
  lng: number;
}
