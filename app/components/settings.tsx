"use client";

import { X } from "lucide-react";
import GenreSelector, { Genre } from "./genreSelector";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  genres?: Genre[];
  selectedGenres?: string[];
  onGenreToggle?: (genreValue: string) => void;
  onSave?: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  genres,
  selectedGenres = [],
  onGenreToggle = () => {},
  onSave,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Account Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Age Range</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>18-24</option>
              <option>25-34</option>
              <option>35-44</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Favorite Genres</label>
            <GenreSelector
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreToggle={onGenreToggle}
              maxSelection={3}
              showCount={true}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (onSave) onSave();
              onClose();
            }}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}