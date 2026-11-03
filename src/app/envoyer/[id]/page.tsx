"use client";
import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, Send, Loader2, Zap, AlertTriangle, Download, User, Phone } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { useBrand } from "@/contexts/BrandContext";

function DetailContent() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { branding } = useBrand();
  const [tx, setTx] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  async function fetchTx() {
    try {
      const res = await fetch(`/api/transfers/${id}`);
      const json = await res.json();
      setTx(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchTx(); }, [id]);

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      await fetch(`/api/transfers/${id}`, { method: "POST" });
      await fetchTx();
    } catch (error) {
      alert("Erreur de simulation.");
    } finally {
      setIsSimulating(false);
    }
  };

  const handleDownloadPDF = async () => {
    const { generateReceiptPDF } = await import("@/lib/pdf");
    generateReceiptPDF({
      merchantName: "Secky Tech",
      amount: tx.amount,
      subject: tx.subject,
      reference: tx.id,
      date: tx.date,
      operator: tx.operator,
      brandColor: branding.primaryColor,
    });
  };

  const formatAmount = (n: number | undefined) => (n || 0).toLocaleString("fr-FR");

  const getStatusInfo = () => {
    if (!tx) return { label: "", color: "", icon: Clock };
    switch (tx.status) {
      case "pending": return { label: "En attente de validation", color: "text-status-warning bg-orange-50", icon: Clock };
      case "succeeded": return { label: "Envoyé avec succès", color: "text-status-success bg-green-50", icon: CheckCircle2 };
      case "failed": return { label: "Échec de l'envoi", color: "text-status-error bg-red-50", icon: AlertTriangle };
      default: return { label: tx.status, color: "text-neutral-500 bg-neutral-100", icon: Clock };
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 size={40} className="animate-spin text-secky-blue-600" /></div>;
  }

  if (!tx) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <p className="text-neutral-500 font-medium mb-4">Envoi introuvable.</p>
          <Link href="/envoyer" className="text-sm font-bold text-secky-blue-600 hover:underline">Retour</Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex items-center gap-4 bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none">
          <Link href="/envoyer" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-secky-blue-900 tracking-tight">Détail de l'envoi</h1>
            <p className="text-xs md:text-sm text-neutral-500 font-medium mt-0.5">Réf: {tx.id}</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-2xl mx-auto w-full space-y-5">
          
          {/* Carte montant */}
          <div className="card-bank-texture rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-white/70 mb-1">Montant envoyé</p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-[42px] font-extrabold tracking-tighter leading-none">{formatAmount(tx.amount)}</h2>
                    <span className="text-lg font-semibold text-white/80">FCFA</span>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${tx.status === "succeeded" ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/80"}`}>
                  <StatusIcon size={14} /> {statusInfo.label}
                </span>
              </div>
              <p className="text-sm text-white/80">{tx.subject}</p>
            </div>
          </div>

          {/* Bouton Simuler */}
          {tx.status === "pending" && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <p className="text-sm font-bold text-orange-900 mb-2">⚠️ Validation requise</p>
              <p className="text-xs text-orange-700 font-medium mb-3">
                Le commerçant doit valider le paiement sur son téléphone avec son code secret opérateur.
              </p>
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full h-12 bg-gradient-to-r from-secky-blue-600 to-secky-cyan-400 text-white font-bold text-sm rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-lg"
              >
                {isSimulating ? <><Loader2 size={18} className="mr-2 animate-spin" /> Traitement...</> : <><Zap size={18} className="mr-2" /> Simuler la validation (DÉMO)</>}
              </button>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-neutral-100">
            <h3 className="text-lg font-bold text-secky-blue-900 mb-4">Chronologie</h3>
            <div className="relative border-l-2 border-neutral-100 ml-3 space-y-6">
              
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-secky-blue-600 border-2 border-white ring-2 ring-secky-blue-200"></div>
                <p className="text-sm font-bold text-secky-blue-900">Envoi créé</p>
                <p className="text-xs text-neutral-500 mt-0.5">{tx.date}</p>
              </div>

              <div className="relative pl-6">
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${tx.status === "succeeded" ? "bg-status-success ring-2 ring-green-200" : "bg-orange-500 ring-2 ring-orange-200"}`}></div>
                <p className={`text-sm font-bold ${tx.status === "succeeded" ? "text-status-success" : "text-status-warning"}`}>
                  {tx.status === "succeeded" ? "Paiement validé" : "En attente de validation"}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {tx.status === "succeeded" ? `Validé par ${tx.operator}` : "En attente du code secret opérateur"}
                </p>
              </div>

              {tx.status === "succeeded" && (
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-status-success border-2 border-white ring-2 ring-green-200"></div>
                  <p className="text-sm font-bold text-status-success">Fonds envoyés au bénéficiaire</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Le bénéficiaire a reçu les fonds</p>
                </div>
              )}
            </div>
          </div>

          {/* Détails */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-neutral-100">
            <h3 className="text-lg font-bold text-secky-blue-900 mb-4">Informations</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Opérateur</span>
                <span className="font-bold text-secky-blue-900">{tx.operator}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Frais</span>
                <span className="font-bold text-secky-blue-900">{formatAmount(tx.fees)} F ({tx.feesSource === "real" ? "réels" : "estimés"})</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Catégorie</span>
                <span className="font-bold text-secky-blue-900">{tx.category}</span>
              </div>
              {tx.note && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Note</span>
                  <span className="font-bold text-secky-blue-900">{tx.note}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {tx.status === "succeeded" && (
            <button
              onClick={handleDownloadPDF}
              className="w-full h-14 bg-white border border-neutral-200 text-secky-blue-900 font-bold rounded-2xl flex items-center justify-center hover:bg-neutral-50 active:scale-95 transition-all"
            >
              <Download size={18} className="mr-2" />
              Télécharger le reçu PDF
            </button>
          )}

        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default function EnvoyerDetail() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <DetailContent />
    </Suspense>
  );
}