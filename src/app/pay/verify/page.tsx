"use client";
import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Copy, CheckCircle2, Phone, Info } from "lucide-react";

export default function PaymentVerify() {
  const [copied, setCopied] = useState(false);
  const reference = "TX-8821903";

  const handleCopy = () => {
    navigator.clipboard.writeText(reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex justify-center py-8 px-4 md:py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="w-full max-w-[440px] relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        
        <div className="bg-white rounded-[32px] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-purple-300"></div>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-50 rounded-full mb-6 border border-purple-100">
            <AlertCircle size={44} className="text-status-info" />
          </div>

          <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-2">Nous vérifions votre paiement</h2>
          <p className="text-sm font-medium text-neutral-500 mb-6 leading-relaxed">
            Le résultat est encore incertain. Nous interrogeons l'opérateur pour confirmer votre transaction.
          </p>

          <div className="bg-orange-50 rounded-2xl p-4 mb-6 text-left border border-orange-100 flex gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-orange-600 font-bold">!</span>
            </div>
            <div>
              <p className="text-sm font-bold text-orange-900 mb-1">Ne payez pas à nouveau</p>
              <p className="text-xs text-orange-700 font-medium leading-relaxed">
                Vous recevrez une confirmation automatiquement dès que le résultat sera connu.
              </p>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-4 mb-6 text-left">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Votre référence à conserver</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-extrabold text-secky-blue-900 tracking-wider">{reference}</p>
              <button onClick={handleCopy} className="w-10 h-10 bg-white border border-neutral-200 rounded-xl flex items-center justify-center text-secky-blue-900 active:scale-95 transition-transform">
                {copied ? <CheckCircle2 size={18} className="text-status-success" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium bg-secky-blue-50 p-3 rounded-xl">
              <Info size={16} className="text-secky-blue-600 shrink-0" />
              Cette page se mettra à jour automatiquement si vous la gardez ouverte.
            </div>
            <a href="tel:+22670000000" className="w-full h-14 bg-white text-secky-blue-900 font-bold rounded-2xl flex items-center justify-center border border-neutral-200 active:scale-95 transition-transform shadow-sm hover:bg-neutral-50">
              <Phone size={18} className="mr-2" />
              Contacter le marchand
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}