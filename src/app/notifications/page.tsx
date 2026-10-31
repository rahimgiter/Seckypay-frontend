"use client";
import { useState } from "react";
import { ArrowLeft, CheckCheck, CreditCard, ShieldAlert, FileText, Settings } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const mockNotifs = [
  { id: 1, type: "payment", title: "Paiement reçu", desc: "25 000 FCFA de Cantine Octobre (Orange Money).", time: "Il y a 10 min", unread: true },
  { id: 2, type: "security", title: "Nouvelle connexion", desc: "Connexion détectée depuis un nouvel appareil.", time: "Il y a 1 h", unread: true },
  { id: 3, type: "finance", title: "Clôture disponible", desc: "La journée du 25 Octobre est prête à être clôturée.", time: "Hier, 18:00", unread: false },
  { id: 4, type: "payment", title: "Paiement en attente", desc: "50 000 FCFA de Frais scolarité (Wave) est en attente.", time: "Hier, 09:30", unread: false },
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifs, setNotifs] = useState(mockNotifs);

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, unread: false })));
  };

  const filteredNotifs = activeTab === "unread" ? notifs.filter(n => n.unread) : notifs;

  const getIcon = (type: string) => {
    switch (type) {
      case "payment": return <CreditCard size={18} className="text-secky-blue-600" />;
      case "security": return <ShieldAlert size={18} className="text-status-error" />;
      case "finance": return <FileText size={18} className="text-status-success" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex flex-col md:flex-row md:items-center justify-between bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Notifications</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Restez informé de ce qui se passe.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={markAllRead} className="h-10 px-4 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-xs rounded-xl flex items-center justify-center shadow-sm hover:bg-neutral-50 transition-all">
              <CheckCheck size={16} className="mr-2" /> Tout lire
            </button>
            <button className="w-10 h-10 bg-white border border-neutral-200 text-secky-blue-900 rounded-xl flex items-center justify-center shadow-sm hover:bg-neutral-50 transition-all">
              <Settings size={18} />
            </button>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-3xl mx-auto w-full space-y-6">
          
          {/* Tabs Toutes / Non lues */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-neutral-100 shadow-sm w-fit">
            <button onClick={() => setActiveTab("all")} className={`px-6 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === "all" ? "bg-secky-blue-600 text-white shadow-md" : "text-neutral-500 hover:text-secky-blue-900"}`}>Toutes</button>
            <button onClick={() => setActiveTab("unread")} className={`px-6 py-2 text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${activeTab === "unread" ? "bg-secky-blue-600 text-white shadow-md" : "text-neutral-500 hover:text-secky-blue-900"}`}>
              Non lues
              {notifs.filter(n => n.unread).length > 0 && (
                <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-md">{notifs.filter(n => n.unread).length}</span>
              )}
            </button>
          </div>

          {/* Liste des notifications */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            {filteredNotifs.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-sm font-medium text-neutral-500">Aucune notification non lue.</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-50">
                {filteredNotifs.map((n) => (
                  <div key={n.id} className={`p-5 flex items-start gap-4 transition-colors hover:bg-neutral-50 cursor-pointer ${n.unread ? "bg-secky-blue-50/30" : ""}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.type === "payment" ? "bg-blue-100" : n.type === "security" ? "bg-red-100" : "bg-green-100"}`}>
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <p className={`text-sm ${n.unread ? "font-extrabold text-secky-blue-900" : "font-semibold text-neutral-600"}`}>{n.title}</p>
                        <span className="text-[10px] font-medium text-neutral-400 whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">{n.desc}</p>
                    </div>
                    {n.unread && <div className="w-2 h-2 rounded-full bg-secky-blue-600 shrink-0 mt-1.5"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-center text-xs text-neutral-400 font-medium">Les notifications sont conservées 90 jours.</p>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}