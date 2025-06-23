import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Type pour les paramètres de route
type RouteParams = {
  params: Promise<{ id: string }>;
};

// Handler PATCH - Valider un test niveau 2
export async function PATCH(
  req: NextRequest,
  context: RouteParams
) {
  try {
    const { id: idParam } = await context.params;
    const id = Number(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const test = await prisma.testNiveau2.update({
      where: { id },
      data: { statut: "Validé" },
    });

    return NextResponse.json(test);
  } catch (error) {
    console.error("Erreur PATCH niveau 2:", error);
    return NextResponse.json(
      { error: "Test non trouvé ou erreur serveur" },
      { status: 500 }
    );
  }
}

// Handler DELETE - Supprimer un test niveau 2  
export async function DELETE(
  req: NextRequest,
  context: RouteParams
) {
  try {
    const { id: idParam } = await context.params;
    const id = Number(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    await prisma.testNiveau2.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Test supprimé avec succès" });
  } catch (error) {
    console.error("Erreur DELETE niveau 2:", error);
    return NextResponse.json(
      { error: "Test non trouvé ou erreur serveur" },
      { status: 500 }
    );
  }
} 