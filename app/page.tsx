"use client";
import { X, Play, Loader2, CheckCircle2, Sparkles, History, AlertCircle, Bug, ChevronDown, RefreshCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "./components/header";
import SongCard from "./components/songCard";
import { useSolidSession } from '@/src/contexts/SolidSessionContext';

import {
  getPodUrlAll,
  saveSolidDatasetAt,
  createSolidDataset,
  setThing,
  buildThing,
  createThing,
  getSolidDataset,
  getThingAll,
  getStringNoLocale,
  getThing
} from '@inrupt/solid-client';
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {
  const { session, isLoggedIn } = useSolidSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.replace('/sign-in');
  }, [isLoggedIn, router]);

  const [storageRoot, setStorageRoot] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn && session?.info?.webId) {
      (async () => {
        try {
          // 🔑 Ambil Pod URL dari WebID
          let podUrls = await getPodUrlAll(session.info.webId!, { fetch: session.fetch });

          // fallback kalau user profile tidak punya solid:storage
          if (!podUrls.length) {
            const fallback = session.info.webId!.replace('/profile/card#me', '/');
            podUrls = [fallback];
            console.warn('⚠️ No solid:storage found, using fallback:', fallback);
          }

          const storage = podUrls[0];
          setStorageRoot(storage); // Save storage root for later use
          toast.success(`Connected to Pod`);
        }
        catch (err) {
          console.error('❌ Failed to get Pod URL:', err);
          toast.error('Could not resolve storage root from your WebID.');
        }
      })();
    }
  }, [isLoggedIn, session]);


  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-4xl mx-auto flex flex-col p-6">
        <Header storageRoot={storageRoot} />

        <div className="mt-6">
          <div className="flex items-center justify-between gap-4 py-4">
            <h2 className="font-semibold">Welcome to MuseRec! Check out some songs you might like</h2>
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
            <SongCard />
          </div>
        </div>
      </div>
    </div>
  );
}
