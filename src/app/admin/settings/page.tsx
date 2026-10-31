"use client";
import { Suspense, useState } from "react";
import { Settings, Shield, Server, Save } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

export default function AdminSettings() {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <>
      <AdminMobileWarning />
      <div className="hidden md:flex min-h-screen bg-[#F8FAFC]">
        <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-[#0A1633] fixed left-0 top-0" />}>
          <AdminSidebar />
        </Suspense>

        <main className="flex-1 md:ml-64 p-8 overflow-x-hidden w-full max-w-4xl">
          
          <header className="mb-8">
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Paramètres de la Plateforme</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Règles globales et configuration système.</p>
          </header>

          <div className="space-y-6">
            
            {/* Règles OTP */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secky-blue-50 flex items-center justify-center text-secky-blue-600">
                  <Shield size={20} />
                </div>
                <h3 className="font-bold text-secky-blue-900">Règles OTP</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Validité (minutes)</label>
                  <input type="number" defaultValue="10" className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-secky-blue-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Tentatives max</label>
                  <input type="number" defaultValue="3" className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-secky-blue-600" />
                </div>
              </div>
            </div>

            {/* Mode Maintenance */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                    <Server size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-secky-blue-900">Mode Maintenance</h3>
                    <p className="text-xs text-neutral-500 font-medium mt-0.5">Bloque l'accès à la plateforme aux marchands.</p>
                  </div>
                </div>
                <button onClick={() => setMaintenance(!maintenance)} className={`w-12 h-7 rounded-full transition-colors relative ${maintenance ? "bg-status-error" : "bg-neutral-200"}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${maintenance ? "left-6" : "left-1"}`}></div>
                </button>
              </div>
            </div>

            {/* Environnements */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Settings size={20} />
                </div>
                <h3 className="font-bold text-secky-blue-900">Environnement</h3>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 h-11 bg-secky-blue-600 text-white font-bold text-sm rounded-xl">Production</button>
                <button className="flex-1 h-11 bg-white border border-neutral-200 text-neutral-500 font-bold text-sm rounded-xl hover:bg-neutral-50">Test (Sandbox)</button>
              </div>
            </div>

            <button className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 transition-all flex items-center justify-center gap-2">
              <Save size={18} /> Enregistrer les modifications
            </button>

          </div>

        </main>
      </div>
    </>
  );
}