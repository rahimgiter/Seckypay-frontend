"use client";

// Logos SVG stylisés des opérateurs (sans copyright, formes inspirées)

export function OrangeMoneyLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="40" height="40" rx="8" fill="#FF7900" />
      <text x="20" y="27" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial">OM</text>
      <text x="50" y="18" fill="#FF7900" fontSize="13" fontWeight="bold" fontFamily="Arial">Orange</text>
      <text x="50" y="32" fill="#333" fontSize="13" fontWeight="bold" fontFamily="Arial">Money</text>
    </svg>
  );
}

export function MoovMoneyLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="40" height="40" rx="8" fill="#0066B3" />
      <text x="20" y="27" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial">MM</text>
      <text x="50" y="18" fill="#0066B3" fontSize="13" fontWeight="bold" fontFamily="Arial">Moov</text>
      <text x="50" y="32" fill="#333" fontSize="13" fontWeight="bold" fontFamily="Arial">Money</text>
    </svg>
  );
}

export function WaveLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="40" height="40" rx="8" fill="#1DC3F3" />
      <path d="M 8 20 Q 14 12, 20 20 T 32 20" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <text x="50" y="27" fill="#1DC3F3" fontSize="20" fontWeight="bold" fontFamily="Arial">Wave</text>
    </svg>
  );
}