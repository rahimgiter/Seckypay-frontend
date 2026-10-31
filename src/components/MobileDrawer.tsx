"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, Wallet, Receipt, PieChart, Lock, Users, Palette, Bell, User, HelpCircle, LogOut, Settings, FileText, TrendingUp } from "lucide-react";
import BrandAvatar from "./BrandAvatar";
import { useBrand } from "@/contexts/BrandContext";

export default function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { branding } = useBrand();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const mainMenu = [
    { name: "Tableau de bord", href: "/dashboard", icon: Home },
    { name: "Encaisser", href: "/encaisser", icon: Wallet },
    { name: "Transactions", href: "/transactions", icon: Receipt },
    { name: "Clôture", href: "/cloture", icon: Lock },
  ];

  const businessMenu = [
    { name: "Finances", href: "/finances", icon: PieChart },
    { name: "Règlements", href: "/reglements", icon: TrendingUp },
    { name: "Rapports", href: "/rapports", icon: FileText },
  ];

  const settingsMenu = [
    { name: "Équipe", href: "/equipe", icon: Users },
    { name: "Ma Marque", href: "/marque", icon: Palette },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Paramètres", href: "/parametres", icon: Settings },
  ];

  const supportMenu = [
    { name: "Aide & Support", href: "/aide", icon: HelpCircle },
    { name: "Mon Profil", href: "/profil", icon: User },
  ];

  const renderLink = (item: any) => {
    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={onClose}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all ${
          isActive 
            ? "bg-secky-blue-50 text-secky-blue-600" 
            : "text-neutral-600 hover:bg-neutral-50"
        }`}
      >
        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-secky-blue-600" : "text-neutral-400"} />
        {item.name}
      </Link>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] animate-fade-in" onClick={onClose}></div>

      <div className={`md:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[95] shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
        
        <div className="bg-white p-6 border-b border-neutral-100 relative shadow-sm z-10">
          <div className="flex justify-between items-start mb-6">
            <Link href="/" onClick={onClose}>
              <img 
                src={branding.logoBase64 || "/logo.png"} 
                alt={branding.brandName} 
                className="h-8 w-auto object-contain max-w-[140px]" 
              />
            </Link>
            <button onClick={onClose} className="w-9 h-9 bg-neutral-100 border border-neutral-200 rounded-full flex items-center justify-center text-secky-blue-900 hover:bg-neutral-200 transition-all">
              <X size={18} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <BrandAvatar size="lg" showRing />
            <div>
              <p className="font-bold text-secky-blue-900 text-base">{branding.brandName}</p>
              <p className="text-xs text-neutral-500 font-medium">Admin d'entreprise</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <div>
            <p className="px-3 mb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Opérations</p>
            <div className="space-y-1">{mainMenu.map(renderLink)}</div>
          </div>
          <div>
            <p className="px-3 mb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Business</p>
            <div className="space-y-1">{businessMenu.map(renderLink)}</div>
          </div>
          <div>
            <p className="px-3 mb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Configuration</p>
            <div className="space-y-1">{settingsMenu.map(renderLink)}</div>
          </div>
          <div>
            <p className="px-3 mb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Support</p>
            <div className="space-y-1">{supportMenu.map(renderLink)}</div>
          </div>
        </div>

        <div className="p-4 border-t border-neutral-100 bg-white">
          <Link href="/login" onClick={onClose} className="w-full flex items-center justify-center gap-2 h-12 bg-red-50 text-status-error font-bold rounded-xl hover:bg-red-100 transition-colors text-sm">
            <LogOut size={18} />
            Déconnexion
          </Link>
          <p className="text-center text-[10px] text-neutral-400 font-medium mt-3">
            {branding.brandName} · Propulsé par SeckyPay 🇧🇫
          </p>
        </div>
      </div>
    </>
  );
}