"use client";

import React from "react";

export interface Genre {
  value: string;
  label: string;
}

export const DEFAULT_GENRES: Genre[] = [
  { value: "pop", label: "Pop" },
  { value: "k-pop", label: "K-pop" },
  { value: "rnb", label: "R&B" },
  { value: "rap", label: "Rap" },
  { value: "edm", label: "EDM" },
  { value: "rock", label: "Rock" },
  { value: "metal", label: "Metal" },
  { value: "indie", label: "Indie" },
  { value: "country", label: "Country" },
  { value: "ballad", label: "Ballad" },
];

interface GenreSelectorProps {
  selectedGenres: string[];
  onGenreToggle: (genreValue: string) => void;
  genres?: Genre[];
  maxSelection?: number;
  showCount?: boolean;
  className?: string;
}

export default function GenreSelector({
  selectedGenres = [],
  onGenreToggle,
  genres = DEFAULT_GENRES,
  maxSelection = 3,
  showCount = true,
  className = "",
}: GenreSelectorProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {showCount && (
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Select up to {maxSelection}</span>
          <span className="font-medium">
            {selectedGenres.length}/{maxSelection} selected
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre.value);
          return (
            <button
              key={genre.value}
              type="button"
              onClick={() => onGenreToggle(genre.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {genre.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
