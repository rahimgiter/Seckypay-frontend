"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Zap, BarChart3, Users, CheckCircle2, Menu, X, Lock, Smartphone, ChevronDown, Star, Coins, TrendingUp, CreditCard, Home, Receipt, Plus, PieChart, User, Globe } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
    { href: "#faq", label: "FAQ", num: "04" },
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
            className="md:hidden z-[110] w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 rounded-full text-secky-blue-900 shadow-sm"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile - LIGHT THEME */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#F8FAFC] z-[105] flex flex-col animate-fade-in">
          <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-200 bg-white shadow-sm">
            <img src="/logo.png" alt="SeckyPay" className="h-8 w-auto object-contain" />
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="w-10 h-10 flex items-center justify-center bg-neutral-100 border border-neutral-200 rounded-full text-secky-blue-900 hover:bg-neutral-200 transition-colors"
            >
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
            <Link 
              href="/login" 
              onClick={() => setIsMenuOpen(false)} 
              className="w-full h-14 flex items-center justify-center text-secky-blue-900 font-bold rounded-full border border-neutral-200 hover:bg-neutral-50 transition-colors"
            >
              Connexion
            </Link>
            <Link 
              href="/signup" 
              onClick={() => setIsMenuOpen(false)} 
              className="w-full h-14 flex items-center justify-center bg-secky-blue-600 text-white font-bold rounded-full shadow-lg shadow-secky-blue-600/20 hover:bg-secky-blue-800 transition-colors"
            >
              Ouvrir un compte
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-secky-blue-600/10 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left z-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm text-secky-blue-900 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6 md:mb-8">
              <span className="text-lg">🇧🇫</span>
              <span>Fierement conçu au Burkina Faso</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1] md:leading-[1.05] mb-5 md:mb-6">
              Encaissez plus vite, <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-secky-blue-600 to-secky-cyan-400 bg-clip-text text-transparent">développez-vous.</span>
            </h1>
            
            <p className="text-base md:text-xl text-neutral-500 mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              La plateforme de paiement tout-en-un pour les entreprises en Afrique de l'Ouest. Créez un lien, soyez payé par Orange Money, Moov ou Wave en quelques secondes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
              <Link href="/signup" className="w-full sm:w-auto h-14 px-8 bg-secky-blue-600 text-white font-bold rounded-full flex items-center justify-center hover:bg-secky-blue-800 transition-all shadow-[0_8px_20px_-6px_rgba(16,91,174,0.5)] active:scale-95">
                Commencer gratuitement <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link href="#how-it-works" className="w-full sm:w-auto h-14 px-8 bg-white text-secky-blue-900 border border-neutral-200 font-bold rounded-full flex items-center justify-center hover:bg-neutral-50 transition-all active:scale-95">
                Comment ça marche
              </Link>
            </div>

            <div className="mt-8 md:mt-10 flex items-center justify-center lg:justify-start gap-6 md:gap-8 text-xs md:text-sm font-semibold text-neutral-400">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-status-success" /> Sans engagement</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-status-success" /> Prêt en 2 minutes</div>
            </div>
          </div>

          {/* Mockup du Téléphone */}
          <div className="relative z-10 perspective-1000 animate-fade-in-up delay-200 mt-8 lg:mt-0 flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-secky-blue-600 to-secky-cyan-400 rounded-[40px] blur-3xl opacity-20 transform rotate-6 scale-95"></div>

            <div className="absolute -top-6 -left-6 md:-left-12 w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-yellow-500 animate-float z-20 border border-neutral-100">
              <Coins size={24} className="md:w-8 md:h-8" />
            </div>
            <div className="absolute top-1/4 -right-4 md:-right-10 w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-secky-cyan-400 animate-float-delayed z-20 border border-neutral-100">
              <TrendingUp size={20} className="md:w-7 md:h-7" />
            </div>
            <div className="absolute bottom-1/4 -left-4 md:-left-8 w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-green-500 animate-float z-20 border border-neutral-100" style={{ animationDelay: '1s' }}>
              <ShieldCheck size={20} className="md:w-7 md:h-7" />
            </div>
            <div className="absolute -bottom-4 right-0 md:-right-6 w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-secky-blue-600 animate-float-delayed z-20 border border-neutral-100" style={{ animationDelay: '2s' }}>
              <CreditCard size={24} className="md:w-8 md:h-8" />
            </div>

            <div className="relative bg-white border-[6px] md:border-[10px] border-neutral-900 rounded-[36px] md:rounded-[48px] shadow-2xl p-2 md:p-3 lg:transform lg:rotate-[-2deg] lg:hover:rotate-0 transition-transform duration-500 w-[300px] md:w-[360px] overflow-hidden bg-clip-padding">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-5 md:h-6 bg-neutral-900 rounded-b-xl md:rounded-b-2xl z-30"></div>
              
              <div className="bg-[#F8FAFC] rounded-[28px] md:rounded-[36px] overflow-hidden pt-6 md:pt-8 pb-0 h-[560px] md:h-[640px] flex flex-col relative">
                <div className="px-4 md:px-5 flex justify-between items-center mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <img src="/icon.png" alt="SeckyPay Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                    <div>
                      <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-wider">SeckyPay</p>
                      <p className="text-xs md:text-sm font-extrabold text-secky-blue-900">Kofi B.</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm relative">
                    <span className="w-2 h-2 bg-red-500 rounded-full absolute top-1.5 right-1.5 md:top-2 md:right-2"></span>
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-secky-blue-900 rounded-md"></div>
                  </div>
                </div>

                <div className="px-4 md:px-5">
                  <div className="card-bank-texture rounded-2xl md:rounded-[24px] p-5 md:p-6 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-5 -mt-5"></div>
                    <p className="text-[11px] md:text-xs text-white/80 mb-1 font-medium">Chiffre d'affaires</p>
                    <p className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 tracking-tight">125 000 <span className="text-xs md:text-sm font-medium">FCFA</span></p>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-white/20 backdrop-blur-md rounded-xl py-2 md:py-2.5 text-center text-[11px] md:text-xs font-bold border border-white/10">Encaisser</div>
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-sm md:text-base border border-white/10">↗</div>
                    </div>
                  </div>
                </div>

                <div className="px-4 md:px-5 mt-5 md:mt-8 flex-1">
                  <div className="flex justify-between items-center mb-3 md:mb-4">
                    <p className="text-xs md:text-sm font-bold text-secky-blue-900">Dernières opérations</p>
                    <p className="text-[10px] md:text-xs font-semibold text-secky-blue-600">Tout voir</p>
                  </div>
                  <div className="space-y-2.5 md:space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 text-secky-blue-600 flex items-center justify-center text-sm md:text-base">↓</div>
                          <div>
                            <p className="text-[11px] md:text-sm font-bold text-secky-blue-900">Cantine Octobre</p>
                            <p className="text-[9px] md:text-xs text-neutral-400 font-medium">Aujourd'hui, 10:45</p>
                          </div>
                        </div>
                        <p className="text-[11px] md:text-sm font-extrabold text-secky-blue-900">+25 000 F</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto bg-white border-t border-neutral-100 px-2 py-3 md:py-4 flex justify-between items-center relative">
                  <div className="flex flex-col items-center gap-1 w-1/5 text-secky-blue-600">
                    <Home size={20} className="md:w-6 md:h-6" />
                    <span className="text-[9px] md:text-[11px] font-bold">Accueil</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-1/5 text-neutral-400">
                    <Receipt size={20} className="md:w-6 md:h-6" />
                    <span className="text-[9px] md:text-[11px] font-bold">Trans.</span>
                  </div>
                  <div className="w-1/5 flex justify-center relative">
                    <div className="absolute -top-7 md:-top-9 w-14 h-14 md:w-16 md:h-16 bg-secky-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                      <Plus size={28} className="md:w-8 md:h-8" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-1/5 text-neutral-400">
                    <PieChart size={20} className="md:w-6 md:h-6" />
                    <span className="text-[9px] md:text-[11px] font-bold">Finances</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-1/5 text-neutral-400">
                    <User size={20} className="md:w-6 md:h-6" />
                    <span className="text-[9px] md:text-[11px] font-bold">Profil</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau Opérateurs */}
      <section id="operators" className="py-8 md:py-10 border-y border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 text-center">
          <p className="text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6 md:mb-8">Intégré avec les leaders du marché</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl md:text-2xl font-extrabold text-[#FF7900]">Orange Money</span>
            <span className="text-xl md:text-2xl font-extrabold text-[#0066B3]">Moov Money</span>
            <span className="text-xl md:text-2xl font-extrabold text-[#1DC3F3]">Wave</span>
          </div>
        </div>
      </section>

      {/* Section Signature : Notre Vision avec la VRAIE carte */}
      <section className="py-20 md:py-32 px-5 md:px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secky-blue-50 rounded-2xl mb-6 text-secky-blue-600 shadow-sm border border-secky-blue-100">
              <Globe size={32} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1] text-secky-blue-900">
              Né au <span className="text-transparent bg-clip-text bg-gradient-to-r from-secky-blue-600 to-secky-cyan-400">Burkina Faso</span>,<br className="hidden md:block"/> conçu pour l'Afrique.
            </h2>
            
            <p className="text-base md:text-lg text-neutral-500 font-medium mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              SeckyPay est fier de ses racines burkinabè. Nous construisons l'infrastructure financière de demain, en commençant par notre pays, avec l'ambition d'accompagner les entreprises dans toute l'Afrique de l'Ouest.
            </p>

            <div className="bg-[#0A1633] p-6 rounded-[24px] shadow-xl mb-8 relative overflow-hidden group border border-secky-blue-800 text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secky-cyan-400/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-secky-cyan-400/20 transition-all duration-500"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/10 shrink-0">
                  🇧🇫
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-white">Burkina Faso</h3>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      Actif
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-medium">Siège social & Opérations (Lancement officiel)</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 text-left">Prochaine expansion</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: "Côte d'Ivoire", flag: "🇨🇮" },
                  { name: "Sénégal", flag: "🇸🇳" },
                  { name: "Bénin", flag: "🇧🇯" },
                  { name: "Togo", flag: "🇹🇬" },
                  { name: "Mali", flag: "🇲🇱" }
                ].map((country) => (
                  <div key={country.name} className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-neutral-200 shadow-sm hover:border-secky-blue-300 hover:shadow-md transition-all cursor-default group text-left">
                    <span className="text-lg grayscale group-hover:grayscale-0 transition-all duration-300">{country.flag}</span>
                    <div>
                      <p className="font-bold text-xs text-secky-blue-900">{country.name}</p>
                      <p className="text-[9px] font-medium text-neutral-400 uppercase tracking-wide">Bientôt</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] rounded-[40px] opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secky-blue-600/10 rounded-full blur-[60px]"></div>

            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 450, center: [15, 5] }}
              style={{ width: "100%", height: "100%", filter: "drop-shadow(0 10px 15px rgba(16, 91, 174, 0.15))" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    const westAfrica = ["Burkina Faso", "Côte d'Ivoire", "Ivory Coast", "Senegal", "Benin", "Togo", "Mali", "Niger", "Guinea", "Guinea-Bissau", "Sierra Leone", "Liberia", "Nigeria", "Ghana", "Mauritania", "Gambia", "Cape Verde"];
                    const africa = ["Burkina Faso", "Côte d'Ivoire", "Ivory Coast", "Senegal", "Benin", "Togo", "Mali", "Niger", "Guinea", "Guinea-Bissau", "Sierra Leone", "Liberia", "Nigeria", "Ghana", "Mauritania", "Gambia", "Cape Verde", "Algeria", "Angola", "Botswana", "Burundi", "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo", "Democratic Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Kenya", "Lesotho", "Libya", "Madagascar", "Malawi", "Mauritius", "Morocco", "Mozambique", "Namibia", "Rwanda", "Sao Tome and Principe", "Seychelles", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Tunisia", "Uganda", "Zambia", "Zimbabwe"];

                    const isWestAfrica = westAfrica.includes(countryName);
                    const isAfrica = africa.includes(countryName);
                    const isBurkina = countryName === "Burkina Faso";

                    let fillColor = "#F8FAFC";
                    let strokeColor = "#E2E8F0";
                    let strokeWidth = 0.3;

                    if (isAfrica) { fillColor = "#DCEEFB"; strokeColor = "#FFFFFF"; strokeWidth = 0.8; }
                    if (isWestAfrica) { fillColor = "#7DD3FC"; strokeColor = "#FFFFFF"; strokeWidth = 1; }
                    if (isBurkina) { fillColor = "#105BAE"; strokeColor = "#FFFFFF"; strokeWidth = 1.5; }

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: isBurkina ? "#1A3F94" : (isAfrica ? "#3AACE8" : "#F1F5F9"), outline: "none", cursor: isAfrica ? "pointer" : "default" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              <Marker coordinates={[-1.5, 12.5]}>
                <circle r={20} fill="#3AACE8" opacity={0.3} className="animate-ping" />
                <circle r={10} fill="#105BAE" opacity={0.6} />
                <circle r={5} fill="#FFFFFF" stroke="#0C1D43" strokeWidth={2} />
              </Marker>
              <Marker coordinates={[-1.5, 12.5]}>
                <text textAnchor="middle" y={-16} style={{ fontFamily: "system-ui", fill: "#0C1D43", fontSize: "11px", fontWeight: "900", letterSpacing: "0.5px", textShadow: "0 2px 4px rgba(255,255,255,0.9)" }}>BURKINA FASO</text>
              </Marker>
              <Marker coordinates={[-5.5, 7.5]}><circle r={3} fill="#FFFFFF" stroke="#0284C7" strokeWidth={1.5} /></Marker>
              <Marker coordinates={[-14.5, 14.5]}><circle r={3} fill="#FFFFFF" stroke="#0284C7" strokeWidth={1.5} /></Marker>
              <Marker coordinates={[2.5, 9.5]}><circle r={3} fill="#FFFFFF" stroke="#0284C7" strokeWidth={1.5} /></Marker>
              <Marker coordinates={[1.0, 7.5]}><circle r={3} fill="#FFFFFF" stroke="#0284C7" strokeWidth={1.5} /></Marker>
              <Marker coordinates={[-4.0, 17.0]}><circle r={3} fill="#FFFFFF" stroke="#0284C7" strokeWidth={1.5} /></Marker>
            </ComposableMap>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="how-it-works" className="py-20 md:py-32 px-5 md:px-6 relative bg-[#F8FAFC]">
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

      {/* Bento Grid Fonctionnalités */}
      <section id="features" className="py-20 md:py-24 px-5 md:px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Une puissance infinie.</h2>
            <p className="text-base md:text-lg text-neutral-500 font-medium">Tout ce qu'il faut pour gérer, sécuriser et développer votre activité.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2 bg-[#0A1633] p-8 md:p-12 rounded-[32px] md:rounded-[40px] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-secky-blue-600/30 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <Zap size={28} className="text-secky-cyan-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Lien de paiement en 3 secondes</h3>
                  <p className="text-white/60 text-sm md:text-lg max-w-md leading-relaxed">Créez une demande, partagez-la sur WhatsApp et recevez l'argent instantanément.</p>
                </div>
                <div className="mt-8 flex gap-3">
                  <div className="h-10 px-4 bg-white/10 rounded-full flex items-center text-xs md:text-sm font-semibold border border-white/10">Nouveau lien</div>
                  <div className="h-10 px-4 bg-[#25D366] rounded-full flex items-center text-xs md:text-sm font-bold shadow-lg shadow-[#25D366]/20">Partager sur WhatsApp</div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-[32px] border border-neutral-200 shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6"><BarChart3 size={28} /></div>
              <h3 className="text-xl font-bold mb-3">SYSCOHADA intégré</h3>
              <p className="text-neutral-500 text-sm md:text-base font-medium leading-relaxed">Générez votre journal et balance en 1 clic. Compatible avec les normes comptables OHADA.</p>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-[32px] border border-neutral-200 shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6"><Smartphone size={28} /></div>
              <h3 className="text-xl font-bold mb-3">Application Installable (PWA)</h3>
              <p className="text-neutral-500 text-sm md:text-base font-medium leading-relaxed">Installez SeckyPay sur votre écran d'accueil sans passer par le Play Store. Ultra rapide.</p>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-secky-blue-50 to-white p-8 md:p-12 rounded-[32px] md:rounded-[40px] border border-secky-blue-100 shadow-sm relative overflow-hidden">
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6"><ShieldCheck size={28} className="text-secky-blue-600" /></div>
                  <h3 className="text-2xl font-bold mb-3">Sécurité de niveau bancaire</h3>
                  <p className="text-neutral-500 text-sm md:text-base font-medium leading-relaxed">Vos transactions sont chiffrées. Chaque paiement est vérifié en temps réel auprès de l'opérateur.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-lg border border-neutral-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div>
                    <div>
                      <p className="text-sm font-bold text-secky-blue-900">Paiement confirmé</p>
                      <p className="text-xs text-neutral-400">Il y a 2 secondes</p>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-green-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-full"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 md:py-32 px-5 md:px-6 bg-[#F8FAFC] overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Ils nous font confiance.</h2>
            <p className="text-base md:text-lg text-neutral-500 font-medium">Des centaines d'entreprises utilisent SeckyPay au quotidien.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm">
              <div className="flex gap-1 text-status-warning mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p className="text-neutral-600 font-medium mb-6 leading-relaxed">"Depuis que j'utilise SeckyPay, je gagne au moins 2 heures par jour. Mes clients paient en 2 clics, je n'ai plus à gérer le cash."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secky-blue-100 rounded-full flex items-center justify-center font-bold text-secky-blue-600">S</div>
                <div><p className="font-bold text-sm">Sylvain K.</p><p className="text-xs text-neutral-500">Directeur d'école</p></div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm">
              <div className="flex gap-1 text-status-warning mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p className="text-neutral-600 font-medium mb-6 leading-relaxed">"L'intégration SYSCOHADA est un miracle. Mon comptable reçoit le journal équilibré en fin de mois. C'est un gain de temps énorme."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">M</div>
                <div><p className="font-bold text-sm">Mariam O.</p><p className="text-xs text-neutral-500">Gérante de boutique</p></div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm">
              <div className="flex gap-1 text-status-warning mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p className="text-neutral-600 font-medium mb-6 leading-relaxed">"Le support est réactif et l'application est ultra fluide. Même avec une mauvaise connexion, les liens fonctionnent parfaitement."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">A</div>
                <div><p className="font-bold text-sm">Amadou T.</p><p className="text-xs text-neutral-500">Startup E-commerce</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="pricing" className="py-20 md:py-32 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Des tarifs simples.</h2>
            <p className="text-base md:text-lg text-neutral-500 font-medium">Pas de frais cachés. Vous ne payez que lorsque vous encaissez.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFC] p-8 rounded-[32px] border border-neutral-200 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Découverte</h3>
              <p className="text-sm text-neutral-500 mb-6">Pour tester la plateforme.</p>
              <p className="text-4xl font-extrabold mb-6">0 <span className="text-lg text-neutral-500 font-medium">FCFA / mois</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-neutral-600"><CheckCircle2 size={16} className="text-status-success" /> Jusqu'à 50 transactions / mois</li>
                <li className="flex items-center gap-2 text-sm text-neutral-600"><CheckCircle2 size={16} className="text-status-success" /> Liens de paiement illimités</li>
                <li className="flex items-center gap-2 text-sm text-neutral-600"><CheckCircle2 size={16} className="text-status-success" /> Support standard</li>
              </ul>
              <Link href="/signup" className="w-full h-12 border border-neutral-200 text-secky-blue-900 font-bold rounded-xl flex items-center justify-center hover:bg-neutral-50 transition-colors bg-white">Commencer</Link>
            </div>

            <div className="bg-[#0A1633] p-8 rounded-[32px] border border-secky-blue-800 shadow-2xl relative transform md:-translate-y-4">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-secky-cyan-400 text-[#0A1633] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Populaire</div>
              <h3 className="text-xl font-bold mb-2 text-white">Business</h3>
              <p className="text-sm text-white/50 mb-6">Pour les entreprises en croissance.</p>
              <p className="text-4xl font-extrabold mb-6 text-white">15 000 <span className="text-lg text-white/50 font-medium">FCFA / mois</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-white/80"><CheckCircle2 size={16} className="text-secky-cyan-400" /> Transactions illimitées</li>
                <li className="flex items-center gap-2 text-sm text-white/80"><CheckCircle2 size={16} className="text-secky-cyan-400" /> Comptabilité SYSCOHADA</li>
                <li className="flex items-center gap-2 text-sm text-white/80"><CheckCircle2 size={16} className="text-secky-cyan-400" /> Multi-utilisateurs (Caissiers)</li>
                <li className="flex items-center gap-2 text-sm text-white/80"><CheckCircle2 size={16} className="text-secky-cyan-400" /> Export Excel & PDF</li>
              </ul>
              <Link href="/signup" className="w-full h-12 bg-secky-blue-600 text-white font-bold rounded-xl flex items-center justify-center hover:bg-secky-blue-500 transition-colors shadow-lg shadow-secky-blue-600/30">Choisir Business</Link>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-[32px] border border-neutral-200 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Entreprise</h3>
              <p className="text-sm text-neutral-500 mb-6">Pour les gros volumes.</p>
              <p className="text-4xl font-extrabold mb-6">Sur devis</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-neutral-600"><CheckCircle2 size={16} className="text-status-success" /> Tout le plan Business</li>
                <li className="flex items-center gap-2 text-sm text-neutral-600"><CheckCircle2 size={16} className="text-status-success" /> Personnalisation "Ma Marque"</li>
                <li className="flex items-center gap-2 text-sm text-neutral-600"><CheckCircle2 size={16} className="text-status-success" /> Gestionnaire de compte dédié</li>
                <li className="flex items-center gap-2 text-sm text-neutral-600"><CheckCircle2 size={16} className="text-status-success" /> Support prioritaire 24/7</li>
              </ul>
              <Link href="/signup" className="w-full h-12 border border-neutral-200 text-secky-blue-900 font-bold rounded-xl flex items-center justify-center hover:bg-neutral-50 transition-colors bg-white">Contacter les ventes</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-32 px-5 md:px-6 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Questions fréquentes.</h2>
            <p className="text-base md:text-lg text-neutral-500 font-medium">Tout ce que vous devez savoir avant de commencer.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "Comment je reçois mon argent ?", a: "L'argent est versé directement sur votre compte marchand Orange Money, Moov Money ou Wave. SeckyPay ne conserve jamais vos fonds." },
              { q: "Y a-t-il des frais cachés ?", a: "Non. Nos tarifs sont transparents. Vous payez un abonnement mensuel fixe (ou gratuit pour le plan Découverte). Les frais des opérateurs sont prélevés directement par ces derniers." },
              { q: "Puis-je gérer plusieurs caissiers ?", a: "Oui, avec le plan Business, vous pouvez inviter vos employés. Ils auront un accès limité à la création de liens et à la consultation des transactions." },
              { q: "L'application fonctionne-t-elle hors ligne ?", a: "SeckyPay est une PWA (Progressive Web App). Une fois installée sur votre téléphone, elle se lance très rapidement, même avec une connexion faible. Les encaissements nécessitent une connexion pour être confirmés par l'opérateur." },
              { q: "Que se passe-t-il si un client paie mais que le réseau coupe ?", a: "La transaction passe en statut 'À vérifier'. Notre système interroge automatiquement l'opérateur jusqu'à obtenir la confirmation. Vous serez notifié dès que le statut est définitif." }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm">
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
      <section className="py-16 md:py-24 px-5 md:px-6 relative bg-white">
        <div className="max-w-5xl mx-auto bg-secky-blue-900 rounded-[32px] md:rounded-[40px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secky-blue-600/40 via-transparent to-transparent"></div>
          <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 relative z-10 tracking-tight">Prêt à accélérer vos encaissements ?</h2>
          <p className="text-sm md:text-lg text-white/60 mb-8 md:mb-10 max-w-xl mx-auto relative z-10 font-medium">Rejoignez les entreprises qui utilisent SeckyPay pour simplifier leur quotidien.</p>
          <Link href="/signup" className="relative z-10 inline-flex w-full md:w-auto h-14 md:h-16 px-8 md:px-10 bg-white text-secky-blue-900 font-extrabold text-base md:text-lg rounded-full items-center justify-center hover:bg-neutral-50 transition-all active:scale-95 shadow-xl">
            Créer mon compte <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-12 md:py-16 px-5 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-neutral-100 pb-8 md:pb-12 mb-6 md:mb-8">
          <div className="col-span-2 md:col-span-1">
            <img src="/logo.png" alt="SeckyPay" className="h-8 md:h-10 w-auto mb-4 md:mb-6" />
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-medium">La solution de paiement mobile la plus simple et la plus sécurisée pour les entreprises en Afrique de l'Ouest. Fièrement conçu au Burkina Faso.</p>
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
          <p>© 2026 Secky Tech SARL. Tous droits réservés. Ouagadougou, Burkina Faso.</p>
          <div className="flex items-center gap-2"><Lock size={12} /> Paiements sécurisés</div>
        </div>
      </footer>
    </div>
  );
}