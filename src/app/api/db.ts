export type TransactionStatus = "succeeded" | "pending" | "failed" | "to_verify";

export interface Transaction {
  id: string;
  subject: string;
  reference: string;
  amount: number;
  status: TransactionStatus;
  operator: string;
  date: string;
  merchantName: string;
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  sector: string;
  status: "active" | "pending" | "suspended";
  risk: "low" | "medium" | "high";
  volume: number;
  joined: string;
  ownerName: string;
  ownerEmail: string;
}

export interface Branding {
  brandName: string;
  logoBase64: string | null;
  primaryColor: string;
  isCustom: boolean;
}

export const mockDb = {
  branding: {
    brandName: "Secky Tech",
    logoBase64: null,
    primaryColor: "#105BAE",
    isCustom: false,
  } as Branding,

  companies: [
    { id: "ENT-001", name: "Secky Tech", sector: "Services", status: "active", risk: "low", volume: 850000, joined: "12/01/2026", ownerName: "Kofi B.", ownerEmail: "kofi@seckytech.com" },
    { id: "ENT-002", name: "École Les Lauriers", sector: "Éducation", status: "active", risk: "low", volume: 1250000, joined: "05/02/2026", ownerName: "Sylvain K.", ownerEmail: "sylvain@lauriers.bf" },
    { id: "ENT-003", name: "Boutique Awa", sector: "Commerce", status: "active", risk: "medium", volume: 320000, joined: "18/03/2026", ownerName: "Awa T.", ownerEmail: "awa@boutique.bf" },
    { id: "ENT-004", name: "Startup Faso", sector: "E-commerce", status: "pending", risk: "low", volume: 0, joined: "25/10/2026", ownerName: "Aminata M.", ownerEmail: "aminata@startup.bf" },
    { id: "ENT-005", name: "Resto Chez Tanti", sector: "Restauration", status: "suspended", risk: "high", volume: 50000, joined: "02/08/2026", ownerName: "Tanti A.", ownerEmail: "tanti@resto.bf" },
  ] as Company[],

  transactions: [
    { id: "TX-1001", subject: "Cantine Octobre", reference: "CMD-1024", amount: 25000, status: "succeeded", operator: "Orange Money", date: "26/10/2026 10:45", merchantName: "Secky Tech", companyId: "ENT-001" },
    { id: "TX-1002", subject: "Frais de scolarité", reference: "CMD-1025", amount: 50000, status: "pending", operator: "Wave", date: "26/10/2026 09:30", merchantName: "Secky Tech", companyId: "ENT-001" },
    { id: "TX-1003", subject: "Vente Marchandise", reference: "CMD-1026", amount: 12500, status: "succeeded", operator: "Moov Money", date: "25/10/2026 16:20", merchantName: "École Les Lauriers", companyId: "ENT-002" },
    { id: "TX-1004", subject: "Abonnement", reference: "CMD-1027", amount: 5000, status: "failed", operator: "Orange Money", date: "25/10/2026 14:10", merchantName: "École Les Lauriers", companyId: "ENT-002" },
    { id: "TX-1005", subject: "Achat fournitures", reference: "CMD-1028", amount: 35000, status: "succeeded", operator: "Wave", date: "25/10/2026 11:00", merchantName: "Boutique Awa", companyId: "ENT-003" },
  ] as Transaction[],

  addTransaction: (tx: Omit<Transaction, "id" | "date">) => {
    const newTx: Transaction = {
      ...tx,
      id: `TX-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toLocaleString("fr-FR").replace(",", ""),
    };
    mockDb.transactions.unshift(newTx);
    return newTx;
  },

  updateTransactionStatus: (id: string, status: TransactionStatus) => {
    const tx = mockDb.transactions.find(t => t.id === id);
    if (tx) tx.status = status;
    return tx;
  },

  updateCompanyStatus: (id: string, companyStatus: Company["status"]) => {
    const company = mockDb.companies.find(c => c.id === id);
    if (company) company.status = companyStatus;
    return company;
  },

  updateBranding: (data: Partial<Branding>) => {
    mockDb.branding = { ...mockDb.branding, ...data };
    return mockDb.branding;
  }
};