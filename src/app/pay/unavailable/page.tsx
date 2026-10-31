"use client";
import Link from "next/link";
import { Clock, Ban, CheckCircle2, HelpCircle, ArrowLeft } from "lucide-react";

export default function LinkUnavailable() {
  // Cas simulé : lien expiré
  const reason = "expired"; 
  // Autres cas : "cancelled", "already_paid", "unknown"

  const config = {
    expired: {
      icon: Clock,
      color: "text-status-warning",
      bg: "bg-orange-50",
      border: "border-orange-100",
      gradient: "from-status-warning to-[#FBBF24]",
      title: "Lien expiré",
      message: "Ce lien de paiement a expiré. La date limite de paiement est dépassée.",
      action: "Demander un nouveau lien à École Les Lauriers.",
    },
    cancelled: {
      icon: Ban,
      color: "text-status-error",
      bg: "bg-red-50",
      border: "border-red-100",
      gradient: "from-status-error to-[#F87171]",
      title: "Lien annulé",
      message: "Le marchand a annulé cette demande de paiement.",
      action: "Contactez École Les Lauriers pour plus d'informations.",
    },
    already_paid: {
      icon: CheckCircle2,
      color: "text-status-success",
      bg: "bg-green-50",
      border: "border-green-100",
      gradient: "from-status-success to-[#4ADE80]",
      title: "Déjà payé",
      message: "Ce lien a déjà été payé avec succès. Un reçu vous a été envoyé.",
      action: "Consultez votre reçu ou contactez le marchand.",
    },
    unknown: {
      icon: HelpCircle,
      color: "text-neutral-500",
      bg: "bg-neutral-50",
      border: "border-neutral-200",
      gradient: "from-neutral-400 to-neutral-300",
      title: "Lien introuvable",
      message: "Ce lien de paiement n'existe pas ou a été supprimé.",
      action: "Vérifiez l'adresse ou demandez un nouveau lien.",
    },
  };

  const current = config[reason as keyof typeof config];
  const Icon = current.icon;

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex justify-center py-8 px-4 md:py-12 relative overflow-hidden">
      <div className="w-full max-w-[440px] relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        
        <div className="bg-white rounded-[32px] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white w-full relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${current.gradient}`}></div>
          
          <div className={`inline-flex items-center justify-center w-20 h-20 ${current.bg} rounded-full mb-6 border ${current.border}`}>
            <Icon size={44} className={current.color} />
          </div>

          <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-2">{current.title}</h2>
          <p className="text-sm font-medium text-neutral-500 mb-6 leading-relaxed">{current.message}</p>

          <div className="bg-neutral-50 rounded-2xl p-4 mb-6">
            <p className="text-sm font-medium text-neutral-600">{current.action}</p>
          </div>

          <div className="space-y-3">
            <a href="tel:+22670000000" className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center active:scale-95 transition-transform shadow-[0_8px_20px_-6px_rgba(16,91,174,0.5)] hover:bg-secky-blue-800">
              Contacter le marchand
            </a>
            <Link href="/" className="w-full h-14 bg-white text-secky-blue-900 font-bold rounded-2xl flex items-center justify-center border border-neutral-200 active:scale-95 transition-transform shadow-sm hover:bg-neutral-50">
              <ArrowLeft size={18} className="mr-2" />
              Retour à l'accueil
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}