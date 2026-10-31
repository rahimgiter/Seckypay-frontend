"use client";
import { generateReceiptPDF } from "@/lib/pdf";
import Link from "next/link";
import { CheckCircle2, Download, QrCode, ArrowRight, ShieldCheck } from "lucide-react";

export default function PaySuccess() {
  const merchantName = "École Les Lauriers";
  
  const handleDownload = () => {
    generateReceiptPDF({
      merchantName,
      amount: 25000,
      subject,
      reference: ref,
      date,
      operator: "Orange Money",
      brandColor: "#105BAE",
    });
  };
  const amount = "25 000";
  const subject = "Cantine Octobre";
  const ref = "TX-8821903";
  const date = "26 Octobre 2026 à 10:45";

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex justify-center py-8 px-4 md:py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secky-blue-600/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secky-cyan-400/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="w-full max-w-[440px] relative z-10">
        
        {/* En-tête de succès */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-4 shadow-[0_0_40px_rgba(16,185,129,0.2)] border border-green-100">
            <CheckCircle2 size={48} className="text-status-success" />
          </div>
          <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-1">Paiement confirmé</h2>
          <p className="text-sm font-medium text-neutral-500">Merci pour votre paiement.</p>
        </div>

        {/* Reçu Premium (Style Ticket) */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden mb-6">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-secky-blue-600 via-secky-blue-500 to-secky-cyan-400"></div>
          
          <div className="text-center mb-6">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Montant payé</p>
            <div className="flex items-baseline justify-center gap-1.5">
              <h1 className="text-[44px] font-extrabold text-secky-blue-900 tracking-tight leading-none">{amount}</h1>
              <span className="text-lg font-bold text-neutral-400">FCFA</span>
            </div>
          </div>

          <div className="space-y-3 py-4 border-t border-b border-dashed border-neutral-200 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-medium">Marchand</span>
              <span className="font-bold text-secky-blue-900">{merchantName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-medium">Objet</span>
              <span className="font-bold text-secky-blue-900">{subject}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-medium">Référence</span>
              <span className="font-bold text-secky-blue-900">{ref}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-medium">Date</span>
              <span className="font-bold text-secky-blue-900">{date}</span>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="flex flex-col items-center justify-center bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
            <QrCode size={64} className="text-neutral-400 mb-2" />
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Scanner pour vérifier le reçu</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button onClick={handleDownload} className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center active:scale-95 transition-transform shadow-[0_8px_20px_-6px_rgba(16,91,174,0.5)] hover:bg-secky-blue-800"><Download size={20} className="mr-2" />Télécharger le reçu (PDF)</button>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
          <ShieldCheck size={14} className="text-status-success" />
          Vérifiable sur <span className="text-secky-blue-600">SeckyPay</span>
        </div>

      </div>
    </div>
  );
}
