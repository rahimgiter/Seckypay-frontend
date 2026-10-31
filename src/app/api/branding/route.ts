import { NextResponse } from "next/server";
import { mockDb } from "../db";

export async function GET() {
  return NextResponse.json({ data: mockDb.branding });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = mockDb.updateBranding({
      brandName: body.brandName,
      logoBase64: body.logoBase64,
      primaryColor: body.primaryColor,
      isCustom: body.isCustom,
    });
    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json({ error: { code: "SERVER_ERROR" } }, { status: 500 });
  }
}