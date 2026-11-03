"use client";
import { Suspense } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, Zap, Building2, Loader2 } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

function AbonnementContent() {
  const plans = [
    { name: "Découverte", price: "0", period: "/ mois", features: ["50 transactions / mois", "1 utilisateur", "Liens de paiement", "Support standard"], current: false, popular: false },
    { name: "Business", price: "15 000", period: "FCFA / mois", features: ["Transactions illimitées", "5 utilisateurs", "Comptabilité SYSCOHADA", "Exports PDF/Excel/CSV", "Support prioritaire"], current: true, popular: true },
    { name: "Entreprise", price: "Sur devis", period: "", features: ["Tout Business", "Utilisateurs illimités", "Personnalisation \"Ma Marque\"", "Gestionnaire dédié", "SLA garanti"], current: false, popular: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex items-center gap-4 bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none">
          <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Mon abonnement</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Gérez votre offre et vos factures.</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-5xl mx-auto w-full space-y-6">
          
          {/* Abonnement actuel */}
          <div className="bg-secky-gradient rounded-[24px] p-6 text-white shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1">Abonnement actuel</p>
                <h2 className="text-2xl font-extrabold">Business</h2>
                <p className="text-sm text-white/70 mt-1">Renouvellement le 15/11/2026</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70">Prochaine facture</p>
                <p className="text-xl font-extrabold">15 000 <span className="text-sm">FCFA</span></p>
              </div>
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div key={plan.name} className={`bg-white rounded-2xl p-6 border-2 ${plan.current ? "border-secky-blue-600 shadow-lg" : "border-neutral-200"} relative`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secky-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Populaire</span>
                )}
                {plan.current && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold text-status-success bg-green-50 px-2 py-0.5 rounded-md">Actuel</span>
                )}
                <h3 className="text-lg font-extrabold text-secky-blue-900 mb-1">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-2xl font-extrabold text-secky-blue-900">{plan.price}</span>
                  <span className="text-xs text-neutral-500 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-neutral-600 font-medium">
                      <CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full h-11 rounded-xl font-bold text-sm transition-colors ${plan.current ? "bg-neutral-100 text-neutral-400 cursor-not-allowed" : "bg-secky-blue-600 text-white hover:bg-secky-blue-800"}`}
                  disabled={plan.current}
                >
                  {plan.current ? "Abonnement actuel" : plan.price === "Sur devis" ? "Nous contacter" : "Choisir"}
                </button>
              </div>
            ))}
          </div>

          {/* Factures */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-bold text-secky-blue-900">Historique des factures</h3>
            </div>
            <div className="divide-y divide-neutral-100">
              {[
                { date: "15/10/2026", amount: "15 000", status: "Payée" },
                { date: "15/09/2026", amount: "15 000", status: "Payée" },
                { date: "15/08/2026", amount: "15 000", status: "Payée" },
              ].map((f, i) => (
                <div key={i} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-secky-blue-900">Facture {f.date}</p>
                    <p className="text-xs text-neutral-500">{f.amount} FCFA</p>
                  </div>
                  <span className="text-[10px] font-bold text-status-success bg-green-50 px-2 py-1 rounded-md uppercase">{f.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default function Abonnement() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <AbonnementContent />
    </Suspense>
  );
}