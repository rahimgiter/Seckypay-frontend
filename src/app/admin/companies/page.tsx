"use client";
import { Suspense, useState, useEffect } from "react";
import { Search, Filter, MoreVertical, ExternalLink, Loader2, ArrowLeft, Building2, Store } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileWarning from "@/components/AdminMobileWarning";
import Link from "next/link";

type AccountType = "all" | "b2b" | "b2c";

export default function AdminCompanies() {
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("all");
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await fetch("/api/admin/companies");
        const json = await res.json();
        setCompanies(json.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  let filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  if (accountType !== "all") {
    filtered = filtered.filter(c => c.accountType === accountType);
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active": return <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-status-success uppercase whitespace-nowrap">Actif</span>;
      case "pending": return <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-status-warning uppercase whitespace-nowrap">En attente</span>;
      case "suspended": return <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-50 text-status-error uppercase whitespace-nowrap">Suspendu</span>;
      default: return null;
    }
  };

  const getAccountTypeBadge = (type: string | undefined) => {
    if (type === "b2b") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-secky-blue-50 text-secky-blue-700 uppercase"><Building2 size={10} /> B2B</span>;
    if (type === "b2c") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-700 uppercase"><Store size={10} /> B2C</span>;
    return null;
  };

  const counts = {
    all: companies.length,
    b2b: companies.filter(c => c.accountType === "b2b").length,
    b2c: companies.filter(c => c.accountType === "b2c").length,
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
              <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Entreprises</h1>
              <p className="text-sm text-neutral-500 font-medium mt-1">Gérez les comptes B2B et B2C de la plateforme.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard" className="h-10 px-4 bg-white border border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl hover:bg-neutral-50 transition-colors flex items-center gap-2">
                <ArrowLeft size={16} /> Espace marchand
              </Link>
              <div className="relative w-64">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-10 pl-10 pr-4 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600" />
              </div>
            </div>
          </header>

          {/* Filtres par type de compte */}
          <div className="grid grid-cols-3 gap-2 mb-4 max-w-lg">
            <button onClick={() => setAccountType("all")} className={`h-10 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${accountType === "all" ? "bg-secky-blue-600 text-white" : "bg-white border border-neutral-200 text-neutral-500 hover:border-secky-blue-300"}`}>
              Toutes ({counts.all})
            </button>
            <button onClick={() => setAccountType("b2b")} className={`h-10 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${accountType === "b2b" ? "bg-secky-blue-600 text-white" : "bg-white border border-neutral-200 text-neutral-500 hover:border-secky-blue-300"}`}>
              <Building2 size={14} /> B2B ({counts.b2b})
            </button>
            <button onClick={() => setAccountType("b2c")} className={`h-10 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${accountType === "b2c" ? "bg-secky-blue-600 text-white" : "bg-white border border-neutral-200 text-neutral-500 hover:border-secky-blue-300"}`}>
              <Store size={14} /> B2C ({counts.b2c})
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden w-full">
            {isLoading ? (
              <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-secky-blue-600" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-100">
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Entreprise</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Type</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Secteur</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Volume (30j)</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Statut</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-center">Risque</th>
                      <th className="p-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {filtered.map((c) => (
                      <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-secky-blue-100 flex items-center justify-center font-bold text-secky-blue-600 text-xs shrink-0">{c.name.substring(0, 2).toUpperCase()}</div>
                            <div>
                              <p className="font-bold text-sm text-secky-blue-900 whitespace-nowrap">{c.name}</p>
                              <p className="text-[10px] text-neutral-400 font-mono">{c.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{getAccountTypeBadge(c.accountType)}</td>
                        <td className="p-4 text-sm font-medium text-neutral-600 whitespace-nowrap">{c.sector}</td>
                        <td className="p-4 text-sm font-bold text-secky-blue-900 text-right tabular-nums whitespace-nowrap">{c.volume.toLocaleString("fr-FR")} F</td>
                        <td className="p-4">{getStatusBadge(c.status)}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-block w-2 h-2 rounded-full ${c.risk === "low" ? "bg-green-500" : c.risk === "medium" ? "bg-orange-500" : "bg-red-500"}`}></span>
                        </td>
                        <td className="p-4 text-right">
                          <Link href={`/admin/companies/${c.id}`} className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-neutral-400 hover:bg-secky-blue-50 hover:text-secky-blue-600 transition-colors">
                            <ExternalLink size={16} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </main>
      </div>
    </>
  );
}