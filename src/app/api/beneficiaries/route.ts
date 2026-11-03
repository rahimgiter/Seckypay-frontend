import { NextResponse } from "next/server";
import { mockDb } from "../db";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json({ data: mockDb.beneficiaries });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone || !body.operator) {
      return NextResponse.json(
        { error: { code: "INVALID_DATA", message: "Nom, téléphone et opérateur sont requis." } },
        { status: 400 }
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newBenef = mockDb.addBeneficiary({
      name: body.name,
      phone: body.phone,
      operator: body.operator,
    });
    return NextResponse.json({ data: newBenef }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: { code: "SERVER_ERROR" } }, { status: 500 });
  }
}