"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Zap, BarChart3, Users, CheckCircle2, Menu, X, Lock, Smartphone, ChevronDown, Star, Coins, TrendingUp, CreditCard, Home, Receipt, Plus, PieChart, User, Globe, Link2, RefreshCw, Building2, Wallet, Send } from "lucide-react";
import { OrangeMoneyLogo, MoovMoneyLogo, WaveLogo } from "@/components/landing/OperatorLogos";
import { AnimatedCounter } from "@/components/landing/AnimatedCounter";
import { CountryPoll } from "@/components/landing/CountryPoll";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const menuItems = [
    { href: "#features", label: "Fonctionnalités", num: "01" },
    { href: "#how-it-works", label: "Comment ça marche", num: "02" },
    { href: "#pricing", label: "Tarifs", num: "03" },
    { href: "#poll", label: "Sondage", num: "04" },
    { href: "#faq", label: "FAQ", num: "05" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-secky-blue-900 overflow-x-hidden selection:bg-secky-blue-600 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-5 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-[60]">
            <img src="/logo.png" alt="SeckyPay" className="h-7 md:h-9 w-auto object-contain" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-500">
            <Link href="#features" className="hover:text-secky-blue-600 transition-colors">Fonctionnalités</Link>
            <Link href="#how-it-works" className="hover:text-secky-blue-600 transition-colors">Comment ça marche</Link>
            <Link href="#pricing" className="hover:text-secky-blue-600 transition-colors">Tarifs</Link>
            <Link href="#poll" className="hover:text-secky-blue-600 transition-colors">Sondage</Link>
            <Link href="#faq" className="hover:text-secky-blue-600 transition-colors">FAQ</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-bold text-secky-blue-900 hover:text-secky-blue-600 transition-colors px-4 py-2">
              Connexion
            </Link>
            <Link href="/signup" className="bg-secky-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-secky-blue-800 transition-all shadow-lg shadow-secky-blue-600/20 active:scale-95">
              Ouvrir un compte
            </Link>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden z-[60] w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 rounded-full text-secky-blue-900 shadow-sm"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile - Light */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#F8FAFC] z-[105] flex flex-col animate-fade-in">
          <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-200 bg-white shadow-sm">
            <img src="/logo.png" alt="SeckyPay" className="h-8 w-auto object-contain" />
            <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center bg-neutral-100 border border-neutral-200 rounded-full text-secky-blue-900">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="flex flex-col gap-4">
              {menuItems.map((link, index) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="group flex items-center gap-4 bg-white border border-neutral-200 rounded-2xl p-5 hover:border-secky-blue-300 hover:shadow-md transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <span className="text-xs font-bold text-secky-blue-600 bg-secky-blue-50 px-2 py-1 rounded-md">{link.num}</span>
                  <span className="text-lg font-bold text-secky-blue-900">{link.label}</span>
                  <ArrowRight size={18} className="ml-auto text-neutral-400 group-hover:text-secky-blue-600 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
          <div className="px-6 py-6 border-t border-neutral-200 bg-white flex flex-col gap-3">
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full h-14 flex items-center justify-center text-secky-blue-900 font-bold rounded-full border border-neutral-200">Connexion</Link>
            <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="w-full h-14 flex items-center justify-center bg-secky-blue-600 text-white font-bold rounded-full shadow-lg">Ouvrir un compte</Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-secky-blue-600/10 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left z-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm text-secky-blue-900 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6 md:mb-8">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
              Tous vos encaissements en un seul point
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1] md:leading-[1.05] mb-5 md:mb-6">
              Encaissez plus vite, <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-secky-blue-600 to-secky-cyan-400 bg-clip-text text-transparent">centralisez tout.</span>
            </h1>
            
            <p className="text-base md:text-xl text-neutral-500 mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              La plateforme tout-en-un pour gérer vos boutiques, suivre vos paiements Orange, Moov et Wave, et rapprocher vos comptes en un clic.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
              <Link href="/signup" className="w-full sm:w-auto h-14 px-8 bg-secky-blue-600 text-white font-bold rounded-full flex items-center justify-center hover:bg-secky-blue-800 transition-all shadow-[0_8px_20px_-6px_rgba(16,91,174,0.5)] active:scale-95">
                Commencer gratuitement <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link href="#how-it-works" className="w-full sm:w-auto h-14 px-8 bg-white text-secky-blue-900 border border-neutral-200 font-bold rounded-full flex items-center justify-center hover:bg-neutral-50 transition-all active:scale-95">
                Voir la démo
              </Link>
            </div>

            <div className="mt-8 md:mt-10 flex items-center justify-center lg:justify-start gap-6 md:gap-8 text-xs md:text-sm font-semibold text-neutral-400">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-status-success" /> Sans engagement</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-status-success" /> Prêt en 2 minutes</div>
            </div>
          </div>

          {/* Hero : Ordinateur + Smartphone */}
          <div className="relative z-10 mt-8 lg:mt-0">
            <div className="relative">
              {/* Lueur de fond */}
              <div className="absolute inset-0 bg-gradient-to-tr from-secky-blue-600 to-secky-cyan-400 rounded-[40px] blur-3xl opacity-20 transform rotate-3 scale-95"></div>

              {/* Ordinateur (Desktop) */}
              <div className="relative bg-white rounded-[16px] border-[6px] border-neutral-900 shadow-2xl overflow-hidden mx-auto w-full max-w-[500px]">
                {/* Barre de fenêtre */}
                <div className="bg-neutral-100 px-4 py-2 flex items-center gap-2 border-b border-neutral-200">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-md h-5 flex items-center px-2">
                    <Lock size={10} className="text-neutral-400 mr-1" />
                    <span className="text-[9px] text-neutral-500">app.seckypay.com</span>
                  </div>
                </div>

                {/* Contenu du dashboard desktop */}
                <div className="bg-[#F8FAFC] p-4">
                  {/* Header app */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-[10px] text-neutral-500">Tableau de bord</p>
                      <p className="text-sm font-extrabold text-secky-blue-900">Vue d'ensemble</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-secky-blue-600 flex items-center justify-center text-white text-[10px] font-bold">S</div>
                  </div>

                  {/* KPI Cards dynamiques */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-white rounded-lg p-2 border border-neutral-200">
                      <p className="text-[7px] font-bold text-neutral-400 uppercase">Entrées</p>
                      <p className="text-xs font-extrabold text-status-success animate-pulse">+125K</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-neutral-200">
                      <p className="text-[7px] font-bold text-neutral-400 uppercase">Sorties</p>
                      <p className="text-xs font-extrabold text-status-error">-45K</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-neutral-200">
                      <p className="text-[7px] font-bold text-neutral-400 uppercase">Net</p>
                      <p className="text-xs font-extrabold text-secky-blue-600">+80K</p>
                    </div>
                  </div>

                  {/* Graphique animé */}
                  <div className="bg-white rounded-lg p-3 mb-3 border border-neutral-200">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[9px] font-bold text-secky-blue-900">Activité (7 jours)</p>
                      <span className="text-[8px] font-bold text-status-success">+32%</span>
                    </div>
                    <svg viewBox="0 0 200 50" className="w-full h-12">
                      {/* Grille */}
                      <line x1="0" y1="10" x2="200" y2="10" stroke="#F1F5F9" strokeWidth="0.5" />
                      <line x1="0" y1="25" x2="200" y2="25" stroke="#F1F5F9" strokeWidth="0.5" />
                      <line x1="0" y1="40" x2="200" y2="40" stroke="#F1F5F9" strokeWidth="0.5" />
                      {/* Ligne animée */}
                      <path 
                        d="M 0 40 L 30 35 L 60 38 L 90 20 L 120 25 L 150 12 L 180 15 L 200 8" 
                        fill="none" 
                        stroke="url(#gradient)" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                        strokeDasharray="400"
                        strokeDashoffset="0"
                        style={{ animation: "drawLine 3s ease-out infinite alternate" }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#105BAE" />
                          <stop offset="100%" stopColor="#3AACE8" />
                        </linearGradient>
                      </defs>
                      {/* Points animés */}
                      <circle cx="30" cy="35" r="2" fill="#105BAE" className="animate-pulse" />
                      <circle cx="90" cy="20" r="2" fill="#105BAE" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
                      <circle cx="150" cy="12" r="2" fill="#105BAE" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
                      <circle cx="200" cy="8" r="2" fill="#3AACE8" className="animate-pulse" style={{ animationDelay: "0.9s" }} />
                    </svg>
                  </div>

                  {/* Transactions récentes */}
                  <div className="space-y-1.5">
                    {[
                      { name: "Cantine", amount: "+25 000", color: "bg-green-50 text-status-success" },
                      { name: "Salaire", amount: "-50 000", color: "bg-red-50 text-status-error" },
                    ].map((tx, i) => (
                      <div key={i} className="bg-white rounded-lg p-2 flex items-center justify-between border border-neutral-200">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full ${tx.color} flex items-center justify-center text-[8px]`}>
                            {tx.amount.startsWith("+") ? "↓" : "↑"}
                          </div>
                          <p className="text-[9px] font-bold text-secky-blue-900">{tx.name}</p>
                        </div>
                        <p className={`text-[9px] font-extrabold ${tx.amount.startsWith("+") ? "text-status-success" : "text-status-error"}`}>{tx.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Smartphone (Mobile) - positionné à droite, chevauchant */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 w-32 md:w-40 bg-neutral-900 rounded-[24px] p-1 shadow-2xl border-4 border-neutral-900">
                <div className="bg-[#F8FAFC] rounded-[20px] overflow-hidden h-[240px] md:h-[300px]">
                  {/* Notch */}
                  <div className="bg-neutral-900 h-4 flex justify-center items-center">
                    <div className="w-12 h-1.5 bg-neutral-900 rounded-full"></div>
                  </div>
                  
                  {/* Contenu mobile */}
                  <div className="p-3">
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-secky-blue-600 flex items-center justify-center text-white text-[8px] font-bold">C</div>
                      <div>
                        <p className="text-[6px] text-neutral-500">Bonjour</p>
                        <p className="text-[8px] font-extrabold text-secky-blue-900">Client**</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-secky-blue-600 to-secky-blue-800 rounded-xl p-2 text-white mb-2">
                      <p className="text-[6px] text-white/70">Chiffre d'affaires</p>
                      <p className="text-[12px] font-extrabold">125 000</p>
                      <p className="text-[6px] text-white/70">FCFA</p>
                    </div>

                    <div className="grid grid-cols-2 gap-1 mb-2">
                      <div className="bg-white rounded-md p-1.5 border border-neutral-200">
                        <p className="text-[5px] text-neutral-500">Trans.</p>
                        <p className="text-[9px] font-bold text-secky-blue-900">12</p>
                      </div>
                      <div className="bg-white rounded-md p-1.5 border border-neutral-200">
                        <p className="text-[5px] text-neutral-500">Taux</p>
                        <p className="text-[9px] font-bold text-status-success">92%</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="bg-white rounded-md p-1.5 flex justify-between items-center border border-neutral-200">
                        <p className="text-[6px] font-bold text-secky-blue-900">Cantine</p>
                        <p className="text-[6px] font-extrabold text-status-success">+25K</p>
                      </div>
                      <div className="bg-white rounded-md p-1.5 flex justify-between items-center border border-neutral-200">
                        <p className="text-[6px] font-bold text-secky-blue-900">Frais</p>
                        <p className="text-[6px] font-extrabold text-status-error">-50K</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compteur d'utilisateurs */}
      <section className="py-12 md:py-16 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <AnimatedCounter end={1200} suffix="+" className="text-4xl md:text-5xl font-extrabold text-secky-blue-900" />
              <p className="text-sm text-neutral-500 font-medium mt-2">Commerçants utilisent SeckyPay</p>
            </div>
            <div>
              <AnimatedCounter end={98} suffix="%" className="text-4xl md:text-5xl font-extrabold text-status-success" />
              <p className="text-sm text-neutral-500 font-medium mt-2">Taux de satisfaction</p>
            </div>
            <div>
              <AnimatedCounter end={850} suffix="M+" className="text-4xl md:text-5xl font-extrabold text-secky-blue-900" />
              <p className="text-sm text-neutral-500 font-medium mt-2">FCFA traités par mois</p>
            </div>
          </div>
        </div>
      </section>

      {/* Opérateurs avec logos */}
      <section id="operators" className="py-10 md:py-14 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 text-center">
          <p className="text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8">
            Intégré avec les leaders du marché
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80 hover:opacity-100 transition-all duration-500">
            <OrangeMoneyLogo className="h-10 md:h-12" />
            <MoovMoneyLogo className="h-10 md:h-12" />
            <WaveLogo className="h-10 md:h-12" />
          </div>
        </div>
      </section>

      {/* Fonctionnalités clés */}
      <section id="features" className="py-20 md:py-24 px-5 md:px-6 relative bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Tout ce qu'il faut pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-secky-blue-600 to-secky-cyan-400">piloter vos boutiques</span>
            </h2>
            <p className="text-base md:text-lg text-neutral-500 font-medium">
              Une plateforme unique pour encaisser, envoyer, suivre, rapprocher et clôturer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Fonctionnalité 1 : Lien de paiement */}
            <div className="bg-white p-6 rounded-[24px] border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-secky-blue-50 rounded-2xl flex items-center justify-center mb-5">
                <Link2 size={28} className="text-secky-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Lien de paiement instantané</h3>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                Créez un lien en 3 clics et partagez-le par WhatsApp, SMS ou QR Code. Vos clients paient en 30 secondes.
              </p>
            </div>

            {/* Fonctionnalité 2 : Rapprochement */}
            <div className="bg-white p-6 rounded-[24px] border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-5">
                <RefreshCw size={28} className="text-status-success" />
              </div>
              <h3 className="text-lg font-bold mb-2">Rapprochement automatique</h3>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                Comparez vos paiements aux relevés Orange, Moov et Wave. Détectez les écarts en un clic.
              </p>
            </div>

            {/* Fonctionnalité 3 : Centralisation */}
            <div className="bg-white p-6 rounded-[24px] border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-5">
                <Building2 size={28} className="text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Centralisation multi-boutiques</h3>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                Gérez plusieurs boutiques et plusieurs comptes mobile money depuis un seul tableau de bord.
              </p>
            </div>

            {/* Fonctionnalité 4 : Sécurité */}
            <div className="bg-white p-6 rounded-[24px] border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
                <ShieldCheck size={28} className="text-status-error" />
              </div>
              <h3 className="text-lg font-bold mb-2">Sécurité de niveau bancaire</h3>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                2FA, OTP WhatsApp, chiffrement de bout en bout. Vos données et celles de vos clients sont protégées.
              </p>
            </div>

            {/* Fonctionnalité 5 : Envoi d'argent */}
            <div className="bg-white p-6 rounded-[24px] border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-5">
                <Send size={28} className="text-orange-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Envoyez de l'argent</h3>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                Payez vos fournisseurs et salaires en quelques secondes, avec les frais affichés avant validation.
              </p>
            </div>

            {/* Fonctionnalité 6 : Clôture & Rapports */}
            <div className="bg-white p-6 rounded-[24px] border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-5">
                <BarChart3 size={28} className="text-secky-cyan-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Clôture & rapports</h3>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                Clôturez votre caisse chaque soir et téléchargez vos rapports PDF, Excel ou CSV compatibles SYSCOHADA.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="how-it-works" className="py-20 md:py-32 px-5 md:px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Encaissez en 3 étapes simples.</h2>
            <p className="text-base md:text-lg text-neutral-500 font-medium">Pas besoin de compétences techniques. Créez votre lien et recevez votre argent.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-neutral-200 -z-10"></div>
            <div className="text-center relative">
              <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center mb-6 border-4 border-neutral-100 shadow-xl relative z-10">
                <span className="text-3xl font-extrabold text-secky-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Créez un lien</h3>
              <p className="text-neutral-500 text-sm md:text-base font-medium leading-relaxed">Indiquez le montant et l'objet. En 3 secondes, votre demande est prête.</p>
            </div>
            <div className="text-center relative">
              <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center mb-6 border-4 border-neutral-100 shadow-xl relative z-10">
                <span className="text-3xl font-extrabold text-secky-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Partagez-le</h3>
              <p className="text-neutral-500 text-sm md:text-base font-medium leading-relaxed">Envoyez-le à votre client par WhatsApp ou SMS avec un seul bouton.</p>
            </div>
            <div className="text-center relative">
              <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center mb-6 border-4 border-neutral-100 shadow-xl relative z-10">
                <span className="text-3xl font-extrabold text-secky-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Soyez payé</h3>
              <p className="text-neutral-500 text-sm md:text-base font-medium leading-relaxed">Le client paie avec Orange, Moov ou Wave. L'argent est sécurisé.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sondage pays */}
      <section id="poll" className="py-20 md:py-24 px-5 md:px-6 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Où doit-on s'installer <span className="text-transparent bg-clip-text bg-gradient-to-r from-secky-blue-600 to-secky-cyan-400">ensuite ?</span>
            </h2>
            <p className="text-base text-neutral-500 font-medium">
              Nous prévoyons notre expansion en Afrique de l'Ouest. Votre avis détermine notre prochaine destination.
            </p>
          </div>
          <CountryPoll />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-32 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Des tarifs simples et transparents.</h2>
            <p className="text-base md:text-lg text-neutral-500 font-medium">Pas de frais cachés. Pas de commission sur vos transactions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            
            {/* Découverte */}
            <div className="bg-[#F8FAFC] p-6 rounded-[24px] border border-neutral-200">
              <h3 className="text-lg font-extrabold text-secky-blue-900 mb-1">Découverte</h3>
              <p className="text-xs text-neutral-500 font-medium mb-4">Pour tester la plateforme</p>
              <p className="text-3xl font-extrabold mb-1">0 <span className="text-sm text-neutral-500 font-medium">FCFA</span></p>
              <p className="text-xs text-neutral-400 mb-5">pour toujours</p>
              <ul className="space-y-2.5 mb-6">
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> 50 transactions/mois</li>
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> 1 utilisateur</li>
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> 1 compte mobile money</li>
              </ul>
              <Link href="/signup" className="w-full h-11 border border-neutral-300 text-secky-blue-900 font-bold text-sm rounded-xl flex items-center justify-center hover:bg-white transition-colors bg-white">Commencer</Link>
            </div>

            {/* Starter */}
            <div className="bg-[#F8FAFC] p-6 rounded-[24px] border border-neutral-200">
              <h3 className="text-lg font-extrabold text-secky-blue-900 mb-1">Starter</h3>
              <p className="text-xs text-neutral-500 font-medium mb-4">Pour les petits commerces</p>
              <p className="text-3xl font-extrabold mb-1">5 000 <span className="text-sm text-neutral-500 font-medium">FCFA</span></p>
              <p className="text-xs text-neutral-400 mb-5">par mois</p>
              <ul className="space-y-2.5 mb-6">
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> 300 transactions/mois</li>
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> 2 utilisateurs</li>
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> 3 comptes mobile money</li>
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> Rapports basiques</li>
              </ul>
              <Link href="/signup" className="w-full h-11 border border-neutral-300 text-secky-blue-900 font-bold text-sm rounded-xl flex items-center justify-center hover:bg-white transition-colors bg-white">Choisir Starter</Link>
            </div>

            {/* Business (populaire) */}
            <div className="bg-[#0A1633] p-6 rounded-[24px] border-2 border-secky-blue-600 shadow-2xl relative transform md:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secky-cyan-400 text-[#0A1633] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Populaire</div>
              <h3 className="text-lg font-extrabold text-white mb-1">Business</h3>
              <p className="text-xs text-white/50 font-medium mb-4">Pour les PME en croissance</p>
              <p className="text-3xl font-extrabold text-white mb-1">15 000 <span className="text-sm text-white/50 font-medium">FCFA</span></p>
              <p className="text-xs text-white/40 mb-5">par mois</p>
              <ul className="space-y-2.5 mb-6">
                <li className="flex items-start gap-2 text-xs text-white/80 font-medium"><CheckCircle2 size={14} className="text-secky-cyan-400 shrink-0 mt-0.5" /> Transactions illimitées</li>
                <li className="flex items-start gap-2 text-xs text-white/80 font-medium"><CheckCircle2 size={14} className="text-secky-cyan-400 shrink-0 mt-0.5" /> 10 utilisateurs</li>
                <li className="flex items-start gap-2 text-xs text-white/80 font-medium"><CheckCircle2 size={14} className="text-secky-cyan-400 shrink-0 mt-0.5" /> Comptes illimités</li>
                <li className="flex items-start gap-2 text-xs text-white/80 font-medium"><CheckCircle2 size={14} className="text-secky-cyan-400 shrink-0 mt-0.5" /> Comptabilité SYSCOHADA</li>
                <li className="flex items-start gap-2 text-xs text-white/80 font-medium"><CheckCircle2 size={14} className="text-secky-cyan-400 shrink-0 mt-0.5" /> Exports PDF/Excel/CSV</li>
                <li className="flex items-start gap-2 text-xs text-white/80 font-medium"><CheckCircle2 size={14} className="text-secky-cyan-400 shrink-0 mt-0.5" /> Support prioritaire</li>
              </ul>
              <Link href="/signup" className="w-full h-11 bg-secky-blue-600 text-white font-bold text-sm rounded-xl flex items-center justify-center hover:bg-secky-blue-500 transition-colors shadow-lg shadow-secky-blue-600/30">Choisir Business</Link>
            </div>

            {/* Entreprise */}
            <div className="bg-[#F8FAFC] p-6 rounded-[24px] border border-neutral-200">
              <h3 className="text-lg font-extrabold text-secky-blue-900 mb-1">Entreprise</h3>
              <p className="text-xs text-neutral-500 font-medium mb-4">Pour les grandes enseignes</p>
              <p className="text-3xl font-extrabold mb-1">Sur devis</p>
              <p className="text-xs text-neutral-400 mb-5">contactez-nous</p>
              <ul className="space-y-2.5 mb-6">
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> Tout Business</li>
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> Multi-boutiques</li>
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> API dédiée</li>
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> Gestionnaire dédié</li>
                <li className="flex items-start gap-2 text-xs text-neutral-600 font-medium"><CheckCircle2 size={14} className="text-status-success shrink-0 mt-0.5" /> SLA garanti</li>
              </ul>
              <Link href="/signup" className="w-full h-11 border border-neutral-300 text-secky-blue-900 font-bold text-sm rounded-xl flex items-center justify-center hover:bg-white transition-colors bg-white">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 md:py-32 px-5 md:px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Ils nous font confiance.</h2>
            <p className="text-base md:text-lg text-neutral-500 font-medium">Des centaines d'entreprises utilisent SeckyPay au quotidien.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Depuis que j'utilise SeckyPay, je gagne au moins 2 heures par jour. Mes clients paient en 2 clics, je n'ai plus à gérer le cash.", name: "Sylvain K.", role: "Directeur d'école", initial: "S", color: "bg-secky-blue-100 text-secky-blue-600" },
              { text: "L'intégration SYSCOHADA est un miracle. Mon comptable reçoit le journal équilibré en fin de mois. C'est un gain de temps énorme.", name: "Mariam O.", role: "Gérante de boutique", initial: "M", color: "bg-orange-100 text-orange-600" },
              { text: "Le support est réactif et l'application est ultra fluide. Même avec une mauvaise connexion, les liens fonctionnent parfaitement.", name: "Amadou T.", role: "Startup E-commerce", initial: "A", color: "bg-green-100 text-green-600" },
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-[24px] border border-neutral-200 shadow-sm">
                <div className="flex gap-1 text-status-warning mb-4">
                  {[1,2,3,4,5].map(j => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-neutral-600 font-medium mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${t.color}`}>{t.initial}</div>
                  <div>
                    <p className="font-bold text-sm text-secky-blue-900">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-32 px-5 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Questions fréquentes.</h2>
            <p className="text-base md:text-lg text-neutral-500 font-medium">Tout ce que vous devez savoir avant de commencer.</p>
          </div>

          <div className="space-y-3">
            {[
              { q: "Comment je reçois mon argent ?", a: "L'argent est versé directement sur votre compte marchand Orange Money, Moov Money ou Wave. SeckyPay ne conserve jamais vos fonds." },
              { q: "Y a-t-il des frais cachés ?", a: "Non. Nos tarifs sont transparents. Vous payez un abonnement mensuel fixe. Les frais des opérateurs sont prélevés directement par ces derniers." },
              { q: "Puis-je gérer plusieurs boutiques ?", a: "Oui, avec le plan Business ou Entreprise, vous pouvez gérer plusieurs boutiques et plusieurs comptes mobile money depuis un seul tableau de bord." },
              { q: "L'application fonctionne-t-elle hors ligne ?", a: "SeckyPay est une PWA (Progressive Web App). Une fois installée sur votre téléphone, elle se lance très rapidement, même avec une connexion faible. Les encaissements nécessitent une connexion pour être confirmés par l'opérateur." },
              { q: "Que se passe-t-il si un client paie mais que le réseau coupe ?", a: "La transaction passe en statut 'À vérifier'. Notre système interroge automatiquement l'opérateur jusqu'à obtenir la confirmation. Vous serez notifié dès que le statut est définitif." },
            ].map((faq, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
                <button onClick={() => toggleFaq(index)} className="w-full p-5 flex items-center justify-between text-left focus:outline-none">
                  <span className="font-bold text-secky-blue-900">{faq.q}</span>
                  <ChevronDown size={20} className={`text-neutral-400 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-sm text-neutral-500 font-medium leading-relaxed animate-fade-in-up">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 px-5 md:px-6 relative bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto bg-secky-blue-900 rounded-[32px] md:rounded-[40px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secky-blue-600/40 via-transparent to-transparent"></div>
          <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 relative z-10 tracking-tight">
            Prêt à optimiser la gestion de vos boutiques sur une seule plateforme ?
          </h2>
          <p className="text-sm md:text-lg text-white/60 mb-8 md:mb-10 max-w-2xl mx-auto relative z-10 font-medium">
            Rejoignez les 1 200+ commerçants qui utilisent SeckyPay pour centraliser leurs encaissements et gagner du temps.
          </p>
          <Link href="/signup" className="relative z-10 inline-flex w-full md:w-auto h-14 md:h-16 px-8 md:px-10 bg-white text-secky-blue-900 font-extrabold text-base md:text-lg rounded-full items-center justify-center hover:bg-neutral-50 transition-all active:scale-95 shadow-xl">
            Créer mon compte gratuitement <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-12 md:py-16 px-5 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-neutral-100 pb-8 md:pb-12 mb-6 md:mb-8">
          <div className="col-span-2 md:col-span-1">
            <img src="/logo.png" alt="SeckyPay" className="h-8 md:h-10 w-auto mb-4 md:mb-6" />
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-medium mb-4">
              La plateforme tout-en-un pour centraliser et optimiser la gestion de vos boutiques en Afrique de l'Ouest.
            </p>
            <div className="text-[10px] md:text-xs text-neutral-400 font-medium space-y-0.5">
              <p><strong className="text-neutral-500">RCCM :</strong> BF-BB-01-2026-B13-00460</p>
              <p><strong className="text-neutral-500">IFU :</strong> 00302321V</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-secky-blue-900 text-sm md:text-base mb-3 md:mb-4">Produit</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-neutral-500 font-medium">
              <li><Link href="#features" className="hover:text-secky-blue-600 transition-colors">Fonctionnalités</Link></li>
              <li><Link href="#pricing" className="hover:text-secky-blue-600 transition-colors">Tarifs</Link></li>
              <li><Link href="#how-it-works" className="hover:text-secky-blue-600 transition-colors">Comment ça marche</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-secky-blue-900 text-sm md:text-base mb-3 md:mb-4">Entreprise</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-neutral-500 font-medium">
              <li><Link href="#" className="hover:text-secky-blue-600 transition-colors">À propos</Link></li>
              <li><Link href="#" className="hover:text-secky-blue-600 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-secky-blue-600 transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-secky-blue-900 text-sm md:text-base mb-3 md:mb-4">Légal</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-neutral-500 font-medium">
              <li><Link href="/legal/terms" className="hover:text-secky-blue-600 transition-colors">Conditions d'utilisation</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-secky-blue-600 transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-[10px] md:text-xs text-neutral-400 font-medium">
          <p>© 2026 Secky Tech SARL. Tous droits réservés.</p>
          <div className="flex items-center gap-2">
            <Lock size={12} /> Paiements sécurisés
          </div>
        </div>
      </footer>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes drawLine {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}