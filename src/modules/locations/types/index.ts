export interface IAddress {
  street: string;
  apartment?: string | null;
  city: string;
  state?: string;
  zip: string;
  country: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot" | "system";
  timestamp: Date;
}

export interface DataPoint {
  time: string;
  value1: number;
  value2: number;
  value3: number;
}
