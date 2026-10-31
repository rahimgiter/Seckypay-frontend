"use client";
import { useState } from "react";
import { ArrowLeft, Download, CheckCircle2, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const mockEntries = [
  { date: "26/10/2026", piece: "VT-001", account: "521000", label: "Encaissement Orange Money", debit: "250 000", credit: "" },
  { date: "26/10/2026", piece: "VT-001", account: "701000", label: "Ventes de marchandises", debit: "", credit: "250 000" },
  { date: "26/10/2026", piece: "VT-002", account: "521000", label: "Encaissement Wave", debit: "150 000", credit: "" },
  { date: "26/10/2026", piece: "VT-002", account: "701000", label: "Ventes de marchandises", debit: "", credit: "150 000" },
  { date: "25/10/2026", piece: "VT-003", account: "521000", label: "Encaissement Moov Money", debit: "80 000", credit: "" },
];

export default function Finances() {
  const [activeTab, setActiveTab] = useState("journal");

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 md:ml-64 pb-40 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex flex-col md:flex-row md:items-center justify-between bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Finances</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Journal, Grand livre et Balance.</p>
            </div>
          </div>
          <button className="hidden md:flex h-11 px-5 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl items-center justify-center shadow-sm hover:bg-neutral-50 transition-all">
            <Download size={18} className="mr-2" /> Exporter
          </button>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-6xl mx-auto w-full space-y-6">
          
          {/* Résumé SYSCOHADA */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-neutral-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-status-success shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-secky-blue-900">Comptabilité équilibrée</p>
                <p className="text-xs text-neutral-500 mt-0.5">Compatible SYSCOHADA. Ne remplace pas la comptabilité officielle.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total Débit</p>
                <p className="text-lg font-extrabold text-secky-blue-900 tabular-nums">480 000 F</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total Crédit</p>
                <p className="text-lg font-extrabold text-secky-blue-900 tabular-nums">480 000 F</p>
              </div>
            </div>
          </div>

          {/* Onglets */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-neutral-100 shadow-sm overflow-x-auto scrollbar-hide">
            <button onClick={() => setActiveTab("journal")} className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap px-4 ${activeTab === "journal" ? "bg-secky-blue-600 text-white shadow-md" : "text-neutral-500 hover:text-secky-blue-900"}`}>Journal</button>
            <button onClick={() => setActiveTab("grand-livre")} className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap px-4 ${activeTab === "grand-livre" ? "bg-secky-blue-600 text-white shadow-md" : "text-neutral-500 hover:text-secky-blue-900"}`}>Grand livre</button>
            <button onClick={() => setActiveTab("balance")} className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap px-4 ${activeTab === "balance" ? "bg-secky-blue-600 text-white shadow-md" : "text-neutral-500 hover:text-secky-blue-900"}`}>Balance</button>
          </div>

          {/* VUE MOBILE : Liste de cartes */}
          <div className="md:hidden space-y-3">
            {mockEntries.map((entry, idx) => (
              <div key={idx} className="bg-white rounded-[20px] p-5 shadow-sm border border-neutral-100 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{entry.date}</p>
                    <p className="text-sm font-bold text-secky-blue-900 mt-1">{entry.label}</p>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    {entry.debit ? (
                      <>
                        <p className="text-sm font-extrabold text-secky-blue-900">{entry.debit} F</p>
                        <span className="text-[9px] font-bold text-neutral-400 uppercase">Débit</span>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-extrabold text-status-success">{entry.credit} F</p>
                        <span className="text-[9px] font-bold text-status-success/70 uppercase">Crédit</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-neutral-50">
                  <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-1 rounded-md">
                    {entry.piece}
                  </span>
                  <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-1 rounded-md">
                    Compte: {entry.account}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* VUE DESKTOP : Tableau classique */}
          <div className="hidden md:block bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-100">
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">N° Pièce</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Compte</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Libellé</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Débit</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Crédit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {mockEntries.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4 text-sm font-medium text-neutral-600 whitespace-nowrap">{entry.date}</td>
                    <td className="p-4 text-sm font-semibold text-secky-blue-900 whitespace-nowrap">{entry.piece}</td>
                    <td className="p-4 text-sm font-semibold text-secky-blue-900 whitespace-nowrap">{entry.account}</td>
                    <td className="p-4 text-sm font-medium text-neutral-600">{entry.label}</td>
                    <td className="p-4 text-sm font-extrabold text-secky-blue-900 text-right tabular-nums whitespace-nowrap">{entry.debit}</td>
                    <td className="p-4 text-sm font-extrabold text-status-success text-right tabular-nums whitespace-nowrap">{entry.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}