"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2, MessageCircle, Smartphone, Mail, ChevronRight } from "lucide-react";

function VerifyContent() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [channel, setChannel] = useState("whatsapp");
  const [showChannelSelector, setShowChannelSelector] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      const newCode = [...code];
      pastedCode.forEach((digit, i) => {
        if (index + i < 6) newCode[index + i] = digit;
      });
      setCode(newCode);
      const lastFilledIndex = Math.min(index + pastedCode.length, 5);
      inputRefs.current[lastFilledIndex]?.focus();
      if (newCode.every(d => d !== "")) handleSubmit();
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

  const getChannelIcon = (ch: string) => {
    if (ch === "whatsapp") return MessageCircle;
    if (ch === "sms") return Smartphone;
    return Mail;
  };

  const ChannelIcon = getChannelIcon(channel);

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
            Nous avons envoyé un code à 6 chiffres via{" "}
            <span className="font-bold text-secky-blue-900">
              {channel === "whatsapp" ? "WhatsApp" : channel === "sms" ? "SMS" : "Email"}
            </span>{" "}
            au <br />
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

          {/* Choix du canal */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3 text-center">Changer de canal</p>
            
            {!showChannelSelector ? (
              <button 
                onClick={() => setShowChannelSelector(true)}
                className="w-full h-12 rounded-xl text-sm font-bold flex items-center justify-between px-4 bg-neutral-50 border-2 border-neutral-200 hover:border-secky-blue-300 transition-all"
              >
                <div className="flex items-center gap-2">
                  <ChannelIcon size={18} className="text-secky-blue-600" />
                  <span className="text-secky-blue-900">
                    {channel === "whatsapp" ? "WhatsApp" : channel === "sms" ? "SMS" : "Email"}
                  </span>
                </div>
                <ChevronRight size={18} className="text-neutral-400" />
              </button>
            ) : (
              <div className="space-y-2">
                {[
                  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, desc: "Le plus rapide" },
                  { id: "sms", label: "SMS", icon: Smartphone, desc: "Classique" },
                  { id: "email", label: "Email", icon: Mail, desc: "Boîte mail" },
                ].map((ch) => {
                  const Icon = ch.icon;
                  const isSelected = channel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => { setChannel(ch.id); setShowChannelSelector(false); }}
                      className={`w-full h-14 rounded-xl text-sm font-bold flex items-center justify-between px-4 transition-all border-2 ${
                        isSelected 
                          ? "bg-secky-blue-50 border-secky-blue-600" 
                          : "bg-neutral-50 border-neutral-200 hover:border-secky-blue-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? "bg-secky-blue-600 text-white" : "bg-white text-neutral-500"}`}>
                          <Icon size={18} />
                        </div>
                        <div className="text-left">
                          <p className="text-secky-blue-900">{ch.label}</p>
                          <p className="text-[10px] text-neutral-500 font-medium">{ch.desc}</p>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 size={20} className="text-secky-blue-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function Verify() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-secky-blue-600 border-t-transparent rounded-full"></div></div>}>
      <VerifyContent />
    </Suspense>
  );
}