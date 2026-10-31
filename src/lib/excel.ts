import * as XLSX from "xlsx";
import { defaultCompanyInfo, getDocumentMetadata, CompanyInfo } from "./company";

interface ExcelExportData {
  title: string;
  subtitle?: string;
  period: string;
  columns: string[];
  rows: (string | number)[][];
  companyInfo?: CompanyInfo;
  sheetName?: string;
}

export function generateExportExcel({ 
  title, 
  subtitle, 
  period, 
  columns, 
  rows, 
  companyInfo,
  sheetName 
}: ExcelExportData) {
  const company = companyInfo || defaultCompanyInfo;
  const meta = getDocumentMetadata(title);

  // Construire les données de la feuille avec en-tête et pied de page
  const headerRows: (string | number)[][] = [
    [company.legalName],
    [`${company.address}, ${company.city} - ${company.country}`],
    [`Tél : ${company.phone} · Email : ${company.email}`],
    [`RCCM : ${company.rccm} · IFU : ${company.ifu}`],
    [], // ligne vide
    [title],
    subtitle ? [subtitle] : [],
    [`Période : ${period}`],
    [`Généré le : ${meta.generatedAt}`],
    [`Référence : ${meta.reference}`],
    [], // ligne vide
  ];

  // Nettoyer les lignes vides optionnelles
  const cleanHeader = headerRows.filter(r => r.length > 0 || r.length === 0);

  // Données du tableau
  const tableRows = [columns, ...rows];

  // Pied de page
  const footerRows: (string | number)[][] = [
    [], // ligne vide
    [`© ${new Date().getFullYear()} ${company.legalName} · Tous droits réservés`],
    [`Document ${meta.reference} · Vérifiable sur ${company.website}`],
    ["Compatible SYSCOHADA · Ne remplace pas la comptabilité officielle"],
  ];

  const allData = [...headerRows, ...tableRows, ...footerRows];

  // Créer la feuille
  const ws = XLSX.utils.aoa_to_sheet(allData);

  // Largeurs de colonnes
  const colWidths = columns.map((col, idx) => {
    const maxLen = Math.max(
      col.length,
      ...rows.map(r => String(r[idx] || "").length)
    );
    return { wch: Math.min(Math.max(maxLen + 2, 12), 40) };
  });
  ws["!cols"] = colWidths;

  // Fusionner les cellules du titre
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: columns.length - 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: columns.length - 1 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: columns.length - 1 } },
    { s: { r: 3, c: 0 }, e: { r: 3, c: columns.length - 1 } },
    { s: { r: 5, c: 0 }, e: { r: 5, c: columns.length - 1 } },
    { s: { r: 7, c: 0 }, e: { r: 7, c: columns.length - 1 } },
    { s: { r: 8, c: 0 }, e: { r: 8, c: columns.length - 1 } },
    { s: { r: 9, c: 0 }, e: { r: 9, c: columns.length - 1 } },
  ];

  // Créer le workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName || "Export");

  // Générer le fichier
  const fileName = `${slugify(title)}-${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

function slugify(text: string) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}