// CreateLocationForm.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateLocation } from "../hooks/createLocation";
import { toast } from "sonner";

export interface CreateLocationFormValues {
  address: string;
  description: string;
  tags: string; // comma-separated string
  input_stream_url: string;
}

// Minimal location type for submission
export interface MinimalLocation {
  address: string;
  latitude: number;
  longitude: number;
}

// A simple geocoding function using OpenStreetMap's Nominatim API.
const geocodeAddress = async (address: string): Promise<{ latitude: number; longitude: number }> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return { latitude: Number(data[0].lat), longitude: Number(data[0].lon) };
  }
  throw new Error("Address not found");
};

interface CreateLocationFormProps {
  onSubmit: (location: MinimalLocation, payload: any) => void;
  onCancel: () => void;
  onCoordinatesChange: (coords: { latitude: number; longitude: number }) => void;
}

export const CreateLocationForm: React.FC<CreateLocationFormProps> = ({
  onSubmit,
  onCancel,
  onCoordinatesChange,
}) => {
  const [formData, setFormData] = useState<CreateLocationFormValues>({
    address: "",
    description: "",
    tags: "",
    input_stream_url: "",
  });
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  // Setup the create location mutation hook.
  const { mutate: createLocation } = useCreateLocation((response) => {
    onSubmit(
      { address: formData.address, latitude: response.latitude, longitude: response.longitude },
      response
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // When the user leaves the address field, attempt to geocode.
  const handleAddressBlur = async () => {
    if (!formData.address.trim()) return;
    try {
      const coords = await geocodeAddress(formData.address);
      setCoordinates(coords);
      onCoordinatesChange(coords); // Update parent immediately.
      console.log("Geocoded Coordinates:", coords);
    } catch (error) {
      console.error("Failed to geocode address", error);
      setCoordinates(null);
      toast.error("Address not found. Please check your input.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coordinates) {
      toast.warning("Unable to determine location from address. Please check your address.");
      return;
    }
    const payload = {
      address: formData.address,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      description: formData.description,
      tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      input_stream_url: formData.input_stream_url,
    };
    console.log("Create Location Payload:", payload);
    createLocation(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div>
        <Label htmlFor="address" className="mb-2 block">
          Address
        </Label>
        <Input
          id="address"
          name="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleAddressBlur}
          required
        />
      </div>

      <div>
        <Label htmlFor="description" className="mb-2 block">
          Description
        </Label>
        <Input
          id="description"
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="tags" className="mb-2 block">
          Tags (comma-separated)
        </Label>
        <Input
          id="tags"
          name="tags"
          placeholder="e.g., analytics, retail"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="input_stream_url" className="mb-2 block">
          Input Stream URL
        </Label>
        <Input
          id="input_stream_url"
          name="input_stream_url"
          placeholder="Enter input stream URL"
          value={formData.input_stream_url}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="w-full">
          Save Location
        </Button>
        <Button variant="outline" onClick={onCancel} className="w-full">
          Cancel
        </Button>
      </div>
    </form>
  );
};
