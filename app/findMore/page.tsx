"use client";

import { useState } from "react";
import Header from "../components/header";
import GenreSelector from "../components/genreSelector";
import { X, Play } from "lucide-react";

export default function FindMore() {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [ageRange, setAgeRange] = useState("18");

    const handleGenreToggle = (genreValue: string) => {
        if (selectedGenres.includes(genreValue)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genreValue));
        } else if (selectedGenres.length < 3) {
            setSelectedGenres([...selectedGenres, genreValue]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <div className="max-w-4xl mx-auto flex flex-col p-6">
                <Header />
                <main className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Find More Songs</h2>
                    <p className="text-gray-400 mb-6">Search and discover more music recommendations.</p>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        {/* Step 1 */}
                        <div className="md:col-span-2 flex flex-col gap-4">
                            <div className="p-4 bg-gray-100 rounded-lg text-gray-900 shadow">
                                <p className="font-bold text-gray-700 mb-3">Step 1: About You</p>

                                <div className="mb-4">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                                        Step 1a: Which age range are you in?
                                    </label>
                                    <select
                                        value={ageRange}
                                        onChange={(e) => setAgeRange(e.target.value)}
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-sm bg-white"
                                    >
                                        <option value="18">18 - 24</option>
                                        <option value="25">25 - 34</option>
                                        <option value="35">&gt; 35</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                                        Step 1b: What's your top three genres?
                                    </label>
                                    <GenreSelector
                                        selectedGenres={selectedGenres}
                                        onGenreToggle={handleGenreToggle}
                                        maxSelection={3}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="md:col-span-4">
                            <div className="p-4 bg-gray-100 rounded-lg text-gray-900 shadow h-full flex flex-col">
                                <p className="font-bold text-gray-700 mb-3">Step 2: Choose 5 songs</p>
                                <input
                                    type="text"
                                    placeholder="Search for a song..."
                                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-sm bg-white"
                                />

                                {/* Search Results */}
                                <div className="mt-3 flex flex-wrap gap-2 max-h-60 overflow-y-auto border-b pb-3 mb-3">
                                    <div className="bg-white rounded-lg shadow p-2 w-32 flex flex-col items-center text-center">
                                        <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                                            Cover
                                        </div>
                                        <p className="text-xs font-bold mt-1 truncate w-full">Title</p>
                                        <p className="text-xs text-gray-500 truncate w-full">Artist</p>
                                        <button className="mt-1 bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 w-full transition-colors cursor-pointer">
                                            Add
                                        </button>
                                    </div>
                                </div>

                                {/* Selected Songs */}
                                <div className="mt-auto">
                                    <p className="text-gray-500 text-xs font-medium mb-2">Selected songs:</p>
                                    <div className="flex flex-wrap gap-2">
                                        <div className="bg-white rounded-lg shadow p-2 w-32 flex flex-col items-center text-center relative group">
                                            <button className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                <X size={12} />
                                            </button>
                                            <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                                                Cover
                                            </div>
                                            <p className="text-xs font-bold mt-1 truncate w-full">Title</p>
                                            <p className="text-xs text-gray-500 truncate w-full">Artist</p>
                                            <button className="mt-1 bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600 w-full flex items-center justify-center gap-1 transition-colors cursor-pointer">
                                                <Play size={10} /> Preview
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 & 4 */}
                        <div className="md:col-span-6 flex flex-col gap-4">
                            {/* Step 3 */}
                            <div className="p-4 bg-gray-100 rounded-lg text-gray-900 shadow">
                                <p className="font-bold text-gray-700 mb-2">Step 3: (Optional) What's the vibe?</p>
                                <input
                                    type="text"
                                    placeholder="e.g., workout, chill..."
                                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-sm bg-white"
                                />
                            </div>

                            {/* Step 4 */}
                            <div className="p-4 bg-gray-100 rounded-lg text-gray-900 shadow">
                                <p className="font-bold text-gray-700 mb-2">Step 4: Which LLM?</p>
                                <select className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-sm bg-white">
                                    <option value="GPT">OpenAI ChatGPT</option>
                                    <option value="Gemini">Google Gemini</option>
                                    <option value="Claude">Anthropic Claude (No credit)</option>
                                </select>
                            </div>

                            {/* Submit */}
                            <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow transition-colors cursor-pointer">
                                Recommend me!
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}