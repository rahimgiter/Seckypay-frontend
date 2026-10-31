"use client";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const mockSettlements = [
  { operator: "Orange Money", period: "23-26 Oct", gross: "250 000", fees: "5 000", net: "245 000", status: "received", date: "26/10/2026", ref: "SET-OM-001" },
  { operator: "Moov Money", period: "23-26 Oct", gross: "80 000", fees: "1 600", net: "78 400", status: "announced", date: "26/10/2026", ref: "SET-MM-002" },
  { operator: "Wave", period: "23-26 Oct", gross: "150 000", fees: "1 500", net: "148 500", status: "received", date: "25/10/2026", ref: "SET-WV-003" },
  { operator: "Orange Money", period: "16-22 Oct", gross: "320 000", fees: "6 400", net: "313 600", status: "received", date: "19/10/2026", ref: "SET-OM-004" },
];

export default function Reglements() {
  const totalReceived = "707 100";
  const totalPending = "78 400";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "received":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-status-success uppercase"><CheckCircle2 size={10} /> Reçu</span>;
      case "announced":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-status-warning uppercase"><Clock size={10} /> Annoncé</span>;
      case "discrepancy":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-status-error uppercase"><AlertCircle size={10} /> Écart</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex items-center gap-4 bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none">
          <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Règlements</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Suivez les versements effectués par les opérateurs.</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-5xl mx-auto w-full space-y-6">
          
          {/* Résumé */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-secky-blue-600 to-[#0A1633] rounded-[24px] p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-white/70" />
                  <p className="text-xs font-bold uppercase tracking-wider text-white/70">Total reçu</p>
                </div>
                <p className="text-3xl font-extrabold tracking-tight">{totalReceived} <span className="text-sm text-white/70">FCFA</span></p>
              </div>
            </div>
            <div className="bg-white rounded-[24px] p-6 border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-status-warning" />
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">En attente</p>
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-secky-blue-900">{totalPending} <span className="text-sm text-neutral-400">FCFA</span></p>
            </div>
          </div>

          {/* Mention légale */}
          <div className="bg-secky-blue-50 border border-secky-blue-100 rounded-2xl p-4 flex gap-3">
            <AlertCircle size={20} className="text-secky-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-secky-blue-900 mb-0.5">Information importante</p>
              <p className="text-xs text-secky-blue-900/70 font-medium leading-relaxed">
                SeckyPay n'effectue aucun transfert de fonds. Les versements sont réalisés directement par les opérateurs sur votre compte marchand. Cette page affiche les informations communiquées par eux.
              </p>
            </div>
          </div>

          {/* Liste des règlements (Mobile) */}
          <div className="md:hidden space-y-3">
            {mockSettlements.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-secky-blue-900 text-sm">{s.operator}</p>
                    <p className="text-xs text-neutral-500 font-medium">{s.period} · {s.ref}</p>
                  </div>
                  {getStatusBadge(s.status)}
                </div>
                <div className="flex justify-between items-end pt-3 border-t border-neutral-100">
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Net attendu</p>
                    <p className="text-base font-extrabold text-secky-blue-900">{s.net} F</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Frais</p>
                    <p className="text-xs font-semibold text-neutral-500">{s.fees} F</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tableau Desktop */}
          <div className="hidden md:block bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-100">
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Opérateur</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Période</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Brut</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Frais</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Net</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {mockSettlements.map((s, i) => (
                  <tr key={i} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-bold text-secky-blue-900">{s.operator}</p>
                      <p className="text-[10px] text-neutral-400 font-medium">{s.ref}</p>
                    </td>
                    <td className="p-4 text-sm font-medium text-neutral-600">{s.period}</td>
                    <td className="p-4 text-sm font-semibold text-neutral-600 text-right tabular-nums">{s.gross}</td>
                    <td className="p-4 text-sm font-semibold text-neutral-400 text-right tabular-nums">{s.fees}</td>
                    <td className="p-4 text-sm font-extrabold text-secky-blue-900 text-right tabular-nums">{s.net}</td>
                    <td className="p-4">{getStatusBadge(s.status)}</td>
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