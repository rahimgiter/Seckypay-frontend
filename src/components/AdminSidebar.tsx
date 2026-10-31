"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, ShieldCheck, Activity, AlertTriangle, FileText, Settings, LogOut, ArrowLeft, Plug, Users, CreditCard, Palette, Bell } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
    { name: "Entreprises", href: "/admin/companies", icon: Building2 },
    { name: "Validations", href: "/admin/onboarding", icon: ShieldCheck },
    { name: "Marques", href: "/admin/brands", icon: Palette },
    { name: "Transactions", href: "/admin/transactions", icon: Activity },
    { name: "Intégrations", href: "/admin/integrations", icon: Plug },
    { name: "Incidents", href: "/admin/incidents", icon: AlertTriangle },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "Plans & Offres", href: "/admin/plans", icon: CreditCard },
    { name: "Équipe interne", href: "/admin/team", icon: Users },
    { name: "Journal d'audit", href: "/admin/audit", icon: FileText },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-[#0A1633] border-r border-secky-blue-800 fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <img src="/logo.png" alt="SeckyPay" className="h-7 w-auto object-contain bg-white p-1.5 rounded-lg" />
        <span className="text-xs font-bold text-secky-cyan-400 bg-secky-cyan-400/10 px-2 py-1 rounded-md">ADMIN</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isActive 
                  ? "bg-secky-blue-600 text-white shadow-lg shadow-secky-blue-600/20" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-xl font-semibold text-xs text-white/50 hover:bg-white/5 hover:text-white transition-all">
          <ArrowLeft size={16} /> Retour espace marchand
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl font-semibold text-xs text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={16} /> Déconnexion
        </button>
      </div>
    </aside>
  );
}