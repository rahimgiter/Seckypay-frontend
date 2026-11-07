import { NextResponse } from "next/server";
import { mockDb } from "../../../db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 300));

  const updated = mockDb.updateInternalMember(id, body);
  if (!updated) {
    return NextResponse.json({ error: { code: "NOT_FOUND" } }, { status: 404 });
  }
  return NextResponse.json({ data: updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 300));

  mockDb.deleteInternalMember(id);
  return NextResponse.json({ success: true });
}