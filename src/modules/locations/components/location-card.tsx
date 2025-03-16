import { Link } from "react-router-dom";
import { ILocation } from "../types";
import { LOCATION_ROUTES } from "../routes/routes";
import { Cctv } from "lucide-react";

// Helper to extract YouTube thumbnail from a URL.
export const getYoutubeThumbnail = (url: string): string | undefined => {
  try {
    const parsedUrl = new URL(url);
    let videoId = parsedUrl.searchParams.get("v");
    // For shortened youtu.be URLs.
    if (!videoId && parsedUrl.hostname.includes("youtu.be")) {
      videoId = parsedUrl.pathname.slice(1);
    }
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
  }
  return undefined;
};

interface Props {
  location: ILocation;
}

export const LocationCard = ({ location }: Props) => {
  // If there's an input_stream_url, try to get the YouTube thumbnail.
  const youtubeThumbnail = location.input_stream_url
    ? getYoutubeThumbnail(location.input_stream_url)
    : undefined;
  // Use YouTube thumbnail if available, otherwise fallback to location.thumbnail.
  const thumbnailSrc = youtubeThumbnail || location.thumbnail;

  return (
    <Link
      to={LOCATION_ROUTES.MANAGE_LOCATION.OVERVIEW.DETAIL(location.id)}
      className="px-4 py-2 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-colors duration-300"
    >
      <article>
        {/* Optional Stream Thumbnail */}
        {location.input_stream_url && thumbnailSrc && (
          <div className="mb-2">
            <img
              src={thumbnailSrc}
              alt={`${location.address} live stream`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Location Name */}
        <div className="flex gap-2 items-center">
          <h3 className="text-md lg:text-md font-semibold">
            {location.address}
          </h3>
          <Cctv className="h-4 w-4 text-primary scale-x-[-1]" />
        </div>
        {/* Address rendered in one line */}
        <p className="text-gray-600 text-sm lg:text-md mb-2">
          {location.description}
        </p>
      </article>
    </Link>
  );
};
