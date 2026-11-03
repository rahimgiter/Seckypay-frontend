import { NextResponse } from "next/server";
import { mockDb } from "../../db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Si on veut définir ce compte par défaut
  if (body.isDefault === true) {
    mockDb.accounts.forEach(a => a.isDefault = false);
  }

  const updated = mockDb.updateAccount(id, body);
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

  mockDb.deleteAccount(id);
  return NextResponse.json({ success: true });
}