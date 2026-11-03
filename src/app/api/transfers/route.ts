import { NextResponse } from "next/server";
import { mockDb } from "../db";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const transfers = mockDb.transactions.filter(tx => tx.type === "out");
  return NextResponse.json({ data: transfers });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.beneficiaryName || !body.beneficiaryPhone || !body.amount || !body.operator) {
      return NextResponse.json(
        { error: { code: "INVALID_DATA", message: "Bénéficiaire, montant et opérateur sont requis." } },
        { status: 400 }
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 800));

    const amount = parseInt(body.amount);
    // Frais estimés : 1% (Orange) ou 0.5% (Wave) ou 1% (Moov)
    const feeRate = body.operator === "Wave" ? 0.005 : 0.01;
    const estimatedFee = Math.round(amount * feeRate);

    const newTransfer = mockDb.addTransaction({
      subject: `Envoi à ${body.beneficiaryName}`,
      reference: `OUT-${Date.now().toString().slice(-6)}`,
      amount: amount,
      status: "pending", // En attente de validation chez l'opérateur
      operator: body.operator,
      merchantName: "Secky Tech",
      companyId: "ENT-001",
      type: "out",
      category: body.category || "Autre",
      note: body.note || `Envoi à ${body.beneficiaryPhone}`,
      fees: estimatedFee,
      feesSource: "estimated",
      source: "seckypay",
    });

    return NextResponse.json({ data: newTransfer }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: { code: "SERVER_ERROR" } }, { status: 500 });
  }
}