"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, ChevronRight } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [isSplash, setIsSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  if (isSplash) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <img src="/logo.png" alt="SeckyPay" className="w-64 h-auto object-contain animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      
      {/* Côté Gauche : Image + Overlay branding (Desktop) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1765648684630-ac9c15ac98d5?q=80&w=1200&auto=format&fit=crop" 
          alt="Commerçant africain" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1633] via-[#0A1633]/60 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/">
            <img src="/logo.png" alt="SeckyPay" className="h-12 w-auto object-contain bg-white p-2 rounded-xl shadow-lg" />
          </Link>

          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
              1 200+ commerçants nous font confiance
            </div>
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Gérez vos encaissements mobiles en toute sérénité.
            </h1>
            <p className="text-white/80 text-base font-medium">
              Centralisez Orange, Moov et Wave sur une seule plateforme sécurisée.
            </p>
          </div>

          <div className="flex items-center gap-4 text-white/60 text-xs">
            <span>© 2026 Secky Tech SARL</span>
            <span>•</span>
            <span>Ouagadougou, Burkina Faso</span>
          </div>
        </div>
      </div>

      {/* Côté Droit : Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secky-blue-100/50 rounded-full blur-[80px]"></div>

        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-neutral-100 relative z-10">
          
          <div className="lg:hidden flex justify-center mb-8">
            <img src="/logo.png" alt="SeckyPay" className="h-10 w-auto object-contain" />
          </div>

          <h2 className="text-3xl font-extrabold text-secky-blue-900 mb-2">Bon retour</h2>
          <p className="text-neutral-500 mb-8 font-medium">Entrez vos identifiants pour accéder à votre espace.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-secky-blue-900 mb-2">Identifiant</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-neutral-400" />
                </div>
                <input 
                  type="text" 
                  className="w-full h-14 pl-12 pr-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-base focus:outline-none focus:border-secky-blue-600 focus:bg-white focus:ring-4 focus:ring-secky-blue-600/10 transition-all text-secky-blue-900 font-medium" 
                  placeholder="Ex: 70 00 00 00" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-secky-blue-900 mb-2">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-neutral-400" />
                </div>
                <input 
                  type="password" 
                  className="w-full h-14 pl-12 pr-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-base focus:outline-none focus:border-secky-blue-600 focus:bg-white focus:ring-4 focus:ring-secky-blue-600/10 transition-all text-secky-blue-900 font-medium" 
                  placeholder="••••••••••" 
                  required 
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm font-bold text-secky-blue-600 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            <button type="submit" disabled={isLoading} className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-[0_8px_20px_-6px_rgba(16,91,174,0.5)] hover:bg-secky-blue-800 mt-2 disabled:opacity-70">
              {isLoading ? "Connexion..." : "Se connecter"}
              {!isLoading && <ArrowRight size={20} className="ml-2" />}
            </button>
          </form>

          {/* Séparateur Google OAuth */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-neutral-400 font-bold uppercase">ou</span>
            </div>
          </div>

          {/* Bouton Google */}
          <button className="w-full h-14 bg-white border-2 border-neutral-200 text-secky-blue-900 font-bold rounded-2xl flex items-center justify-center hover:bg-neutral-50 transition-all active:scale-95">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuer avec Google
          </button>

          <div className="text-center mt-8 pt-6 border-t border-neutral-100">
            <p className="text-sm font-medium text-neutral-500">Pas encore de compte ?</p>
            <Link href="/signup" className="text-sm font-bold text-secky-blue-600 mt-2 inline-block hover:underline">
              Créer un compte professionnel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}