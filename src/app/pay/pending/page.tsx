"use client";
import { useEffect, useState } from "react";
import { ShieldCheck, Loader2, Smartphone } from "lucide-react";
import Link from "next/link";

export default function PendingPayment() {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Calcul du pourcentage pour la barre de progression circulaire
  const progress = ((900 - timeLeft) / 900) * 100;

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex justify-center py-6 px-4 md:py-12 relative overflow-hidden">
      
      {/* Effets de lumière d'arrière-plan */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secky-blue-600/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secky-cyan-400/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="w-full max-w-[440px] relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        
        <div className="bg-white rounded-[32px] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-secky-blue-600 via-secky-blue-500 to-secky-cyan-400"></div>
          
          {/* Animation d'attente */}
          <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
            {/* Cercle de fond */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="52" stroke="#F1F5F9" strokeWidth="8" fill="none" />
              <circle cx="56" cy="56" r="52" stroke="#105BAE" strokeWidth="8" fill="none" 
                strokeDasharray={2 * Math.PI * 52} 
                strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)} 
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="w-20 h-20 bg-secky-blue-50 rounded-full flex items-center justify-center z-10">
              <Smartphone size={32} className="text-secky-blue-600 animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-2">Validation en cours</h2>
          <p className="text-sm font-medium text-neutral-500 mb-8 px-4">
            Confirmez le paiement sur votre téléphone en saisissant votre code secret.
          </p>

          {/* Compte à rebours */}
          <div className="bg-secky-blue-50 rounded-2xl p-4 mb-8 border border-secky-blue-100">
            <p className="text-[10px] font-bold text-secky-blue-600 uppercase tracking-widest mb-1">Temps restant</p>
            <p className="text-4xl font-extrabold text-secky-blue-900 tabular-nums tracking-tight">{formattedTime}</p>
          </div>

          {/* Alerte de sécurité */}
          <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 text-left flex gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <span className="text-orange-600 font-bold text-lg">!</span>
            </div>
            <div>
              <p className="text-sm font-bold text-orange-900 mb-1">Important</p>
              <p className="text-xs text-orange-700 font-medium leading-relaxed">
                Ne fermez pas cette page et ne payez pas une seconde fois. Vous serez redirigé automatiquement.
              </p>
            </div>
          </div>

          {/* Lien de secours (pour la démo) */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3">Espace de démonstration</p>
            <Link href="/pay/success" className="inline-flex items-center justify-center w-full h-12 bg-neutral-100 text-secky-blue-900 font-bold text-sm rounded-xl hover:bg-neutral-200 transition-colors">
              Simuler un paiement réussi
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
          <ShieldCheck size={14} />
          Connexion chiffrée de bout en bout
        </div>

      </div>
    </div>
  );
}
