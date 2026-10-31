"use client";
import { Suspense, useState } from "react";
import { AlertTriangle, AlertCircle, CheckCircle2, Clock, Search, Filter, MessageSquare } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

const mockIncidents = [
  { id: "INC-042", title: "Taux d'échec élevé - Moov Money", priority: "critical", status: "investigating", company: "-", assigned: "Kofi B.", date: "Il y a 15 min", messages: 3 },
  { id: "INC-041", title: "Webhook non reçu - École Les Lauriers", priority: "high", status: "open", company: "École Les Lauriers", assigned: "Aminata M.", date: "Il y a 2h", messages: 1 },
  { id: "INC-040", title: "Rapprochement - Wave écart de 5 000 F", priority: "medium", status: "resolved", company: "Secky Tech", assigned: "Oumar T.", date: "Hier", messages: 5 },
];

export default function AdminIncidents() {
  const [search, setSearch] = useState("");

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "critical": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-50 text-status-error uppercase whitespace-nowrap"><AlertCircle size={10} /> Critique</span>;
      case "high": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-status-warning uppercase whitespace-nowrap"><AlertTriangle size={10} /> Haute</span>;
      case "medium": return <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-secky-blue-600 uppercase whitespace-nowrap">Moyenne</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "open": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-600 uppercase whitespace-nowrap">Nouveau</span>;
      case "investigating": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-status-warning uppercase whitespace-nowrap"><Clock size={10} /> En cours</span>;
      case "resolved": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-status-success uppercase whitespace-nowrap"><CheckCircle2 size={10} /> Résolu</span>;
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
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Incidents & Support</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Suivez et résolvez les incidents de la plateforme.</p>
            </div>
            <button className="h-10 px-4 bg-secky-blue-600 text-white font-bold text-sm rounded-xl hover:bg-secky-blue-800 transition-colors shadow-lg shadow-secky-blue-600/20">
              + Nouvel incident
            </button>
          </header>

          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm mb-6 flex gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="text" placeholder="Rechercher un incident..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-11 pl-10 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:bg-white transition-all" />
            </div>
            <button className="h-11 px-4 bg-white border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-500 font-bold text-sm hover:bg-neutral-50 gap-2">
              <Filter size={16} /> Filtrer
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100">
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Réf</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Titre</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Priorité</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Statut</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Assigné à</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Date</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-center">Messages</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {mockIncidents.map((inc) => (
                    <tr key={inc.id} className="hover:bg-neutral-50 transition-colors cursor-pointer">
                      <td className="p-4 font-bold text-sm text-secky-blue-900 whitespace-nowrap">{inc.id}</td>
                      <td className="p-4 text-sm font-medium text-neutral-600">{inc.title}</td>
                      <td className="p-4">{getPriorityBadge(inc.priority)}</td>
                      <td className="p-4">{getStatusBadge(inc.status)}</td>
                      <td className="p-4 text-sm font-medium text-neutral-600 whitespace-nowrap">{inc.assigned}</td>
                      <td className="p-4 text-xs font-medium text-neutral-500 whitespace-nowrap">{inc.date}</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500">
                          <MessageSquare size={14} /> {inc.messages}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}