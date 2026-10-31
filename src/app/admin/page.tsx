"use client";
import { Suspense } from "react";
import { ArrowUpRight, ArrowDownRight, Building2, Activity, AlertTriangle, ShieldCheck, TrendingUp } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboard() {
  const kpis = [
    { name: "Volume total (24h)", value: "12.5M", unit: "FCFA", trend: "+15%", isUp: true, icon: TrendingUp, color: "text-secky-blue-600", bg: "bg-secky-blue-50" },
    { name: "Entreprises actives", value: "142", unit: "", trend: "+3", isUp: true, icon: Building2, color: "text-green-600", bg: "bg-green-50" },
    { name: "Taux de réussite", value: "94.2", unit: "%", trend: "-0.5%", isUp: false, icon: Activity, color: "text-orange-500", bg: "bg-orange-50" },
    { name: "Incidents ouverts", value: "3", unit: "", trend: "2 critiques", isUp: false, icon: AlertTriangle, color: "text-status-error", bg: "bg-red-50" },
  ];

  const operators = [
    { name: "Orange Money", status: "Operational", latency: "120ms", success: "96%", color: "bg-green-500" },
    { name: "Moov Money", status: "Degraded", latency: "450ms", success: "82%", color: "bg-orange-500" },
    { name: "Wave", status: "Operational", latency: "90ms", success: "98%", color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-[#0A1633] fixed left-0 top-0" />}>
        <AdminSidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 p-6 md:p-8">
        
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Vue d'ensemble</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">État de santé de la plateforme en temps réel.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-xs font-bold bg-white border border-neutral-200 px-3 py-1.5 rounded-full text-neutral-500 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Environnement : Production
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.name} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                  <kpi.icon size={20} />
                </div>
                <span className={`text-xs font-bold flex items-center gap-1 ${kpi.isUp ? "text-status-success" : "text-status-error"}`}>
                  {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {kpi.trend}
                </span>
              </div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">{kpi.name}</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-extrabold text-secky-blue-900">{kpi.value}</h3>
                <span className="text-sm font-bold text-neutral-400">{kpi.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-1 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-100">
              <h3 className="font-bold text-secky-blue-900">Santé des opérateurs</h3>
            </div>
            <div className="p-5 space-y-4">
              {operators.map((op) => (
                <div key={op.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${op.color}`}></div>
                    <p className="text-sm font-bold text-secky-blue-900">{op.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-secky-blue-900">{op.success}</p>
                    <p className="text-[10px] text-neutral-400 font-medium">{op.latency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center">
              <h3 className="font-bold text-secky-blue-900">Files de travail prioritaires</h3>
              <span className="text-xs font-bold bg-secky-blue-50 text-secky-blue-600 px-2 py-1 rounded-md">4 en attente</span>
            </div>
            <div className="divide-y divide-neutral-100">
              <div className="p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-secky-blue-900">Ouvertures de compte à valider</p>
                    <p className="text-xs text-neutral-500 font-medium">2 nouvelles entreprises depuis hier.</p>
                  </div>
                </div>
                <button className="h-9 px-4 bg-secky-blue-600 text-white text-xs font-bold rounded-lg hover:bg-secky-blue-800 transition-colors">Traiter</button>
              </div>
              <div className="p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-status-error">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-secky-blue-900">Incidents assignés</p>
                    <p className="text-xs text-neutral-500 font-medium">1 incident critique chez Orange Money.</p>
                  </div>
                </div>
                <button className="h-9 px-4 bg-white border border-neutral-200 text-secky-blue-900 text-xs font-bold rounded-lg hover:bg-neutral-50 transition-colors">Ouvrir</button>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}