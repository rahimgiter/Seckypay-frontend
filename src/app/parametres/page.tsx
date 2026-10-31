"use client";
import { useState } from "react";
import { ArrowLeft, Building2, CreditCard, Shield, CheckCircle2, AlertCircle, Lock } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function Parametres() {
  const [twoFA, setTwoFA] = useState(true);
  const [operators, setOperators] = useState([
    { name: "Orange Money", code: "orange", active: true },
    { name: "Moov Money", code: "moov", active: true },
    { name: "Wave", code: "wave", active: false },
  ]);

  const toggleOperator = (code: string) => {
    setOperators(operators.map(op => op.code === code ? { ...op, active: !op.active } : op));
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
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Paramètres</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Configurez votre entreprise et vos préférences.</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-3xl mx-auto w-full space-y-6">
          
          {/* Profil légal */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secky-blue-50 flex items-center justify-center text-secky-blue-600">
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-secky-blue-900">Profil légal</h3>
                <p className="text-xs text-neutral-500">Informations légales de l'entreprise.</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Nom commercial</label>
                  <input type="text" defaultValue="Secky Tech" className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 transition-all font-medium text-secky-blue-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">RCCM</label>
                  <input type="text" defaultValue="BF-OUA-01-2024-B12-01234" className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 transition-all font-medium text-secky-blue-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">IFU</label>
                  <input type="text" defaultValue="00012345X" className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 transition-all font-medium text-secky-blue-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Ville</label>
                  <input type="text" defaultValue="Ouagadougou" className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 transition-all font-medium text-secky-blue-900" />
                </div>
              </div>
            </div>
          </div>

          {/* Moyens de paiement */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="font-bold text-secky-blue-900">Moyens de paiement</h3>
                <p className="text-xs text-neutral-500">Activez les opérateurs que vous acceptez.</p>
              </div>
            </div>
            <div className="divide-y divide-neutral-100">
              {operators.map((op) => (
                <div key={op.code} className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm ${op.code === "orange" ? "bg-[#FF7900]" : op.code === "moov" ? "bg-[#0066B3]" : "bg-[#1DC3F3]"}`}>
                      {op.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-secky-blue-900">{op.name}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${op.active ? "text-status-success" : "text-neutral-400"}`}>
                        {op.active ? "● Actif" : "○ Inactif"}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleOperator(op.code)}
                    className={`w-12 h-7 rounded-full transition-colors relative ${op.active ? "bg-secky-blue-600" : "bg-neutral-200"}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${op.active ? "left-6" : "left-1"}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Préférences */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="font-bold text-secky-blue-900">Préférences & Sécurité</h3>
                <p className="text-xs text-neutral-500">Règles générales de votre compte.</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Expiration par défaut des liens</label>
                <select className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 transition-all font-medium text-secky-blue-900">
                  <option>24 heures</option>
                  <option>1 heure</option>
                  <option>7 jours</option>
                  <option>30 jours</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                <div>
                  <p className="font-bold text-sm text-secky-blue-900">Vérification en 2 étapes</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Sécurise l'accès Admin avec un code OTP.</p>
                </div>
                <button 
                  onClick={() => setTwoFA(!twoFA)}
                  className={`w-12 h-7 rounded-full transition-colors relative ${twoFA ? "bg-secky-blue-600" : "bg-neutral-200"}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${twoFA ? "left-6" : "left-1"}`}></div>
                </button>
              </div>

              <div className="flex items-center gap-2 bg-secky-blue-50 p-3 rounded-xl mt-2">
                <AlertCircle size={16} className="text-secky-blue-600 shrink-0" />
                <p className="text-xs font-medium text-secky-blue-900">Devise : XOF · Fuseau : Ouagadougou (UTC+0).</p>
              </div>
            </div>
          </div>

          <button className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 transition-all active:scale-95">
            Enregistrer les modifications
          </button>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}