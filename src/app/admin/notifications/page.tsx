"use client";
import { Suspense, useState } from "react";
import { MessageCircle, Mail, Smartphone, Edit, CheckCircle2, Clock, Send } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

const mockTemplates = [
  { id: 1, event: "N-01 Paiement confirmé (Marchand)", channel: "push", status: "approved", content: "Paiement reçu : {{montant}} FCFA. {{objet}} ({{operateur}})" },
  { id: 2, event: "N-02 Reçu client", channel: "whatsapp", status: "approved", content: "Bonjour, votre paiement de {{montant}} FCFA à {{marchand}} est confirmé. Référence : {{ref}}. Vérifier : {{lien}}" },
  { id: 3, event: "N-08 OTP", channel: "sms", status: "approved", content: "SeckyPay : votre code est {{code}}. Il expire dans 10 minutes. Ne le partagez avec personne." },
  { id: 4, event: "N-16 Écart détecté", channel: "email", status: "pending", content: "Un écart de rapprochement a été détecté sur votre compte {{operateur}}." },
];

export default function AdminNotifications() {
  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case "whatsapp": return <MessageCircle size={16} className="text-[#25D366]" />;
      case "email": return <Mail size={16} className="text-secky-blue-600" />;
      case "sms": return <Smartphone size={16} className="text-neutral-500" />;
      case "push": return <Send size={16} className="text-purple-500" />;
      default: return null;
    }
  };

  return (
    <>
      <AdminMobileWarning />
      <div className="hidden md:flex min-h-screen bg-[#F8FAFC]">
        <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-[#0A1633] fixed left-0 top-0" />}>
          <AdminSidebar />
        </Suspense>

        <main className="flex-1 md:ml-64 p-8 overflow-x-hidden w-full">
          
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Notifications & Modèles</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Gérez les messages envoyés par la plateforme.</p>
            </div>
            <button className="h-10 px-4 bg-secky-blue-600 text-white font-bold text-sm rounded-xl hover:bg-secky-blue-800 transition-colors shadow-lg shadow-secky-blue-600/20">
              + Nouveau modèle
            </button>
          </header>

          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100">
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Événement</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Canal</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Statut</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Aperçu du message</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {mockTemplates.map((t) => (
                  <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4 font-bold text-sm text-secky-blue-900 whitespace-nowrap">{t.event}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getChannelIcon(t.channel)}
                        <span className="text-xs font-bold text-neutral-500 uppercase">{t.channel}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {t.status === "approved" ? 
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-status-success uppercase"><CheckCircle2 size={10} /> Approuvé</span> :
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-status-warning uppercase"><Clock size={10} /> En attente</span>
                      }
                    </td>
                    <td className="p-4">
                      <p className="text-xs text-neutral-500 font-medium truncate max-w-[300px]">{t.content}</p>
                    </td>
                    <td className="p-4 text-right">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100">
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </>
  );
}