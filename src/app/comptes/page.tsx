"use client";
import { useState, useEffect, Suspense } from "react";
import { ArrowLeft, Plus, CreditCard, CheckCircle2, Clock, Trash2, Star, X, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

function ComptesContent() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ operator: "Orange Money", phone: "", holderName: "", label: "" });

  async function fetchAccounts() {
    try {
      const res = await fetch("/api/accounts");
      const json = await res.json();
      setAccounts(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchAccounts(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur");
      await fetchAccounts();
      setShowModal(false);
      setForm({ operator: "Orange Money", phone: "", holderName: "", label: "" });
    } catch (error) {
      alert("Erreur lors de l'ajout du compte.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce compte ?")) return;
    await fetch(`/api/accounts/${id}`, { method: "DELETE" });
    fetchAccounts();
  };

  const handleSetDefault = async (id: string) => {
    await fetch(`/api/accounts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDefault: true }),
    });
    fetchAccounts();
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
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Mes comptes mobile money</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Déclarez vos comptes Orange, Wave et Moov.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="h-11 px-5 bg-secky-blue-600 text-white font-bold text-sm rounded-xl flex items-center justify-center shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 transition-all active:scale-95"
          >
            <Plus size={18} className="mr-2" /> Ajouter
          </button>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-3xl mx-auto w-full space-y-4">
          
          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle size={20} className="text-secky-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-secky-blue-900">À propos de la vérification</p>
              <p className="text-xs text-secky-blue-700 font-medium mt-1">
                Un compte est <strong>vérifié</strong> après un premier paiement validé depuis ce numéro. SeckyPay n'a jamais accès à votre code secret.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-secky-blue-600" size={32} /></div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 border-dashed">
              <CreditCard size={48} className="mx-auto text-neutral-300 mb-4" />
              <p className="text-lg font-bold text-secky-blue-900 mb-1">Aucun compte déclaré</p>
              <p className="text-sm text-neutral-500 mb-6">Ajoutez votre premier compte pour commencer à encaisser.</p>
              <button onClick={() => setShowModal(true)} className="h-11 px-6 bg-secky-blue-600 text-white font-bold text-sm rounded-xl hover:bg-secky-blue-800">
                Ajouter un compte
              </button>
            </div>
          ) : (
            accounts.map((acc) => (
              <div key={acc.id} className="bg-white rounded-2xl border border-neutral-200 p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${getOperatorColor(acc.operator)} flex items-center justify-center text-white font-bold text-xs`}>
                    {acc.operator.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-secky-blue-900">{acc.label}</p>
                      {acc.isDefault && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-secky-blue-50 text-secky-blue-600">
                          <Star size={10} fill="currentColor" /> Défaut
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 font-medium mt-1">{acc.holderName} · {acc.phone}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${acc.status === "verified" ? "text-status-success" : "text-status-warning"}`}>
                        {acc.status === "verified" ? <><CheckCircle2 size={10} /> Vérifié</> : <><Clock size={10} /> En attente</>}
                      </span>
                      <span className="text-[10px] text-neutral-400">· {acc.operator}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!acc.isDefault && (
                    <button 
                      onClick={() => handleSetDefault(acc.id)}
                      className="w-9 h-9 rounded-lg bg-neutral-50 hover:bg-secky-blue-50 text-neutral-400 hover:text-secky-blue-600 flex items-center justify-center transition-colors"
                      title="Définir par défaut"
                    >
                      <Star size={16} />
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(acc.id)}
                    className="w-9 h-9 rounded-lg bg-neutral-50 hover:bg-red-50 text-neutral-400 hover:text-status-error flex items-center justify-center transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </main>

      <BottomNav />

      {/* Modal d'ajout */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white w-full md:w-[480px] rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6 md:hidden"></div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-secky-blue-900">Ajouter un compte</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:bg-neutral-100 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
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

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Numéro de téléphone</label>
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
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Nom du titulaire</label>
                <input 
                  type="text"
                  value={form.holderName}
                  onChange={(e) => setForm({...form, holderName: e.target.value})}
                  placeholder="Ex: Secky Tech"
                  required
                  className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Libellé (optionnel)</label>
                <input 
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({...form, label: e.target.value})}
                  placeholder="Ex: Compte principal"
                  className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 font-medium"
                />
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="w-full h-12 bg-secky-blue-600 text-white font-bold rounded-xl hover:bg-secky-blue-800 transition-colors flex items-center justify-center"
              >
                {isSaving ? <><Loader2 size={18} className="mr-2 animate-spin" /> Ajout...</> : "Ajouter le compte"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Comptes() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <ComptesContent />
    </Suspense>
  );
}