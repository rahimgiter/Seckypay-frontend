"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, MessageCircle, Mail, ChevronDown, Send, CheckCircle2, BookOpen, LifeBuoy, Loader2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const faqs = [
  { q: "Comment créer une demande de paiement ?", a: "Allez dans 'Encaisser', remplissez le montant et l'objet, puis cliquez sur 'Générer le lien'. Vous pourrez ensuite le partager avec votre client par WhatsApp, SMS ou tout autre moyen." },
  { q: "Quels sont les opérateurs supportés ?", a: "SeckyPay supporte actuellement Orange Money, Moov Money et Wave. D'autres opérateurs seront ajoutés prochainement." },
  { q: "Comment recevoir mon argent ?", a: "L'argent est versé directement sur votre compte marchand chez l'opérateur (Orange, Moov ou Wave). SeckyPay ne conserve jamais vos fonds." },
  { q: "Que faire si un client a payé mais que le statut reste 'En attente' ?", a: "Allez dans le détail de la transaction et cliquez sur 'Re-vérifier'. Notre système interroge l'opérateur pour obtenir le statut définitif. Si le problème persiste après 15 minutes, contactez le support." },
  { q: "Comment inviter mes collaborateurs ?", a: "Allez dans 'Équipe' puis cliquez sur 'Inviter'. Choisissez leur rôle (Admin ou Caissier) et envoyez-leur l'invitation par email. L'invitation expire après 72 heures." },
  { q: "Puis-je personnaliser mon espace à mes couleurs ?", a: "Oui ! Allez dans 'Ma Marque', uploadez votre logo (500 Ko max) et choisissez votre couleur principale. Les changements seront appliqués instantanément sur votre espace, vos reçus et vos emails." },
  { q: "Comment fonctionne la clôture de caisse ?", a: "En fin de journée, allez dans 'Clôture', vérifiez les totaux par opérateur, puis cliquez sur 'Clôturer la journée'. Une fois la clôture faite, les écritures sont verrouillées et ne peuvent plus être modifiées sans l'intervention d'un Super Admin." },
  { q: "Comment télécharger mes exports comptables ?", a: "Allez dans 'Rapports', choisissez le modèle (Journal, Balance, etc.), la période et le format (PDF, Excel, CSV), puis cliquez sur 'Générer'. Le fichier sera téléchargé automatiquement." },
];

const guides = [
  { title: "Démarrer avec SeckyPay", desc: "Guide de 5 minutes pour faire votre premier encaissement.", icon: BookOpen, color: "bg-blue-50 text-secky-blue-600" },
  { title: "Gérer mon équipe", desc: "Comment inviter des caissiers et gérer les permissions.", icon: BookOpen, color: "bg-purple-50 text-purple-600" },
  { title: "Comprendre la comptabilité", desc: "Guide SYSCOHADA pour les non-comptables.", icon: BookOpen, color: "bg-green-50 text-status-success" },
];

function AideContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setName(""); setEmail(""); setSubject(""); setMessage("");
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

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
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Aide & Support</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Nous sommes là pour vous aider.</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Carte principale */}
          <div className="bg-secky-gradient rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                  <LifeBuoy size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Besoin d'aide ?</h2>
                <p className="text-white/70 font-medium max-w-md">Notre équipe vous répond en moins de 24h. Consultez la FAQ ou envoyez-nous un message.</p>
              </div>
              <div className="flex flex-col gap-2">
                <a href="https://wa.me/22670000000" target="_blank" className="h-12 px-6 bg-[#25D366] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors">
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a href="mailto:support@seckytech.com" className="h-12 px-6 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                  <Mail size={18} /> Email
                </a>
              </div>
            </div>
          </div>

          {/* Guides rapides */}
          <div>
            <h3 className="text-lg font-bold text-secky-blue-900 mb-4">Guides rapides</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {guides.map((g) => (
                <div key={g.title} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl ${g.color} flex items-center justify-center mb-3`}>
                    <g.icon size={20} />
                  </div>
                  <p className="font-bold text-sm text-secky-blue-900 mb-1">{g.title}</p>
                  <p className="text-xs text-neutral-500 font-medium">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-lg font-bold text-secky-blue-900 mb-4">Questions fréquentes</h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => toggleFaq(index)} 
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secky-blue-50 flex items-center justify-center text-secky-blue-600 shrink-0">
                        <HelpCircle size={16} />
                      </div>
                      <span className="font-bold text-sm text-secky-blue-900">{faq.q}</span>
                    </div>
                    <ChevronDown size={20} className={`text-neutral-400 transition-transform shrink-0 ml-2 ${openFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 pt-0 ml-11 text-sm text-neutral-600 font-medium leading-relaxed animate-fade-in-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-6 border-b border-neutral-100">
              <h3 className="font-bold text-secky-blue-900">Contacter le support</h3>
              <p className="text-sm text-neutral-500 font-medium mt-1">Décrivez votre problème, nous reviendrons vers vous rapidement.</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Votre nom</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:bg-white transition-all font-medium text-secky-blue-900" placeholder="Kofi B." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Votre email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:bg-white transition-all font-medium text-secky-blue-900" placeholder="vous@entreprise.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Sujet</label>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:bg-white transition-all font-medium text-secky-blue-900">
                  <option value="">Sélectionnez un sujet</option>
                  <option value="transaction">Problème avec une transaction</option>
                  <option value="account">Problème de compte</option>
                  <option value="payment">Question sur les paiements</option>
                  <option value="technical">Problème technique</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:bg-white transition-all font-medium text-secky-blue-900 resize-none" placeholder="Décrivez votre problème en détail..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting || isSent}
                className={`w-full h-12 font-bold rounded-xl flex items-center justify-center transition-all active:scale-95 ${isSent ? "bg-status-success text-white" : "bg-secky-blue-600 text-white hover:bg-secky-blue-800 shadow-lg shadow-secky-blue-600/30"}`}
              >
                {isSubmitting ? <><Loader2 size={18} className="mr-2 animate-spin" /> Envoi en cours...</> : isSent ? <><CheckCircle2 size={18} className="mr-2" /> Message envoyé !</> : <><Send size={18} className="mr-2" /> Envoyer le message</>}
              </button>
            </form>
          </div>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default function Aide() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <AideContent />
    </Suspense>
  );
}