"use client";
import { Suspense, useState, useEffect } from "react";
import { Search, Plus, MoreVertical, UserPlus, Shield, Building2, Store, Headphones, DollarSign, Server, Crown, Mail, CheckCircle2, X, Loader2, AlertTriangle, Users, Filter } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";

type Role = "super_admin" | "b2b_manager" | "b2c_manager" | "support" | "finance" | "operations";

const roleConfig: Record<Role, { label: string; icon: any; color: string; bg: string; desc: string }> = {
  super_admin: { label: "Super Admin", icon: Crown, color: "text-purple-700", bg: "bg-purple-50 border-purple-200", desc: "Accès total à la plateforme" },
  b2b_manager: { label: "Gestionnaire B2B", icon: Building2, color: "text-secky-blue-700", bg: "bg-secky-blue-50 border-secky-blue-200", desc: "Grandes entreprises et comptes pro" },
  b2c_manager: { label: "Gestionnaire B2C", icon: Store, color: "text-green-700", bg: "bg-green-50 border-green-200", desc: "Petits commerces et indépendants" },
  support: { label: "Support", icon: Headphones, color: "text-orange-700", bg: "bg-orange-50 border-orange-200", desc: "Assistance technique et client" },
  finance: { label: "Finance", icon: DollarSign, color: "text-cyan-700", bg: "bg-cyan-50 border-cyan-200", desc: "Comptabilité et réconciliation" },
  operations: { label: "Opérations", icon: Server, color: "text-neutral-700", bg: "bg-neutral-100 border-neutral-300", desc: "Monitoring et intégrations" },
};

