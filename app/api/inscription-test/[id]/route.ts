
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Définition du type des paramètres de route
type RouteParams = {
  params: {
    id: string;
  };
};

// Handler DELETE - Supprimer une inscription
export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const test = await prisma.testInscription.findUnique({ where: { id } });
    if (!test) {
      return NextResponse.json({ error: "Test non trouvé" }, { status: 404 });
    }

    // Si tu veux supprimer aussi des fichiers liés depuis Vercel Blob,
    // tu peux le faire ici en utilisant l'API `del()` de @vercel/blob

    await prisma.testInscription.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Test non trouvé ou erreur serveur" },
      { status: 500 }
    );
  }
}

// Handler PATCH - Valider une inscription
export async function PATCH(
  req: NextRequest,
  { params }: RouteParams
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const test = await prisma.testInscription.update({
      where: { id },
      data: { statut: "Validé" },
    });

    return NextResponse.json(test);
  } catch (error) {
    return NextResponse.json(
      { error: "Test non trouvé ou erreur serveur" },
      { status: 500 }
    );
  }
}
