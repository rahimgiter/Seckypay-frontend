"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, UserCheck, Edit, CheckCircle2, Mail, Phone, Calendar } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

export default function AdminCompanyDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const company = {
    name: "École Les Lauriers",
    id: "ENT-001",
    sector: "Éducation",
    status: "active",
    risk: "low",
    joined: "12 Janvier 2026",
    volume30d: "1 250 000",
    successRate: "98.5%",
    owner: { name: "Sylvain K.", email: "sylvain@lauriers.bf", phone: "+226 70 11 22 33" }
  };

  const tabs = [
    { id: "overview", label: "Résumé" },
    { id: "users", label: "Utilisateurs" },
    { id: "transactions", label: "Transactions" },
    { id: "notes", label: "Notes internes" },
  ];

  return (
    <>
      <AdminMobileWarning />
      <div className="hidden md:flex min-h-screen bg-[#F8FAFC]">
        <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-[#0A1633] fixed left-0 top-0" />}>
          <AdminSidebar />
        </Suspense>

        <main className="flex-1 md:ml-64 p-8 overflow-x-hidden w-full">
          
          <header className="mb-6">
            <Link href="/admin/companies" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-secky-blue-600 mb-4 transition-colors">
              <ArrowLeft size={16} /> Retour aux entreprises
            </Link>
            
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-secky-blue-100 flex items-center justify-center text-secky-blue-600 font-extrabold text-xl shadow-sm">
                  {company.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight flex items-center gap-3">
                    {company.name}
                    <span className="text-[10px] font-bold bg-green-50 text-status-success px-2 py-0.5 rounded-md uppercase tracking-wider">Actif</span>
                  </h1>
                  <p className="text-sm text-neutral-500 font-medium mt-1">ID: {company.id} · {company.sector} · Inscrit le {company.joined}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="h-10 px-4 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl hover:bg-neutral-50 transition-colors flex items-center gap-2">
                  <Edit size={16} /> Changer d'offre
                </button>
                <button className="h-10 px-4 bg-red-50 text-status-error font-bold text-sm rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2">
                  <ShieldAlert size={16} /> Suspendre
                </button>
                <button className="h-10 px-4 bg-secky-blue-600 text-white font-bold text-sm rounded-xl hover:bg-secky-blue-800 transition-colors flex items-center gap-2 shadow-lg shadow-secky-blue-600/20">
                  <UserCheck size={16} /> Se connecter en tant que
                </button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Volume (30j)</p>
              <p className="text-xl font-extrabold text-secky-blue-900">{company.volume30d} <span className="text-xs text-neutral-400">FCFA</span></p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Taux de réussite</p>
              <p className="text-xl font-extrabold text-status-success">{company.successRate}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Score de risque</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <p className="text-lg font-extrabold text-secky-blue-900">Faible</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Contact</p>
              <p className="text-sm font-bold text-secky-blue-900">{company.owner.name}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6 border-b border-neutral-200">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab.id ? "border-secky-blue-600 text-secky-blue-600" : "border-transparent text-neutral-500 hover:text-secky-blue-900"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
                <h3 className="font-bold text-secky-blue-900 mb-4">Informations de contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-neutral-400" />
                    <span className="font-medium text-neutral-600">{company.owner.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-neutral-400" />
                    <span className="font-medium text-neutral-600">{company.owner.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-neutral-400" />
                    <span className="font-medium text-neutral-600">Inscrit le {company.joined}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
                <h3 className="font-bold text-secky-blue-900 mb-4">Documents légaux</h3>
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl mb-2">
                  <span className="text-sm font-bold text-secky-blue-900">RCCM</span>
                  <span className="text-xs font-bold text-status-success flex items-center gap-1"><CheckCircle2 size={14} /> Vérifié</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                  <span className="text-sm font-bold text-secky-blue-900">IFU</span>
                  <span className="text-xs font-bold text-status-success flex items-center gap-1"><CheckCircle2 size={14} /> Vérifié</span>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "overview" && (
            <div className="bg-white rounded-2xl border border-neutral-200 border-dashed p-12 text-center">
              <p className="text-neutral-500 font-medium">L'onglet "{tabs.find(t => t.id === activeTab)?.label}" est en cours de développement.</p>
            </div>
          )}

        </main>
      </div>
    </>
  );
}