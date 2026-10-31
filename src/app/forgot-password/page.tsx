"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center py-8 px-4 md:py-12">
      <div className="w-full max-w-[440px]">
        
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-secky-blue-600 mb-8 transition-colors">
          <ArrowLeft size={18} /> Retour à la connexion
        </Link>

        {!sent ? (
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-neutral-100">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-2">Mot de passe oublié ?</h2>
              <p className="text-sm font-medium text-neutral-500">
                Pas de panique. Entrez votre identifiant et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-secky-blue-900 mb-2">Identifiant</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input type="text" required className="w-full h-12 pl-11 pr-4 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:ring-4 focus:ring-secky-blue-600/10 transition-all font-medium text-secky-blue-900" placeholder="Email ou téléphone" />
                </div>
              </div>

              <button type="submit" className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 mt-4">
                Envoyer le lien <ArrowRight size={18} className="ml-2" />
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-neutral-100 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4 border border-green-100">
              <CheckCircle2 size={32} className="text-status-success" />
            </div>
            <h2 className="text-xl font-extrabold text-secky-blue-900 mb-2">Email envoyé !</h2>
            <p className="text-sm font-medium text-neutral-500 mb-6 leading-relaxed">
              Si un compte existe avec cet identifiant, vous recevrez un lien de réinitialisation dans quelques instants.
            </p>
            <Link href="/login" className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center transition-all shadow-lg hover:bg-secky-blue-800">
              Retour à la connexion
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}