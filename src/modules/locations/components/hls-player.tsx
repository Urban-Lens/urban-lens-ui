"use client";

import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

interface HLSPlayerProps {
  url: string;
  autoPlay?: boolean;
  controls?: boolean;
}

export const HLSPlayer: React.FC<HLSPlayerProps> = ({
  url,
  autoPlay = true,
  controls = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Optionally, append a timestamp only once at mount if needed:
      const streamUrl = url + (url.includes("?") ? "&" : "?") + `t=${new Date().getTime()}`;
      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = streamUrl;
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          liveSyncDurationCount: 3, // Adjust as needed for your live stream latency.
          // Other live-specific options can be set here.
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);
        return () => {
          hls.destroy();
        };
      } else {
        console.error("This browser does not support HLS.");
      }
    }
  }, [url]);

  return (
    <video
      ref={videoRef}
      autoPlay={autoPlay}
      controls={controls}
      className="w-full h-full"
    />
  );
};