function AdminTeamContent() {
  const [members, setMembers] = useState<any[]>([]);
  const [counts, setCounts] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<Role | "all">("all");
  const [search, setSearch] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "b2b_manager" as Role });

  async function fetchMembers() {
    try {
      const params = new URLSearchParams();
      if (activeRole !== "all") params.append("role", activeRole);
      const res = await fetch(`/api/admin/team?${params.toString()}`);
      const json = await res.json();
      setMembers(json.data);
      setCounts(json.counts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchMembers(); }, [activeRole]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inviteForm),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || "Erreur");
      }
      await fetchMembers();
      setShowInviteModal(false);
      setInviteForm({ name: "", email: "", role: "b2b_manager" });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsInviting(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/admin/team/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchMembers();
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-status-success uppercase"><CheckCircle2 size={10} /> Actif</span>;
      case "inactive": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-500 uppercase">Inactif</span>;
      case "invited": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-status-warning uppercase"><AlertTriangle size={10} /> Invité</span>;
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
              <p className="text-sm text-neutral-500 font-medium mt-1">
                {counts?.total || 0} membres · Gestion par pôle
              </p>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="h-11 px-5 bg-secky-blue-600 text-white font-bold text-sm rounded-xl flex items-center justify-center shadow-lg shadow-secky-blue-600/30 hover:bg-secky-blue-800 transition-all active:scale-95"
            >
              <UserPlus size={16} className="mr-2" /> Inviter un membre
            </button>
          </header>

          {/* Filtres par pôle */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
            <button
              onClick={() => setActiveRole("all")}
              className={`p-3 rounded-xl border-2 transition-all text-left ${activeRole === "all" ? "bg-secky-blue-600 text-white border-secky-blue-600" : "bg-white border-neutral-200 hover:border-secky-blue-300"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <Users size={16} className={activeRole === "all" ? "text-white" : "text-neutral-400"} />
                <span className={`text-lg font-extrabold ${activeRole === "all" ? "text-white" : "text-secky-blue-900"}`}>{counts?.total || 0}</span>
              </div>
              <p className={`text-[10px] font-bold uppercase ${activeRole === "all" ? "text-white/80" : "text-neutral-500"}`}>Tous</p>
            </button>
            {(Object.keys(roleConfig) as Role[]).map((role) => {
              const cfg = roleConfig[role];
              const Icon = cfg.icon;
              const count = counts?.[role] || 0;
              const isActive = activeRole === role;
              return (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${isActive ? "bg-secky-blue-600 text-white border-secky-blue-600" : "bg-white border-neutral-200 hover:border-secky-blue-300"}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Icon size={16} className={isActive ? "text-white" : cfg.color} />
                    <span className={`text-lg font-extrabold ${isActive ? "text-white" : "text-secky-blue-900"}`}>{count}</span>
                  </div>
                  <p className={`text-[10px] font-bold uppercase ${isActive ? "text-white/80" : "text-neutral-500"}`}>{cfg.label}</p>
                </button>
              );
            })}
          </div>

          {/* Recherche */}
          <div className="bg-white p-3 rounded-xl border border-neutral-200 shadow-sm mb-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher un membre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-secky-blue-600"
              />
            </div>
          </div>

          {/* Liste des membres */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden w-full">
            {isLoading ? (
              <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-secky-blue-600" /></div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-16">
                <Users size={48} className="mx-auto text-neutral-300 mb-3" />
                <p className="text-sm font-bold text-secky-blue-900">Aucun membre trouvé</p>
                <p className="text-xs text-neutral-500 mt-1">Modifiez la recherche ou invitez un nouveau membre.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-100">
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Membre</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Pôle</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Statut</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">2FA</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Dernière connexion</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {filteredMembers.map((member) => {
                      const cfg = roleConfig[member.role as Role];
                      const RoleIcon = cfg.icon;
                      return (
                        <tr key={member.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 ${member.role === "super_admin" ? "bg-purple-600" : member.role === "b2b_manager" ? "bg-secky-blue-600" : member.role === "b2c_manager" ? "bg-green-600" : member.role === "support" ? "bg-orange-500" : member.role === "finance" ? "bg-cyan-600" : "bg-neutral-500"}`}>
                                {member.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-sm text-secky-blue-900">{member.name}</p>
                                <p className="text-xs text-neutral-500">{member.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border ${cfg.bg} ${cfg.color}`}>
                              <RoleIcon size={12} /> {cfg.label}
                            </span>
                          </td>
                          <td className="p-4">{getStatusBadge(member.status)}</td>
                          <td className="p-4">
                            {member.twoFA ? (
                              <Shield size={16} className="text-status-success" />
                            ) : (
                              <AlertTriangle size={16} className="text-status-warning" />
                            )}
                          </td>
                          <td className="p-4 text-xs font-medium text-neutral-500">{member.lastLogin}</td>
                          <td className="p-4 text-right">
                            {member.status === "invited" && (
                              <button
                                onClick={() => handleStatusChange(member.id, "active")}
                                className="text-xs font-bold text-status-success hover:underline mr-3"
                              >
                                Activer
                              </button>
                            )}
                            {member.status === "active" && member.role !== "super_admin" && (
                              <button
                                onClick={() => handleStatusChange(member.id, "inactive")}
                                className="text-xs font-bold text-status-error hover:underline mr-3"
                              >
                                Désactiver
                              </button>
                            )}
                            <button className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-neutral-400 hover:bg-neutral-100">
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Légende des pôles */}
          <div className="mt-6 bg-white rounded-2xl border border-neutral-200 p-5">
            <h3 className="font-bold text-secky-blue-900 mb-3 text-sm">Définition des pôles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(Object.keys(roleConfig) as Role[]).map((role) => {
                const cfg = roleConfig[role];
                const Icon = cfg.icon;
                return (
                  <div key={role} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}>
                      <Icon size={16} className={cfg.color} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-secky-blue-900">{cfg.label}</p>
                      <p className="text-[10px] text-neutral-500 mt-0.5">{cfg.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>

      {/* Modal d'invitation */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowInviteModal(false)}>
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-secky-blue-900">Inviter un membre</h3>
                <p className="text-xs text-neutral-500 mt-1">Choisissez le pôle et le rôle du nouveau membre</p>
              </div>
              <button onClick={() => setShowInviteModal(false)} className="text-neutral-400 hover:bg-neutral-100 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Nom complet</label>
                <input
                  type="text"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({...inviteForm, name: e.target.value})}
                  required
                  className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 font-medium"
                  placeholder="Ex: Awa Ouédraogo"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Email professionnel</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                  required
                  className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 font-medium"
                  placeholder="nom@seckytech.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Pôle / Rôle</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(roleConfig) as Role[]).filter(r => r !== "super_admin").map((role) => {
                    const cfg = roleConfig[role];
                    const Icon = cfg.icon;
                    const isSelected = inviteForm.role === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setInviteForm({...inviteForm, role})}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${isSelected ? "border-secky-blue-600 bg-secky-blue-50" : "border-neutral-200 hover:border-neutral-300"}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon size={14} className={isSelected ? "text-secky-blue-600" : cfg.color} />
                          <p className={`text-[11px] font-bold ${isSelected ? "text-secky-blue-900" : "text-neutral-700"}`}>{cfg.label}</p>
                        </div>
                        <p className="text-[9px] text-neutral-500 leading-tight">{cfg.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-[11px] font-medium text-secky-blue-900">
                  <Mail size={12} className="inline mr-1" />
                  Un email d'invitation sera envoyé. Le lien expire dans 72 heures.
                </p>
              </div>

              <button
                type="submit"
                disabled={isInviting}
                className="w-full h-12 bg-secky-blue-600 text-white font-bold rounded-xl hover:bg-secky-blue-800 transition-colors flex items-center justify-center"
              >
                {isInviting ? <><Loader2 size={16} className="mr-2 animate-spin" /> Envoi...</> : <><UserPlus size={16} className="mr-2" /> Envoyer l'invitation</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function AdminTeam() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <AdminTeamContent />
    </Suspense>
  );
}