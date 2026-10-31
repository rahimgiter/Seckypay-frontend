"use client";
import { useBrand } from "@/contexts/BrandContext";

interface BrandAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: "full" | "xl" | "2xl";
  showRing?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const roundedClasses = {
  full: "rounded-full",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export default function BrandAvatar({ 
  size = "md", 
  rounded = "full",
  showRing = false,
  className = "" 
}: BrandAvatarProps) {
  const { branding } = useBrand();

  // Si la marque a un logo, on l'affiche
  // Sinon, on affiche une initiale de la marque sur un fond coloré
  const hasLogo = !!branding.logoBase64;
  const initial = branding.brandName ? branding.brandName.charAt(0).toUpperCase() : "S";

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${roundedClasses[rounded]} 
        overflow-hidden 
        ${showRing ? "border-2 border-white shadow-sm" : "border border-neutral-200"}
        bg-white flex items-center justify-center shrink-0
        ${className}
      `}
    >
      {hasLogo ? (
        <img 
          src={branding.logoBase64!} 
          alt={branding.brandName} 
          className="w-full h-full object-contain p-1" 
        />
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center font-extrabold text-white"
          style={{ backgroundColor: branding.primaryColor }}
        >
          <span className={size === "xl" ? "text-2xl" : size === "lg" ? "text-lg" : "text-sm"}>
            {initial}
          </span>
        </div>
      )}
    </div>
  );
}