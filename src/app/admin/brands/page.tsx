"use client";
import { Suspense } from "react";
import { CheckCircle2, XCircle, Eye, Palette } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

const mockBrands = [
  { id: 1, company: "Boutique Awa", name: "Awa Fashion", color: "#FF7900", date: "26/10/2026", status: "pending" },
  { id: 2, company: "Startup Faso", name: "Faso Digital", color: "#6D3FB2", date: "25/10/2026", status: "pending" },
];

export default function AdminBrands() {
  return (
    <>
      <AdminMobileWarning />
      <div className="hidden md:flex min-h-screen bg-[#F8FAFC]">
        <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-[#0A1633] fixed left-0 top-0" />}>
          <AdminSidebar />
        </Suspense>

        <main className="flex-1 md:ml-64 p-8 overflow-x-hidden w-full">
          
          <header className="mb-8">
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Validation des Marques</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Vérifiez les personnalisations "Ma Marque" avant publication.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockBrands.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-neutral-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-secky-blue-900">{b.company}</h3>
                    <p className="text-xs text-neutral-500 font-medium">Soumis le {b.date}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-orange-50 text-status-warning px-2 py-1 rounded-md uppercase">En attente</span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                    <span className="text-xs font-bold text-neutral-500 uppercase">Nom commercial</span>
                    <span className="text-sm font-bold text-secky-blue-900">{b.name}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                    <span className="text-xs font-bold text-neutral-500 uppercase">Couleur</span>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: b.color }}></div>
                      <span className="text-xs font-mono font-bold text-secky-blue-900">{b.color}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                    <span className="text-xs font-bold text-neutral-500 uppercase">Logo</span>
                    <button className="text-xs font-bold text-secky-blue-600 flex items-center gap-1 hover:underline"><Eye size={14} /> Voir l'image</button>
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex gap-2">
                  <button className="flex-1 h-10 bg-white border border-neutral-200 text-status-error font-bold text-sm rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                    <XCircle size={16} /> Refuser
                  </button>
                  <button className="flex-1 h-10 bg-secky-blue-600 text-white font-bold text-sm rounded-xl hover:bg-secky-blue-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-secky-blue-600/20">
                    <CheckCircle2 size={16} /> Approuver
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </>
  );
}