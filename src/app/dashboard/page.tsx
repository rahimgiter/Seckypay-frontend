"use client";

import { useState, useEffect, Suspense } from "react";
import { Bell, ArrowUpRight, ArrowDownLeft, Wallet, Receipt, Lock, PieChart, MoreHorizontal, Loader2, Monitor, RefreshCw, TrendingUp, TrendingDown, Coins, ArrowRightLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import MobileDrawer from "@/components/MobileDrawer";
import BrandAvatar from "@/components/BrandAvatar";
import { useBrand } from "@/contexts/BrandContext";

export default function Dashboard() {
  const { branding } = useBrand();
  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const formatAmount = (n: number | undefined) => (n || 0).toLocaleString("fr-FR");

  return (
    <div className="min-h-screen bg-[#FAFAFA] md:bg-white flex">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="flex-1 md:ml-64 pb-32 md:pb-8">
        
        <header className="pt-8 pb-4 px-6 flex justify-between items-center bg-white md:bg-transparent">
          <button 
            onClick={() => setIsDrawerOpen(true)} 
            className="flex items-center gap-3 md:hidden active:opacity-70 transition-opacity"
          >
            <BrandAvatar size="md" showRing />
            <div className="text-left">
              <p className="text-[13px] text-neutral-500 font-medium">{greeting}</p>
              <h1 className="text-lg font-bold text-secky-blue-900 leading-tight">{branding.brandName}</h1>
            </div>
          </button>

          <div className="hidden md:block">
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Vue d'ensemble du jour</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">{greeting}, {branding.brandName}. Voici votre activité du jour.</p>
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

        <div className="px-6 md:px-8 mt-4 md:mt-8 max-w-7xl mx-auto space-y-6">
          
          {/* Bandeau d'alerte si écart */}
          {stats?.cashRegister?.status === "closed" && stats?.cashRegister?.gap !== 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle size={20} className="text-status-warning shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-orange-900">Écart de caisse détecté</p>
                <p className="text-xs text-orange-700 font-medium mt-1">
                  Écart de {formatAmount(stats.cashRegister.gap)} FCFA sur la clôture. Vérifiez les opérations non enregistrées.
                </p>
              </div>
              <Link href="/cloture" className="text-xs font-bold text-orange-900 hover:underline shrink-0">Voir</Link>
            </div>
          )}

          {/* Cartes principales : Entrées / Sorties / Frais / Net */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Entrées */}
            <div className="bg-white rounded-[24px] p-5 border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-status-success">
                  <TrendingUp size={20} />
                </div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{stats?.entriesCount || 0} op.</span>
              </div>
              <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Entrées du jour</p>
              {isLoading ? (
                <Loader2 size={24} className="animate-spin text-neutral-300" />
              ) : (
                <p className="text-2xl font-extrabold text-secky-blue-900">
                  {formatAmount(stats?.entries)} <span className="text-sm font-medium text-neutral-400">F</span>
                </p>
              )}
            </div>

            {/* Sorties */}
            <div className="bg-white rounded-[24px] p-5 border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-status-error">
                  <TrendingDown size={20} />
                </div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{stats?.exitsCount || 0} op.</span>
              </div>
              <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Sorties du jour</p>
              {isLoading ? (
                <Loader2 size={24} className="animate-spin text-neutral-300" />
              ) : (
                <p className="text-2xl font-extrabold text-secky-blue-900">
                  {formatAmount(stats?.exits)} <span className="text-sm font-medium text-neutral-400">F</span>
                </p>
              )}
            </div>

            {/* Frais */}
            <div className="bg-white rounded-[24px] p-5 border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <Coins size={20} />
                </div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total</span>
              </div>
              <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Frais du jour</p>
              {isLoading ? (
                <Loader2 size={24} className="animate-spin text-neutral-300" />
              ) : (
                <p className="text-2xl font-extrabold text-secky-blue-900">
                  {formatAmount(stats?.totalFees)} <span className="text-sm font-medium text-neutral-400">F</span>
                </p>
              )}
            </div>

            {/* Variation de caisse */}
            <div className="bg-white rounded-[24px] p-5 border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-secky-blue-50 flex items-center justify-center text-secky-blue-600">
                  <ArrowRightLeft size={20} />
                </div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Net</span>
              </div>
              <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Variation de caisse</p>
              {isLoading ? (
                <Loader2 size={24} className="animate-spin text-neutral-300" />
              ) : (
                <p className={`text-2xl font-extrabold ${(stats?.variationCaisse || 0) >= 0 ? "text-status-success" : "text-status-error"}`}>
                  {(stats?.variationCaisse || 0) >= 0 ? "+" : ""}{formatAmount(stats?.variationCaisse)} <span className="text-sm font-medium text-neutral-400">F</span>
                </p>
              )}
            </div>
          </div>

          {/* Carte Net Encaissé + Caisse */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Net Encaissé (grande carte) */}
            <div className="lg:col-span-2 card-bank-texture rounded-[32px] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70 mb-2">Net encaissé du jour</p>
                    <div className="flex items-baseline gap-2 mb-2">
                      {isLoading ? (
                        <Loader2 size={40} className="animate-spin text-white/50" />
                      ) : (
                        <>
                          <h2 className="text-[48px] font-extrabold tracking-tighter leading-none">{formatAmount(stats?.netEncaisse)}</h2>
                          <span className="text-lg font-semibold text-white/80">FCFA</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-white/50 mt-3 max-w-sm">
                      Entrées − frais sur entrées. Ce n'est pas un bénéfice (coût des marchandises non inclus).
                    </p>
                  </div>
                  
                  <div className="hidden md:flex flex-col gap-2 shrink-0">
                    <Link href="/encaisser" className="bg-white text-secky-blue-900 h-11 px-5 rounded-2xl font-bold text-sm flex items-center justify-center active:scale-95 transition-transform shadow-[0_8px_16px_rgba(0,0,0,0.2)]">
                      Encaisser
                    </Link>
                    <Link href="/envoyer" className="bg-white/10 backdrop-blur-md border border-white/20 text-white h-11 px-5 rounded-2xl font-bold text-sm flex items-center justify-center active:scale-95 transition-transform hover:bg-white/20">
                      Envoyer
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Solde de caisse */}
            <div className="bg-white rounded-[24px] p-6 border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Solde de caisse</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stats?.cashRegister?.status === "closed" ? "bg-green-50 text-status-success" : "bg-orange-50 text-status-warning"}`}>
                  {stats?.cashRegister?.status === "closed" ? "Clôturée" : "Ouverte"}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Ouverture</p>
                  <p className="text-lg font-extrabold text-secky-blue-900">{formatAmount(stats?.cashRegister?.openingBalance)} F</p>
                </div>
                <div className="pt-3 border-t border-neutral-100">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Attendu (calculé)</p>
                  <p className="text-lg font-extrabold text-secky-blue-900">
                    {formatAmount((stats?.cashRegister?.openingBalance || 0) + (stats?.variationCaisse || 0))} F
                  </p>
                </div>
                {stats?.cashRegister?.status === "closed" && (
                  <div className="pt-3 border-t border-neutral-100">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Écart</p>
                    <p className={`text-lg font-extrabold ${(stats?.cashRegister?.gap || 0) === 0 ? "text-status-success" : "text-status-error"}`}>
                      {formatAmount(stats?.cashRegister?.gap)} F
                    </p>
                  </div>
                )}
              </div>

              <Link href="/cloture" className="mt-4 w-full h-10 bg-neutral-50 hover:bg-neutral-100 text-secky-blue-900 font-bold text-xs rounded-xl flex items-center justify-center transition-colors">
                {stats?.cashRegister?.status === "closed" ? "Voir la clôture" : "Clôturer la journée"}
              </Link>
            </div>
          </div>

          {/* Répartition par opérateur */}
          <div className="bg-white rounded-[24px] p-6 border border-neutral-200 shadow-sm">
            <h3 className="text-lg font-bold text-secky-blue-900 mb-4">Répartition par opérateur</h3>
            <div className="space-y-3">
              {stats?.byOperator?.map((op: any) => (
                <div key={op.operator} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${op.operator === "Orange Money" ? "bg-[#FF7900]" : op.operator === "Wave" ? "bg-[#1DC3F3]" : "bg-[#0066B3]"}`}>
                      {op.operator.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-secky-blue-900">{op.operator}</p>
                      <p className="text-xs text-neutral-500">{op.count} opération{op.count > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-status-success">+{formatAmount(op.entries)} F</p>
                    {op.exits > 0 && <p className="text-xs font-bold text-status-error">−{formatAmount(op.exits)} F</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions rapides */}
          <div>
            <h3 className="text-lg font-bold text-secky-blue-900 mb-4">Actions rapides</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <Link href="/encaisser" className="card-3d p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-secky-blue-600 shrink-0"><Wallet size={20} /></div>
                <div><p className="font-bold text-secky-blue-900 text-sm">Encaisser</p><p className="text-[10px] md:text-xs text-neutral-500">Créer un lien</p></div>
              </Link>
              <Link href="/envoyer" className="card-3d p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-50 flex items-center justify-center text-status-error shrink-0"><ArrowUpRight size={20} /></div>
                <div><p className="font-bold text-secky-blue-900 text-sm">Envoyer</p><p className="text-[10px] md:text-xs text-neutral-500">Transfert</p></div>
              </Link>
              <Link href="/transactions" className="card-3d p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0"><Receipt size={20} /></div>
                <div><p className="font-bold text-secky-blue-900 text-sm">Transactions</p><p className="text-[10px] md:text-xs text-neutral-500">Historique</p></div>
              </Link>
              <Link href="/cloture" className="card-3d p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0"><Lock size={20} /></div>
                <div><p className="font-bold text-secky-blue-900 text-sm">Clôture</p><p className="text-[10px] md:text-xs text-neutral-500">Fermer</p></div>
              </Link>
            </div>
          </div>

          {/* Dernières opérations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-secky-blue-900">Dernières opérations</h3>
              <Link href="/transactions" className="text-sm font-bold text-secky-blue-600 hover:underline">Tout voir</Link>
            </div>

            <div className="space-y-3">
              {isLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin text-secky-blue-600" size={24} /></div>
              ) : (
                stats?.recentTransactions?.map((tx: any) => (
                  <Link href={`/transactions/${tx.id}`} key={tx.id} className="bg-white p-4 md:p-5 rounded-2xl border border-neutral-200 flex items-center justify-between hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tx.type === "in" ? "bg-green-50 text-status-success" : "bg-red-50 text-status-error"}`}>
                        {tx.type === "in" ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-secky-blue-900 text-sm">{tx.subject}</p>
                        <p className="text-xs text-neutral-500 font-medium mt-0.5">{tx.date} · {tx.operator}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-extrabold text-sm ${tx.type === "in" ? "text-status-success" : "text-status-error"}`}>
                        {tx.type === "in" ? "+" : "−"}{formatAmount(tx.amount)} F
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${tx.feesSource === "real" ? "bg-green-50 text-status-success" : "bg-neutral-100 text-neutral-500"}`}>
                          {tx.feesSource === "real" ? "Frais réels" : "Frais estimés"}
                        </span>
                      </div>
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