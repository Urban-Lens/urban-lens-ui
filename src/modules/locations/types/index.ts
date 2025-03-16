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

export interface AvailableLocation {
  name: string;
  lat: number;
  lng: number;
}

export interface ILocation {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  tags: string[];
  input_stream_url: string;
  output_stream_url: string | null;
  thumbnail: string | null;
}


export interface IGetLocationMetricsParams {
    skip?: number;
    limit?: number;
    address_filter?: string;
    location_id?: string;
    time_aggregation?: "hour" | "day" | null;
  }
  