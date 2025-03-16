"use client";

import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

interface HLSPlayerProps {
  url: string;
  autoPlay?: boolean;
  controls?: boolean;
}

export const HLSPlayer: React.FC<HLSPlayerProps> = ({ url, autoPlay = true, controls = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Check for native HLS support
      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = url;
      } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
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
      controls={controls}
      autoPlay={autoPlay}
      className="w-full h-full"
    />
  );
};
