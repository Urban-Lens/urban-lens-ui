"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export interface CreateLocationFormValues {
  address: string;
  description: string;
  tags: string;
  input_stream_url: string;
}

// Geocoding with notamin
const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
  }
  throw new Error("Address not found");
};

interface CreateLocationFormProps {
  onSubmit: (
    location: { name: string; lat: number; lng: number },
    payload: any
  ) => void;
  onCancel: () => void;
  onCoordinatesChange: (coords: { lat: number; lng: number }) => void;
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
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coordinates) {
      alert("Unable to determine location from address. Please check your address.");
      return;
    }
    const payload = {
      address: formData.address,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      description: formData.description,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      input_stream_url: formData.input_stream_url,
    };
    console.log("Create Location Payload:", payload);
    onSubmit(
      { name: formData.address, lat: coordinates.lat, lng: coordinates.lng },
      payload
    );
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
