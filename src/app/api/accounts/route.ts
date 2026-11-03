import { NextResponse } from "next/server";
import { mockDb } from "../db";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json({ data: mockDb.accounts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.operator || !body.phone || !body.holderName) {
      return NextResponse.json(
        { error: { code: "INVALID_DATA", message: "Opérateur, téléphone et titulaire sont requis." } },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Si c'est le premier compte, il devient par défaut
    const isDefault = mockDb.accounts.length === 0 ? true : (body.isDefault || false);

    // Si isDefault est true, on retire le statut default des autres
    if (isDefault) {
      mockDb.accounts.forEach(a => a.isDefault = false);
    }

    const newAccount = mockDb.addAccount({
      operator: body.operator,
      phone: body.phone,
      holderName: body.holderName,
      label: body.label || `${body.operator} - ${body.phone.slice(-4)}`,
      status: "pending",
      isDefault: isDefault,
    });

    return NextResponse.json({ data: newAccount }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: { code: "SERVER_ERROR" } }, { status: 500 });
  }
}