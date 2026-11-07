"use client";
import { useState, useEffect, Suspense } from "react";
import { ArrowLeft, Download, FileText, Calendar, CheckCircle2, Loader2, FileSpreadsheet, TrendingUp, TrendingDown, Coins, Filter, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { generateExportPDF } from "@/lib/pdf";
import { generateExportExcel } from "@/lib/excel";
import { generateExportCSV } from "@/lib/csv";
import { useBrand } from "@/contexts/BrandContext";

function RapportsContent() {
  const { branding } = useBrand();
  const [period, setPeriod] = useState("30d");
  const [operator, setOperator] = useState("all");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ period, operator, type, status });
      const res = await fetch(`/api/rapports?${params.toString()}`);
      const json = await res.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, [period, operator, type, status]);

  const formatAmount = (n: number | undefined) => (n || 0).toLocaleString("fr-FR");

  const handleExport = (format: "pdf" | "excel" | "csv") => {
    if (!data) return;
    setIsGenerating(true);

    setTimeout(() => {
      const periodLabel = period === "today" ? "Aujourd'hui" : period === "7d" ? "7 derniers jours" : period === "30d" ? "30 derniers jours" : "90 derniers jours";
      const rows = data.transactions.map((tx: any) => [
        tx.date,
        tx.id,
        tx.subject,
        tx.type === "in" ? "Entrée" : "Sortie",
        tx.operator,
        tx.amount.toLocaleString("fr-FR"),
        tx.fees.toLocaleString("fr-FR"),
        tx.category,
        tx.status === "succeeded" ? "Réussi" : tx.status === "pending" ? "En attente" : tx.status === "failed" ? "Échoué" : "À vérifier",
      ]);

      const exportData = {
        title: "Rapport des transactions",
        subtitle: `${data.summary.count} transactions · Net encaissé : ${formatAmount(data.summary.netEncaisse)} FCFA`,
        period: periodLabel,
        columns: ["Date", "Réf", "Objet", "Type", "Opérateur", "Montant", "Frais", "Catégorie", "Statut"],
        rows: rows,
        brandColor: branding.primaryColor,
      };

      try {
        if (format === "pdf") generateExportPDF(exportData);
        else if (format === "excel") generateExportExcel({ ...exportData, sheetName: "Rapport" });
        else generateExportCSV({ title: exportData.title, period: exportData.period, columns: exportData.columns, rows: exportData.rows });
      } catch (e) {
        console.error(e);
      } finally {
        setTimeout(() => setIsGenerating(false), 500);
      }
    }, 300);
  };

  const activeFiltersCount = [operator, type, status].filter(f => f !== "all").length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-white flex overflow-x-hidden">
      <Suspense fallback={<div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-100 fixed left-0 top-0" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 md:ml-64 pb-32 md:pb-8 w-full max-w-full">
        
        <header className="pt-8 pb-4 px-5 md:px-8 flex items-center gap-4 bg-[#F8FAFC] md:bg-transparent border-b border-neutral-100 md:border-none">
          <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-secky-blue-900 rounded-full hover:bg-neutral-50 transition-colors shrink-0 shadow-sm md:hidden">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-secky-blue-900 tracking-tight">Rapports & Exports</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Filtrez, analysez et téléchargez vos données.</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-5xl mx-auto w-full space-y-5">
          
          {/* Sélecteur de période */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-neutral-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-secky-blue-600" />
                <h3 className="font-bold text-secky-blue-900">Période</h3>
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1 h-9 px-3 rounded-lg text-xs font-bold transition-colors relative ${showFilters ? "bg-secky-blue-600 text-white" : "bg-neutral-50 text-secky-blue-900 hover:bg-neutral-100"}`}
              >
                <Filter size={14} />
                Filtres
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-status-error text-white text-[10px] rounded-full flex items-center justify-center">{activeFiltersCount}</span>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: "today", label: "Aujourd'hui" },
                { id: "7d", label: "7 jours" },
                { id: "30d", label: "30 jours" },
                { id: "90d", label: "90 jours" },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p.id)}
                  className={`h-11 rounded-xl border-2 text-sm font-bold transition-all ${period === p.id ? "border-secky-blue-600 bg-secky-blue-50 text-secky-blue-600" : "border-neutral-200 text-neutral-500 hover:border-neutral-300"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Filtres avancés */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in-up">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Opérateur</label>
                  <select value={operator} onChange={(e) => setOperator(e.target.value)} className="w-full h-11 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-secky-blue-900 focus:outline-none focus:border-secky-blue-600">
                    <option value="all">Tous les opérateurs</option>
                    <option value="Orange Money">Orange Money</option>
                    <option value="Moov Money">Moov Money</option>
                    <option value="Wave">Wave</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="w-full h-11 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-secky-blue-900 focus:outline-none focus:border-secky-blue-600">
                    <option value="all">Tous les types</option>
                    <option value="in">Entrées</option>
                    <option value="out">Sorties</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Statut</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full h-11 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-secky-blue-900 focus:outline-none focus:border-secky-blue-600">
                    <option value="all">Tous les statuts</option>
                    <option value="succeeded">Réussies</option>
                    <option value="pending">En attente</option>
                    <option value="failed">Échouées</option>
                    <option value="to_verify">À vérifier</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Aperçu en direct */}
          {isLoading ? (
            <div className="bg-white rounded-[24px] p-12 shadow-sm border border-neutral-100 flex items-center justify-center">
              <Loader2 className="animate-spin text-secky-blue-600" size={32} />
            </div>
          ) : data ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={14} className="text-neutral-400" />
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Transactions</p>
                  </div>
                  <p className="text-2xl font-extrabold text-secky-blue-900">{data.summary.count}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp size={14} className="text-status-success" />
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Entrées</p>
                  </div>
                  <p className="text-xl font-extrabold text-status-success">{formatAmount(data.summary.totalEntries)} F</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown size={14} className="text-status-error" />
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Sorties</p>
                  </div>
                  <p className="text-xl font-extrabold text-status-error">{formatAmount(data.summary.totalExits)} F</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Coins size={14} className="text-orange-500" />
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Frais</p>
                  </div>
                  <p className="text-xl font-extrabold text-secky-blue-900">{formatAmount(data.summary.totalFees)} F</p>
                </div>
              </div>

              {/* Boutons d'export */}
              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-neutral-100">
                <h3 className="font-bold text-secky-blue-900 mb-4 flex items-center gap-2">
                  <Download size={18} className="text-secky-blue-600" />
                  Télécharger le rapport
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  {data.summary.count} transactions correspondent à vos filtres.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => handleExport("pdf")} 
                    disabled={isGenerating || data.summary.count === 0}
                    className="h-14 bg-white border-2 border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl flex flex-col items-center justify-center hover:border-secky-blue-300 hover:bg-secky-blue-50 transition-all disabled:opacity-50 active:scale-95"
                  >
                    <FileText size={18} className="mb-1" />
                    PDF
                  </button>
                  <button 
                    onClick={() => handleExport("excel")} 
                    disabled={isGenerating || data.summary.count === 0}
                    className="h-14 bg-white border-2 border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl flex flex-col items-center justify-center hover:border-secky-blue-300 hover:bg-secky-blue-50 transition-all disabled:opacity-50 active:scale-95"
                  >
                    <FileSpreadsheet size={18} className="mb-1" />
                    Excel
                  </button>
                  <button 
                    onClick={() => handleExport("csv")} 
                    disabled={isGenerating || data.summary.count === 0}
                    className="h-14 bg-white border-2 border-neutral-200 text-secky-blue-900 font-bold text-sm rounded-xl flex flex-col items-center justify-center hover:border-secky-blue-300 hover:bg-secky-blue-50 transition-all disabled:opacity-50 active:scale-95"
                  >
                    <FileText size={18} className="mb-1" />
                    CSV
                  </button>
                </div>
                {isGenerating && (
                  <p className="text-xs text-center text-secky-blue-600 font-bold mt-3 flex items-center justify-center gap-1">
                    <Loader2 size={12} className="animate-spin" /> Génération en cours...
                  </p>
                )}
              </div>

              {/* Liste des transactions filtrées */}
              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-neutral-100">
                <h3 className="font-bold text-secky-blue-900 mb-3">Aperçu des données ({data.summary.count})</h3>
                {data.summary.count === 0 ? (
                  <p className="text-center py-8 text-sm text-neutral-500">Aucune transaction ne correspond à ces filtres.</p>
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {data.transactions.slice(0, 20).map((tx: any) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tx.type === "in" ? "bg-green-50 text-status-success" : "bg-red-50 text-status-error"}`}>
                            {tx.type === "in" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-secky-blue-900 truncate">{tx.subject}</p>
                            <p className="text-[10px] text-neutral-500">{tx.id} · {tx.operator} · {tx.date}</p>
                          </div>
                        </div>
                        <p className={`text-xs font-extrabold shrink-0 ml-2 ${tx.type === "in" ? "text-status-success" : "text-status-error"}`}>
                          {tx.type === "in" ? "+" : "−"}{formatAmount(tx.amount)} F
                        </p>
                      </div>
                    ))}
                    {data.summary.count > 20 && (
                      <p className="text-xs text-center text-neutral-400 font-medium pt-2">
                        +{data.summary.count - 20} autres transactions (téléchargez pour tout voir)
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : null}

        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default function Rapports() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secky-blue-600" size={40} /></div>}>
      <RapportsContent />
    </Suspense>
  );
}