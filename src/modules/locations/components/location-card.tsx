import { Link } from "react-router-dom";
import { ILocation } from "../types";
import { LOCATION_ROUTES } from "../routes/routes";

interface Props {
  location: ILocation;
}

export const LocationCard = ({ location }: Props) => {
  // Round down the rating to determine the number of filled stars.
  return (
    <Link to={LOCATION_ROUTES.MANAGE_LOCATION.OVERVIEW.DETAIL(location.id)}>
      <article className="px-4 py-2 border border-gray-200 rounded-xl shadow-sm bg-white">
        {/* Optional Stream Thumbnail */}
        {location.input_stream_url && location.thumbnail && (
          <div className="mb-2">
            <img
              src={location.thumbnail}
              alt={`${location.address} live stream`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Rating rendered as stars
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
      </div> */}

        {/* Location Name */}
        <h3 className="text-md lg:text-md font-semibold">{location.address}</h3>

        {/* Address rendered in one line */}
        <p className="text-gray-600 text-sm lg:text-md mb-2">
          {location.description}
        </p>
      </article>
    </Link>
  );
};
