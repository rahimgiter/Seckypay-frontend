import { NextResponse } from "next/server";
import { mockDb, InternalRole } from "../../db";

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  let members = mockDb.internalTeam;
  if (role && role !== "all") {
    members = members.filter(m => m.role === role);
  }

  // Compteurs par rôle
  const counts = {
    total: mockDb.internalTeam.length,
    super_admin: mockDb.internalTeam.filter(m => m.role === "super_admin").length,
    b2b_manager: mockDb.internalTeam.filter(m => m.role === "b2b_manager").length,
    b2c_manager: mockDb.internalTeam.filter(m => m.role === "b2c_manager").length,
    support: mockDb.internalTeam.filter(m => m.role === "support").length,
    finance: mockDb.internalTeam.filter(m => m.role === "finance").length,
    operations: mockDb.internalTeam.filter(m => m.role === "operations").length,
  };

  return NextResponse.json({ data: members, counts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.role) {
      return NextResponse.json(
        { error: { code: "INVALID_DATA", message: "Nom, email et rôle sont requis." } },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Vérifier que l'email n'existe pas déjà
    if (mockDb.internalTeam.some(m => m.email === body.email)) {
      return NextResponse.json(
        { error: { code: "EMAIL_EXISTS", message: "Cet email est déjà utilisé." } },
        { status: 400 }
      );
    }

    const newMember = mockDb.addInternalMember({
      name: body.name,
      email: body.email,
      role: body.role as InternalRole,
      status: "invited",
      assignedCompanies: body.assignedCompanies || [],
    });

    return NextResponse.json({ data: newMember }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: { code: "SERVER_ERROR" } }, { status: 500 });
  }
}