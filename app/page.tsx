"use client";
import Image from "next/image";
import { X, Play, Loader2, CheckCircle2, Sparkles, History, AlertCircle, Bug, ChevronDown, RefreshCcw } from 'lucide-react';
import { useState } from "react";
import SettingsModal from "./components/settings";


export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const genres = [
    { value: 'pop', label: 'Pop' }, { value: 'k-pop', label: 'K-pop' }, { value: 'rnb', label: 'R&B' },
    { value: 'rap', label: 'Rap' }, { value: 'edm', label: 'EDM' }, { value: 'rock', label: 'Rock' },
    { value: 'metal', label: 'Metal' }, { value: 'indie', label: 'Indie' }, { value: 'country', label: 'Country' },
    { value: 'ballad', label: 'Ballad' },
  ];

  const handleGenreToggle = (genreValue: string) => {
    if (selectedGenres.includes(genreValue)) setSelectedGenres(selectedGenres.filter(g => g !== genreValue));
    else if (selectedGenres.length < 3) setSelectedGenres([...selectedGenres, genreValue]);
  };


  return (
    <div className="min-h-screen bg-gray-800">
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <div className="max-w-4xl mx-auto flex flex-col p-6">
        <div className="flex items-center gap-4 relative">
          <h1 className="text-2xl font-bold text-gray-100">MuseRec</h1>
          <div className="absolute right-0">
            <button className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 text-sm font-medium hover:bg-gray-600 hover:text-white transition-colors mr-2">
              Find more songs
            </button>
            <el-dropdown className="inline-block">
              <button className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 text-sm font-medium hover:bg-gray-600 hover:text-white transition-colors mr-2 flex items-center gap-2">
                Account URL
                <ChevronDown className="w-4 h-4" />
              </button>

              <el-menu anchor="bottom end" popover className="w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <div className="py-1">
                  <a onClick={() => setShowSettings(true)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-500 hover:text-white hover:outline-hidden">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-500 hover:text-white hover:outline-hidden">Log out</a>
                </div>
              </el-menu>
            </el-dropdown>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between gap-4 py-4">
            <p className="font-semibold">Welcome to MuseRec! Check out some songs you might like</p>
            <div className="flex flex-row gap-2 shrink-0">
              <div className="flex flex-row gap-2 items-center">
                <p>Song Count:</p>
                <select className="bg-white border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" name="count" id="songcount">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <button className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 text-sm font-medium hover:bg-gray-600 hover:text-white transition-colors">
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-md flex items-center gap-2 text-indigo-800 text-sm">
            <History size={16} />
              <span>
                🎯 <strong>Personalization active:</strong> Using your personalization.interactionCount past interactions.
                Top artists: 
              </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            <div className="bg-white p-4 rounded-lg shadow text-gray-900 flex flex-col gap-4 items-center">
              <div className="flex items-center gap-2 flex-wrap mb-2 justify-center">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full font-semibold">
                  <CheckCircle2 size={10} /> rec.matchMethod
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full font-semibold">
                  <Sparkles size={10} /> Personalized
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-semibold">
                  🎯 Genre Match
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <img src="favicon.ico" className="w-36 h-36 object-contain rounded-md" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-row items-baseline gap-1.5 min-w-0">
                    <h3 className="font-bold text-lg min-w-0">rec.title</h3>
                    <p className="text-gray-500 text-sm">by</p>
                    <p className="text-blue-600 font-medium shrink-0">rec.artist</p>
                  </div>
                </div>
                <button className="p-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded text-sm font-semibold transition-colors">
                Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
