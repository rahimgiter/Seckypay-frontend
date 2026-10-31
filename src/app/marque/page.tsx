"use client";
import { useState, useRef } from "react";
import { ArrowLeft, CheckCircle2, Upload, Palette, Type, Smartphone, Loader2, X, RotateCcw } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { useBrand } from "@/contexts/BrandContext";

export default function MaMarque() {
  const { branding, updateBranding, isLoading } = useBrand();
  const [brandColor, setBrandColor] = useState(branding.primaryColor);
  const [brandName, setBrandName] = useState(branding.brandName);
  const [logoPreview, setLogoPreview] = useState<string | null>(branding.logoBase64);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const presetColors = [
    { name: "Bleu SeckyPay", value: "#105BAE" },
    { name: "Orange", value: "#FF7900" },
    { name: "Violet", value: "#6D3FB2" },
    { name: "Vert", value: "#157F3B" },
    { name: "Noir", value: "#0C1D43" },
  ];

  // Upload + Extraction de la couleur dominante
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      alert("Fichier trop lourd. Maximum 500 Ko.");
      return;
    }

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      alert("Format refusé. Utilisez PNG, JPG ou WebP.");
      return;
    }

    setIsExtracting(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setLogoPreview(base64);

      // Extraire la couleur dominante
      const dominantColor = await extractDominantColor(base64);
      setBrandColor(dominantColor);
      setIsExtracting(false);
    };
    reader.readAsDataURL(file);
  };

  // Algorithme d'extraction de la couleur dominante
  const extractDominantColor = (imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve("#105BAE");
        ctx.drawImage(img, 0, 0, 100, 100);
        const data = ctx.getImageData(0, 0, 100, 100).data;

        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const pr = data[i], pg = data[i + 1], pb = data[i + 2], pa = data[i + 3];
          // Ignorer transparent et blanc/gris clair
          if (pa < 100) continue;
          if (pr > 240 && pg > 240 && pb > 240) continue;
          
          // Garder uniquement les couleurs saturées
          const max = Math.max(pr, pg, pb);
          const min = Math.min(pr, pg, pb);
          const sat = max === 0 ? 0 : (max - min) / max;
          if (sat > 0.25) {
            r += pr; g += pg; b += pb; count++;
          }
        }

        if (count === 0) return resolve("#105BAE");
        const hex = "#" + [r / count, g / count, b / count].map(c => Math.round(c).toString(16).padStart(2, "0")).join("");
        resolve(hex);
      };
      img.onerror = () => resolve("#105BAE");
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateBranding({
      brandName,
      logoBase64: logoPreview,
      primaryColor: brandColor,
      isCustom: logoPreview !== null || brandColor !== "#105BAE",
    });
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = async () => {
    if (!confirm("Revenir à l'identité SeckyPay par défaut ?")) return;
    setBrandName("Secky Tech");
    setBrandColor("#105BAE");
    setLogoPreview(null);
    await updateBranding({
      brandName: "Secky Tech",
      logoBase64: null,
      primaryColor: "#105BAE",
      isCustom: false,
    });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex items-center justify-between bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Ma Marque</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Personnalisez l'expérience de vos clients.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleReset} className="h-11 px-4 bg-white border border-neutral-200 text-neutral-600 font-bold text-sm rounded-xl hover:bg-neutral-50 transition-all flex items-center gap-2">
              <RotateCcw size={16} /> <span className="hidden md:inline">Réinitialiser</span>
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`h-11 px-5 font-bold text-sm rounded-xl flex items-center justify-center shadow-lg transition-all active:scale-95 ${saved ? "bg-status-success text-white" : "bg-secky-blue-600 text-white shadow-secky-blue-600/30 hover:bg-secky-blue-800"}`}
            >
              {isSaving ? <><Loader2 size={16} className="mr-2 animate-spin" /> Enregistrement...</> : saved ? <><CheckCircle2 size={18} className="mr-2" /> Enregistré !</> : "Publier"}
            </button>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            
            {/* Logo */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-neutral-100">
              <h3 className="font-bold text-secky-blue-900 mb-4 flex items-center gap-2"><Upload size={18} /> Logo de l'entreprise</h3>
              
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogoUpload} className="hidden" />
              
              {!logoPreview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-neutral-50 hover:border-secky-blue-300 transition-colors cursor-pointer"
                >
                  <div className="w-16 h-16 bg-secky-blue-50 rounded-full flex items-center justify-center text-secky-blue-600 mb-3">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-bold text-secky-blue-900">Cliquez pour uploader</p>
                  <p className="text-xs text-neutral-500 mt-1">PNG, JPG ou WebP (max 500 Ko)</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="bg-neutral-50 rounded-2xl p-8 flex items-center justify-center border border-neutral-200">
                    <img src={logoPreview} alt="Logo" className="max-h-32 max-w-full object-contain" />
                  </div>
                  <button 
                    onClick={() => { setLogoPreview(null); setBrandColor("#105BAE"); }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-50 border border-red-200 text-status-error rounded-full flex items-center justify-center hover:bg-red-100"
                  >
                    <X size={16} />
                  </button>
                  {isExtracting && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center">
                      <Loader2 size={24} className="animate-spin text-secky-blue-600 mb-2" />
                      <p className="text-xs font-bold text-secky-blue-900">Extraction de la couleur...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Nom & Couleurs */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-neutral-100 space-y-5">
              <div>
                <h3 className="font-bold text-secky-blue-900 mb-3 flex items-center gap-2"><Type size={18} /> Nom commercial</h3>
                <input 
                  type="text" 
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:ring-2 focus:ring-secky-blue-100 transition-all font-medium text-secky-blue-900"
                />
              </div>

              <div>
                <h3 className="font-bold text-secky-blue-900 mb-3 flex items-center gap-2"><Palette size={18} /> Couleur principale</h3>
                <div className="flex gap-3 flex-wrap">
                  {presetColors.map((c) => (
                    <button 
                      key={c.value}
                      onClick={() => setBrandColor(c.value)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-transform hover:scale-110 ${brandColor === c.value ? "border-secky-blue-900 scale-110" : "border-transparent"}`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    >
                      {brandColor === c.value && <CheckCircle2 size={18} className="text-white" />}
                    </button>
                  ))}
                  
                  {/* Color picker libre */}
                  <div className="relative">
                    <input 
                      type="color" 
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-10 h-10 rounded-full cursor-pointer border-2 border-neutral-200"
                      style={{ padding: 0 }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500 font-medium mt-3">
                  Code Hex : <span className="font-mono font-bold text-secky-blue-900">{brandColor.toUpperCase()}</span>
                  {logoPreview && <span className="ml-2 text-status-success">· Extraite du logo</span>}
                </p>
              </div>
            </div>

          </div>

          {/* Aperçu en direct */}
          <div className="space-y-4">
            <h3 className="font-bold text-secky-blue-900 flex items-center gap-2"><Smartphone size={18} /> Aperçu en direct</h3>
            
            <div className="bg-[#F8FAFC] rounded-[32px] p-6 border border-neutral-200 relative overflow-hidden flex justify-center">
              <div className="w-full max-w-[280px] bg-white rounded-[24px] shadow-xl overflow-hidden border border-neutral-100">
                <div className="h-2 w-full" style={{ backgroundColor: brandColor }}></div>
                <div className="p-6 text-center">
                  <div className="w-14 h-14 bg-neutral-100 rounded-2xl mx-auto mb-3 flex items-center justify-center border border-neutral-200 shadow-sm overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-1" />
                    ) : (
                      <img src="/icon.png" alt="Logo" className="w-8 h-8 grayscale" />
                    )}
                  </div>
                  <h4 className="font-extrabold text-secky-blue-900 text-lg">{brandName || "Nom de l'entreprise"}</h4>
                  <p className="text-xs text-neutral-400 mb-6">Demande de paiement</p>
                  
                  <div className="bg-neutral-50 rounded-2xl p-4 mb-6">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Montant</p>
                    <p className="text-3xl font-extrabold text-secky-blue-900">25 000 <span className="text-sm text-neutral-500">FCFA</span></p>
                  </div>
                  
                  <button 
                    className="w-full h-12 rounded-xl text-white font-bold text-sm transition-colors"
                    style={{ backgroundColor: brandColor }}
                  >
                    Payer
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-neutral-400 text-center font-medium px-4">
              Les mentions de sécurité "Propulsé par SeckyPay" sont verrouillées et resteront visibles.
            </p>
          </div>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}