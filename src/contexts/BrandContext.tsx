"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Branding {
  brandName: string;
  logoBase64: string | null;
  primaryColor: string;
  isCustom: boolean;
}

interface BrandContextValue {
  branding: Branding;
  updateBranding: (data: Partial<Branding>) => Promise<void>;
  isLoading: boolean;
}

const defaultBranding: Branding = {
  brandName: "Secky Tech",
  logoBase64: null,
  primaryColor: "#105BAE",
  isCustom: false,
};

const BrandContext = createContext<BrandContextValue>({
  branding: defaultBranding,
  updateBranding: async () => {},
  isLoading: true,
});

export function BrandProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState<Branding>(defaultBranding);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBranding() {
      try {
        const res = await fetch("/api/branding");
        const json = await res.json();
        setBranding(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBranding();
  }, []);

  // Applique toutes les nuances de la marque via CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const primary = branding.primaryColor;
    
    root.style.setProperty("--brand-600", primary);
    root.style.setProperty("--brand-700", shadeColor(primary, -15));
    root.style.setProperty("--brand-900", shadeColor(primary, -65));
    root.style.setProperty("--brand-100", shadeColor(primary, 80));
    root.style.setProperty("--brand-50", shadeColor(primary, 92));
  }, [branding.primaryColor]);

  const updateBranding = async (data: Partial<Branding>) => {
    const newBranding = { ...branding, ...data };
    setBranding(newBranding);
    await fetch("/api/branding", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBranding),
    });
  };

  return (
    <BrandContext.Provider value={{ branding, updateBranding, isLoading }}>
      {children}
    </BrandContext.Provider>
  );
}

export const useBrand = () => useContext(BrandContext);

// Fonction pour éclaircir (positif) ou foncer (négatif) une couleur hex
function shadeColor(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1).padStart(6, "0");
}