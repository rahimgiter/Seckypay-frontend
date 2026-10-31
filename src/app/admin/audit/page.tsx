"use client";
import { Suspense, useState } from "react";
import { Search, Filter, Download, ShieldCheck, User, FileText, Lock } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

const mockLogs = [
  { id: 1, time: "26/10/2026 11:42:15", actor: "kofi@seckytech.com", role: "Super Admin", action: "SUSPEND_COMPANY", target: "Resto Chez Tanti", ip: "196.20.x.x", device: "Chrome / macOS" },
  { id: 2, time: "26/10/2026 11:38:00", actor: "aminata@seckytech.com", role: "Opérations", action: "VALIDATE_ONBOARDING", target: "École Les Lauriers", ip: "196.20.x.x", device: "Firefox / Windows" },
  { id: 3, time: "26/10/2026 11:30:22", actor: "oumar@seckytech.com", role: "Finance", action: "ROTATE_API_KEY", target: "Moov Money", ip: "196.20.x.x", device: "Chrome / Windows" },
  { id: 4, time: "26/10/2026 10:15:40", actor: "kofi@seckytech.com", role: "Super Admin", action: "UNLOCK_PERIOD", target: "Secky Tech · 25/10/2026", ip: "196.20.x.x", device: "Chrome / macOS" },
  { id: 5, time: "26/10/2026 09:00:00", actor: "système", role: "Système", action: "DAILY_BACKUP", target: "Base de données", ip: "-", device: "-" },
];

export default function AdminAudit() {
  const [search, setSearch] = useState("");

  const getActionColor = (action: string) => {
    if (action.includes("SUSPEND") || action.includes("REVOKE")) return "bg-red-50 text-status-error";
    if (action.includes("VALIDATE") || action.includes("APPROVE")) return "bg-green-50 text-status-success";
    if (action.includes("ROTATE") || action.includes("UNLOCK")) return "bg-orange-50 text-status-warning";
    return "bg-neutral-100 text-neutral-600";
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
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Journal d'Audit</h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-status-success bg-green-50 px-2 py-1 rounded-md uppercase"><Lock size={10} /> Lecture seule</span>
              </div>
              <p className="text-sm text-neutral-500 font-medium mt-1">Traçabilité complète de toutes les actions sur la plateforme.</p>
            </div>
            <button className="h-10 px-4 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl hover:bg-neutral-50 transition-colors flex items-center gap-2">
              <Download size={16} /> Exporter
            </button>
          </header>

          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm mb-6 flex gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="text" placeholder="Rechercher par acteur, action, cible..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-11 pl-10 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:bg-white transition-all" />
            </div>
            <button className="h-11 px-4 bg-white border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-500 font-bold text-sm hover:bg-neutral-50 gap-2">
              <Filter size={16} /> Filtrer
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100">
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Horodatage</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Acteur</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Action</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Cible</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Adresse IP</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Appareil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {mockLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-4 text-xs font-mono text-neutral-500 whitespace-nowrap">{log.time}</td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-bold text-secky-blue-900">{log.actor}</p>
                          <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">{log.role}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold font-mono uppercase whitespace-nowrap ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-medium text-neutral-600 whitespace-nowrap">{log.target}</td>
                      <td className="p-4 text-xs font-mono text-neutral-500">{log.ip}</td>
                      <td className="p-4 text-xs font-medium text-neutral-500 whitespace-nowrap">{log.device}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xs text-neutral-400 font-medium">Affichage de 5 logs sur 12 482</p>
            <div className="flex gap-2">
              <button className="h-9 px-4 bg-white border border-neutral-200 text-neutral-500 font-bold text-xs rounded-lg hover:bg-neutral-50">Précédent</button>
              <button className="h-9 px-4 bg-secky-blue-600 text-white font-bold text-xs rounded-lg hover:bg-secky-blue-800">Suivant</button>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}