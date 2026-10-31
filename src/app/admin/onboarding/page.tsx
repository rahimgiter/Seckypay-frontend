"use client";
import { Suspense } from "react";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

const mockPending = [
  { id: 1, name: "École Les Lauriers", rep: "Sylvain K.", date: "26/10/2026", sector: "Éducation", docs: "Complets" },
  { id: 2, name: "Startup Faso", rep: "Aminata M.", date: "25/10/2026", sector: "E-commerce", docs: "RCCM manquant" },
];

export default function AdminOnboarding() {
  return (
    <>
      <AdminMobileWarning />
      <div className="hidden md:flex min-h-screen bg-[#F8FAFC]">
        <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-[#0A1633] fixed left-0 top-0" />}>
          <AdminSidebar />
        </Suspense>

        <main className="flex-1 md:ml-64 p-8 overflow-x-hidden w-full">
          
          <header className="mb-8">
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Demandes d'ouverture de compte</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Validez les nouvelles entreprises qui souhaitent rejoindre SeckyPay.</p>
          </header>

          <div className="space-y-4">
            {mockPending.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex items-center justify-between gap-6 hover:border-secky-blue-200 transition-colors">
                
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-secky-blue-50 flex items-center justify-center text-secky-blue-600 font-bold shrink-0">
                    {p.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg text-secky-blue-900 truncate">{p.name}</h3>
                    <p className="text-sm text-neutral-500 font-medium truncate">Représentant : {p.rep} · {p.sector}</p>
                    <p className="text-xs text-neutral-400 font-medium mt-1">Demande soumise le {p.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Documents</p>
                    <span className={`text-xs font-bold whitespace-nowrap ${p.docs === "Complets" ? "text-status-success" : "text-status-warning"}`}>{p.docs}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="h-10 px-4 bg-red-50 text-status-error font-bold text-sm rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2 whitespace-nowrap">
                      <XCircle size={16} /> Refuser
                    </button>
                    <button className="h-10 px-4 bg-secky-blue-600 text-white font-bold text-sm rounded-xl hover:bg-secky-blue-800 transition-colors flex items-center gap-2 shadow-lg shadow-secky-blue-600/20 whitespace-nowrap">
                      <CheckCircle2 size={16} /> Valider
                    </button>
                    <button className="w-10 h-10 bg-white border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-500 hover:bg-neutral-50 shrink-0">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </>
  );
}