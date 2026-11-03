import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { defaultCompanyInfo, getDocumentMetadata, CompanyInfo } from "./company";

interface ReceiptData {
  merchantName: string;
  amount: number;
  subject: string;
  reference: string;
  date: string;
  operator: string;
  brandColor: string;
  companyInfo?: CompanyInfo;
}

// Fonction utilitaire pour formater un montant proprement
function formatAmountForPDF(amount: number): string {
  return amount.toLocaleString("fr-FR")
    .replace(/\u202f/g, " ") // Remplace l'espace fine insécable par un espace normal
    .replace(/\u00a0/g, " "); // Remplace l'espace insécable par un espace normal
}

// =========================================================
// REÇU PDF (A5)
// =========================================================
export function generateReceiptPDF(data: ReceiptData) {
  const doc = new jsPDF({ format: "a5", unit: "mm" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const brandRgb = hexToRgb(data.brandColor);
  const company = data.companyInfo || defaultCompanyInfo;
  const meta = getDocumentMetadata("Reçu de paiement");

  // ---------- EN-TÊTE ----------
  doc.setFillColor(brandRgb[0], brandRgb[1], brandRgb[2]);
  doc.rect(0, 0, pageWidth, 5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(12, 29, 67);
  doc.text(company.legalName, 15, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(`${company.address}, ${company.city} - ${company.country}`, 15, 24);
  doc.text(`${company.phone} · ${company.email}`, 15, 28);
  doc.text(`RCCM: ${company.rccm} · IFU: ${company.ifu}`, 15, 32);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(brandRgb[0], brandRgb[1], brandRgb[2]);
  doc.text(meta.reference, pageWidth - 15, 18, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);
  doc.text(meta.generatedAt, pageWidth - 15, 23, { align: "right" });

  doc.setDrawColor(brandRgb[0], brandRgb[1], brandRgb[2]);
  doc.setLineWidth(0.5);
  doc.line(15, 37, pageWidth - 15, 37);

  // ---------- TITRE ----------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(12, 29, 67);
  doc.text("REÇU DE PAIEMENT", pageWidth / 2, 48, { align: "center" });

  // ---------- MONTANT ----------
  // Utilisation de la fonction de formatage propre
  const formattedAmount = formatAmountForPDF(data.amount);
  
  doc.setFontSize(26); // Légèrement réduit pour éviter les débordements
  doc.setTextColor(brandRgb[0], brandRgb[1], brandRgb[2]);
  doc.text(`${formattedAmount} FCFA`, pageWidth / 2, 62, { align: "center" });

  // ---------- BADGE STATUT (avec coche vectorielle) ----------
  const badgeWidth = 60;
  const badgeHeight = 8;
  const badgeX = (pageWidth - badgeWidth) / 2;
  const badgeY = 67;
  
  // Fond vert clair
  doc.setFillColor(209, 250, 229);
  doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 4, 4, "F");
  
  // Texte "PAIEMENT RÉUSSI"
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(21, 127, 59);
  doc.text("PAIEMENT RÉUSSI", pageWidth / 2 + 3, badgeY + 5.5, { align: "center" });
  
  // Coche vectorielle (dessinée manuellement)
  const checkX = badgeX + 10;
  const checkY = badgeY + 4.5;
  doc.setDrawColor(21, 127, 59);
  doc.setLineWidth(0.8);
  doc.line(checkX - 2, checkY, checkX, checkY + 2);
  doc.line(checkX, checkY + 2, checkX + 3, checkY - 2);

  // ---------- DÉTAILS ----------
  const detailsStartY = 85;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);

  const details = [
    ["Marchand", data.merchantName],
    ["Objet", data.subject],
    ["Référence", data.reference],
    ["Date et heure", data.date],
    ["Moyen de paiement", data.operator],
  ];

  let y = detailsStartY;
  details.forEach(([label, value]) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(9);
    doc.text(String(label), 20, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(12, 29, 67);
    doc.text(String(value), pageWidth - 20, y, { align: "right" });
    y += 7;
  });

  // ---------- PIED DE PAGE ----------
  const footerY = pageHeight - 20;
  
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(15, footerY - 5, pageWidth - 15, footerY - 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text("Ce reçu est vérifiable sur " + company.website, pageWidth / 2, footerY, { align: "center" });
  doc.text(`© ${new Date().getFullYear()} ${company.legalName} · Document généré électroniquement`, pageWidth / 2, footerY + 4, { align: "center" });
  doc.text("Conservez ce reçu comme preuve de paiement.", pageWidth / 2, footerY + 8, { align: "center" });

  doc.save(`recu-${data.reference}.pdf`);
}

// =========================================================
// EXPORT GÉNÉRIQUE PDF (A4)
// =========================================================
interface ExportData {
  title: string;
  subtitle?: string;
  period: string;
  columns: string[];
  rows: (string | number)[][];
  companyInfo?: CompanyInfo;
  brandColor?: string;
}

export function generateExportPDF({ title, subtitle, period, columns, rows, companyInfo, brandColor = "#105BAE" }: ExportData) {
  const doc = new jsPDF({ format: "a4", orientation: "landscape" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const company = companyInfo || defaultCompanyInfo;
  const meta = getDocumentMetadata(title);
  const brandRgb = hexToRgb(brandColor);

  const drawHeader = () => {
    doc.setFillColor(brandRgb[0], brandRgb[1], brandRgb[2]);
    doc.rect(0, 0, pageWidth, 4, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(12, 29, 67);
    doc.text(company.legalName, 14, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`${company.address}, ${company.city} - ${company.country}`, 14, 20);
    doc.text(`${company.phone} · ${company.email} · ${company.website}`, 14, 24);
    doc.text(`RCCM: ${company.rccm} · IFU: ${company.ifu}`, 14, 28);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(brandRgb[0], brandRgb[1], brandRgb[2]);
    doc.text(meta.reference, pageWidth - 14, 15, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`Généré le ${meta.generatedAt}`, pageWidth - 14, 20, { align: "right" });

    doc.setDrawColor(brandRgb[0], brandRgb[1], brandRgb[2]);
    doc.setLineWidth(0.5);
    doc.line(14, 32, pageWidth - 14, 32);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(12, 29, 67);
    doc.text(title, 14, 42);

    if (subtitle) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(subtitle, 14, 47);
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Période : ${period}`, 14, subtitle ? 52 : 47);
  };

  drawHeader();

  autoTable(doc, {
    startY: subtitle ? 58 : 53,
    head: [columns],
    body: rows,
    styles: { fontSize: 8, cellPadding: 2.5 },
    headStyles: { 
      fillColor: [brandRgb[0], brandRgb[1], brandRgb[2]], 
      textColor: [255, 255, 255], 
      fontStyle: "bold",
      fontSize: 8.5,
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14, bottom: 25 },
    didDrawPage: (data) => {
      if (data.pageNumber > 1) {
        drawHeader();
      }
    },
  });

  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const footerY = pageHeight - 15;
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(14, footerY - 5, pageWidth - 14, footerY - 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(`© ${new Date().getFullYear()} ${company.legalName} · Tous droits réservés`, 14, footerY);
    doc.text("Compatible SYSCOHADA · Ne remplace pas la comptabilité officielle", pageWidth / 2, footerY, { align: "center" });
    doc.text(`Page ${i} / ${pageCount}`, pageWidth - 14, footerY, { align: "right" });
    
    doc.setTextColor(180, 180, 180);
    doc.setFontSize(6);
    doc.text(`Document ${meta.reference} · Vérifiable sur ${company.website}`, pageWidth / 2, footerY + 4, { align: "center" });
  }

  doc.save(`${slugify(title)}-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [16, 91, 174];
}

function slugify(text: string) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}