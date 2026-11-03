"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Send, Loader2, User, Phone, X, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

function EnvoyerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedBenefId = searchParams.get("beneficiary");

  const [accounts, setAccounts] = useState<any[]>([]);
  const [benefs, setBenefs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    fromAccountId: "",
    beneficiaryId: "",
    amount: "",
    category: "Autre",
    note: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [accRes, benRes] = await Promise.all([
          fetch("/api/accounts"),
          fetch("/api/beneficiaries"),
        ]);
        const accJson = await accRes.json();
        const benJson = await benRes.json();
        setAccounts(accJson.data);
        setBenefs(benJson.data);

        // Pré-sélectionner le compte par défaut et le bénéficiaire
        const defaultAcc = accJson.data.find((a: any) => a.isDefault) || accJson.data[0];
        setForm(f => ({
          ...f,
          fromAccountId: defaultAcc?.id || "",
          beneficiaryId: preselectedBenefId || "",
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [preselectedBenefId]);

  const selectedBenef = benefs.find(b => b.id === form.beneficiaryId);
  const rawAmount = parseInt(form.amount.replace(/\D/g, "")) || 0;
  const feeRate = selectedBenef?.operator === "Wave" ? 0.005 : 0.01;
  const estimatedFee = Math.round(rawAmount * feeRate);
  const totalDebited = rawAmount + estimatedFee;

  const isValid = form.fromAccountId && form.beneficiaryId && rawAmount >= 100;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const formatted = digits ? parseInt(digits).toLocaleString("fr-FR").replace(/\u202f/g, " ") : "";
    setForm({ ...form, amount: formatted });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          beneficiaryName: selectedBenef.name,
          beneficiaryPhone: selectedBenef.phone,
          amount: rawAmount,
          operator: selectedBenef.operator,
          category: form.category,
          note: form.note,
        }),
      });
      if (!res.ok) throw new Error("Erreur");
      const json = await res.json();
      router.push(`/envoyer/${json.data.id}`);
    } catch (error) {
      alert("Erreur lors de l'envoi.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 size={40} className="animate-spin text-secky-blue-600" /></div>;
  }

  if (accounts.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center border border-neutral-200">
          <AlertTriangle size={48} className="mx-auto text-status-warning mb-4" />
          <h2 className="text-xl font-bold text-secky-blue-900 mb-2">Aucun compte mobile money</h2>
          <p className="text-sm text-neutral-500 mb-6">Vous devez d'abord déclarer un compte pour pouvoir envoyer de l'argent.</p>
          <Link href="/comptes" className="h-12 px-6 bg-secky-blue-600 text-white font-bold rounded-xl inline-flex items-center">
            Ajouter un compte
          </Link>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Envoyer de l'argent</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Transférez vers un bénéficiaire mobile money.</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-2xl mx-auto w-full space-y-5">
          
          {/* Compte source */}
          <div>
            <label className="block text-sm font-bold text-secky-blue-900 mb-2">Depuis quel compte ?</label>
            <div className="space-y-2">
              {accounts.map(acc => (
                <button
                  key={acc.id}
                  onClick={() => setForm({ ...form, fromAccountId: acc.id })}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${form.fromAccountId === acc.id ? "border-secky-blue-600 bg-secky-blue-50" : "border-neutral-200 bg-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs ${acc.operator === "Orange Money" ? "bg-[#FF7900]" : acc.operator === "Wave" ? "bg-[#1DC3F3]" : "bg-[#0066B3]"}`}>
                      {acc.operator.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm text-secky-blue-900">{acc.label}</p>
                      <p className="text-xs text-neutral-500">{acc.phone}</p>
                    </div>
                  </div>
                  {form.fromAccountId === acc.id && <CheckCircle2 size={20} className="text-secky-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Bénéficiaire */}
          <div>
            <label className="block text-sm font-bold text-secky-blue-900 mb-2">Vers qui ?</label>
            <select
              value={form.beneficiaryId}
              onChange={(e) => setForm({ ...form, beneficiaryId: e.target.value })}
              className="w-full h-14 px-4 bg-white border-2 border-neutral-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-secky-blue-600"
            >
              <option value="">Sélectionner un bénéficiaire</option>
              {benefs.map(b => (
                <option key={b.id} value={b.id}>{b.name} · {b.phone} ({b.operator})</option>
              ))}
            </select>
            <Link href="/beneficiaires" className="inline-flex items-center gap-1 text-xs font-bold text-secky-blue-600 mt-2 hover:underline">
              <User size={12} /> Gérer mes bénéficiaires
            </Link>
          </div>

          {/* Montant */}
          <div>
            <label className="block text-sm font-bold text-secky-blue-900 mb-2">Montant à envoyer</label>
            <div className="relative">
              <input 
                type="text"
                inputMode="numeric"
                value={form.amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="w-full h-16 px-4 bg-white border-2 border-neutral-200 rounded-2xl text-3xl font-extrabold text-secky-blue-900 focus:outline-none focus:border-secky-blue-600"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">FCFA</span>
            </div>
          </div>

          {/* Catégorie + Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-secky-blue-900 mb-2">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full h-12 px-4 bg-white border-2 border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-secky-blue-600"
              >
                <option value="Salaire">Salaire</option>
                <option value="Fournisseur">Fournisseur</option>
                <option value="Dépense">Dépense</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-secky-blue-900 mb-2">Note (optionnel)</label>
              <input 
                type="text"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Ex: Paiement octobre"
                maxLength={80}
                className="w-full h-12 px-4 bg-white border-2 border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-secky-blue-600"
              />
            </div>
          </div>

          {/* Récap frais */}
          {rawAmount > 0 && selectedBenef && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Montant envoyé</span>
                <span className="font-bold text-secky-blue-900">{rawAmount.toLocaleString("fr-FR")} F</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Frais estimés ({feeRate === 0.005 ? "0.5%" : "1%"})</span>
                <span className="font-bold text-neutral-600">{estimatedFee.toLocaleString("fr-FR")} F</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-neutral-100">
                <span className="font-bold text-secky-blue-900">Total débité</span>
                <span className="font-extrabold text-secky-blue-900 text-lg">{totalDebited.toLocaleString("fr-FR")} F</span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-1">Frais estimés. Le montant réel peut varier selon l'opérateur.</p>
            </div>
          )}

          {/* Bouton Envoyer */}
          <button
            onClick={() => setShowConfirm(true)}
            disabled={!isValid}
            className={`w-full h-14 font-bold rounded-2xl flex items-center justify-center transition-all ${
              isValid 
                ? "bg-secky-blue-600 text-white shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 active:scale-95" 
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            <Send size={18} className="mr-2" />
            Envoyer {rawAmount > 0 ? `${rawAmount.toLocaleString("fr-FR")} FCFA` : ""}
          </button>

        </div>
      </main>

      <BottomNav />

      {/* Modal de confirmation */}
      {showConfirm && selectedBenef && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full md:w-[440px] rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 animate-slide-up">
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6 md:hidden"></div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-secky-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Send size={28} className="text-secky-blue-600" />
              </div>
              <h3 className="text-xl font-extrabold text-secky-blue-900 mb-2">Confirmer l'envoi</h3>
              <p className="text-sm text-neutral-500">Vérifiez les informations avant de valider.</p>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Bénéficiaire</span>
                <span className="font-bold text-secky-blue-900">{selectedBenef.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Téléphone</span>
                <span className="font-bold text-secky-blue-900">{selectedBenef.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Opérateur</span>
                <span className="font-bold text-secky-blue-900">{selectedBenef.operator}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-neutral-200">
                <span className="font-bold text-secky-blue-900">Total débité</span>
                <span className="font-extrabold text-secky-blue-900 text-lg">{totalDebited.toLocaleString("fr-FR")} F</span>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-6">
              <p className="text-xs text-orange-700 font-medium">
                ⚠️ Vous devrez valider le paiement sur votre téléphone avec votre code secret opérateur.
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 h-12 bg-neutral-100 text-neutral-600 font-bold rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-secky-blue-600 text-white font-bold rounded-xl shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 transition-colors flex items-center justify-center"
              >
                {isSubmitting ? <><Loader2 size={18} className="mr-2 animate-spin" /> Envoi...</> : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Envoyer() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <EnvoyerContent />
    </Suspense>
  );
}