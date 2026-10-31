import { defaultCompanyInfo, getDocumentMetadata, CompanyInfo } from "./company";

interface CsvExportData {
  title: string;
  period: string;
  columns: string[];
  rows: (string | number)[][];
  companyInfo?: CompanyInfo;
}

export function generateExportCSV({ title, period, columns, rows, companyInfo }: CsvExportData) {
  const company = companyInfo || defaultCompanyInfo;
  const meta = getDocumentMetadata(title);

  // Construire les lignes
  const lines: string[] = [];

  // En-tête
  lines.push(`"${company.legalName}"`);
  lines.push(`"${company.address}, ${company.city} - ${company.country}"`);
  lines.push(`"Tél : ${company.phone} · Email : ${company.email}"`);
  lines.push(`"RCCM : ${company.rccm} · IFU : ${company.ifu}"`);
  lines.push(""); // ligne vide
  lines.push(`"${title}"`);
  lines.push(`"Période : ${period}"`);
  lines.push(`"Généré le : ${meta.generatedAt}"`);
  lines.push(`"Référence : ${meta.reference}"`);
  lines.push(""); // ligne vide

  // Colonnes
  lines.push(columns.map(c => `"${c}"`).join(";"));

  // Données
  rows.forEach(row => {
    lines.push(row.map(cell => {
      const str = String(cell ?? "").replace(/"/g, '""');
      return `"${str}"`;
    }).join(";"));
  });

  // Pied de page
  lines.push(""); // ligne vide
  lines.push(`"© ${new Date().getFullYear()} ${company.legalName} · Tous droits réservés"`);
  lines.push(`"Document ${meta.reference} · Vérifiable sur ${company.website}"`);
  lines.push(`"Compatible SYSCOHADA · Ne remplace pas la comptabilité officielle"`);

  // Contenu final avec BOM UTF-8 pour compatibilité Excel
  const content = "\uFEFF" + lines.join("\r\n");
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  
  // Télécharger
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${slugify(title)}-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function slugify(text: string) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}