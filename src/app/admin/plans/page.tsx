"use client";
import { Suspense } from "react";
import { CheckCircle2, Edit, Users, Zap } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

const plans = [
  { name: "SINGRE", price: "0", features: ["50 tx/mois", "1 utilisateur", "Support standard"], active: true, popular: false },
  { name: "NAAM", price: "15 000", features: ["Tx illimitées", "5 utilisateurs", "Comptabilité SYSCOHADA", "Support prioritaire"], active: true, popular: true },
  { name: "PANGA", price: "Sur devis", features: ["Tx illimitées", "Utilisateurs illimités", "Ma Marque", "Gestionnaire dédié"], active: true, popular: false },
];

export default function AdminPlans() {
  return (
    <>
      <AdminMobileWarning />
      <div className="hidden md:flex min-h-screen bg-[#F8FAFC]">
        <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-[#0A1633] fixed left-0 top-0" />}>
          <AdminSidebar />
        </Suspense>

        <main className="flex-1 md:ml-64 p-8 overflow-x-hidden w-full">
          
          <header className="mb-8">
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Plans et Offres</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Gérez les abonnements et les limites par offre.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`bg-white rounded-2xl border shadow-sm p-6 relative ${plan.popular ? "border-secky-blue-600 ring-1 ring-secky-blue-600" : "border-neutral-200"}`}>
                {plan.popular && <span className="absolute top-0 right-6 -translate-y-1/2 bg-secky-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Populaire</span>}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-secky-blue-900">{plan.name}</h3>
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Plan tarifaire</p>
                  </div>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100">
                    <Edit size={16} />
                  </button>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-secky-blue-900">{plan.price}</span>
                  {plan.price !== "Sur devis" && <span className="text-sm font-bold text-neutral-400 ml-1">FCFA / mois</span>}
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-neutral-600 font-medium">
                      <CheckCircle2 size={14} className="text-status-success shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-status-success bg-green-50 px-2 py-1 rounded-md">Actif</span>
                  <button className="text-xs font-bold text-secky-blue-600 hover:underline">Modifier</button>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </>
  );
}