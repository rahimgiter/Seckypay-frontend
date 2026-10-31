import { NextResponse } from "next/server";
import { mockDb } from "../db";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const transactions = mockDb.transactions;
  
  const succeeded = transactions.filter(t => t.status === "succeeded");
  const pending = transactions.filter(t => t.status === "pending");
  const failed = transactions.filter(t => t.status === "failed");

  const totalRevenue = succeeded.reduce((sum, t) => sum + t.amount, 0);
  const totalCount = transactions.length;
  const successRate = totalCount > 0 ? Math.round((succeeded.length / (succeeded.length + failed.length)) * 100) || 0 : 0;

  return NextResponse.json({
    data: {
      totalRevenue,
      totalCount,
      successRate,
      pendingCount: pending.length,
      recentTransactions: transactions.slice(0, 3),
    }
  });
}