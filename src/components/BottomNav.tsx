"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Receipt, Plus, Send, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <nav className="bg-white border border-neutral-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] flex items-center justify-between px-4 py-3 w-full max-w-sm pointer-events-auto relative">
        
        <Link href="/dashboard" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname === "/dashboard" ? "text-secky-blue-600" : "text-neutral-400 hover:text-secky-blue-600"}`}>
          <Home size={22} strokeWidth={pathname === "/dashboard" ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">Accueil</span>
        </Link>
        
        <Link href="/transactions" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname === "/transactions" ? "text-secky-blue-600" : "text-neutral-400 hover:text-secky-blue-600"}`}>
          <Receipt size={22} strokeWidth={pathname === "/transactions" ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">Trans.</span>
        </Link>

        <div className="relative flex justify-center w-14">
          <Link href="/encaisser" className="absolute -top-10">
            <div className="w-16 h-16 bg-secky-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_10px_20px_-5px_rgba(16,91,174,0.5)] border-[6px] border-white active:scale-95 transition-transform">
              <Plus size={28} />
            </div>
          </Link>
        </div>

        <Link href="/envoyer" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname === "/envoyer" ? "text-secky-blue-600" : "text-neutral-400 hover:text-secky-blue-600"}`}>
          <Send size={22} strokeWidth={pathname === "/envoyer" ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">Envoyer</span>
        </Link>

        <Link href="/profil" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname === "/profil" ? "text-secky-blue-600" : "text-neutral-400 hover:text-secky-blue-600"}`}>
          <User size={22} strokeWidth={pathname === "/profil" ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">Profil</span>
        </Link>
      </nav>
    </div>
  );
}