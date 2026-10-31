"use client";
import { Suspense, useState } from "react";
import { Search, Filter, Download, ExternalLink, RotateCcw, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

const mockTransactions = [
  { id: "TX-8821903", company: "École Les Lauriers", operator: "Orange Money", amount: "25 000", status: "succeeded", date: "26/10/2026 10:45" },
  { id: "TX-8821904", company: "Secky Tech", operator: "Wave", amount: "150 000", status: "pending", date: "26/10/2026 10:40" },
  { id: "TX-8821905", company: "Boutique Awa", operator: "Moov Money", amount: "12 500", status: "failed", date: "26/10/2026 10:35" },
  { id: "TX-8821906", company: "Startup Faso", operator: "Orange Money", amount: "50 000", status: "to_verify", date: "26/10/2026 10:30" },
  { id: "TX-8821907", company: "École Les Lauriers", operator: "Wave", amount: "75 000", status: "succeeded", date: "26/10/2026 10:15" },
];

export default function AdminTransactions() {
  const [search, setSearch] = useState("");

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "succeeded": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-status-success uppercase whitespace-nowrap"><CheckCircle2 size={10} /> Réussi</span>;
      case "pending": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-status-warning uppercase whitespace-nowrap"><Clock size={10} /> En attente</span>;
      case "failed": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-50 text-status-error uppercase whitespace-nowrap"><XCircle size={10} /> Échoué</span>;
      case "to_verify": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-status-info uppercase whitespace-nowrap"><AlertCircle size={10} /> À vérifier</span>;
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
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Transactions Globales</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Diagnostiquez n'importe quelle transaction sur la plateforme.</p>
            </div>
            <div className="flex gap-3">
              <button className="h-10 px-4 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl hover:bg-neutral-50 transition-colors flex items-center gap-2">
                <Download size={16} /> Exporter
              </button>
            </div>
          </header>

          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm mb-6 flex gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="text" placeholder="Rechercher par Réf SeckyPay, Réf Opérateur, Entreprise, Montant..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-11 pl-10 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:bg-white transition-all" />
            </div>
            <button className="h-11 px-4 bg-white border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-500 font-bold text-sm hover:bg-neutral-50 gap-2">
              <Filter size={16} /> Filtres
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100">
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Réf SeckyPay</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Entreprise</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Opérateur</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Montant</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Statut</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Date</th>
                    <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {mockTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-neutral-50 transition-colors group">
                      <td className="p-4 font-bold text-sm text-secky-blue-900 whitespace-nowrap">{tx.id}</td>
                      <td className="p-4 text-sm font-medium text-neutral-600 whitespace-nowrap">{tx.company}</td>
                      <td className="p-4 text-sm font-medium text-neutral-600 whitespace-nowrap">{tx.operator}</td>
                      <td className="p-4 text-sm font-extrabold text-secky-blue-900 text-right tabular-nums whitespace-nowrap">{tx.amount} F</td>
                      <td className="p-4">{getStatusBadge(tx.status)}</td>
                      <td className="p-4 text-xs font-medium text-neutral-500 whitespace-nowrap">{tx.date}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-secky-blue-50 hover:text-secky-blue-600 transition-colors" title="Voir le détail">
                            <ExternalLink size={16} />
                          </button>
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-orange-50 hover:text-orange-600 transition-colors" title="Re-vérifier auprès de l'opérateur">
                            <RotateCcw size={16} />
                          </button>
                        </div>
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