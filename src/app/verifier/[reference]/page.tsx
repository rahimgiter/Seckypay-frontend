"use client";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Download, ArrowLeft, QrCode } from "lucide-react";

export default function VerifyReceipt() {
  // Simulation : le reçu est authentique
  const isAuthentic = true;
  const receipt = {
    merchant: "École Les Lauriers",
    amount: "25 000",
    date: "26 Octobre 2026 à 10:45",
    reference: "TX-8821903",
    payerPhone: "+226 70 • • • • 12",
  };

  if (!isAuthentic) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex justify-center py-8 px-4 md:py-12">
        <div className="w-full max-w-[440px] flex flex-col items-center justify-center min-h-[80vh]">
          <div className="bg-white rounded-[32px] p-8 text-center shadow-lg border border-white w-full">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 rounded-full mb-6">
              <QrCode size={44} className="text-neutral-400" />
            </div>
            <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-2">Reçu introuvable</h2>
            <p className="text-sm font-medium text-neutral-500 mb-6">Ce reçu n'existe pas ou n'a pas pu être vérifié.</p>
            <Link href="/" className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center">Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex justify-center py-8 px-4 md:py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-status-success/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

      <div className="w-full max-w-[440px] relative z-10">
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-4 shadow-[0_0_40px_rgba(16,185,129,0.2)] border border-green-100">
            <CheckCircle2 size={44} className="text-status-success" />
          </div>
          <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-1">Reçu authentique</h2>
          <p className="text-sm font-medium text-neutral-500">Ce document a bien été émis par SeckyPay.</p>
        </div>

        {/* Reçu Premium */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden mb-6">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-status-success to-[#4ADE80]"></div>
          
          <div className="text-center mb-6">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Montant payé</p>
            <div className="flex items-baseline justify-center gap-1.5">
              <h1 className="text-[44px] font-extrabold text-secky-blue-900 tracking-tight leading-none">{receipt.amount}</h1>
              <span className="text-lg font-bold text-neutral-400">FCFA</span>
            </div>
          </div>

          <div className="space-y-3 py-4 border-t border-b border-dashed border-neutral-200 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-medium">Marchand</span>
              <span className="font-bold text-secky-blue-900">{receipt.merchant}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-medium">Date</span>
              <span className="font-bold text-secky-blue-900">{receipt.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-medium">Référence</span>
              <span className="font-bold text-secky-blue-900">{receipt.reference}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-medium">Payeur</span>
              <span className="font-bold text-secky-blue-900">{receipt.payerPhone}</span>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-3 flex items-center gap-2 text-xs font-bold text-status-success">
            <ShieldCheck size={16} className="shrink-0" />
            Document vérifié le 26/10/2026 à 11:02
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full h-14 bg-white text-secky-blue-900 font-bold rounded-2xl flex items-center justify-center border border-neutral-200 active:scale-95 transition-transform shadow-sm hover:bg-neutral-50">
            <Download size={18} className="mr-2" />
            Télécharger le reçu (PDF)
          </button>
          <Link href="/" className="w-full h-12 text-sm font-bold text-neutral-500 hover:text-secky-blue-600 flex items-center justify-center transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Retour à l'accueil
          </Link>
        </div>

        <p className="text-center text-[10px] text-neutral-400 font-medium mt-8">
          Vérification sécurisée par SeckyPay · Burkina Faso 🇧🇫
        </p>

      </div>
    </div>
  );
}