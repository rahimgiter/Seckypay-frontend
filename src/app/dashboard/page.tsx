"use client";

import { useState, useEffect, Suspense } from "react";
import { Bell, ArrowUpRight, ArrowDownLeft, Wallet, Receipt, Lock, PieChart, MoreHorizontal, Loader2, Monitor, RefreshCw } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import BrandAvatar from "@/components/BrandAvatar";
import { useBrand } from "@/contexts/BrandContext";

export default function Dashboard() {
  const { branding } = useBrand();
  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6) setGreeting("Bonne nuit");
    else if (hour < 12) setGreeting("Bonjour");
    else if (hour < 18) setGreeting("Bon après-midi");
    else setGreeting("Bonsoir");
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch("/api/dashboard");
      const json = await res.json();
      setStats(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] md:bg-white flex">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8">
        
        <header className="pt-8 pb-4 px-6 flex justify-between items-center bg-white md:bg-transparent">
          <div className="flex items-center gap-3 md:hidden">
            <BrandAvatar size="md" showRing />
            <div>
              <p className="text-[13px] text-neutral-500 font-medium">{greeting}</p>
              <h1 className="text-lg font-bold text-secky-blue-900 leading-tight">{branding.brandName}</h1>
            </div>
          </div>

          <div className="hidden md:block">
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Vue d'ensemble</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">{greeting}, {branding.brandName}. Voici ce qui se passe aujourd'hui.</p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin" className="hidden md:flex items-center gap-2 h-10 px-4 bg-[#0A1633] text-white font-bold text-xs rounded-xl hover:bg-secky-blue-600 transition-colors">
              <Monitor size={14} /> Espace Admin
            </Link>
            <button onClick={fetchStats} className="w-11 h-11 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-secky-blue-900 shadow-sm hover:bg-neutral-50 active:scale-95 transition-transform">
              <RefreshCw size={16} />
            </button>
            <Link href="/notifications" className="w-11 h-11 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-secky-blue-900 shadow-sm relative active:scale-95 transition-transform">
              <Bell size={18} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-status-error rounded-full border border-white"></span>
            </Link>
          </div>
        </header>

        <div className="px-6 md:px-8 mt-4 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="card-bank-texture rounded-[32px] p-8 text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <p className="text-sm font-medium text-white/70 mb-2">Chiffre d'affaires (Total)</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    {isLoading ? (
                      <Loader2 size={40} className="animate-spin text-white/50" />
                    ) : (
                      <>
                        <h2 className="text-[48px] font-extrabold tracking-tighter leading-none text-white">{(stats?.totalRevenue || 0).toLocaleString("fr-FR")}</h2>
                        <span className="text-lg font-semibold text-white/80">FCFA</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Link href="/encaisser" className="bg-white text-secky-blue-900 h-12 px-6 rounded-2xl font-bold text-sm flex items-center justify-center active:scale-95 transition-transform shadow-[0_8px_16px_rgba(0,0,0,0.2)]">
                    Encaisser
                  </Link>
                  <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-transform hover:bg-white/20">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card-3d p-6 rounded-[24px] flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Transactions</p>
                  <p className="text-3xl font-extrabold text-secky-blue-900">{isLoading ? "..." : stats?.totalCount || 0}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-secky-blue-600">
                  <Receipt size={20} />
                </div>
              </div>
              <div className="card-3d p-6 rounded-[24px] flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Taux de réussite</p>
                  <p className="text-3xl font-extrabold text-status-success">{isLoading ? "..." : `${stats?.successRate || 0}%`}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-status-success">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-bold text-secky-blue-900 mb-4">Actions rapides</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <Link href="/encaisser" className="card-3d p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-secky-blue-600 shrink-0"><Wallet size={20} /></div>
                  <div><p className="font-bold text-secky-blue-900 text-sm">Encaisser</p><p className="text-[10px] md:text-xs text-neutral-500">Créer un lien</p></div>
                </Link>
                <Link href="/transactions" className="card-3d p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0"><Receipt size={20} /></div>
                  <div><p className="font-bold text-secky-blue-900 text-sm">Transactions</p><p className="text-[10px] md:text-xs text-neutral-500">Historique</p></div>
                </Link>
                <Link href="/finances" className="card-3d p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0"><PieChart size={20} /></div>
                  <div><p className="font-bold text-secky-blue-900 text-sm">Finances</p><p className="text-[10px] md:text-xs text-neutral-500">Journal</p></div>
                </Link>
                <Link href="/cloture" className="card-3d p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0"><Lock size={20} /></div>
                  <div><p className="font-bold text-secky-blue-900 text-sm">Clôture</p><p className="text-[10px] md:text-xs text-neutral-500">Fermer</p></div>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-secky-blue-900">Dernières opérations</h3>
              <Link href="/transactions" className="text-sm font-bold text-secky-blue-600 hover:underline">Tout voir</Link>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin text-secky-blue-600" size={24} /></div>
              ) : (
                stats?.recentTransactions?.map((tx: any) => (
                  <Link href={`/transactions/${tx.id}`} key={tx.id} className="card-3d p-5 rounded-2xl flex items-center justify-between hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${tx.status === "succeeded" ? "bg-green-50 text-status-success" : tx.status === "pending" ? "bg-orange-50 text-status-warning" : "bg-red-50 text-status-error"}`}>
                        <ArrowDownLeft size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-secky-blue-900 text-sm">{tx.subject}</p>
                        <p className="text-xs text-neutral-500 font-medium mt-1">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-secky-blue-900 text-sm">+{tx.amount.toLocaleString("fr-FR")} F</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block uppercase ${tx.status === "succeeded" ? "text-status-success bg-green-50" : tx.status === "pending" ? "text-status-warning bg-orange-50" : "text-status-error bg-red-50"}`}>
                        {tx.status === "succeeded" ? "Réussi" : tx.status === "pending" ? "En attente" : "Échoué"}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}