import { NextResponse } from "next/server";
import { mockDb } from "../db";

// GET : Récupérer toutes les transactions
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json({ 
    data: mockDb.transactions,
    total: mockDb.transactions.length 
  });
}

// POST : Créer une nouvelle transaction (lien de paiement = entrée)
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

    // Création de la transaction avec TOUS les champs MVP
    const amount = parseInt(body.amount);
    const estimatedFee = Math.round(amount * 0.01); // 1% estimé par défaut (Orange)

    const newTransaction = mockDb.addTransaction({
      subject: body.subject,
      reference: body.reference || "",
      amount: amount,
      status: "pending",
      operator: body.operator || "Orange Money",
      merchantName: "Secky Tech",
      companyId: "ENT-001",
      // Nouveaux champs MVP
      type: "in",                          // Lien de paiement = entrée
      category: body.category || "Vente",  // Catégorie par défaut
      note: body.note || undefined,
      fees: estimatedFee,
      feesSource: "estimated",             // Sera "real" si l'opérateur confirme
      source: "seckypay",                  // Vient de SeckyPay
    });

    return NextResponse.json({ data: newTransaction }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Une erreur est survenue." } },
      { status: 500 }
    );
  }
}