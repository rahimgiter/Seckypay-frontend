"use client";
import { useState, Suspense } from "react";
import { ArrowLeft, Building2, CreditCard, Shield, CheckCircle2, AlertCircle, Lock, Key, Smartphone, X, Loader2, Copy, Bell, Moon, Send, Info, Users, TrendingUp, Palette, FileText } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

type Channel = "in_app" | "push" | "email" | "whatsapp";
type Category = "payments" | "finance" | "team" | "brand" | "system" | "security";

const categories: { id: Category; label: string; icon: any; locked?: boolean }[] = [
  { id: "payments", label: "Paiements", icon: CreditCard },
  { id: "finance", label: "Finances", icon: TrendingUp },
  { id: "team", label: "Équipe", icon: Users },
  { id: "brand", label: "Marque", icon: Palette },
  { id: "system", label: "Système", icon: Info },
  { id: "security", label: "Sécurité", icon: Shield, locked: true },
];

const channels: { id: Channel; label: string }[] = [
  { id: "in_app", label: "In-app" },
  { id: "push", label: "Push" },
  { id: "email", label: "Email" },
  { id: "whatsapp", label: "WhatsApp" },
];

function ParametresContent() {
  const [twoFA, setTwoFA] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [operators, setOperators] = useState([
    { name: "Orange Money", code: "orange", active: true },
    { name: "Moov Money", code: "moov", active: true },
    { name: "Wave", code: "wave", active: false },
  ]);

  // Préférences notifications : matrice
  const [prefs, setPrefs] = useState<Record<Category, Record<Channel, boolean>>>({
    payments: { in_app: true, push: true, email: false, whatsapp: true },
    finance: { in_app: true, push: true, email: true, whatsapp: false },
    team: { in_app: true, push: false, email: true, whatsapp: false },
    brand: { in_app: true, push: false, email: true, whatsapp: false },
    system: { in_app: true, push: false, email: false, whatsapp: false },
    security: { in_app: true, push: true, email: true, whatsapp: true },
  });

  // Heures calmes
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("06:00");

  const [dailyDigest, setDailyDigest] = useState(true);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const toggleOperator = (code: string) => {
    setOperators(operators.map(op => op.code === code ? { ...op, active: !op.active } : op));
  };

  const togglePref = (cat: Category, ch: Channel) => {
    if (cat === "security") return; // Sécurité verrouillée
    setPrefs({ ...prefs, [cat]: { ...prefs[cat], [ch]: !prefs[cat][ch] } });
  };

  const handleCopySecret = () => {
    navigator.clipboard.writeText("JBSWY3DPEHPK3PXP");
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleSendTest = () => {
    setIsSendingTest(true);
    setTimeout(() => {
      setIsSendingTest(false);
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex items-center gap-4 bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none">
          <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Paramètres</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Configurez votre entreprise et vos préférences.</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-3xl mx-auto w-full space-y-6">
          
          {/* Profil légal */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secky-blue-50 flex items-center justify-center text-secky-blue-600">
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-secky-blue-900">Profil légal</h3>
                <p className="text-xs text-neutral-500">Informations légales de l'entreprise.</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Nom commercial</label>
                  <input type="text" defaultValue="Secky Tech" className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 transition-all font-medium text-secky-blue-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">RCCM</label>
                  <input type="text" defaultValue="BF-BB-01-2026-B13-00460" className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 transition-all font-medium text-secky-blue-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">IFU</label>
                  <input type="text" defaultValue="00302321V" className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 transition-all font-medium text-secky-blue-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Ville</label>
                  <input type="text" defaultValue="Ouagadougou" className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 transition-all font-medium text-secky-blue-900" />
                </div>
              </div>
            </div>
          </div>

          {/* Moyens de paiement */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="font-bold text-secky-blue-900">Moyens de paiement</h3>
                <p className="text-xs text-neutral-500">Activez les opérateurs que vous acceptez.</p>
              </div>
            </div>
            <div className="divide-y divide-neutral-100">
              {operators.map((op) => (
                <div key={op.code} className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm ${op.code === "orange" ? "bg-[#FF7900]" : op.code === "moov" ? "bg-[#0066B3]" : "bg-[#1DC3F3]"}`}>
                      {op.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-secky-blue-900">{op.name}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${op.active ? "text-status-success" : "text-neutral-400"}`}>
                        {op.active ? "● Actif" : "○ Inactif"}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => toggleOperator(op.code)} className={`w-12 h-7 rounded-full transition-colors relative ${op.active ? "bg-secky-blue-600" : "bg-neutral-200"}`}>
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${op.active ? "left-6" : "left-1"}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Préférences de notifications */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="font-bold text-secky-blue-900">Notifications</h3>
                <p className="text-xs text-neutral-500">Choisissez ce que vous recevez et où.</p>
              </div>
            </div>
            <div className="p-5">
              {/* Matrice Catégories × Canaux */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-neutral-100">
                      <th className="pb-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Catégorie</th>
                      {channels.map(ch => (
                        <th key={ch.id} className="pb-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider text-center">{ch.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <tr key={cat.id} className="border-b border-neutral-50 last:border-0">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Icon size={14} className="text-neutral-400" />
                              <span className="text-sm font-bold text-secky-blue-900">{cat.label}</span>
                              {cat.locked && <Lock size={10} className="text-status-warning" />}
                            </div>
                          </td>
                          {channels.map(ch => {
                            const isOn = prefs[cat.id][ch.id];
                            return (
                              <td key={ch.id} className="py-3 text-center">
                                <button
                                  onClick={() => togglePref(cat.id, ch.id)}
                                  disabled={cat.locked}
                                  className={`w-10 h-6 rounded-full transition-colors relative ${isOn ? "bg-secky-blue-600" : "bg-neutral-200"} ${cat.locked ? "opacity-60 cursor-not-allowed" : ""}`}
                                >
                                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${isOn ? "left-[18px]" : "left-0.5"}`}></div>
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Note sécurité */}
              <div className="flex items-start gap-2 bg-orange-50 p-3 rounded-xl mt-4">
                <Lock size={14} className="text-status-warning shrink-0 mt-0.5" />
                <p className="text-[11px] font-medium text-orange-900">
                  Les notifications de <strong>sécurité</strong> sont obligatoires et ne peuvent pas être désactivées.
                </p>
              </div>

              {/* Heures calmes */}
              <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon size={16} className="text-purple-500" />
                    <div>
                      <p className="font-bold text-sm text-secky-blue-900">Heures calmes</p>
                      <p className="text-[11px] text-neutral-500">Pas de notifications la nuit</p>
                    </div>
                  </div>
                  <button onClick={() => setQuietHoursEnabled(!quietHoursEnabled)} className={`w-12 h-7 rounded-full transition-colors relative ${quietHoursEnabled ? "bg-secky-blue-600" : "bg-neutral-200"}`}>
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${quietHoursEnabled ? "left-6" : "left-1"}`}></div>
                  </button>
                </div>
                {quietHoursEnabled && (
                  <div className="grid grid-cols-2 gap-3 animate-fade-in-up">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Début</label>
                      <input type="time" value={quietStart} onChange={(e) => setQuietStart(e.target.value)} className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-secky-blue-900" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Fin</label>
                      <input type="time" value={quietEnd} onChange={(e) => setQuietEnd(e.target.value)} className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-secky-blue-900" />
                    </div>
                  </div>
                )}
              </div>

              {/* Résumé quotidien */}
              <div className="mt-6 pt-6 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-secky-blue-600" />
                    <div>
                      <p className="font-bold text-sm text-secky-blue-900">Résumé quotidien</p>
                      <p className="text-[11px] text-neutral-500">Recevoir un email récapitulatif chaque matin</p>
                    </div>
                  </div>
                  <button onClick={() => setDailyDigest(!dailyDigest)} className={`w-12 h-7 rounded-full transition-colors relative ${dailyDigest ? "bg-secky-blue-600" : "bg-neutral-200"}`}>
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${dailyDigest ? "left-6" : "left-1"}`}></div>
                  </button>
                </div>
              </div>

              {/* Bouton test */}
              <button 
                onClick={handleSendTest}
                disabled={isSendingTest}
                className={`w-full h-11 mt-4 rounded-xl font-bold text-sm flex items-center justify-center transition-all ${testSent ? "bg-green-50 text-status-success" : "bg-neutral-50 text-secky-blue-900 hover:bg-neutral-100"}`}
              >
                {isSendingTest ? <><Loader2 size={16} className="mr-2 animate-spin" /> Envoi...</> : testSent ? <><CheckCircle2 size={16} className="mr-2" /> Notification de test envoyée !</> : <><Send size={16} className="mr-2" /> Envoyer une notification test</>}
              </button>
            </div>
          </div>

          {/* Sécurité 2FA */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="font-bold text-secky-blue-900">Sécurité</h3>
                <p className="text-xs text-neutral-500">Protégez votre compte contre les accès non autorisés.</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${twoFA ? "bg-green-100 text-status-success" : "bg-neutral-200 text-neutral-500"}`}>
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-secky-blue-900">Google Authenticator</p>
                    <p className="text-xs text-neutral-500">{twoFA ? "Activé · Votre compte est protégé" : "Non configuré · Recommandé"}</p>
                  </div>
                </div>
                <button
                  onClick={() => { if (twoFA) setTwoFA(false); else setShow2FASetup(true); }}
                  className={`h-10 px-4 rounded-xl text-xs font-bold transition-colors ${twoFA ? "bg-red-50 text-status-error hover:bg-red-100" : "bg-secky-blue-600 text-white hover:bg-secky-blue-800"}`}
                >
                  {twoFA ? "Désactiver" : "Configurer"}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-200 text-neutral-500 flex items-center justify-center"><Key size={18} /></div>
                  <div>
                    <p className="font-bold text-sm text-secky-blue-900">Mot de passe</p>
                    <p className="text-xs text-neutral-500">Dernière modification : il y a 30 jours</p>
                  </div>
                </div>
                <button className="h-10 px-4 rounded-xl text-xs font-bold bg-white border border-neutral-200 text-secky-blue-900 hover:bg-neutral-100">Modifier</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-200 text-neutral-500 flex items-center justify-center"><Lock size={18} /></div>
                  <div>
                    <p className="font-bold text-sm text-secky-blue-900">Sessions actives</p>
                    <p className="text-xs text-neutral-500">1 appareil connecté</p>
                  </div>
                </div>
                <button className="h-10 px-4 rounded-xl text-xs font-bold bg-white border border-neutral-200 text-secky-blue-900 hover:bg-neutral-100">Voir</button>
              </div>

              <div className="flex items-center gap-2 bg-secky-blue-50 p-3 rounded-xl">
                <AlertCircle size={16} className="text-secky-blue-600 shrink-0" />
                <p className="text-xs font-medium text-secky-blue-900">Devise : XOF · Fuseau : Ouagadougou (UTC+0).</p>
              </div>
            </div>
          </div>

          <button className="w-full h-14 bg-secky-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 transition-all active:scale-95">
            Enregistrer les modifications
          </button>

        </div>
      </main>

      <BottomNav />

      {/* Modal 2FA Setup */}
      {show2FASetup && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShow2FASetup(false)}>
          <div className="bg-white w-full md:w-[480px] rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6 md:hidden"></div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center"><Shield size={24} className="text-purple-600" /></div>
                <div>
                  <h3 className="text-lg font-extrabold text-secky-blue-900">Google Authenticator</h3>
                  <p className="text-xs text-neutral-500 font-medium">Sécurisez votre compte avec la 2FA</p>
                </div>
              </div>
              <button onClick={() => setShow2FASetup(false)} className="text-neutral-400 hover:bg-neutral-100 p-2 rounded-full"><X size={20} /></button>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-secky-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</div>
                <div>
                  <p className="text-sm font-bold text-secky-blue-900 mb-1">Téléchargez Google Authenticator</p>
                  <p className="text-xs text-neutral-500">Disponible sur iOS (App Store) et Android (Play Store).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-secky-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-secky-blue-900 mb-3">Scannez ce QR code</p>
                  <div className="bg-white p-4 rounded-2xl border-2 border-neutral-200 w-fit mx-auto">
                    <div className="w-40 h-40 bg-neutral-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-2 bg-white rounded-lg flex items-center justify-center">
                        <div className="w-full h-full grid grid-cols-8 gap-0.5 p-2">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div key={i} className={`rounded-sm ${[0,1,2,3,4,5,6,7,8,15,16,23,24,31,32,39,40,47,48,55,56,57,58,59,60,61,62,63,10,11,12,20,21,28,29,35,36,43,44,52,53].includes(i) ? "bg-neutral-900" : "bg-white"}`}></div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg"><Lock size={20} className="text-secky-blue-600" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Ou copiez la clé manuelle</p>
                    <button onClick={handleCopySecret} className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg font-mono text-xs font-bold text-secky-blue-900 hover:bg-neutral-100 transition-colors">
                      JBSW Y3DP EHPK 3PXP
                      {copiedSecret ? <CheckCircle2 size={12} className="text-status-success" /> : <Copy size={12} className="text-neutral-400" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-secky-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-secky-blue-900 mb-2">Saisissez le code à 6 chiffres</p>
                  <input type="text" inputMode="numeric" maxLength={6} placeholder="000000" className="w-full h-14 px-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-2xl font-extrabold text-center tracking-widest text-secky-blue-900 focus:outline-none focus:border-secky-blue-600 focus:bg-white" />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setShow2FASetup(false)} className="flex-1 h-12 bg-neutral-100 text-neutral-600 font-bold rounded-xl hover:bg-neutral-200 transition-colors">Annuler</button>
                <button onClick={() => { setTwoFA(true); setShow2FASetup(false); }} className="flex-1 h-12 bg-secky-blue-600 text-white font-bold rounded-xl shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 transition-colors">Activer la 2FA</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Parametres() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <ParametresContent />
    </Suspense>
  );
}