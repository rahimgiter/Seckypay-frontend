"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";

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
      
      {/* Branding (Desktop) */}
      <div className="hidden lg:flex w-1/2 bg-[#0A1633] relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secky-blue-600/30 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secky-cyan-400/20 rounded-full blur-[80px] -ml-20 -mb-20"></div>
        
        <Link href="/" className="relative z-10">
          <img src="/logo.png" alt="SeckyPay" className="h-12 w-auto object-contain bg-white p-2 rounded-xl shadow-lg" />
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Encaissez vos paiements en quelques secondes.
          </h1>
          <p className="text-white/60 text-lg">
            La solution de paiement mobile la plus simple et la plus sécurisée pour les entreprises en Afrique de l'Ouest.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-white/40 text-sm">
          <span>© 2026 Secky Tech SARL</span>
        </div>
      </div>

      {/* Formulaire */}
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