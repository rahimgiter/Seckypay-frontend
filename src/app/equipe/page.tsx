"use client";
import { useState } from "react";
import { ArrowLeft, UserPlus, Shield, User, Mail, MoreVertical, X, Check } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const mockTeam = [
  { id: 1, name: "Kofi B.", email: "kofi@seckytech.com", role: "Admin", status: "Actif", lastLogin: "Aujourd'hui, 08:30" },
  { id: 2, name: "Aminata M.", email: "aminata@seckytech.com", role: "Caissier", status: "Actif", lastLogin: "Aujourd'hui, 09:15" },
  { id: 3, name: "Oumar T.", email: "oumar@seckytech.com", role: "Caissier", status: "En attente", lastLogin: "-" },
];

export default function Equipe() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Caissier");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setEmail("");
  };

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
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Équipe</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Gérez les accès de vos collaborateurs.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-11 px-5 bg-secky-blue-600 text-white font-bold text-sm rounded-xl flex items-center justify-center shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 transition-all active:scale-95"
          >
            <UserPlus size={18} className="mr-2" /> Inviter
          </button>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Liste des membres */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center">
              <h3 className="font-bold text-secky-blue-900">Membres de l'équipe</h3>
              <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-2 py-1 rounded-md">{mockTeam.length} membres</span>
            </div>
            
            <div className="divide-y divide-neutral-100">
              {mockTeam.map((member) => (
                <div key={member.id} className="p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${member.role === "Admin" ? "bg-secky-blue-100 text-secky-blue-600" : "bg-orange-100 text-orange-600"}`}>
                      {member.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-secky-blue-900 flex items-center gap-2">
                        {member.name}
                        {member.role === "Admin" && <Shield size={12} className="text-secky-blue-600" />}
                      </p>
                      <p className="text-xs text-neutral-500 font-medium">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`hidden md:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${member.role === "Admin" ? "bg-secky-blue-50 text-secky-blue-600" : "bg-neutral-100 text-neutral-500"}`}>
                      {member.role}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${member.status === "Actif" ? "bg-green-50 text-status-success" : "bg-orange-50 text-status-warning"}`}>
                      {member.status}
                    </span>
                    <button className="text-neutral-400 hover:text-secky-blue-600 p-2">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Matrice des droits */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100">
              <h3 className="font-bold text-secky-blue-900">Matrice des droits</h3>
              <p className="text-xs text-neutral-500 mt-1">Aperçu des permissions par rôle (lecture seule).</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50/50">
                    <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Action</th>
                    <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-center">Admin</th>
                    <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-center">Caissier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {[
                    { action: "Créer une demande de paiement", admin: true, cashier: true },
                    { action: "Voir les transactions", admin: true, cashier: true },
                    { action: "Clôturer la caisse", admin: true, cashier: false },
                    { action: "Gérer l'équipe", admin: true, cashier: false },
                    { action: "Modifier la marque", admin: true, cashier: false },
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-4 text-sm font-medium text-neutral-600">{row.action}</td>
                      <td className="p-4 text-center">{row.admin ? <Check size={16} className="inline text-status-success" /> : <X size={16} className="inline text-neutral-300" />}</td>
                      <td className="p-4 text-center">{row.cashier ? <Check size={16} className="inline text-status-success" /> : <X size={16} className="inline text-neutral-300" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <BottomNav />

      {/* Modal d'invitation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full md:w-[440px] rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 animate-slide-up">
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6 md:hidden"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-secky-blue-900">Inviter un membre</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:bg-neutral-100 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-secky-blue-900 mb-2">Adresse e-mail</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    type="email" 
                    className="w-full h-12 pl-11 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:ring-2 focus:ring-secky-blue-100 transition-all font-medium text-secky-blue-900"
                    placeholder="nom@entreprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-secky-blue-900 mb-2">Rôle</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setRole("Caissier")} className={`h-12 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all ${role === "Caissier" ? "border-orange-500 bg-orange-50 text-orange-600" : "border-neutral-200 text-neutral-500"}`}>
                    <User size={16} /> Caissier
                  </button>
                  <button type="button" onClick={() => setRole("Admin")} className={`h-12 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all ${role === "Admin" ? "border-secky-blue-600 bg-secky-blue-50 text-secky-blue-600" : "border-neutral-200 text-neutral-500"}`}>
                    <Shield size={16} /> Admin
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full h-12 bg-secky-blue-600 text-white font-bold rounded-xl mt-4 shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 transition-colors">
                Envoyer l'invitation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}