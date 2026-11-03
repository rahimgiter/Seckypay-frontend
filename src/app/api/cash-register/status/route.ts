import { NextResponse } from "next/server";
import { mockDb } from "../../db";

export async function GET() {
  const today = new Date();
  const todayStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

  // Transactions du jour confirmées
  const todayTransactions = mockDb.transactions.filter((tx) => {
    const txDate = tx.date.split(" ")[0];
    return txDate === todayStr && tx.status === "succeeded";
  });

  const entries = todayTransactions.filter((tx) => tx.type === "in").reduce((s, tx) => s + tx.amount, 0);
  const exits = todayTransactions.filter((tx) => tx.type === "out").reduce((s, tx) => s + tx.amount, 0);
  const totalFees = todayTransactions.reduce((s, tx) => s + (tx.fees || 0), 0);
  const variation = entries - exits - totalFees;
  const expectedBalance = mockDb.cashRegister.openingBalance + variation;

  // Opérations en attente (ne comptent pas)
  const pendingTransactions = mockDb.transactions.filter((tx) => tx.status === "pending");

  return NextResponse.json({
    data: {
      cashRegister: mockDb.cashRegister,
      totals: {
        entries,
        exits,
        totalFees,
        variation,
        expectedBalance,
        transactionsCount: todayTransactions.length,
      },
      pendingTransactions,
      allTransactions: todayTransactions,
    },
  });
}