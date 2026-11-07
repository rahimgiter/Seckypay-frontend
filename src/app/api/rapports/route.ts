import { NextResponse } from "next/server";
import { mockDb, Transaction } from "../db";

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "30d";
  const operator = searchParams.get("operator") || "all";
  const type = searchParams.get("type") || "all";
  const status = searchParams.get("status") || "all";

  // Calculer la date de début
  const now = new Date();
  const startDate = new Date();
  switch (period) {
    case "today": startDate.setHours(0, 0, 0, 0); break;
    case "7d": startDate.setDate(now.getDate() - 7); break;
    case "30d": startDate.setDate(now.getDate() - 30); break;
    case "90d": startDate.setDate(now.getDate() - 90); break;
    default: startDate.setDate(now.getDate() - 30);
  }

  // Filtrer les transactions
  const filtered = mockDb.transactions.filter((tx: Transaction) => {
    // Filtre opérateur
    if (operator !== "all" && tx.operator !== operator) return false;

    // Filtre type
    if (type !== "all" && tx.type !== type) return false;

    // Filtre statut
    if (status !== "all" && tx.status !== status) return false;

    return true;
  });

  // Calculer les totaux
  const totalEntries = filtered.filter((tx) => tx.type === "in").reduce((s, tx) => s + tx.amount, 0);
  const totalExits = filtered.filter((tx) => tx.type === "out").reduce((s, tx) => s + tx.amount, 0);
  const totalFees = filtered.reduce((s, tx) => s + tx.fees, 0);
  const netEncaisse = totalEntries - filtered.filter((tx) => tx.type === "in").reduce((s, tx) => s + tx.fees, 0);

  // Compter par statut
  const statusCounts = {
    succeeded: filtered.filter((tx) => tx.status === "succeeded").length,
    pending: filtered.filter((tx) => tx.status === "pending").length,
    failed: filtered.filter((tx) => tx.status === "failed").length,
    to_verify: filtered.filter((tx) => tx.status === "to_verify").length,
  };

  return NextResponse.json({
    data: {
      transactions: filtered,
      summary: {
        count: filtered.length,
        totalEntries,
        totalExits,
        totalFees,
        netEncaisse,
        statusCounts,
      },
    },
  });
}