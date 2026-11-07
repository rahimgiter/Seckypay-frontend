// Base de données simulée - MVP SeckyPay v1.1 + Sprint 4

// =========================================================
// TYPES TRANSACTIONS
// =========================================================
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
  type: TransactionType;
  category: string;
  note?: string;
  fees: number;
  feesSource: FeesSource;
  source: TransactionSource;
}

// =========================================================
// TYPES ENTREPRISES (Sprint 4 : B2B/B2C)
// =========================================================
export type AccountType = "b2b" | "b2c";

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
  accountType?: AccountType;
}

// =========================================================
// TYPES ÉQUIPE INTERNE (Sprint 4)
// =========================================================
export type InternalRole = "super_admin" | "b2b_manager" | "b2c_manager" | "support" | "finance" | "operations";
export type InternalStatus = "active" | "inactive" | "invited";

export interface InternalMember {
  id: string;
  name: string;
  email: string;
  role: InternalRole;
  status: InternalStatus;
  joinedAt: string;
  lastLogin: string;
  twoFA: boolean;
  assignedCompanies?: string[];
}

// =========================================================
// AUTRES TYPES
// =========================================================
export interface Branding {
  brandName: string;
  logoBase64: string | null;
  primaryColor: string;
  isCustom: boolean;
}

export interface CashRegister {
  date: string;
  openingBalance: number;
  closingBalance: number | null;
  status: "open" | "closed";
  gap: number | null;
  gapReason?: string;
  closedAt?: string;
}

export interface MobileMoneyAccount {
  id: string;
  operator: "Orange Money" | "Wave" | "Moov Money";
  phone: string;
  holderName: string;
  label: string;
  status: "pending" | "verified";
  isDefault: boolean;
  createdAt: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  phone: string;
  operator: "Orange Money" | "Wave" | "Moov Money";
  createdAt: string;
}

