import { NextResponse } from "next/server";
import { mockDb } from "../../db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const transaction = mockDb.transactions.find((t) => t.id === id);
  
  if (!transaction) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Transaction introuvable." } },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: transaction });
}