import { NextResponse } from "next/server";
import { mockDb } from "../db";

// GET : Récupérer toutes les transactions
export async function GET() {
  // Simulation d'un petit délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json({ 
    data: mockDb.transactions,
    total: mockDb.transactions.length 
  });
}

// POST : Créer une nouvelle transaction
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validation basique
    if (!body.amount || !body.subject) {
      return NextResponse.json(
        { error: { code: "INVALID_DATA", message: "Le montant et l'objet sont requis." } },
        { status: 400 }
      );
    }

    // Simulation d'un délai
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Création de la transaction
    const newTransaction = mockDb.addTransaction({
      subject: body.subject,
      reference: body.reference || "",
      amount: parseInt(body.amount),
      status: "pending", // Toujours en attente au début
      operator: body.operator || "Orange Money",
      merchantName: "Secky Tech",
    });

    return NextResponse.json({ data: newTransaction }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Une erreur est survenue." } },
      { status: 500 }
    );
  }
}