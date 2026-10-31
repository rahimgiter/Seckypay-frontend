"use client";
import Link from "next/link";
import { ArrowLeft, Copy, RefreshCw, XCircle, AlertCircle, CheckCircle2, Clock, Send, Loader2, Zap } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";

function DetailContent() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  async function fetchTx() {
    try {
      const res = await fetch(`/api/transactions/${id}`);
      const json = await res.json();
      setTransaction(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchTx(); }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://pay.seckypay.com/p/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePayment = async () => {
    setIsPaying(true);
    try {
      await fetch(`/api/transactions/${id}/pay`, { method: "POST" });
      await fetchTx();
      router.refresh();
    } catch (error) {
      alert("Erreur lors de la simulation.");
    } finally {
      setIsPaying(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "succeeded": return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-status-success uppercase tracking-wide"><CheckCircle2 size={14} /> Réussie</span>;
      case "pending": return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-orange-50 text-status-warning uppercase tracking-wide"><Clock size={14} /> En attente</span>;
      case "failed": return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-status-error uppercase tracking-wide"><XCircle size={14} /> Échouée</span>;
      default: return null;
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 size={40} className="animate-spin text-secky-blue-600" /></div>;

  if (!transaction) return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><div className="text-center"><p className="text-neutral-500 font-medium mb-4">Transaction introuvable.</p><Link href="/transactions" className="text-sm font-bold text-secky-blue-600 hover:underline">Retour aux transactions</Link></div></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex items-center bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none gap-4">
          <Link href="/transactions" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-secky-blue-900 tracking-tight">Détail de la transaction</h1>
            <p className="text-xs md:text-sm text-neutral-500 font-medium mt-0.5">Réf: {transaction.id}</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          
          <div className="lg:col-span-2 space-y-6 w-full">
            
            <div className="card-bank-texture rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <p className="text-sm font-medium text-white/70 mb-1">Montant de la transaction</p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-[48px] font-extrabold tracking-tighter leading-none">{transaction.amount.toLocaleString("fr-FR")}</h2>
                    <span className="text-lg font-semibold text-white/80">FCFA</span>
                  </div>
                  <p className="text-base font-medium text-white/90 mt-2">{transaction.subject}</p>
                </div>
                <div className="mt-2 md:mt-0">{getStatusBadge(transaction.status)}</div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-neutral-100">
              <h3 className="text-lg font-bold text-secky-blue-900 mb-6">Chronologie</h3>
              <div className="relative border-l-2 border-neutral-100 ml-3 space-y-8">
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-secky-blue-100 border-2 border-white ring-2 ring-secky-blue-600"></div>
                  <p className="text-sm font-bold text-secky-blue-900">Demande créée</p>
                  <p className="text-xs text-neutral-500 mt-1">Par Kofi B. (Admin)</p>
                  <p className="text-[10px] text-neutral-400 font-medium mt-1">{transaction.date}</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-secky-blue-100 border-2 border-white ring-2 ring-secky-blue-600"></div>
                  <p className="text-sm font-bold text-secky-blue-900">Paiement initié</p>
                  <p className="text-xs text-neutral-500 mt-1">Le client a ouvert le lien</p>
                </div>
                {transaction.status === "succeeded" && (
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-status-success border-2 border-white ring-2 ring-green-200"></div>
                    <p className="text-sm font-bold text-status-success">Paiement confirmé</p>
                    <p className="text-xs text-neutral-500 mt-1">Validé par {transaction.operator}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 w-full">
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-neutral-100">
              <h3 className="text-base font-bold text-secky-blue-900 mb-4">Informations</h3>
              <div className="space-y-4">
                <div><p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Référence</p><p className="text-sm font-semibold text-secky-blue-900">{transaction.id}</p></div>
                <div><p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Référence Commande</p><p className="text-sm font-semibold text-secky-blue-900">{transaction.reference || "Non renseignée"}</p></div>
                <div><p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Moyen de paiement</p><p className="text-sm font-semibold text-secky-blue-900">{transaction.operator}</p></div>
                <div><p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Date et heure</p><p className="text-sm font-semibold text-secky-blue-900">{transaction.date}</p></div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-neutral-100 space-y-3">
              <h3 className="text-base font-bold text-secky-blue-900 mb-4">Actions</h3>

              {transaction.status === "pending" && (
                <button 
                  onClick={simulatePayment} 
                  disabled={isPaying}
                  className="w-full h-12 bg-gradient-to-r from-secky-blue-600 to-secky-cyan-400 text-white font-bold text-sm rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-secky-blue-600/30 disabled:opacity-60"
                >
                  {isPaying ? <><Loader2 size={18} className="mr-2 animate-spin" /> Paiement en cours...</> : <><Zap size={18} className="mr-2" /> Simuler le paiement (DÉMO)</>}
                </button>
              )}

              <button onClick={handleCopy} className="w-full h-12 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl flex items-center justify-center hover:bg-neutral-50 active:scale-95 transition-all">
                {copied ? <CheckCircle2 size={18} className="mr-2 text-status-success" /> : <Copy size={18} className="mr-2" />}
                {copied ? "Lien copié !" : "Copier le lien"}
              </button>
              <button className="w-full h-12 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl flex items-center justify-center hover:bg-neutral-50 active:scale-95 transition-all">
                <Send size={18} className="mr-2" /> Renvoyer le reçu
              </button>
              <div className="pt-3 mt-3 border-t border-neutral-100 space-y-3">
                <button className="w-full h-12 bg-red-50 text-status-error font-bold text-sm rounded-xl flex items-center justify-center hover:bg-red-100 active:scale-95 transition-all">
                  <AlertCircle size={18} className="mr-2" /> Signaler un problème
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default function TransactionDetail() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <DetailContent />
    </Suspense>
  );
}