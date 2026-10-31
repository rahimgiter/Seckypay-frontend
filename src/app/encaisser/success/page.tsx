"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, MessageCircle, Share2, Plus, ArrowRight, Download, FileText, Loader2 } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { generateReceiptPDF } from "@/lib/pdf";

function SuccessContent() {
  const searchParams = useSearchParams();
  const txId = searchParams.get("id") || "TX-1001";
  const [copied, setCopied] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTx() {
      try {
        const res = await fetch(`/api/transactions/${txId}`);
        const json = await res.json();
        setTransaction(json.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTx();
  }, [txId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://pay.seckypay.com/p/${txId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!transaction) return;
    generateReceiptPDF({
      merchantName: transaction.merchantName,
      amount: transaction.amount,
      subject: transaction.subject,
      reference: transaction.id,
      date: transaction.date,
      operator: transaction.operator,
      brandColor: "#105BAE",
    });
  };

  const handleWhatsApp = () => {
    if (!transaction) return;
    const text = encodeURIComponent(`Bonjour, voici votre lien pour régler ${transaction.amount.toLocaleString("fr-FR")} FCFA à ${transaction.merchantName} (${transaction.subject}) : https://pay.seckypay.com/p/${txId}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 size={40} className="animate-spin text-secky-blue-600" />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <p className="text-neutral-500">Transaction introuvable.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex justify-center py-8 px-4 md:py-12">
      <div className="w-full max-w-[480px]">
        
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-4 shadow-[0_0_40px_rgba(16,185,129,0.2)] border border-green-100">
            <CheckCircle2 size={48} className="text-status-success" />
          </div>
          <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-1">Lien créé avec succès</h2>
          <p className="text-sm font-medium text-neutral-500">Votre demande est prête à être partagée avec votre client.</p>
        </div>

        <div className="card-3d rounded-[32px] p-8 relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-secky-blue-600 via-secky-blue-500 to-secky-cyan-400"></div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Montant demandé</p>
              <div className="flex items-baseline gap-1.5">
                <h1 className="text-[40px] font-extrabold text-secky-blue-900 tracking-tight leading-none">{transaction.amount.toLocaleString("fr-FR")}</h1>
                <span className="text-lg font-bold text-neutral-400">FCFA</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-neutral-100">
              <img src="/icon.png" alt="Logo" className="w-7 h-7" />
            </div>
          </div>

          <div className="space-y-3 py-4 border-t border-b border-dashed border-neutral-200 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-medium">Objet</span>
              <span className="font-bold text-secky-blue-900">{transaction.subject}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-medium">Référence</span>
              <span className="font-bold text-secky-blue-900">{transaction.id}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-status-warning/10 text-status-warning uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-status-warning animate-pulse"></span>
              En attente
            </span>
            <button onClick={handleDownloadPDF} className="text-xs font-bold text-secky-blue-600 flex items-center gap-1 hover:underline"><FileText size={14} /> Télécharger le reçu</button>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold text-secky-blue-900 mb-2">Lien de paiement</label>
          <div className="flex gap-2">
            <div className="flex-1 h-14 bg-white border border-neutral-200 rounded-2xl flex items-center px-4 overflow-hidden shadow-sm">
              <p className="text-sm text-neutral-500 truncate">pay.seckypay.com/p/{transaction.id}</p>
            </div>
            <button onClick={handleCopy} className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-sm ${copied ? "bg-green-50 border border-green-200 text-status-success" : "bg-white border border-neutral-200 text-secky-blue-900 hover:bg-neutral-50"}`}>
              {copied ? <CheckCircle2 size={24} /> : <Copy size={24} />}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={handleWhatsApp} className="w-full h-14 bg-[#25D366] text-white font-bold rounded-2xl flex items-center justify-center active:scale-95 transition-transform shadow-[0_8px_20px_-6px_rgba(37,211,102,0.5)]">
            <MessageCircle size={22} className="mr-2" />
            Partager sur WhatsApp
          </button>
          
          <button className="w-full h-14 bg-white text-secky-blue-900 font-bold rounded-2xl flex items-center justify-center border border-neutral-200 active:scale-95 transition-transform shadow-sm hover:bg-neutral-50">
            <Share2 size={22} className="mr-2" />
            Autre moyen de partage
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-col items-center gap-2">
          <Link href="/encaisser" className="flex items-center justify-center w-full h-12 text-sm font-bold text-secky-blue-600 hover:bg-secky-blue-50 rounded-xl transition-colors">
            <Plus size={18} className="mr-2" /> Créer une autre demande
          </Link>
          <Link href="/dashboard" className="flex items-center justify-center w-full h-12 text-sm font-bold text-neutral-500 hover:bg-neutral-100 rounded-xl transition-colors">
            Retour au tableau de bord <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <SuccessContent />
    </Suspense>
  );
}