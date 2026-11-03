import { NextResponse } from "next/server";
import { mockDb } from "../../db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const openingBalance = parseInt(body.openingBalance);

    if (isNaN(openingBalance) || openingBalance < 0) {
      return NextResponse.json(
        { error: { code: "INVALID_AMOUNT", message: "Le solde d'ouverture doit être un nombre positif." } },
        { status: 400 }
      );
    }

    const register = mockDb.openCashRegister(openingBalance);
    return NextResponse.json({ data: register });
  } catch (error) {
    return NextResponse.json({ error: { code: "SERVER_ERROR" } }, { status: 500 });
  }
}