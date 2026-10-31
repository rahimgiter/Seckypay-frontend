"use client";
import { Suspense, useState } from "react";
import { UserPlus, Shield, Search, MoreVertical, ShieldAlert, CheckCircle2 } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

const mockStaff = [
  { id: 1, name: "Kofi B.", email: "kofi@seckytech.com", role: "super_admin", twoFA: true, lastLogin: "Aujourd'hui, 08:30" },
  { id: 2, name: "Aminata M.", email: "aminata@seckytech.com", role: "operations", twoFA: true, lastLogin: "Aujourd'hui, 09:15" },
  { id: 3, name: "Oumar T.", email: "oumar@seckytech.com", role: "finance", twoFA: false, lastLogin: "Hier, 17:45" },
  { id: 4, name: "Fatou S.", email: "fatou@seckytech.com", role: "support", twoFA: true, lastLogin: "Il y a 3 jours" },
];

export default function AdminTeam() {
  const getRoleBadge = (role: string) => {
    switch(role) {
      case "super_admin": return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-600 uppercase">Super Admin</span>;
      case "operations": return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-secky-blue-600 uppercase">Opérations</span>;
      case "finance": return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-600 uppercase">Finance</span>;
      case "support": return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-orange-600 uppercase">Support</span>;
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
          
          <header className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Équipe Interne</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Gérez les accès du personnel Secky Tech.</p>
            </div>
            <button className="h-10 px-4 bg-secky-blue-600 text-white font-bold text-sm rounded-xl hover:bg-secky-blue-800 transition-colors shadow-lg shadow-secky-blue-600/20 flex items-center gap-2">
              <UserPlus size={16} /> Inviter un membre
            </button>
          </header>

          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100">
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Membre</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Rôle</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">2FA</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Dernière connexion</th>
                  <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {mockStaff.map((s) => (
                  <tr key={s.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-600 text-xs shrink-0">
                          {s.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-secky-blue-900">{s.name}</p>
                          <p className="text-xs text-neutral-500 font-medium">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getRoleBadge(s.role)}</td>
                    <td className="p-4">
                      {s.twoFA ? <Shield size={16} className="text-status-success" /> : <ShieldAlert size={16} className="text-status-warning" />}
                    </td>
                    <td className="p-4 text-xs font-medium text-neutral-500">{s.lastLogin}</td>
                    <td className="p-4 text-right">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100">
                        <MoreVertical size={16} />
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