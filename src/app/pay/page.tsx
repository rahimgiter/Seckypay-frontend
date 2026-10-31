"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ChevronRight, Lock, CheckCircle2 } from "lucide-react";

export default function Checkout() {
  const router = useRouter();
  // On stocke UNIQUEMENT les 8 chiffres bruts (ex: "70123456")
  const [phone, setPhone] = useState("");
  const [operator, setOperator] = useState("orange");
  const [isLoading, setIsLoading] = useState(false);

  const merchantName = "École Les Lauriers";
  const amount = "25 000";
  const subject = "Cantine Octobre";
  const ref = "CMD-1024";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // On extrait que les chiffres et on limite à 8
    const rawDigits = e.target.value.replace(/\D/g, "").slice(0, 8);
    setPhone(rawDigits);
  };

  // Affichage formaté (70 12 34 56)
  const displayPhone = phone.replace(/(\d{2})(?=\d)/g, "$1 ");
  
  // Validation ultra simple : on vérifie la longueur de la chaîne brute
  const isFormValid = phone.length === 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    setTimeout(() => router.push("/pay/pending"), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex justify-center py-6 px-4 md:py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secky-blue-600/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secky-cyan-400/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="w-full max-w-[440px] relative z-10">
        
        <div className="bg-white rounded-[28px] p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white mb-6 relative overflow-hidden">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-sm border border-neutral-100">
            <img src="/icon.png" alt="Logo" className="w-10 h-10" />
          </div>
          <h1 className="text-lg font-extrabold text-secky-blue-900">{merchantName}</h1>
          <div className="flex items-center justify-center gap-1 mt-1">
            <CheckCircle2 size={12} className="text-status-success" />
            <p className="text-[11px] font-bold text-status-success uppercase tracking-wider">Marchand Vérifié</p>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-secky-blue-600 via-secky-blue-500 to-secky-cyan-400"></div>
          <p className="text-sm font-semibold text-neutral-500 mb-1">Montant à payer</p>
          <div className="flex items-baseline justify-center gap-1.5 mb-2">
            <h2 className="text-[42px] font-extrabold text-secky-blue-900 tracking-tight leading-none">{amount}</h2>
            <span className="text-lg font-bold text-neutral-400">FCFA</span>
          </div>
          <p className="text-sm font-semibold text-secky-blue-900 bg-secky-blue-50 inline-block px-3 py-1 rounded-full">{subject}</p>
          {ref && <p className="text-xs text-neutral-400 font-medium mt-2">Réf: {ref}</p>}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          
          <div className="mb-6">
            <label className="block text-sm font-bold text-secky-blue-900 mb-2">Numéro de téléphone</label>
            <div className="relative flex items-center bg-neutral-50 rounded-2xl border border-neutral-200 focus-within:border-secky-blue-600 focus-within:ring-4 focus-within:ring-secky-blue-600/10 transition-all">
              <div className="absolute left-4 flex items-center gap-2 border-r border-neutral-200 pr-3 h-8">
                <span className="font-bold text-secky-blue-900 text-sm">+226</span>
              </div>
              <input 
                type="tel" 
                inputMode="tel"
                className="w-full h-14 pl-24 pr-4 bg-transparent text-lg font-bold tracking-widest focus:outline-none text-secky-blue-900 placeholder-neutral-300" 
                placeholder="70 00 00 00" 
                value={displayPhone}
                onChange={handlePhoneChange}
                required 
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-secky-blue-900 mb-2">Moyen de paiement</label>
            <div className="space-y-3">
              
              <button type="button" onClick={() => setOperator("orange")} className={`w-full h-16 px-4 rounded-2xl border-2 flex items-center justify-between transition-all ${operator === "orange" ? "border-[#FF7900] bg-[#FF7900]/5 shadow-sm" : "border-neutral-100 bg-white hover:border-neutral-200"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7900] flex items-center justify-center text-white font-extrabold text-xs shadow-sm">OM</div>
                  <span className="font-bold text-secky-blue-900 text-sm">Orange Money</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${operator === "orange" ? "border-[#FF7900]" : "border-neutral-300"}`}>
                  {operator === "orange" && <div className="w-2.5 h-2.5 rounded-full bg-[#FF7900]"></div>}
                </div>
              </button>

              <button type="button" onClick={() => setOperator("moov")} className={`w-full h-16 px-4 rounded-2xl border-2 flex items-center justify-between transition-all ${operator === "moov" ? "border-[#0066B3] bg-[#0066B3]/5 shadow-sm" : "border-neutral-100 bg-white hover:border-neutral-200"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0066B3] flex items-center justify-center text-white font-extrabold text-xs shadow-sm">MM</div>
                  <span className="font-bold text-secky-blue-900 text-sm">Moov Money</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${operator === "moov" ? "border-[#0066B3]" : "border-neutral-300"}`}>
                  {operator === "moov" && <div className="w-2.5 h-2.5 rounded-full bg-[#0066B3]"></div>}
                </div>
              </button>

              <button type="button" onClick={() => setOperator("wave")} className={`w-full h-16 px-4 rounded-2xl border-2 flex items-center justify-between transition-all ${operator === "wave" ? "border-[#1DC3F3] bg-[#1DC3F3]/5 shadow-sm" : "border-neutral-100 bg-white hover:border-neutral-200"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1DC3F3] flex items-center justify-center text-white font-extrabold text-xl shadow-sm">~</div>
                  <span className="font-bold text-secky-blue-900 text-sm">Wave</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${operator === "wave" ? "border-[#1DC3F3]" : "border-neutral-300"}`}>
                  {operator === "wave" && <div className="w-2.5 h-2.5 rounded-full bg-[#1DC3F3]"></div>}
                </div>
              </button>

            </div>
          </div>

          <button 
            type="submit" 
            className={`w-full h-14 font-bold rounded-2xl flex items-center justify-center transition-all ${
              isFormValid 
                ? "bg-secky-blue-600 text-white shadow-[0_8px_20px_-6px_rgba(16,91,174,0.5)] hover:bg-secky-blue-800 active:scale-95" 
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Initialisation..." : `Payer ${amount} FCFA`}
            {!isLoading && <ChevronRight size={20} className="ml-2" />}
          </button>

          <div className="mt-6 flex items-start gap-2 text-[11px] font-medium text-neutral-500 leading-relaxed bg-neutral-50 p-3 rounded-xl">
            <ShieldCheck size={16} className="text-status-success shrink-0" />
            <p>Le résultat est confirmé uniquement après validation de l'opérateur. Aucun montant n'est débité sans votre confirmation.</p>
          </div>
        </form>

        <div className="mt-8 text-center flex items-center justify-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
          <Lock size={12} />
          Paiement sécurisé · Propulsé par <span className="text-secky-blue-600">SeckyPay</span>
        </div>
      </div>
    </div>
  );
}
