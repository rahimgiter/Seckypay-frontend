"use client";
import { Suspense, useState } from "react";
import { AlertTriangle, CheckCircle2, RefreshCw, Key, ExternalLink, Activity, Clock } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

const mockOperators = [
  { id: "orange", name: "Orange Money", status: "operational", env: "production", apiVersion: "v2.1.4", success: "96%", latency: "120ms", lastCallback: "2s ago", color: "bg-[#FF7900]" },
  { id: "moov", name: "Moov Money", status: "degraded", env: "production", apiVersion: "v1.8.0", success: "82%", latency: "450ms", lastCallback: "12s ago", color: "bg-[#0066B3]" },
  { id: "wave", name: "Wave", status: "operational", env: "production", apiVersion: "v3.0.1", success: "98%", latency: "90ms", lastCallback: "1s ago", color: "bg-[#1DC3F3]" },
];

export default function AdminIntegrations() {
  const [rotating, setRotating] = useState<string | null>(null);

  const handleRotate = (id: string) => {
    setRotating(id);
    setTimeout(() => setRotating(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "operational": return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-status-success uppercase whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span> Opérationnel</span>;
      case "degraded": return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-status-warning uppercase whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-status-warning"></span> Dégradé</span>;
      case "down": return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-50 text-status-error uppercase whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-status-error"></span> Indisponible</span>;
      default: return null;
    }
  };

  return (
    <>
      <AdminMobileWarning />
      <div className="hidden md:flex min-h-screen bg-[#F8FAFC]">
        <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-[#0A1633] fixed left-0 top-0" />}>
          <AdminSidebar />
        </Suspense>

        <main className="flex-1 md:ml-64 p-8 overflow-x-hidden w-full">
          
          <header className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Intégrations Opérateurs</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Surveillez la santé et la configuration des APIs.</p>
            </div>
            <button className="h-10 px-4 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl hover:bg-neutral-50 transition-colors flex items-center gap-2">
              <RefreshCw size={16} /> Actualiser
            </button>
          </header>

          {/* Bandeau d'alerte si dégradé */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <AlertTriangle size={20} className="text-status-warning shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-orange-900">1 opérateur en mode dégradé</p>
              <p className="text-xs text-orange-700 font-medium mt-0.5">Moov Money présente un taux d'échec anormal (18%). Une intervention est recommandée.</p>
            </div>
            <button className="h-9 px-4 bg-white text-orange-700 font-bold text-xs rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">Voir l'incident</button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {mockOperators.map((op) => (
              <div key={op.id} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-neutral-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${op.color} flex items-center justify-center text-white font-extrabold text-sm shadow-sm`}>
                      {op.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg text-secky-blue-900">{op.name}</h3>
                        {getStatusBadge(op.status)}
                      </div>
                      <p className="text-xs text-neutral-500 font-medium mt-1">Environnement : <strong className="text-secky-blue-900 uppercase">{op.env}</strong> · API {op.apiVersion}</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-500 hover:bg-neutral-100">
                    <ExternalLink size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-3 divide-x divide-neutral-100">
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity size={14} className="text-neutral-400" />
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Taux de réussite</p>
                    </div>
                    <p className={`text-xl font-extrabold ${parseInt(op.success) > 90 ? "text-status-success" : "text-status-warning"}`}>{op.success}</p>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="text-neutral-400" />
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Latence</p>
                    </div>
                    <p className="text-xl font-extrabold text-secky-blue-900">{op.latency}</p>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <RefreshCw size={14} className="text-neutral-400" />
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Dernier callback</p>
                    </div>
                    <p className="text-xl font-extrabold text-secky-blue-900">{op.lastCallback}</p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                    <Key size={14} className="text-neutral-400" />
                    Clé API : <span className="font-mono bg-white px-2 py-0.5 rounded border border-neutral-200">••••••••••••{op.id.slice(0, 3)}</span>
                  </div>
                  <button 
                    onClick={() => handleRotate(op.id)}
                    disabled={rotating === op.id}
                    className="h-8 px-3 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-xs rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-50"
                  >
                    {rotating === op.id ? "Rotation..." : "Renouveler la clé"}
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