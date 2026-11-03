import { NextResponse } from "next/server";
import { mockDb } from "../db";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const today = new Date();
  const todayStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

  // Filtrer les transactions du jour confirmées
  const todayTransactions = mockDb.transactions.filter((tx) => {
    const txDate = tx.date.split(" ")[0];
    return txDate === todayStr && tx.status === "succeeded";
  });

  // Calculs des indicateurs
  const entries = todayTransactions
    .filter((tx) => tx.type === "in")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const exits = todayTransactions
    .filter((tx) => tx.type === "out")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalFees = todayTransactions.reduce((sum, tx) => sum + (tx.fees || 0), 0);

  const feesOnEntries = todayTransactions
    .filter((tx) => tx.type === "in")
    .reduce((sum, tx) => sum + (tx.fees || 0), 0);

  const feesOnExits = todayTransactions
    .filter((tx) => tx.type === "out")
    .reduce((sum, tx) => sum + (tx.fees || 0), 0);

  const netEncaisse = entries - feesOnEntries;
  const variationCaisse = entries - exits - totalFees;

  // Compteurs
  const entriesCount = todayTransactions.filter((tx) => tx.type === "in").length;
  const exitsCount = todayTransactions.filter((tx) => tx.type === "out").length;
  const pendingCount = mockDb.transactions.filter((tx) => tx.status === "pending").length;
  const toVerifyCount = mockDb.transactions.filter((tx) => tx.status === "to_verify").length;

  // Répartition par opérateur
  const byOperator = ["Orange Money", "Wave", "Moov Money"].map((op) => {
    const opTx = todayTransactions.filter((tx) => tx.operator === op);
    return {
      operator: op,
      entries: opTx.filter((tx) => tx.type === "in").reduce((s, tx) => s + tx.amount, 0),
      exits: opTx.filter((tx) => tx.type === "out").reduce((s, tx) => s + tx.amount, 0),
      count: opTx.length,
    };
  });

  return NextResponse.json({
    data: {
      // Indicateurs du jour
      entries,
      exits,
      totalFees,
      feesOnEntries,
      feesOnExits,
      netEncaisse,
      variationCaisse,
      entriesCount,
      exitsCount,
      pendingCount,
      toVerifyCount,
      // Répartition par opérateur
      byOperator,
      // Caisse
      cashRegister: mockDb.cashRegister,
      // Transactions récentes (5 dernières)
      recentTransactions: mockDb.transactions.slice(0, 5),
    },
  });
}