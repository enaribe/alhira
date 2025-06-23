import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Définition du type des paramètres de route
type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

// Handler DELETE - Supprimer une inscription
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    await prisma.testInscription.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Handler PATCH - Valider une inscription
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    
    const test = await prisma.testInscription.update({
      where: { id },
      data: {
        statut: body.statut,
      },
    });

    return NextResponse.json(test);
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}