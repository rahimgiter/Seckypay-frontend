"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, User, Building2, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", password: "",
    companyName: "", sector: "", city: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verify");
  };

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
            Rejoignez la révolution du paiement.
          </h1>
          <p className="text-white/60 text-lg mb-8">
            Créez votre compte en moins de 2 minutes et commencez à encaisser dès aujourd'hui.
          </p>
          <div className="space-y-3">
            {[
              "Sans engagement",
              "Compatible Orange, Moov & Wave",
              "Comptabilité SYSCOHADA intégrée"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/80">
                <CheckCircle2 size={18} className="text-secky-cyan-400 shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-white/40 text-sm">
          <span>© 2026 Secky Tech SARL</span>
        </div>
      </div>

      {/* Form (Mobile & Desktop) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/"><img src="/logo.png" alt="SeckyPay" className="h-10 w-auto" /></Link>
          </div>

          {/* Indicateur d'étapes */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-secky-blue-900 uppercase tracking-wider">Étape {step} sur 2</p>
              <p className="text-xs font-bold text-neutral-400">{step === 1 ? "Vos informations" : "Votre entreprise"}</p>
            </div>
            <div className="flex gap-2">
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-secky-blue-600" : "bg-neutral-200"}`}></div>
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-secky-blue-600" : "bg-neutral-200"}`}></div>
            </div>
          </div>

          <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            
            {step === 1 && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-secky-blue-50 rounded-xl flex items-center justify-center text-secky-blue-600 mb-4">
                    <User size={24} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-secky-blue-900">Créons votre compte</h2>
                  <p className="text-sm text-neutral-500 font-medium mt-1">Ces informations restent confidentielles.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-secky-blue-900 mb-2">Nom complet</label>
                  <input type="text" name="fullName" onChange={handleChange} required className="w-full h-12 px-4 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:ring-4 focus:ring-secky-blue-600/10 transition-all font-medium text-secky-blue-900" placeholder="Ex: Kofi Bakayoko" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-secky-blue-900 mb-2">Email professionnel</label>
                  <input type="email" name="email" onChange={handleChange} required className="w-full h-12 px-4 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:ring-4 focus:ring-secky-blue-600/10 transition-all font-medium text-secky-blue-900" placeholder="nom@entreprise.com" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-secky-blue-900 mb-2">Téléphone</label>
                  <div className="flex items-center bg-white border border-neutral-200 rounded-xl focus-within:border-secky-blue-600 focus-within:ring-4 focus-within:ring-secky-blue-600/10 transition-all overflow-hidden">
                    <div className="px-4 border-r border-neutral-200 flex items-center gap-1 h-12 bg-neutral-50">
                      <span className="text-base">🇧🇫</span>
                      <span className="text-sm font-bold text-secky-blue-900">+226</span>
                    </div>
                    <input type="tel" name="phone" onChange={handleChange} required className="flex-1 h-12 px-4 bg-transparent text-sm focus:outline-none font-medium text-secky-blue-900" placeholder="70 00 00 00" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-secky-blue-900 mb-2">Mot de passe</label>
                  <input type="password" name="password" onChange={handleChange} required minLength={10} className="w-full h-12 px-4 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:ring-4 focus:ring-secky-blue-600/10 transition-all font-medium text-secky-blue-900" placeholder="Minimum 10 caractères" />
                  <p className="text-[11px] text-neutral-400 font-medium mt-1.5">Utilisez au moins 10 caractères avec des chiffres.</p>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-secky-blue-600 focus:ring-secky-blue-500" />
                  <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                    J'accepte les <Link href="/legal/terms" className="text-secky-blue-600 font-bold hover:underline">conditions d'utilisation</Link> et la <Link href="/legal/privacy" className="text-secky-blue-600 font-bold hover:underline">politique de confidentialité</Link>.
                  </p>
                </div>

                <button type="submit" className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 mt-4">
                  Continuer <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-secky-blue-50 rounded-xl flex items-center justify-center text-secky-blue-600 mb-4">
                    <Building2 size={24} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-secky-blue-900">Parlez-nous de votre entreprise</h2>
                  <p className="text-sm text-neutral-500 font-medium mt-1">Ces informations apparaîtront sur vos reçus.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-secky-blue-900 mb-2">Nom commercial</label>
                  <input type="text" name="companyName" onChange={handleChange} required className="w-full h-12 px-4 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:ring-4 focus:ring-secky-blue-600/10 transition-all font-medium text-secky-blue-900" placeholder="Ex: École Les Lauriers" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-secky-blue-900 mb-2">Secteur d'activité</label>
                  <select name="sector" onChange={handleChange} required className="w-full h-12 px-4 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:ring-4 focus:ring-secky-blue-600/10 transition-all font-medium text-secky-blue-900 appearance-none">
                    <option value="">Sélectionnez un secteur</option>
                    <option value="commerce">Commerce</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="ecole">École / Formation</option>
                    <option value="services">Services</option>
                    <option value="startup">Startup</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-secky-blue-900 mb-2">Ville</label>
                  <input type="text" name="city" onChange={handleChange} required className="w-full h-12 px-4 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:ring-4 focus:ring-secky-blue-600/10 transition-all font-medium text-secky-blue-900" placeholder="Ex: Ouagadougou" />
                </div>

                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 mt-2">
                  <p className="text-xs font-medium text-neutral-500 leading-relaxed">
                    <strong className="text-secky-blue-900">Info :</strong> Les documents légaux (RCCM, IFU) seront demandés plus tard pour valider votre compte.
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={handleBack} className="w-14 h-14 bg-white border border-neutral-200 text-secky-blue-900 rounded-2xl flex items-center justify-center hover:bg-neutral-50 transition-colors shrink-0">
                    <ArrowLeft size={20} />
                  </button>
                  <button type="submit" className="flex-1 h-14 bg-secky-blue-600 text-white font-bold rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800">
                    Créer mon compte <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="text-center text-xs text-neutral-400 font-medium mt-6">
            Déjà un compte ? <Link href="/login" className="text-secky-blue-600 font-bold hover:underline">Se connecter</Link>
          </p>

        </div>
      </div>
    </div>
  );
}