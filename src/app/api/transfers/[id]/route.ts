import { NextResponse } from "next/server";
import { mockDb } from "../../db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 300));
  const tx = mockDb.transactions.find(t => t.id === id);
  if (!tx) {
    return NextResponse.json({ error: { code: "NOT_FOUND" } }, { status: 404 });
  }
  return NextResponse.json({ data: tx });
}

// Simuler l'envoi (passer à succeeded)
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const tx = mockDb.updateTransactionStatus(id, "succeeded");
  if (!tx) {
    return NextResponse.json({ error: { code: "NOT_FOUND" } }, { status: 404 });
  }
  return NextResponse.json({ data: tx });
}