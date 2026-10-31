"use client";
import { useState } from "react";
import { ArrowLeft, Download, FileText, Calendar, CheckCircle2, Loader2, FileSpreadsheet, FileDown } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { generateExportPDF } from "@/lib/pdf";
import { generateExportExcel } from "@/lib/excel";
import { generateExportCSV } from "@/lib/csv";
import { useBrand } from "@/contexts/BrandContext";
import { Suspense } from "react";

const templates = [
  { id: "activity", name: "Activité par statut", desc: "Liste des transactions avec leur statut final.", columns: ["Date", "Référence", "Objet", "Opérateur", "Montant (FCFA)", "Statut"] },
  { id: "revenue", name: "Encaissements par moyen", desc: "Répartition des montants par opérateur.", columns: ["Opérateur", "Nb transactions", "Montant brut", "Frais", "Net"] },
  { id: "fees", name: "Frais et règlements", desc: "Frais déduits et versements reçus.", columns: ["Période", "Opérateur", "Brut", "Frais", "Net annoncé", "Statut"] },
  { id: "ledger", name: "Journal comptable", desc: "Écritures SYSCOHADA prêtes pour le comptable.", columns: ["Date", "N° Pièce", "Compte", "Libellé", "Débit", "Crédit"] },
  { id: "balance", name: "Balance générale", desc: "Synthèse des comptes débiteurs et créditeurs.", columns: ["Compte", "Intitulé", "Débit", "Crédit", "Solde"] },
];

const mockData: Record<string, (string | number)[][]> = {
  activity: [
    ["26/10/2026 10:45", "TX-1001", "Cantine Octobre", "Orange Money", "25 000", "Réussi"],
    ["26/10/2026 09:30", "TX-1002", "Frais scolarité", "Wave", "50 000", "En attente"],
    ["25/10/2026 16:20", "TX-1003", "Vente Marchandise", "Moov Money", "12 500", "Réussi"],
    ["25/10/2026 14:10", "TX-1004", "Abonnement", "Orange Money", "5 000", "Échoué"],
    ["25/10/2026 11:00", "TX-1005", "Achat fournitures", "Wave", "35 000", "Réussi"],
  ],
  revenue: [
    ["Orange Money", 45, "250 000", "5 000", "245 000"],
    ["Moov Money", 12, "80 000", "1 600", "78 400"],
    ["Wave", 30, "150 000", "1 500", "148 500"],
  ],
  fees: [
    ["23-26 Oct", "Orange Money", "250 000", "5 000", "245 000", "Reçu"],
    ["23-26 Oct", "Moov Money", "80 000", "1 600", "78 400", "Annoncé"],
    ["23-26 Oct", "Wave", "150 000", "1 500", "148 500", "Reçu"],
  ],
  ledger: [
    ["26/10/2026", "VT-001", "521000", "Encaissement Orange Money", "250 000", ""],
    ["26/10/2026", "VT-001", "701000", "Ventes de marchandises", "", "250 000"],
    ["26/10/2026", "VT-002", "521000", "Encaissement Wave", "150 000", ""],
    ["26/10/2026", "VT-002", "701000", "Ventes de marchandises", "", "150 000"],
  ],
  balance: [
    ["521000", "Banque - Orange Money", "250 000", "0", "250 000"],
    ["521001", "Banque - Wave", "150 000", "0", "150 000"],
    ["521002", "Banque - Moov", "80 000", "0", "80 000"],
    ["701000", "Ventes de marchandises", "0", "480 000", "-480 000"],
  ],
};

function RapportsContent() {
  const { branding } = useBrand();
  const [selectedTemplate, setSelectedTemplate] = useState("activity");
  const [format, setFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFile, setGeneratedFile] = useState<string | null>(null);
  const [period, setPeriod] = useState("01/10/2026 → 26/10/2026");

  const template = templates.find(t => t.id === selectedTemplate);

  const handleGenerate = () => {
    if (!template) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const data = {
        title: template.name,
        subtitle: template.desc,
        period,
        columns: template.columns,
        rows: mockData[selectedTemplate] || [],
        brandColor: branding.primaryColor,
      };

      try {
        if (format === "pdf") {
          generateExportPDF(data);
        } else if (format === "excel") {
          generateExportExcel({ ...data, sheetName: template.name.slice(0, 30) });
        } else if (format === "csv") {
          generateExportCSV({
            title: data.title,
            period: data.period,
            columns: data.columns,
            rows: data.rows,
          });
        }
        setGeneratedFile(`${template.name} (${format.toUpperCase()})`);
        setTimeout(() => setGeneratedFile(null), 3000);
      } catch (e) {
        alert("Erreur lors de la génération.");
      } finally {
        setIsGenerating(false);
      }
    }, 1200);
  };

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
            <p className="text-sm text-neutral-500 font-medium mt-1">Générez et téléchargez vos données au format PDF, Excel ou CSV.</p>
          </div>
        </header>

        <div className="px-5 md:px-8 mt-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Choix du modèle */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100">
              <h3 className="font-bold text-secky-blue-900">1. Choisissez un modèle</h3>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {templates.map((t) => {
                const isActive = selectedTemplate === t.id;
                return (
                  <button 
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${isActive ? "border-secky-blue-600 bg-secky-blue-50/50" : "border-neutral-200 hover:border-neutral-300"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isActive ? "bg-secky-blue-600 text-white" : "bg-neutral-100 text-neutral-500"}`}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${isActive ? "text-secky-blue-900" : "text-neutral-600"}`}>{t.name}</p>
                        <p className="text-xs text-neutral-500 mt-1">{t.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Paramètres */}
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-100">
              <h3 className="font-bold text-secky-blue-900">2. Paramètres de l'export</h3>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Période</label>
                <div className="flex items-center gap-2 h-11 px-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <Calendar size={16} className="text-neutral-400" />
                  <input 
                    type="text" 
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="bg-transparent focus:outline-none text-sm font-medium text-secky-blue-900 w-full" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Format</label>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => setFormat("pdf")} className={`h-11 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-1 ${format === "pdf" ? "border-secky-blue-600 bg-secky-blue-50 text-secky-blue-600" : "border-neutral-200 text-neutral-500"}`}>
                    <FileText size={14} /> PDF
                  </button>
                  <button onClick={() => setFormat("excel")} className={`h-11 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-1 ${format === "excel" ? "border-secky-blue-600 bg-secky-blue-50 text-secky-blue-600" : "border-neutral-200 text-neutral-500"}`}>
                    <FileSpreadsheet size={14} /> Excel
                  </button>
                  <button onClick={() => setFormat("csv")} className={`h-11 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-1 ${format === "csv" ? "border-secky-blue-600 bg-secky-blue-50 text-secky-blue-600" : "border-neutral-200 text-neutral-500"}`}>
                    <FileDown size={14} /> CSV
                  </button>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full h-14 font-bold rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center disabled:opacity-70 ${generatedFile ? "bg-status-success text-white" : "bg-secky-blue-600 text-white shadow-secky-blue-600/30 hover:bg-secky-blue-800"}`}
              >
                {isGenerating ? (
                  <><Loader2 size={18} className="mr-2 animate-spin" /> Génération en cours...</>
                ) : generatedFile ? (
                  <><CheckCircle2 size={18} className="mr-2" /> Téléchargé !</>
                ) : (
                  <><Download size={18} className="mr-2" /> Télécharger au format {format.toUpperCase()}</>
                )}
              </button>
              <p className="text-xs text-neutral-400 text-center mt-3">
                L'en-tête contient vos informations légales et le pied de page la mention de traçabilité.
              </p>
            </div>
          </div>

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