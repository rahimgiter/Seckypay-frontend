"use client";
import Link from "next/link";
import { XCircle, RefreshCw, ArrowLeft, ShieldCheck } from "lucide-react";

export default function PaymentFailed() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex justify-center py-8 px-4 md:py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-status-error/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-status-error/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="w-full max-w-[440px] relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        
        <div className="bg-white rounded-[32px] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-status-error to-[#FCA5A5]"></div>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-6 border border-red-100">
            <XCircle size={44} className="text-status-error" />
          </div>

          <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-2">Paiement non abouti</h2>
          <p className="text-sm font-medium text-neutral-500 mb-6">Votre transaction n'a pas pu être finalisée.</p>

          <div className="bg-red-50 rounded-2xl p-4 mb-6 text-left border border-red-100">
            <p className="text-xs font-bold text-status-error uppercase tracking-wider mb-1">Cause</p>
            <p className="text-sm font-semibold text-secky-blue-900">Solde insuffisant sur votre compte Orange Money.</p>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-3 mb-6 flex items-center gap-2 text-xs font-medium text-neutral-600">
            <ShieldCheck size={16} className="text-status-success shrink-0" />
            Aucun montant n'a été débité de votre compte.
          </div>

          <div className="space-y-3">
            <Link href="/pay" className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center active:scale-95 transition-transform shadow-[0_8px_20px_-6px_rgba(16,91,174,0.5)] hover:bg-secky-blue-800">
              <RefreshCw size={18} className="mr-2" />
              Réessayer
            </Link>
            <Link href="/pay" className="w-full h-14 bg-white text-secky-blue-900 font-bold rounded-2xl flex items-center justify-center border border-neutral-200 active:scale-95 transition-transform shadow-sm hover:bg-neutral-50">
              <ArrowLeft size={18} className="mr-2" />
              Choisir un autre moyen
            </Link>
          </div>

          <p className="text-xs text-neutral-400 font-medium mt-6">
            Besoin d'aide ? Contactez École Les Lauriers au +226 70 00 00 00.
          </p>

        </div>
      </div>
    </div>
  );
}