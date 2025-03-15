import { DataPoint } from "@/modules/locations/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomData(count: number): DataPoint[] {
  const data: DataPoint[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - i) * 2000);
    data.push({
      time: time.toLocaleTimeString(),
      value1: Math.floor(Math.random() * 100),
      value2: Math.floor(Math.random() * 80),
      value3: Math.floor(Math.random() * 60),
    });
  }

  return data;
}
