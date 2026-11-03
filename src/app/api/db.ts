// Base de données simulée - MVP SeckyPay v1.1
// Refonte selon document explicatif MVP (Nov 2026)

export type TransactionStatus = "succeeded" | "pending" | "failed" | "to_verify" | "refunded";
export type TransactionType = "in" | "out";
export type FeesSource = "real" | "estimated";
export type TransactionSource = "seckypay" | "import" | "manual";

export interface Transaction {
  id: string;
  subject: string;
  reference: string;
  amount: number;
  status: TransactionStatus;
  operator: string;
  date: string;
  merchantName: string;
  companyId?: string;
  // NOUVEAUX CHAMPS MVP v1.1
  type: TransactionType;           // "in" = entrée, "out" = sortie
  category: string;                 // Vente, Salaire, Fournisseur, Dépense, Autre
  note?: string;
  fees: number;                     // frais d'opérateur
  feesSource: FeesSource;           // "real" ou "estimated"
  source: TransactionSource;        // origine de l'enregistrement
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

export interface CashRegister {
  date: string;
  openingBalance: number;          // solde d'ouverture saisi
  closingBalance: number | null;   // solde réel de clôture saisi
  status: "open" | "closed";
  gap: number | null;               // écart calculé
  gapReason?: string;
  closedAt?: string;
}

export const mockDb = {
  branding: {
    brandName: "Secky Tech",
    logoBase64: null,
    primaryColor: "#105BAE",
    isCustom: false,
  } as Branding,

  // Registre de caisse du jour
  cashRegister: {
    date: new Date().toISOString().split("T")[0],
    openingBalance: 200000,
    closingBalance: null,
    status: "open",
    gap: null,
  } as CashRegister,

  companies: [
    { id: "ENT-001", name: "Secky Tech", sector: "Services", status: "active", risk: "low", volume: 850000, joined: "12/01/2026", ownerName: "Kofi B.", ownerEmail: "kofi@seckytech.com" },
    { id: "ENT-002", name: "École Les Lauriers", sector: "Éducation", status: "active", risk: "low", volume: 1250000, joined: "05/02/2026", ownerName: "Sylvain K.", ownerEmail: "sylvain@lauriers.bf" },
    { id: "ENT-003", name: "Boutique Awa", sector: "Commerce", status: "active", risk: "medium", volume: 320000, joined: "18/03/2026", ownerName: "Awa T.", ownerEmail: "awa@boutique.bf" },
    { id: "ENT-004", name: "Startup Faso", sector: "E-commerce", status: "pending", risk: "low", volume: 0, joined: "25/10/2026", ownerName: "Aminata M.", ownerEmail: "aminata@startup.bf" },
    { id: "ENT-005", name: "Resto Chez Tanti", sector: "Restauration", status: "suspended", risk: "high", volume: 50000, joined: "02/08/2026", ownerName: "Tanti A.", ownerEmail: "tanti@resto.bf" },
  ] as Company[],

  transactions: [
    // ENTRÉES (in)
    { id: "TX-1001", subject: "Cantine Octobre", reference: "CMD-1024", amount: 25000, status: "succeeded", operator: "Orange Money", date: "26/10/2026 10:45", merchantName: "Secky Tech", companyId: "ENT-001", type: "in", category: "Vente", fees: 250, feesSource: "real", source: "seckypay", note: "Paiement cantine" },
    { id: "TX-1003", subject: "Vente Marchandise", reference: "CMD-1026", amount: 12500, status: "succeeded", operator: "Moov Money", date: "25/10/2026 16:20", merchantName: "École Les Lauriers", companyId: "ENT-002", type: "in", category: "Vente", fees: 125, feesSource: "real", source: "seckypay" },
    { id: "TX-1005", subject: "Achat fournitures", reference: "CMD-1028", amount: 35000, status: "succeeded", operator: "Wave", date: "25/10/2026 11:00", merchantName: "Boutique Awa", companyId: "ENT-003", type: "in", category: "Vente", fees: 350, feesSource: "real", source: "seckypay" },

    // SORTIES (out)
    { id: "TX-1006", subject: "Salaire Aminata", reference: "OUT-001", amount: 50000, status: "succeeded", operator: "Wave", date: "26/10/2026 09:30", merchantName: "Secky Tech", companyId: "ENT-001", type: "out", category: "Salaire", fees: 500, feesSource: "real", source: "seckypay", note: "Salaire octobre" },
    { id: "TX-1007", subject: "Fournisseur Faso", reference: "OUT-002", amount: 25000, status: "succeeded", operator: "Orange Money", date: "25/10/2026 14:10", merchantName: "Secky Tech", companyId: "ENT-001", type: "out", category: "Fournisseur", fees: 250, feesSource: "estimated", source: "seckypay" },

    // EN ATTENTE
    { id: "TX-1002", subject: "Frais de scolarité", reference: "CMD-1025", amount: 50000, status: "pending", operator: "Wave", date: "26/10/2026 09:30", merchantName: "Secky Tech", companyId: "ENT-001", type: "in", category: "Vente", fees: 0, feesSource: "estimated", source: "seckypay" },

    // ÉCHOUÉE
    { id: "TX-1004", subject: "Abonnement", reference: "CMD-1027", amount: 5000, status: "failed", operator: "Orange Money", date: "25/10/2026 14:10", merchantName: "École Les Lauriers", companyId: "ENT-002", type: "in", category: "Vente", fees: 0, feesSource: "estimated", source: "seckypay" },
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
  },

  // Clôture de caisse
  openCashRegister: (openingBalance: number) => {
    mockDb.cashRegister = {
      date: new Date().toISOString().split("T")[0],
      openingBalance,
      closingBalance: null,
      status: "open",
      gap: null,
    };
    return mockDb.cashRegister;
  },

  closeCashRegister: (closingBalance: number, gapReason?: string) => {
    // Calculer les totaux du jour
    const today = new Date().toISOString().split("T")[0];
    const todayTx = mockDb.transactions.filter(tx => {
      const txDate = tx.date.split(" ")[0];
      return txDate.includes(today.split("-").reverse().join("/")) && tx.status === "succeeded";
    });

    const totalIn = todayTx.filter(tx => tx.type === "in").reduce((s, tx) => s + tx.amount, 0);
    const totalOut = todayTx.filter(tx => tx.type === "out").reduce((s, tx) => s + tx.amount, 0);
    const totalFees = todayTx.reduce((s, tx) => s + tx.fees, 0);
    const variation = totalIn - totalOut - totalFees;
    const expectedBalance = mockDb.cashRegister.openingBalance + variation;
    const gap = closingBalance - expectedBalance;

    mockDb.cashRegister = {
      ...mockDb.cashRegister,
      closingBalance,
      status: "closed",
      gap,
      gapReason,
      closedAt: new Date().toLocaleString("fr-FR"),
    };
    return mockDb.cashRegister;
  },
};