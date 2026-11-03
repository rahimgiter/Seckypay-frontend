"use client";
import { useState, useEffect, Suspense } from "react";
import { ArrowLeft, CheckCircle2, Lock, Download, X, AlertTriangle, Loader2, Plus, FileText } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { useBrand } from "@/contexts/BrandContext";

function ClotureContent() {
  const { branding } = useBrand();
  const [status, setStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [openAmount, setOpenAmount] = useState("");
  const [closeAmount, setCloseAmount] = useState("");
  const [gapReason, setGapReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  async function fetchStatus() {
    try {
      const res = await fetch("/api/cash-register/status");
      const json = await res.json();
      setStatus(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchStatus(); }, []);

  const formatAmount = (n: number | undefined | null) => (n || 0).toLocaleString("fr-FR");

  const handleOpen = async () => {
    const amount = parseInt(openAmount.replace(/\s/g, ""));
    if (isNaN(amount) || amount < 0) {
      alert("Veuillez saisir un solde d'ouverture valide.");
      return;
    }
    setIsOpening(true);
    try {
      await fetch("/api/cash-register/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ openingBalance: amount }),
      });
      await fetchStatus();
      setShowOpenModal(false);
      setOpenAmount("");
    } catch (error) {
      alert("Erreur lors de l'ouverture.");
    } finally {
      setIsOpening(false);
    }
  };

  const handleClose = async () => {
    const amount = parseInt(closeAmount.replace(/\s/g, ""));
    if (isNaN(amount) || amount < 0) {
      alert("Veuillez saisir un solde de clôture valide.");
      return;
    }
    const gap = amount - (status?.totals?.expectedBalance || 0);
    if (gap !== 0 && !gapReason.trim()) {
      alert("Vous devez justifier l'écart avant de clôturer.");
      return;
    }
    if (!confirmed) {
      alert("Veuillez cocher la case de confirmation.");
      return;
    }
    setIsClosing(true);
    try {
      await fetch("/api/cash-register/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ closingBalance: amount, gapReason: gapReason || undefined }),
      });
      await fetchStatus();
      setShowCloseModal(false);
      setCloseAmount("");
      setGapReason("");
      setConfirmed(false);
    } catch (error) {
      alert("Erreur lors de la clôture.");
    } finally {
      setIsClosing(false);
    }
  };

  const handleDownloadPDF = async () => {
    const { generateExportPDF } = await import("@/lib/pdf");
    const data = status?.allTransactions?.map((tx: any) => [
      tx.date,
      tx.id,
      tx.subject,
      tx.type === "in" ? "Entrée" : "Sortie",
      tx.operator,
      tx.amount.toLocaleString("fr-FR"),
      tx.fees.toLocaleString("fr-FR"),
      tx.status,
    ]) || [];

    generateExportPDF({
      title: `Rapport de clôture - ${status?.cashRegister?.date}`,
      subtitle: `${status?.totals?.transactionsCount} opérations · Écart: ${formatAmount(status?.cashRegister?.gap)} FCFA`,
      period: status?.cashRegister?.date || "",
      columns: ["Date", "Réf", "Objet", "Type", "Opérateur", "Montant", "Frais", "Statut"],
      rows: data,
      brandColor: branding.primaryColor,
    });
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 size={40} className="animate-spin text-secky-blue-600" /></div>;
  }

  const register = status?.cashRegister;
  const totals = status?.totals;
  const isClosed = register?.status === "closed";
  const gap = isClosed ? register?.gap : null;
  const hasGap = gap !== null && gap !== 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex items-center gap-4 bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none">
          <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Clôture de caisse</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">
              {isClosed ? "Clôture effectuée" : "Fermez la journée et verrouillez vos comptes."}
            </p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Bandeau de statut */}
          {isClosed ? (
            <div className={`rounded-2xl p-4 flex items-center gap-3 ${hasGap ? "bg-orange-50 border border-orange-200" : "bg-green-50 border border-green-200"}`}>
              {hasGap ? <AlertTriangle size={20} className="text-status-warning shrink-0" /> : <CheckCircle2 size={20} className="text-status-success shrink-0" />}
              <div className="flex-1">
                <p className={`text-sm font-bold ${hasGap ? "text-orange-900" : "text-green-900"}`}>
                  {hasGap ? "Journée clôturée avec écart" : "Journée clôturée avec succès"}
                </p>
                <p className={`text-xs mt-0.5 font-medium ${hasGap ? "text-orange-700" : "text-green-700"}`}>
                  {hasGap ? `Écart de ${formatAmount(gap)} FCFA · Motif : ${register?.gapReason || "non justifié"}` : "Le rapport est prêt à être téléchargé."}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-4 flex items-center gap-3 bg-blue-50 border border-blue-200">
              <Lock size={20} className="text-secky-blue-600 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-secky-blue-900">Caisse ouverte</p>
                <p className="text-xs text-secky-blue-700 font-medium mt-0.5">
                  Solde d'ouverture : {formatAmount(register?.openingBalance)} FCFA
                </p>
              </div>
            </div>
          )}

          {/* Résumé du jour */}
          <div className="card-bank-texture rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <p className="text-sm font-medium text-white/70 mb-1">Variation de caisse du jour</p>
              <div className="flex items-baseline gap-2 mb-6">
                <h2 className={`text-[48px] font-extrabold tracking-tighter leading-none ${(totals?.variation || 0) >= 0 ? "text-green-300" : "text-red-300"}`}>
                  {(totals?.variation || 0) >= 0 ? "+" : ""}{formatAmount(totals?.variation)}
                </h2>
                <span className="text-lg font-semibold text-white/80">FCFA</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div>
                  <p className="text-[11px] text-white/60 uppercase tracking-wider">Entrées</p>
                  <p className="font-bold text-sm">+{formatAmount(totals?.entries)} F</p>
                </div>
                <div className="border-x border-white/20">
                  <p className="text-[11px] text-white/60 uppercase tracking-wider">Sorties</p>
                  <p className="font-bold text-sm">−{formatAmount(totals?.exits)} F</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/60 uppercase tracking-wider">Frais</p>
                  <p className="font-bold text-sm">−{formatAmount(totals?.totalFees)} F</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contrôle de solde */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-neutral-100">
            <h3 className="text-lg font-bold text-secky-blue-900 mb-4">Contrôle de solde</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-sm font-medium text-neutral-600">Solde d'ouverture</span>
                <span className="font-bold text-secky-blue-900">{formatAmount(register?.openingBalance)} F</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-sm font-medium text-neutral-600">Variation de caisse</span>
                <span className={`font-bold ${(totals?.variation || 0) >= 0 ? "text-status-success" : "text-status-error"}`}>
                  {(totals?.variation || 0) >= 0 ? "+" : ""}{formatAmount(totals?.variation)} F
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-100 bg-secky-blue-50 -mx-2 px-2 rounded">
                <span className="text-sm font-bold text-secky-blue-900">Solde attendu</span>
                <span className="font-extrabold text-secky-blue-900 text-lg">{formatAmount(totals?.expectedBalance)} F</span>
              </div>
              
              {isClosed && (
                <>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="text-sm font-medium text-neutral-600">Solde réel saisi</span>
                    <span className="font-bold text-secky-blue-900">{formatAmount(register?.closingBalance)} F</span>
                  </div>
                  <div className={`flex justify-between items-center py-2 -mx-2 px-2 rounded ${hasGap ? "bg-red-50" : "bg-green-50"}`}>
                    <span className={`text-sm font-bold ${hasGap ? "text-status-error" : "text-status-success"}`}>Écart</span>
                    <span className={`font-extrabold text-lg ${hasGap ? "text-status-error" : "text-status-success"}`}>
                      {formatAmount(gap)} F
                    </span>
                  </div>
                  {hasGap && register?.gapReason && (
                    <div className="pt-2">
                      <p className="text-[11px] font-bold text-neutral-400 uppercase mb-1">Motif de l'écart</p>
                      <p className="text-sm text-neutral-600">{register.gapReason}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Opérations en attente */}
          {status?.pendingTransactions && status.pendingTransactions.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-status-warning shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-orange-900">
                    {status.pendingTransactions.length} opération{status.pendingTransactions.length > 1 ? "s" : ""} en attente
                  </p>
                  <p className="text-xs text-orange-700 font-medium mt-1">
                    Ces opérations ne sont pas comptées dans les totaux. Elles seront reportées à la journée de confirmation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-3 pt-2">
            {isClosed ? (
              <button 
                onClick={handleDownloadPDF}
                className="flex-1 h-14 bg-white border border-neutral-200 text-secky-blue-900 font-bold rounded-2xl flex items-center justify-center hover:bg-neutral-50 active:scale-95 transition-all"
              >
                <Download size={18} className="mr-2" />
                Télécharger le rapport PDF
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setShowOpenModal(true)}
                  className="flex-1 h-14 bg-white border border-neutral-200 text-secky-blue-900 font-bold rounded-2xl flex items-center justify-center hover:bg-neutral-50 active:scale-95 transition-all"
                >
                  <Plus size={18} className="mr-2" />
                  Modifier le solde d'ouverture
                </button>
                <button 
                  onClick={() => setShowCloseModal(true)}
                  className="flex-1 h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 active:scale-95 transition-all"
                >
                  <Lock size={18} className="mr-2" />
                  Clôturer la journée
                </button>
              </>
            )}
          </div>

        </div>
      </main>

      <BottomNav />

      {/* Modal : Solde d'ouverture */}
      {showOpenModal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowOpenModal(false)}>
          <div className="bg-white w-full md:w-[440px] rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6 md:hidden"></div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-secky-blue-900">Solde d'ouverture</h3>
              <button onClick={() => setShowOpenModal(false)} className="text-neutral-400 hover:bg-neutral-100 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-neutral-500 font-medium mb-4">Saisissez le solde réel de votre compte au début de la journée.</p>
            <div className="relative mb-6">
              <input 
                type="text" 
                inputMode="numeric"
                value={openAmount}
                onChange={(e) => setOpenAmount(e.target.value.replace(/\D/g, ""))}
                placeholder={register?.openingBalance?.toString() || "200000"}
                className="w-full h-14 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-2xl font-extrabold text-secky-blue-900 focus:outline-none focus:border-secky-blue-600"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">FCFA</span>
            </div>
            <button 
              onClick={handleOpen}
              disabled={isOpening}
              className="w-full h-12 bg-secky-blue-600 text-white font-bold rounded-xl hover:bg-secky-blue-800 transition-colors flex items-center justify-center"
            >
              {isOpening ? <><Loader2 size={18} className="mr-2 animate-spin" /> Enregistrement...</> : "Enregistrer"}
            </button>
          </div>
        </div>
      )}

      {/* Modal : Clôture */}
      {showCloseModal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowCloseModal(false)}>
          <div className="bg-white w-full md:w-[480px] rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6 md:hidden"></div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-secky-blue-900">Clôturer la journée</h3>
              <button onClick={() => setShowCloseModal(false)} className="text-neutral-400 hover:bg-neutral-100 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="bg-neutral-50 rounded-xl p-4 mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-500">Solde attendu</span>
                <span className="font-bold text-secky-blue-900">{formatAmount(totals?.expectedBalance)} F</span>
              </div>
              <p className="text-[11px] text-neutral-500">Saisissez le solde réel constaté sur votre compte.</p>
            </div>

            <label className="block text-sm font-bold text-secky-blue-900 mb-2">Solde réel de clôture</label>
            <div className="relative mb-4">
              <input 
                type="text" 
                inputMode="numeric"
                value={closeAmount}
                onChange={(e) => setCloseAmount(e.target.value.replace(/\D/g, ""))}
                placeholder="Saisir le montant..."
                className="w-full h-14 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-2xl font-extrabold text-secky-blue-900 focus:outline-none focus:border-secky-blue-600"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">FCFA</span>
            </div>

            {/* Écart calculé */}
            {closeAmount && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-orange-900">Écart calculé</span>
                  <span className={`font-extrabold ${(parseInt(closeAmount) - (totals?.expectedBalance || 0)) === 0 ? "text-status-success" : "text-status-error"}`}>
                    {formatAmount(parseInt(closeAmount) - (totals?.expectedBalance || 0))} F
                  </span>
                </div>
              </div>
            )}

            {/* Motif si écart */}
            {closeAmount && (parseInt(closeAmount) - (totals?.expectedBalance || 0)) !== 0 && (
              <div className="mb-4">
                <label className="block text-sm font-bold text-secky-blue-900 mb-2">Motif de l'écart (obligatoire)</label>
                <textarea 
                  value={gapReason}
                  onChange={(e) => setGapReason(e.target.value)}
                  placeholder="Ex: Une dépense non enregistrée de 10 000 F..."
                  rows={3}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 resize-none"
                />
              </div>
            )}

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input 
                type="checkbox" 
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-neutral-300 text-secky-blue-600"
              />
              <span className="text-sm font-medium text-neutral-600">
                Je confirme que ces totaux sont corrects et je comprends que cette action est irréversible.
              </span>
            </label>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowCloseModal(false)}
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
                {isClosing ? <><Loader2 size={18} className="mr-2 animate-spin" /> Clôture...</> : <><Lock size={18} className="mr-2" /> Confirmer</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Cloture() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <ClotureContent />
    </Suspense>
  );
}