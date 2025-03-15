import { IAddress } from "../types";
import { Star } from "lucide-react";

interface Props {
  name: string;
  address: IAddress;
  rating: number;
  streamUrl?: string | null;
  thumbnail?: string | null;
}

export const LocationCard = ({
  name,
  address,
  rating,
  streamUrl,
  thumbnail,
}: Props) => {
  // Round down the rating to determine the number of filled stars.
  const filledStars = Math.floor(rating);

  return (
    <article className="px-4 py-2 border border-gray-200 rounded-xl shadow-sm bg-white">
      {/* Optional Stream Thumbnail */}
      {streamUrl && thumbnail && (
        <div className="mb-2">
          <img
            src={thumbnail}
            alt={`${name} live stream`}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Rating rendered as stars */}
      <div className="flex items-center mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < filledStars ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-gray-600 text-sm">
          ({rating.toFixed(1)} / 5)
        </span>
      </div>

      {/* Location Name */}
      <h3 className="text-md lg:text-md font-semibold">{name}</h3>

      {/* Address rendered in one line */}
      <p className="text-gray-600 text-sm lg:text-md mb-2">
        {address.street}
        {address.apartment && `, ${address.apartment}`}, {address.city}
        {address.state ? `, ${address.state}` : ""}
        {address.zip ? `, ${address.zip}` : ""}
        {address.country ? `, ${address.country}` : ""}
      </p>
    </article>
  );
};
