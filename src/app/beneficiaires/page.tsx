"use client";
import { useState, useEffect, Suspense } from "react";
import { ArrowLeft, Plus, User, X, Loader2, Phone, Send } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

function BeneficiairesContent() {
  const [benefs, setBenefs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", operator: "Orange Money" });

  async function fetchBenefs() {
    try {
      const res = await fetch("/api/beneficiaries");
      const json = await res.json();
      setBenefs(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchBenefs(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/beneficiaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur");
      await fetchBenefs();
      setShowModal(false);
      setForm({ name: "", phone: "", operator: "Orange Money" });
    } catch (error) {
      alert("Erreur lors de l'ajout.");
    } finally {
      setIsSaving(false);
    }
  };

  const getOperatorColor = (op: string) => {
    if (op === "Orange Money") return "bg-[#FF7900]";
    if (op === "Wave") return "bg-[#1DC3F3]";
    return "bg-[#0066B3]";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex items-center justify-between bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Bénéficiaires</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Vos destinataires fréquents.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="h-11 px-5 bg-secky-blue-600 text-white font-bold text-sm rounded-xl flex items-center justify-center shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 transition-all active:scale-95"
          >
            <Plus size={18} className="mr-2" /> Ajouter
          </button>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-3xl mx-auto w-full space-y-3">
          
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-secky-blue-600" size={32} /></div>
          ) : benefs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 border-dashed">
              <User size={48} className="mx-auto text-neutral-300 mb-4" />
              <p className="text-lg font-bold text-secky-blue-900 mb-1">Aucun bénéficiaire</p>
              <p className="text-sm text-neutral-500 mb-6">Ajoutez vos destinataires fréquents pour envoyer plus vite.</p>
              <button onClick={() => setShowModal(true)} className="h-11 px-6 bg-secky-blue-600 text-white font-bold text-sm rounded-xl hover:bg-secky-blue-800">
                Ajouter un bénéficiaire
              </button>
            </div>
          ) : (
            benefs.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${getOperatorColor(b.operator)} flex items-center justify-center text-white font-bold text-sm`}>
                    {b.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-secky-blue-900">{b.name}</p>
                    <p className="text-xs text-neutral-500 font-medium mt-0.5 flex items-center gap-1">
                      <Phone size={10} /> {b.phone} · {b.operator}
                    </p>
                  </div>
                </div>
                <Link 
                  href={`/envoyer?beneficiary=${b.id}`}
                  className="h-10 px-4 bg-secky-blue-50 text-secky-blue-600 font-bold text-xs rounded-xl flex items-center justify-center hover:bg-secky-blue-100 transition-colors"
                >
                  <Send size={14} className="mr-1" /> Envoyer
                </Link>
              </div>
            ))
          )}

        </div>
      </main>

      <BottomNav />

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white w-full md:w-[480px] rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6 md:hidden"></div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-secky-blue-900">Ajouter un bénéficiaire</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:bg-neutral-100 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Nom complet</label>
                <input 
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  placeholder="Ex: Aminata Sawadogo"
                  required
                  className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Téléphone</label>
                <div className="flex items-center bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="px-4 border-r border-neutral-200 flex items-center h-12 bg-white">
                    <span className="text-sm font-bold text-secky-blue-900">+226</span>
                  </div>
                  <input 
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    placeholder="70 00 00 00"
                    required
                    className="flex-1 h-12 px-4 bg-transparent text-sm focus:outline-none font-medium text-secky-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Opérateur</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Orange Money", "Wave", "Moov Money"].map(op => (
                    <button 
                      key={op}
                      type="button"
                      onClick={() => setForm({...form, operator: op})}
                      className={`h-11 rounded-xl border-2 text-xs font-bold transition-all ${form.operator === op ? "border-secky-blue-600 bg-secky-blue-50 text-secky-blue-600" : "border-neutral-200 text-neutral-500"}`}
                    >
                      {op.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="w-full h-12 bg-secky-blue-600 text-white font-bold rounded-xl hover:bg-secky-blue-800 transition-colors flex items-center justify-center"
              >
                {isSaving ? <><Loader2 size={18} className="mr-2 animate-spin" /> Ajout...</> : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Beneficiaires() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <BeneficiairesContent />
    </Suspense>
  );
}