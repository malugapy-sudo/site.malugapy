"use client";

import { useState } from "react";
import Image from "next/image";

interface YouTubePlayerProps {
  thumbnailSrc: string;
  videoId: string;
  alt: string;
}

export function YouTubePlayer({ thumbnailSrc, videoId, alt }: YouTubePlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={alt}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 group cursor-pointer shadow-lg"
      onClick={() => setPlaying(true)}
    >
      <Image
        src={thumbnailSrc}
        alt={alt}
        fill
        className="object-cover"
      />
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
