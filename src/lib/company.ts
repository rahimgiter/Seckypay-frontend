// Informations de l'entreprise pour les en-têtes et pieds de page des documents
// Ces données seraient normalement récupérées depuis l'API de l'entreprise

export interface CompanyInfo {
  name: string;
  legalName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  rccm: string;
  ifu: string;
  website: string;
}

export const defaultCompanyInfo: CompanyInfo = {
  name: "Secky Tech",
  legalName: "Secky Tech SARL",
  address: "Avenue Kwame N'Krumah, Secteur 4",
  city: "Ouagadougou",
  country: "Burkina Faso",
  phone: "+226 70 00 00 00",
  email: "contact@seckytech.com",
  rccm: "BF-OUA-01-2024-B12-01234",
  ifu: "00012345X",
  website: "seckypay.com",
};

export function getDocumentMetadata(docType: string) {
  const now = new Date();
  return {
    docType,
    generatedAt: now.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    reference: `DOC-${now.getTime().toString().slice(-8)}`,
  };
}