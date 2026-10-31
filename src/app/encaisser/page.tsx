"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { Suspense } from "react";

export default function Encaisser() {
  const router = useRouter();
  const [rawAmount, setRawAmount] = useState("");
  const [subject, setSubject] = useState("");
  const [reference, setReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setRawAmount(digits.slice(0, 9));
  };

  const displayAmount = rawAmount ? parseInt(rawAmount, 10).toLocaleString("fr-FR").replace(/\u202f/g, " ") : "";
  const numericAmount = parseInt(rawAmount, 10) || 0;
  const isValid = numericAmount >= 100 && subject.trim().length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numericAmount,
          subject: subject,
          reference: reference,
        }),
      });

      if (!res.ok) throw new Error("Erreur de création");
      
      const data = await res.json();
      // On redirige vers la page de succès en passant l'ID
      router.push(`/encaisser/success?id=${data.data.id}`);
    } catch (error) {
      alert("Une erreur est survenue lors de la création du lien.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] md:bg-white flex">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8">
        <header className="pt-8 pb-4 px-6 flex items-center bg-white md:bg-transparent border-b border-neutral-100 md:border-none">
          <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-neutral-50 text-secky-blue-900 rounded-full mr-4 hover:bg-neutral-200 transition-colors md:hidden">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Encaisser</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Créez une demande de paiement pour votre client.</p>
          </div>
        </header>

        <div className="px-6 md:px-8 mt-6 md:mt-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div className="space-y-6">
            <div className="card-bank-texture rounded-[32px] p-8 text-white relative overflow-hidden">
              <label className="block text-sm font-semibold text-white/70 mb-2">Montant à encaisser (FCFA)</label>
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  inputMode="numeric"
                  className="w-full bg-transparent text-5xl font-extrabold placeholder-white/30 focus:outline-none tracking-tight" 
                  placeholder="0"
                  value={displayAmount}
                  onChange={handleAmountChange}
                  autoFocus
                />
              </div>
            </div>

            <div className="card-3d rounded-[24px] p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-secky-blue-900 mb-2">Objet de la demande</label>
                <input 
                  type="text" 
                  className="w-full h-12 px-4 bg-white border border-neutral-200 rounded-xl text-base focus:outline-none focus:border-secky-blue-600 focus:ring-2 focus:ring-secky-blue-100 transition-all text-secky-blue-900 placeholder-neutral-400"
                  placeholder="Ex: Achat de marchandise"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={80}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-secky-blue-900 mb-2">Référence <span className="text-neutral-400 font-normal">(Optionnel)</span></label>
                <input 
                  type="text" 
                  className="w-full h-12 px-4 bg-white border border-neutral-200 rounded-xl text-base focus:outline-none focus:border-secky-blue-600 focus:ring-2 focus:ring-secky-blue-100 transition-all text-secky-blue-900 placeholder-neutral-400"
                  placeholder="Ex: CMD-001"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              onClick={handleSubmit}
              className={`w-full h-14 font-bold rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-lg ${
                isValid 
                  ? "bg-secky-blue-600 text-white shadow-secky-blue-600/30 hover:bg-secky-blue-800" 
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? <><Loader2 size={20} className="animate-spin mr-2" /> Création en cours...</> : <>Générer le lien de paiement <ArrowRight size={20} className="ml-2" /></>}
            </button>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-start pt-4">
            <div className="w-full max-w-sm card-3d rounded-[32px] p-8 text-center relative overflow-hidden">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8">Aperçu du Checkout</p>
              
              <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-sm border border-neutral-100">
                <img src="/icon.png" alt="Logo" className="w-10 h-10" />
              </div>
              <h3 className="font-extrabold text-secky-blue-900 text-xl mb-1">SeckyPay</h3>
              <p className="text-xs font-medium text-neutral-500 mb-8">Demande de paiement sécurisée</p>

              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secky-blue-600 to-secky-cyan-400"></div>
                <p className="text-sm font-semibold text-neutral-500 mb-1">Montant à payer</p>
                <p className="text-4xl font-extrabold text-secky-blue-900 mb-2">{displayAmount ? `${displayAmount}` : "0"} <span className="text-lg text-neutral-400">FCFA</span></p>
                <p className="text-sm font-medium text-secky-blue-900">{subject || "Objet de la demande"}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}