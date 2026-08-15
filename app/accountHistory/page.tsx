"use client";

import Header from "../components/header";

export default function AccountHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="max-w-4xl mx-auto flex flex-col p-6">
        <Header />
        <main className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Account History</h2>
          <p className="text-gray-400">Your past interactions and recommendations history will appear here.</p>
        </main>
      </div>
    </div>
  );
}
