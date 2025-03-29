"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, Utensils } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="bg-white p-4 flex justify-center gap-6">
      <button 
        onClick={() => router.push("/")}
        className={`flex items-center gap-2 text-lg font-semibold hover:text-black ${pathname === "/" ? "text-red-500 font-bold" : "text-gray-700"}`}
      >
        <Home size={20} /> Discover
      </button>
      <button 
        onClick={() => router.push("/restaurants")}
        className={`flex items-center gap-2 text-lg font-semibold hover:text-black ${pathname === "/restaurants" ? "text-red-500 font-bold" : "text-gray-700"}`}
      >
        <Utensils size={20} /> Restaurants
      </button>
    </header>
  );
}