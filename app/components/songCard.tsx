"use client";

import React, { useState } from "react";
import { CheckCircle2, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";

export interface SongRecommendation {
  id?: string;
  title?: string;
  artist?: string;
  imageSrc?: string;
  matchMethod?: string;
  isPersonalized?: boolean;
  isGenreMatch?: boolean;
  previewUrl?: string;
}

export interface SongCardProps {
  song?: SongRecommendation;
  title?: string;
  artist?: string;
  imageSrc?: string;
  matchMethod?: string;
  isPersonalized?: boolean;
  isGenreMatch?: boolean;
  onPreview?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  rating?: "like" | "dislike" | null;
}

export default function SongCard({
  song,
  title,
  artist,
  imageSrc,
  matchMethod,
  isPersonalized,
  isGenreMatch,
  onPreview,
  onLike,
  onDislike,
  rating: controlledRating,
}: SongCardProps) {
  const [internalRating, setInternalRating] = useState<"like" | "dislike" | null>(null);

  const displayTitle = title ?? song?.title ?? "rec.title";
  const displayArtist = artist ?? song?.artist ?? "rec.artist";
  const displayImage = imageSrc ?? song?.imageSrc ?? "favicon.ico";
  const displayMatchMethod = matchMethod ?? song?.matchMethod ?? "rec.matchMethod";
  const showPersonalized = isPersonalized ?? song?.isPersonalized ?? true;
  const showGenreMatch = isGenreMatch ?? song?.isGenreMatch ?? true;

  const currentRating = controlledRating !== undefined ? controlledRating : internalRating;

  const handleLike = () => {
    const nextRating = currentRating === "like" ? null : "like";
    setInternalRating(nextRating);
    if (onLike) onLike();
  };

  const handleDislike = () => {
    const nextRating = currentRating === "dislike" ? null : "dislike";
    setInternalRating(nextRating);
    if (onDislike) onDislike();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow text-gray-900 flex flex-col gap-4 items-center transition-all hover:shadow-md">
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap mb-2 justify-center">
        {displayMatchMethod && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full font-semibold">
            <CheckCircle2 size={10} /> {displayMatchMethod}
          </span>
        )}
        {showPersonalized && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full font-semibold">
            <Sparkles size={10} /> Personalized
          </span>
        )}
        {showGenreMatch && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-semibold">
            🎯 Genre Match
          </span>
        )}
      </div>

      {/* Album Art & Details */}
      <div className="flex flex-col gap-2 items-center w-full">
        <img
          src={displayImage}
          alt={`${displayTitle} cover`}
          className="w-36 h-36 object-contain rounded-md"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-row items-baseline gap-1.5 min-w-0">
            <h3 className="font-bold text-lg min-w-0">{displayTitle}</h3>
            <p className="text-gray-500 text-sm">by</p>
            <p className="text-blue-600 font-medium shrink-0">{displayArtist}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-row justify-between w-full">
          <button
            type="button"
            onClick={onPreview}
            className="p-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded text-sm font-semibold transition-colors cursor-pointer"
          >
            Preview
          </button>
          <div className="flex flex-row gap-4 items-center">
            <button
              type="button"
              onClick={handleLike}
              className={`hover:cursor-pointer transition-colors ${
                currentRating === "like" ? "text-green-600" : "text-gray-700 hover:text-green-500"
              }`}
              title="Like"
            >
              <ThumbsUp
                className={`w-6 h-6 ${currentRating === "like" ? "fill-green-600" : ""}`}
              />
            </button>
            <button
              type="button"
              onClick={handleDislike}
              className={`hover:cursor-pointer transition-colors ${
                currentRating === "dislike" ? "text-red-600" : "text-gray-700 hover:text-red-500"
              }`}
              title="Dislike"
            >
              <ThumbsDown
                className={`w-6 h-6 ${currentRating === "dislike" ? "fill-red-600" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