// =========================================================
// MOCK DB
// =========================================================
export const mockDb = {
  branding: {
    brandName: "Secky Tech",
    logoBase64: null,
    primaryColor: "#105BAE",
    isCustom: false,
  } as Branding,

  cashRegister: {
    date: new Date().toISOString().split("T")[0],
    openingBalance: 200000,
    closingBalance: null,
    status: "open",
    gap: null,
  } as CashRegister,

  // Équipe interne SeckyPay
  internalTeam: [
    { id: "TM-001", name: "Kofi Bakayoko", email: "kofi@seckytech.com", role: "super_admin", status: "active", joinedAt: "12/01/2026", lastLogin: "Aujourd'hui, 08:30", twoFA: true, assignedCompanies: [] },
    { id: "TM-002", name: "Aminata Sawadogo", email: "aminata@seckytech.com", role: "b2b_manager", status: "active", joinedAt: "15/02/2026", lastLogin: "Aujourd'hui, 09:15", twoFA: true, assignedCompanies: ["ENT-001", "ENT-002"] },
    { id: "TM-003", name: "Oumar Traoré", email: "oumar@seckytech.com", role: "b2c_manager", status: "active", joinedAt: "20/03/2026", lastLogin: "Hier, 17:45", twoFA: false, assignedCompanies: ["ENT-003", "ENT-004"] },
    { id: "TM-004", name: "Fatou Sanou", email: "fatou@seckytech.com", role: "support", status: "active", joinedAt: "10/04/2026", lastLogin: "Il y a 2 heures", twoFA: true, assignedCompanies: [] },
    { id: "TM-005", name: "Ibrahim Kaboré", email: "ibrahim@seckytech.com", role: "finance", status: "active", joinedAt: "05/05/2026", lastLogin: "Aujourd'hui, 07:00", twoFA: true, assignedCompanies: [] },
    { id: "TM-006", name: "Moussa Diallo", email: "moussa@seckytech.com", role: "operations", status: "active", joinedAt: "01/06/2026", lastLogin: "Aujourd'hui, 06:30", twoFA: true, assignedCompanies: [] },
    { id: "TM-007", name: "Awa Ouédraogo", email: "awa@seckytech.com", role: "b2b_manager", status: "invited", joinedAt: "25/10/2026", lastLogin: "-", twoFA: false, assignedCompanies: [] },
  ] as InternalMember[],

  addInternalMember: (member: Omit<InternalMember, "id" | "joinedAt" | "lastLogin" | "twoFA">) => {
    const newMember: InternalMember = {
      ...member,
      id: `TM-${String(mockDb.internalTeam.length + 1).padStart(3, "0")}`,
      joinedAt: new Date().toLocaleDateString("fr-FR"),
      lastLogin: "-",
      twoFA: false,
    };
    mockDb.internalTeam.push(newMember);
    return newMember;
  },

  updateInternalMember: (id: string, data: Partial<InternalMember>) => {
    const member = mockDb.internalTeam.find(m => m.id === id);
    if (member) Object.assign(member, data);
    return member;
  },

  deleteInternalMember: (id: string) => {
    mockDb.internalTeam = mockDb.internalTeam.filter(m => m.id !== id);
    return true;
  },

  // Comptes mobile money du marchand
  accounts: [
    { id: "ACC-001", operator: "Orange Money", phone: "+226 70 11 22 33", holderName: "Secky Tech", label: "Compte principal", status: "verified", isDefault: true, createdAt: "01/09/2026" },
    { id: "ACC-002", operator: "Wave", phone: "+226 65 44 55 66", holderName: "Secky Tech", label: "Compte secondaire", status: "verified", isDefault: false, createdAt: "15/09/2026" },
  ] as MobileMoneyAccount[],

  addAccount: (account: Omit<MobileMoneyAccount, "id" | "createdAt">) => {
    const newAccount: MobileMoneyAccount = {
      ...account,
      id: `ACC-${String(mockDb.accounts.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toLocaleDateString("fr-FR"),
    };
    mockDb.accounts.push(newAccount);
    return newAccount;
  },

  updateAccount: (id: string, data: Partial<MobileMoneyAccount>) => {
    const account = mockDb.accounts.find(a => a.id === id);
    if (account) Object.assign(account, data);
    return account;
  },

  deleteAccount: (id: string) => {
    mockDb.accounts = mockDb.accounts.filter(a => a.id !== id);
    return true;
  },

  // Bénéficiaires
  beneficiaries: [
    { id: "BEN-001", name: "Aminata Sawadogo", phone: "+226 70 22 33 44", operator: "Orange Money", createdAt: "10/10/2026" },
    { id: "BEN-002", name: "Fournisseur Faso", phone: "+226 65 77 88 99", operator: "Wave", createdAt: "12/10/2026" },
  ] as Beneficiary[],

  addBeneficiary: (benef: Omit<Beneficiary, "id" | "createdAt">) => {
    const newBenef: Beneficiary = {
      ...benef,
      id: `BEN-${String(mockDb.beneficiaries.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toLocaleDateString("fr-FR"),
    };
    mockDb.beneficiaries.push(newBenef);
    return newBenef;
  },

  // Entreprises (avec accountType B2B/B2C)
  companies: [
    { id: "ENT-001", name: "Secky Tech", sector: "Services", status: "active", risk: "low", volume: 850000, joined: "12/01/2026", ownerName: "Kofi B.", ownerEmail: "kofi@seckytech.com", accountType: "b2b" },
    { id: "ENT-002", name: "École Les Lauriers", sector: "Éducation", status: "active", risk: "low", volume: 1250000, joined: "05/02/2026", ownerName: "Sylvain K.", ownerEmail: "sylvain@lauriers.bf", accountType: "b2b" },
    { id: "ENT-003", name: "Boutique Awa", sector: "Commerce", status: "active", risk: "medium", volume: 320000, joined: "18/03/2026", ownerName: "Awa T.", ownerEmail: "awa@boutique.bf", accountType: "b2c" },
    { id: "ENT-004", name: "Startup Faso", sector: "E-commerce", status: "pending", risk: "low", volume: 0, joined: "25/10/2026", ownerName: "Aminata M.", ownerEmail: "aminata@startup.bf", accountType: "b2c" },
    { id: "ENT-005", name: "Resto Chez Tanti", sector: "Restauration", status: "suspended", risk: "high", volume: 50000, joined: "02/08/2026", ownerName: "Tanti A.", ownerEmail: "tanti@resto.bf", accountType: "b2c" },
  ] as Company[],

  // Transactions
  transactions: [
    { id: "TX-1001", subject: "Cantine Octobre", reference: "CMD-1024", amount: 25000, status: "succeeded", operator: "Orange Money", date: "26/10/2026 10:45", merchantName: "Secky Tech", companyId: "ENT-001", type: "in", category: "Vente", fees: 250, feesSource: "real", source: "seckypay", note: "Paiement cantine" },
    { id: "TX-1003", subject: "Vente Marchandise", reference: "CMD-1026", amount: 12500, status: "succeeded", operator: "Moov Money", date: "25/10/2026 16:20", merchantName: "École Les Lauriers", companyId: "ENT-002", type: "in", category: "Vente", fees: 125, feesSource: "real", source: "seckypay" },
    { id: "TX-1005", subject: "Achat fournitures", reference: "CMD-1028", amount: 35000, status: "succeeded", operator: "Wave", date: "25/10/2026 11:00", merchantName: "Boutique Awa", companyId: "ENT-003", type: "in", category: "Vente", fees: 350, feesSource: "real", source: "seckypay" },
    { id: "TX-1006", subject: "Salaire Aminata", reference: "OUT-001", amount: 50000, status: "succeeded", operator: "Wave", date: "26/10/2026 09:30", merchantName: "Secky Tech", companyId: "ENT-001", type: "out", category: "Salaire", fees: 500, feesSource: "real", source: "seckypay", note: "Salaire octobre" },
    { id: "TX-1007", subject: "Fournisseur Faso", reference: "OUT-002", amount: 25000, status: "succeeded", operator: "Orange Money", date: "25/10/2026 14:10", merchantName: "Secky Tech", companyId: "ENT-001", type: "out", category: "Fournisseur", fees: 250, feesSource: "estimated", source: "seckypay" },
    { id: "TX-1002", subject: "Frais de scolarité", reference: "CMD-1025", amount: 50000, status: "pending", operator: "Wave", date: "26/10/2026 09:30", merchantName: "Secky Tech", companyId: "ENT-001", type: "in", category: "Vente", fees: 0, feesSource: "estimated", source: "seckypay" },
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