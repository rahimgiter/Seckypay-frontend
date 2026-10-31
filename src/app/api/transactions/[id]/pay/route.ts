import { NextResponse } from "next/server";
import { mockDb } from "../../../db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const transaction = mockDb.updateTransactionStatus(id, "succeeded");
  
  if (!transaction) {
    return NextResponse.json({ error: { code: "NOT_FOUND", message: "Transaction introuvable." } }, { status: 404 });
  }

  return NextResponse.json({ data: transaction });
}