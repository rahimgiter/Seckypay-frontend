"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2, MessageCircle, Smartphone } from "lucide-react";

export default function Verify() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [channel, setChannel] = useState("whatsapp");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus sur le premier champ au chargement
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Gérer le collage (paste)
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      const newCode = [...code];
      pastedCode.forEach((digit, i) => {
        if (index + i < 6) newCode[index + i] = digit;
      });
      setCode(newCode);
      
      // Focus sur le dernier champ rempli ou le bouton
      const lastFilledIndex = Math.min(index + pastedCode.length, 5);
      inputRefs.current[lastFilledIndex]?.focus();
      
      if (newCode.every(d => d !== "")) {
        handleSubmit();
      }
      return;
    }

    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every(digit => digit !== "")) {
      handleSubmit();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/account-pending");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center py-8 px-4 md:py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secky-blue-600/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      
      <div className="w-full max-w-[440px] relative z-10">
        
        <Link href="/signup" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-secky-blue-600 mb-8 transition-colors">
          <ArrowLeft size={18} /> Retour
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secky-blue-50 rounded-[28px] mb-6 shadow-sm border border-secky-blue-100">
            <ShieldCheck size={36} className="text-secky-blue-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-secky-blue-900 mb-2">Vérifions votre identité</h2>
          <p className="text-sm font-medium text-neutral-500 leading-relaxed">
            Nous avons envoyé un code à 6 chiffres au <br />
            <strong className="text-secky-blue-900">+226 70 • • • • 12</strong>
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          
          {/* Champs OTP */}
          <div className="flex justify-between gap-2 md:gap-3 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                disabled={isLoading}
                className="w-full aspect-square text-center text-2xl md:text-3xl font-extrabold bg-neutral-50 border-2 border-neutral-200 rounded-2xl text-secky-blue-900 focus:outline-none focus:border-secky-blue-600 focus:bg-white focus:ring-4 focus:ring-secky-blue-600/10 transition-all disabled:opacity-50"
              />
            ))}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-secky-blue-600 py-4">
              <CheckCircle2 size={18} className="animate-pulse" /> Vérification en cours...
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm text-neutral-500 font-medium">
                Vous n'avez rien reçu ? <button className="text-secky-blue-600 font-bold hover:underline">Renvoyer le code</button>
              </p>
              <p className="text-[10px] text-neutral-400 font-medium mt-1">Le code expire dans 10 minutes.</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-neutral-100">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3 text-center">Recevoir le code par</p>
            <div className="flex gap-3">
              <button onClick={() => setChannel("whatsapp")} className={`flex-1 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border-2 ${channel === "whatsapp" ? "border-[#25D366] bg-[#25D366]/5 text-[#1a9e4e]" : "border-neutral-200 text-neutral-500 hover:border-neutral-300"}`}>
                <MessageCircle size={18} /> WhatsApp
              </button>
              <button onClick={() => setChannel("sms")} className={`flex-1 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border-2 ${channel === "sms" ? "border-secky-blue-600 bg-secky-blue-50 text-secky-blue-600" : "border-neutral-200 text-neutral-500 hover:border-neutral-300"}`}>
                <Smartphone size={18} /> SMS
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}