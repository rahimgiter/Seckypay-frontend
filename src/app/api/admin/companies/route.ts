import { NextResponse } from "next/server";
import { mockDb } from "../../db";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json({ data: mockDb.companies, total: mockDb.companies.length });
}