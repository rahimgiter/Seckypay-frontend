import { NextResponse } from "next/server";
import { mockDb } from "../../../db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (body.status) {
    const company = mockDb.updateCompanyStatus(id, body.status);
    if (!company) return NextResponse.json({ error: { code: "NOT_FOUND" } }, { status: 404 });
    return NextResponse.json({ data: company });
  }
  return NextResponse.json({ error: { code: "INVALID_DATA" } }, { status: 400 });
}