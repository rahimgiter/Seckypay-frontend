"use client";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Lock, Download, X } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function Cloture() {
  const [activeTab, setActiveTab] = useState("day");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const operators = [
    { name: "Orange Money", count: 45, gross: "250 000", fees: "5 000", net: "245 000", color: "bg-[#FF7900]" },
    { name: "Moov Money", count: 12, gross: "80 000", fees: "1 600", net: "78 400", color: "bg-[#0066B3]" },
    { name: "Wave", count: 30, gross: "150 000", fees: "1 500", net: "148 500", color: "bg-[#1DC3F3]" },
  ];

  const totalGross = "480 000";
  const totalFees = "8 100";
  const totalNet = "471 900";

  const handleClose = () => {
    if (!confirmed) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setShowConfirm(false);
      setIsClosed(true);
      setConfirmed(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden relative">
      <Sidebar />

      <main className="flex-1 md:ml-64 pb-40 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex items-center bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none gap-4">
          <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Clôture de caisse</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Fermez votre journée et verrouillez vos comptes.</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Tabs Journée / Mois */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-neutral-100 shadow-sm">
            <button onClick={() => setActiveTab("day")} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === "day" ? "bg-secky-blue-600 text-white shadow-md" : "text-neutral-500 hover:text-secky-blue-900"}`}>
              Journée du 26 Oct
            </button>
            <button onClick={() => setActiveTab("month")} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === "month" ? "bg-secky-blue-600 text-white shadow-md" : "text-neutral-500 hover:text-secky-blue-900"}`}>
              Mois d'Octobre
            </button>
          </div>

          {/* Alerte de verrouillage */}
          {isClosed && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
              <Lock size={20} className="text-status-success shrink-0" />
              <div>
                <p className="text-sm font-bold text-green-900">Période clôturée avec succès</p>
                <p className="text-xs text-green-700 mt-0.5">Les écritures sont verrouillées. Vous pouvez télécharger le rapport.</p>
              </div>
            </div>
          )}

          {/* Résumé Global */}
          <div className="card-bank-texture rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <p className="text-sm font-medium text-white/70 mb-1">Net attendu total</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-[48px] font-extrabold tracking-tighter leading-none">{totalNet}</h2>
                  <span className="text-lg font-semibold text-white/80">FCFA</span>
                </div>
                <div className="flex gap-4 mt-4">
                  <div>
                    <p className="text-[11px] text-white/60 uppercase tracking-wider">Brut</p>
                    <p className="font-bold text-sm">{totalGross} F</p>
                  </div>
                  <div className="w-[1px] bg-white/20"></div>
                  <div>
                    <p className="text-[11px] text-white/60 uppercase tracking-wider">Frais</p>
                    <p className="font-bold text-sm">{totalFees} F</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Détail par Opérateur */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100">
              <h3 className="font-bold text-secky-blue-900">Détail par opérateur</h3>
            </div>
            
            <div className="divide-y divide-neutral-100">
              {operators.map((op, idx) => (
                <div key={idx} className="p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${op.color} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                      {op.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-secky-blue-900">{op.name}</p>
                      <p className="text-xs text-neutral-500">{op.count} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-sm text-secky-blue-900">{op.net} FCFA</p>
                    <p className="text-[11px] text-neutral-400">Frais: {op.fees} F</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contrôles préalables */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <span className="text-orange-600 font-bold text-lg">!</span>
            </div>
            <div>
              <p className="text-sm font-bold text-orange-900 mb-1">2 transactions en attente</p>
              <p className="text-xs text-orange-700 font-medium leading-relaxed">
                Il reste 2 paiements non confirmés. Vous pouvez tout de même clôturer, mais ils seront reportés.
              </p>
            </div>
          </div>

          {/* Actions - CORRIGÉ */}
          <div className="flex flex-col md:flex-row gap-3 pt-4 pb-4">
            <button 
              type="button"
              className="w-full md:flex-1 min-h-[56px] bg-white border border-neutral-200 text-secky-blue-900 font-bold text-sm md:text-base rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-50 active:scale-[0.98] transition-all shadow-sm px-4"
            >
              <Download size={18} className="shrink-0" />
              <span className="whitespace-nowrap">Exporter (PDF / CSV)</span>
            </button>
            
            <button 
              type="button"
              onClick={() => setShowConfirm(true)}
              disabled={isClosed}
              className={`w-full md:flex-1 min-h-[56px] font-bold text-sm md:text-base rounded-2xl flex items-center justify-center gap-2 transition-all px-4 ${
                isClosed 
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed" 
                  : "bg-secky-blue-600 text-white shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 active:scale-[0.98]"
              }`}
            >
              <Lock size={18} className="shrink-0" />
              <span className="whitespace-nowrap">{isClosed ? "Journée clôturée" : "Clôturer la journée"}</span>
            </button>
          </div>

        </div>
      </main>

      <BottomNav />

      {/* Modal de confirmation (Bottom Sheet) */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full md:w-[440px] rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 animate-slide-up">
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6 md:hidden"></div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-secky-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lock size={28} className="text-secky-blue-600" />
              </div>
              <h3 className="text-xl font-extrabold text-secky-blue-900 mb-2">Confirmer la clôture</h3>
              <p className="text-sm text-neutral-500">
                Vous êtes sur le point de clôturer la journée. Cette action verrouillera définitivement les écritures.
              </p>
            </div>

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input 
                type="checkbox" 
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-neutral-300 text-secky-blue-600 focus:ring-secky-blue-500" 
              />
              <span className="text-sm font-medium text-neutral-600">Je confirme que les totaux sont corrects et je comprends que cette action est irréversible.</span>
            </label>

            <div className="flex gap-3">
              <button 
                onClick={() => { setShowConfirm(false); setConfirmed(false); }} 
                className="flex-1 h-12 bg-neutral-100 text-neutral-600 font-bold rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleClose} 
                disabled={isClosing || !confirmed} 
                className={`flex-1 h-12 font-bold rounded-xl transition-colors flex items-center justify-center ${
                  !confirmed 
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed" 
                    : "bg-secky-blue-600 text-white shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800"
                }`}
              >
                {isClosing ? "Clôture..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}