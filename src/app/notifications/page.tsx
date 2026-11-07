"use client";
import { useState, Suspense } from "react";
import { ArrowLeft, CheckCheck, CreditCard, ShieldAlert, FileText, Settings, TrendingUp, TrendingDown, Bell, CheckCircle2, AlertCircle, Users, Palette, Moon, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

type NotificationType = "payment" | "security" | "finance" | "team" | "brand" | "system";

const mockNotifs = [
  { id: 1, type: "payment" as NotificationType, title: "Paiement reçu", desc: "25 000 FCFA de Cantine Octobre (Orange Money).", time: "Il y a 10 min", unread: true },
  { id: 2, type: "payment" as NotificationType, title: "Envoi réussi", desc: "Votre envoi de 50 000 FCFA à Aminata Sawadogo a été confirmé.", time: "Il y a 30 min", unread: true },
  { id: 3, type: "security" as NotificationType, title: "Nouvelle connexion", desc: "Connexion détectée depuis un nouvel appareil (Chrome / Android).", time: "Il y a 1 h", unread: true },
  { id: 4, type: "finance" as NotificationType, title: "Rappel de clôture", desc: "N'oubliez pas de clôturer votre caisse pour aujourd'hui.", time: "Il y a 2 h", unread: false },
  { id: 5, type: "team" as NotificationType, title: "Nouveau caissier", desc: "Aminata M. a rejoint votre équipe en tant que caissier.", time: "Hier, 15:30", unread: false },
  { id: 6, type: "brand" as NotificationType, title: "Marque approuvée", desc: "Votre personnalisation \"Ma Marque\" a été validée.", time: "Hier, 10:15", unread: false },
  { id: 7, type: "payment" as NotificationType, title: "Paiement échoué", desc: "Le paiement de 15 000 FCFA de Frais scolaires a échoué.", time: "Hier, 09:30", unread: false },
  { id: 8, type: "system" as NotificationType, title: "Mise à jour disponible", desc: "Une nouvelle version de SeckyPay est disponible. Actualisez pour en profiter.", time: "Il y a 2 jours", unread: false },
];

const typeConfig: Record<NotificationType, { icon: any; color: string; bg: string; label: string }> = {
  payment: { icon: CreditCard, color: "text-secky-blue-600", bg: "bg-secky-blue-50", label: "Paiement" },
  security: { icon: ShieldAlert, color: "text-status-error", bg: "bg-red-50", label: "Sécurité" },
  finance: { icon: TrendingUp, color: "text-status-success", bg: "bg-green-50", label: "Finance" },
  team: { icon: Users, color: "text-purple-600", bg: "bg-purple-50", label: "Équipe" },
  brand: { icon: Palette, color: "text-orange-500", bg: "bg-orange-50", label: "Marque" },
  system: { icon: Info, color: "text-neutral-500", bg: "bg-neutral-100", label: "Système" },
};

function NotificationsContent() {
  const [activeTab, setActiveTab] = useState("all");
  const [filterType, setFilterType] = useState<NotificationType | "all">("all");
  const [notifs, setNotifs] = useState(mockNotifs);

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  let filteredNotifs = activeTab === "unread" ? notifs.filter(n => n.unread) : notifs;
  if (filterType !== "all") {
    filteredNotifs = filteredNotifs.filter(n => n.type === filterType);
  }

  const unreadCount = notifs.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex flex-col md:flex-row md:items-center justify-between bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Notifications</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">
                {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? "s" : ""}` : "Tout est à jour"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={markAllRead} disabled={unreadCount === 0} className="h-10 px-4 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-xs rounded-xl flex items-center justify-center shadow-sm hover:bg-neutral-50 transition-all disabled:opacity-50">
              <CheckCheck size={16} className="mr-2" /> Tout lire
            </button>
            <Link href="/parametres" className="w-10 h-10 bg-white border border-neutral-200 text-secky-blue-900 rounded-xl flex items-center justify-center shadow-sm hover:bg-neutral-50 transition-all">
              <Settings size={18} />
            </Link>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-3xl mx-auto w-full space-y-5">
          
          {/* Onglets Toutes / Non lues */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-neutral-200 shadow-sm w-fit">
            <button onClick={() => setActiveTab("all")} className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === "all" ? "bg-secky-blue-600 text-white shadow-md" : "text-neutral-500 hover:text-secky-blue-900"}`}>
              Toutes ({notifs.length})
            </button>
            <button onClick={() => setActiveTab("unread")} className={`px-5 py-2 text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${activeTab === "unread" ? "bg-secky-blue-600 text-white shadow-md" : "text-neutral-500 hover:text-secky-blue-900"}`}>
              Non lues
              {unreadCount > 0 && <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-md">{unreadCount}</span>}
            </button>
          </div>

          {/* Filtres par type */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => setFilterType("all")} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${filterType === "all" ? "bg-secky-blue-600 text-white" : "bg-white text-neutral-500 border border-neutral-200 hover:border-secky-blue-300"}`}>
              Tous types
            </button>
            {Object.entries(typeConfig).map(([key, cfg]) => (
              <button key={key} onClick={() => setFilterType(key as NotificationType)} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${filterType === key ? "bg-secky-blue-600 text-white" : "bg-white text-neutral-500 border border-neutral-200 hover:border-secky-blue-300"}`}>
                <cfg.icon size={12} /> {cfg.label}
              </button>
            ))}
          </div>

          {/* Liste des notifications */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-200 overflow-hidden">
            {filteredNotifs.length === 0 ? (
              <div className="p-12 text-center">
                <Bell size={40} className="mx-auto text-neutral-300 mb-3" />
                <p className="text-sm font-bold text-secky-blue-900">Aucune notification</p>
                <p className="text-xs text-neutral-500 mt-1">Vous êtes à jour !</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {filteredNotifs.map((n) => {
                  const cfg = typeConfig[n.type];
                  const Icon = cfg.icon;
                  return (
                    <button
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`w-full text-left p-4 flex items-start gap-3 transition-colors hover:bg-neutral-50 ${n.unread ? "bg-secky-blue-50/40" : ""}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                        <Icon size={18} className={cfg.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm truncate ${n.unread ? "font-extrabold text-secky-blue-900" : "font-semibold text-neutral-600"}`}>{n.title}</p>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.color} uppercase shrink-0`}>{cfg.label}</span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{n.desc}</p>
                          </div>
                          <span className="text-[10px] font-medium text-neutral-400 whitespace-nowrap shrink-0 ml-2">{n.time}</span>
                        </div>
                      </div>
                      {n.unread && <div className="w-2 h-2 rounded-full bg-secky-blue-600 shrink-0 mt-1.5"></div>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <p className="text-center text-xs text-neutral-400 font-medium">
            Les notifications sont conservées 90 jours.{" "}
            <Link href="/parametres" className="text-secky-blue-600 font-bold hover:underline">Gérer mes préférences</Link>
          </p>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default function Notifications() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <NotificationsContent />
    </Suspense>
  );
}