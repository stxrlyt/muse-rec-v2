"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSolidSession } from "@/src/contexts/SolidSessionContext";
import SettingsModal from "./settings";

interface HeaderProps {
  storageRoot?: string | null;
}

export default function Header({ storageRoot }: HeaderProps) {
  const router = useRouter();
  const { session, logout } = useSolidSession();
  const [showSettings, setShowSettings] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenreToggle = (genreValue: string) => {
    if (selectedGenres.includes(genreValue)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genreValue));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genreValue]);
    }
  };

  return (
    <>
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        selectedGenres={selectedGenres}
        onGenreToggle={handleGenreToggle}
      />

      <header className="flex items-center gap-4 relative py-2">
        <button
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-gray-100 hover:text-white transition-colors cursor-pointer"
        >
          MuseRec
        </button>

        <div className="absolute right-0 flex items-center">
          <button
            onClick={() => router.push("/findMore")}
            className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 text-sm font-medium hover:bg-gray-600 hover:text-white transition-colors mr-2 cursor-pointer"
          >
            Find more songs
          </button>

          <el-dropdown className="inline-block">
            <button
              title={session?.info?.webId || storageRoot || "Account"}
              className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 text-sm font-medium hover:bg-gray-600 hover:text-white transition-colors mr-2 flex items-center gap-2 max-w-[220px] cursor-pointer"
            >
              <span className="truncate">
                {session?.info?.webId || storageRoot || "Account URL"}
              </span>
              <ChevronDown className="w-4 h-4 shrink-0" />
            </button>

            <el-menu
              anchor="bottom end"
              popover
              className="w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-500 hover:text-white cursor-pointer"
                >
                  Settings
                </button>
                <button
                  onClick={() => router.push("/accountHistory")}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-500 hover:text-white cursor-pointer"
                >
                  History
                </button>
                <button
                  onClick={() => logout()}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-red-500 hover:text-white cursor-pointer"
                >
                  Log out
                </button>
              </div>
            </el-menu>
          </el-dropdown>
        </div>
      </header>
    </>
  );
}