import { NextResponse } from "next/server";
import { mockDb } from "../../db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const closingBalance = parseInt(body.closingBalance);
    const gapReason = body.gapReason || undefined;

    if (isNaN(closingBalance) || closingBalance < 0) {
      return NextResponse.json(
        { error: { code: "INVALID_AMOUNT", message: "Le solde de clôture doit être un nombre positif." } },
        { status: 400 }
      );
    }

    // Vérifier qu'il y a une caisse ouverte
    if (mockDb.cashRegister.status === "closed") {
      return NextResponse.json(
        { error: { code: "ALREADY_CLOSED", message: "La caisse est déjà clôturée pour aujourd'hui." } },
        { status: 400 }
      );
    }

    const register = mockDb.closeCashRegister(closingBalance, gapReason);
    return NextResponse.json({ data: register });
  } catch (error) {
    return NextResponse.json({ error: { code: "SERVER_ERROR" } }, { status: 500 });
  }
}