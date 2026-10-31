"use client";
import { useState } from "react";
import { User, Lock, Bell, Smartphone, ChevronRight, LogOut, Shield, HelpCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { ThemeToggle, InstallPWAButton } from "@/components/ThemeToggle";
import Link from "next/link";
import BrandAvatar from "@/components/BrandAvatar";
import { useBrand } from "@/contexts/BrandContext";

export default function Profil() {
  const { branding } = useBrand();
  const [pushNotifs, setPushNotifs] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#08142B] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 bg-[#F8FAFC] dark:bg-[#08142B] border-b border-neutral-100 dark:border-white/10 md:border-none">
          <h1 className="text-2xl font-extrabold text-secky-blue-900 dark:text-white tracking-tight">Mon Profil</h1>
          <p className="text-sm text-neutral-500 font-medium mt-1">Gérez vos informations et vos préférences.</p>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-2xl mx-auto w-full space-y-6">
          
          {/* Carte Identité */}
          <div className="bg-white dark:bg-[#0C1D43] rounded-[24px] p-6 shadow-sm border border-neutral-100 dark:border-white/10 flex items-center gap-4">
            <BrandAvatar size="xl" showRing />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-secky-blue-900 dark:text-white">{branding.brandName}</h2>
              <p className="text-sm font-medium text-neutral-500">Admin d'entreprise</p>
              <p className="text-xs text-neutral-400 mt-0.5">kofi@seckytech.com</p>
            </div>
            <button className="w-10 h-10 bg-neutral-50 dark:bg-white/5 rounded-full flex items-center justify-center text-secky-blue-900 dark:text-white">
              <User size={18} />
            </button>
          </div>

          {/* Section Compte & Sécurité */}
          <div>
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3 px-2">Compte & Sécurité</h3>
            <div className="bg-white dark:bg-[#0C1D43] rounded-[24px] shadow-sm border border-neutral-100 dark:border-white/10 overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 border-b border-neutral-50 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secky-blue-50 dark:bg-secky-blue-600/20 flex items-center justify-center text-secky-blue-600 dark:text-secky-cyan-400"><Lock size={16} /></div>
                  <span className="font-semibold text-sm text-secky-blue-900 dark:text-white">Changer le mot de passe</span>
                </div>
                <ChevronRight size={18} className="text-neutral-300 dark:text-neutral-600" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400"><Shield size={16} /></div>
                  <span className="font-semibold text-sm text-secky-blue-900 dark:text-white">Vérification en 2 étapes</span>
                </div>
                <span className="text-xs font-bold text-status-success bg-green-50 dark:bg-green-500/20 px-2 py-1 rounded-md">Activé</span>
              </button>
            </div>
          </div>

          {/* Section Préférences */}
          <div>
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3 px-2">Préférences</h3>
            <div className="bg-white dark:bg-[#0C1D43] rounded-[24px] shadow-sm border border-neutral-100 dark:border-white/10 overflow-hidden">
              
              <ThemeToggle />

              <div className="flex items-center justify-between p-4 border-t border-neutral-50 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/20 flex items-center justify-center text-orange-500 dark:text-orange-400"><Bell size={16} /></div>
                  <div>
                    <p className="font-semibold text-sm text-secky-blue-900 dark:text-white">Notifications push</p>
                    <p className="text-[11px] text-neutral-500">Alertes de paiement en temps réel</p>
                  </div>
                </div>
                <button onClick={() => setPushNotifs(!pushNotifs)} className={`w-12 h-7 rounded-full transition-colors relative ${pushNotifs ? "bg-secky-blue-600" : "bg-neutral-200 dark:bg-neutral-700"}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${pushNotifs ? "left-6" : "left-1"}`}></div>
                </button>
              </div>

              <div className="border-t border-neutral-50 dark:border-white/5">
                <InstallPWAButton />
              </div>
            </div>
          </div>

          {/* Section Support */}
          <div>
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3 px-2">Support</h3>
            <div className="bg-white dark:bg-[#0C1D43] rounded-[24px] shadow-sm border border-neutral-100 dark:border-white/10 overflow-hidden">
              <Link href="/aide" className="w-full flex items-center justify-between p-4 border-b border-neutral-50 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-neutral-600 dark:text-neutral-400"><HelpCircle size={16} /></div>
                  <span className="font-semibold text-sm text-secky-blue-900 dark:text-white">Aide et support</span>
                </div>
                <ChevronRight size={18} className="text-neutral-300 dark:text-neutral-600" />
              </Link>
              <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/20 flex items-center justify-center text-status-error"><LogOut size={16} /></div>
                  <span className="font-semibold text-sm text-status-error">Déconnexion</span>
                </div>
              </button>
            </div>
          </div>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}