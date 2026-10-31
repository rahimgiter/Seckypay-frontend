"use client";
import Link from "next/link";
import { Clock, CheckCircle2, FileText, MessageCircle, ArrowRight } from "lucide-react";

export default function AccountPending() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center py-8 px-4 md:py-12">
      <div className="w-full max-w-[440px]">
        
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-neutral-100 text-center">
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-4 border border-orange-100">
            <Clock size={40} className="text-status-warning" />
          </div>
          
          <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-2">Compte en validation</h2>
          <p className="text-sm font-medium text-neutral-500 mb-8 leading-relaxed">
            Merci ! Votre demande d'inscription a bien été reçue. Notre équipe vérifie vos informations. Cela prend généralement moins de 48 heures ouvrées.
          </p>

          <div className="bg-neutral-50 rounded-2xl p-5 mb-8 text-left">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Étapes de validation</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-status-success flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secky-blue-900">Inscription</p>
                  <p className="text-xs text-neutral-500 font-medium">Terminée</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText size={14} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secky-blue-900">Vérification des documents</p>
                  <p className="text-xs text-neutral-500 font-medium">En cours par notre équipe</p>
                </div>
              </div>
              <div className="flex items-start gap-3 opacity-40">
                <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-neutral-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secky-blue-900">Activation du compte</p>
                  <p className="text-xs text-neutral-500 font-medium">En attente</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <a href="https://wa.me/22670000000" target="_blank" className="w-full h-14 bg-white text-secky-blue-900 font-bold rounded-2xl flex items-center justify-center border border-neutral-200 active:scale-95 transition-transform shadow-sm hover:bg-neutral-50">
              <MessageCircle size={18} className="mr-2" />
              Contacter le support
            </a>
            <Link href="/" className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center active:scale-95 transition-transform shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800">
              Retour à l'accueil <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          <p className="text-[11px] text-neutral-400 font-medium mt-6">
            Vous recevrez une notification par email et WhatsApp dès que votre compte sera validé.
          </p>

        </div>
      </div>
    </div>
  );
}