"use client";
import { useState, useEffect } from "react";
import { Search, ArrowDownLeft, Clock, XCircle, SlidersHorizontal, Loader2, Download } from "lucide-react";
import { generateExportCSV } from "@/lib/csv";
import { generateExportExcel } from "@/lib/excel";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { Suspense } from "react";

export default function Transactions() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleExport = (format: "csv" | "excel") => {
    const data = {
      title: "Liste des transactions",
      period: "Toutes les transactions",
      columns: ["Date", "Référence", "Objet", "Opérateur", "Montant (FCFA)", "Statut"],
      rows: filteredTransactions.map(t => [
        t.date,
        t.id,
        t.subject,
        t.operator,
        t.amount.toLocaleString("fr-FR"),
        t.status === "succeeded" ? "Réussi" : t.status === "pending" ? "En attente" : "Échoué"
      ]),
    };
    if (format === "csv") generateExportCSV(data);
    else generateExportExcel({ ...data, sheetName: "Transactions" });
  };

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch("/api/transactions");
        const json = await res.json();
        setTransactions(json.data);
      } catch (error) {
        console.error("Erreur de chargement", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filter === "all" || t.status === filter;
    const matchesSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.reference.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "succeeded":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold bg-green-50 text-status-success uppercase tracking-wide whitespace-nowrap"><ArrowDownLeft size={10} /> Réussi</span>;
      case "pending":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold bg-orange-50 text-status-warning uppercase tracking-wide whitespace-nowrap"><Clock size={10} /> En attente</span>;
      case "failed":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold bg-red-50 text-status-error uppercase tracking-wide whitespace-nowrap"><XCircle size={10} /> Échoué</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex flex-col md:flex-row md:items-center justify-between bg-[#F8FAFC] md:bg-transparent gap-4 w-full">
          <div>
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Transactions</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Retrouvez l'historique de vos encaissements.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72 min-w-0">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full h-12 md:h-11 pl-11 pr-4 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-secky-blue-600 focus:ring-4 focus:ring-secky-blue-600/10 transition-all font-medium text-secky-blue-900 placeholder-neutral-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative group">
              <button className="w-12 h-12 md:w-11 md:h-11 bg-white border border-neutral-200 rounded-xl flex items-center justify-center text-secky-blue-900 shadow-sm hover:bg-neutral-50 active:scale-95 transition-all shrink-0">
                <Download size={20} />
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-neutral-200 py-1 min-w-[160px] hidden group-hover:block z-10">
                <button onClick={() => handleExport("csv")} className="w-full text-left px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-50">Export CSV</button>
                <button onClick={() => handleExport("excel")} className="w-full text-left px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-50">Export Excel</button>
              </div>
            </div>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-2 md:mt-6 max-w-6xl mx-auto w-full">
          
          <div className="flex gap-2.5 overflow-x-auto pb-4 mb-2 md:mb-6 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { id: "all", label: "Toutes" },
              { id: "succeeded", label: "Réussies" },
              { id: "pending", label: "En attente" },
              { id: "failed", label: "Échouées" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                  filter === f.id 
                    ? "bg-secky-blue-600 text-white shadow-md shadow-secky-blue-600/20" 
                    : "bg-white text-neutral-500 border border-neutral-200 hover:border-secky-blue-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="bg-transparent md:bg-white md:border md:border-neutral-100 md:rounded-[24px] md:shadow-sm md:overflow-hidden w-full">
            <div className="hidden md:grid grid-cols-12 gap-4 p-5 border-b border-neutral-100 bg-neutral-50/50 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              <div className="col-span-4">Transaction</div>
              <div className="col-span-3">Moyen de paiement</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-2 text-right">Montant</div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20 bg-white rounded-3xl md:rounded-none">
                <Loader2 size={32} className="animate-spin text-secky-blue-600" />
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl md:rounded-none border border-neutral-100 md:border-none w-full">
                <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-neutral-300" />
                </div>
                <p className="text-neutral-900 font-bold mb-1">Aucune transaction trouvée</p>
                <p className="text-sm text-neutral-500">Modifiez votre recherche ou vos filtres.</p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-0 w-full">
                {filteredTransactions.map((t) => (
                  <Link 
                    href={`/transactions/${t.id}`} 
                    key={t.id}
                    className="block bg-white md:bg-transparent rounded-2xl md:rounded-none border border-neutral-100 md:border-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] md:shadow-none p-4 md:p-5 md:border-b md:border-neutral-100 md:last:border-none md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-neutral-50 transition-colors group w-full"
                  >
                    <div className="flex items-start justify-between w-full md:col-span-4 md:justify-start md:items-center md:gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-secky-blue-50 flex items-center justify-center text-secky-blue-600 shrink-0">
                          <ArrowDownLeft size={22} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-secky-blue-900 text-[15px] leading-tight truncate">{t.subject}</p>
                          <p className="text-xs text-neutral-400 font-medium mt-0.5 truncate">{t.reference || t.id}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2 md:hidden">
                        <p className="font-extrabold text-secky-blue-900 text-[15px]">{t.amount.toLocaleString("fr-FR")} F</p>
                        <div className="mt-1 flex justify-end">{getStatusBadge(t.status)}</div>
                      </div>
                    </div>

                    <div className="hidden md:block md:col-span-3 text-sm font-semibold text-neutral-600">
                      {t.operator}
                    </div>

                    <div className="hidden md:block md:col-span-3 text-sm font-medium text-neutral-500">
                      {t.date}
                    </div>

                    <div className="hidden md:flex md:col-span-2 flex-col items-end justify-center">
                      <p className="font-extrabold text-secky-blue-900 text-[15px]">{t.amount.toLocaleString("fr-FR")} FCFA</p>
                      <div className="mt-1">{getStatusBadge(t.status)}</div>
                    </div>

                    <div className="flex justify-between items-center md:hidden pt-3 mt-3 border-t border-neutral-100 w-full">
                      <p className="text-[11px] text-neutral-400 font-medium truncate">{t.date}</p>
                      <span className="text-[11px] font-bold text-neutral-400 bg-neutral-50 px-2 py-1 rounded-md shrink-0 ml-2">{t.operator}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}