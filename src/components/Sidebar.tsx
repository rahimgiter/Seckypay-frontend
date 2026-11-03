"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Receipt, Wallet, Lock, LogOut, PieChart, Bell, Users, Palette, FileText, TrendingUp, Settings, HelpCircle, User, Building2, ArrowUpRight, Send, CreditCard } from "lucide-react";
import BrandAvatar from "./BrandAvatar";
import { useBrand } from "@/contexts/BrandContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { branding } = useBrand();

  const mainMenu = [
    { name: "Tableau de bord", href: "/dashboard", icon: Home },
    { name: "Encaisser", href: "/encaisser", icon: Wallet },
    { name: "Envoyer", href: "/envoyer", icon: Send },
    { name: "Transactions", href: "/transactions", icon: Receipt },
    { name: "Clôture", href: "/cloture", icon: Lock },
  ];

  const businessMenu = [
    { name: "Comptes", href: "/comptes", icon: CreditCard },
    { name: "Bénéficiaires", href: "/beneficiaires", icon: User },
    { name: "Finances", href: "/finances", icon: PieChart },
    { name: "Règlements", href: "/reglements", icon: TrendingUp },
    { name: "Rapports", href: "/rapports", icon: FileText },
  ];

  const settingsMenu = [
    { name: "Équipe", href: "/equipe", icon: Users },
    { name: "Ma Marque", href: "/marque", icon: Palette },
    { name: "Abonnement", href: "/abonnement", icon: Building2 },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Paramètres", href: "/parametres", icon: Settings },
  ];

  const supportMenu = [
    { name: "Aide & Support", href: "/aide", icon: HelpCircle },
    { name: "Mon Profil", href: "/profil", icon: User },
  ];

  const renderLink = (item: any) => {
    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
    return (
      <Link
        key={item.name}
        href={item.href}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
          isActive 
            ? "bg-secky-blue-600 text-white shadow-md shadow-secky-blue-600/20" 
            : "text-neutral-500 hover:bg-neutral-50 hover:text-secky-blue-900"
        }`}
      >
        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
        {item.name}
      </Link>
    );
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-neutral-100">
        <BrandAvatar size="md" rounded="xl" />
        <p className="font-extrabold text-secky-blue-900 text-base truncate">{branding.brandName}</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        <div>
          <p className="px-4 mb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Opérations</p>
          <div className="space-y-1">{mainMenu.map(renderLink)}</div>
        </div>
        <div>
          <p className="px-4 mb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Business</p>
          <div className="space-y-1">{businessMenu.map(renderLink)}</div>
        </div>
        <div>
          <p className="px-4 mb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Configuration</p>
          <div className="space-y-1">{settingsMenu.map(renderLink)}</div>
        </div>
        <div>
          <p className="px-4 mb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Support</p>
          <div className="space-y-1">{supportMenu.map(renderLink)}</div>
        </div>
      </div>

      <div className="p-4 border-t border-neutral-100">
        <Link href="/profil" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-50 transition-all cursor-pointer">
          <BrandAvatar size="md" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-secky-blue-900 truncate">{branding.brandName}</p>
            <p className="text-xs text-neutral-500 font-medium">Admin</p>
          </div>
        </Link>
        <Link href="/login" className="mt-2 flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-xs text-neutral-500 hover:bg-red-50 hover:text-status-error transition-all">
          <LogOut size={16} />
          Déconnexion
        </Link>
      </div>
    </aside>
  );
}