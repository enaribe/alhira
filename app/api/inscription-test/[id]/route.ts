import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { del } from "@vercel/blob";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  try {
    const test = await prisma.testInscription.update({
      where: { id },
      data: { statut: "Validé" },
    });
    return NextResponse.json(test);
  } catch (error) {
    return NextResponse.json({ error: "Test non trouvé ou erreur serveur" }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  try {
    // 1. Récupérer l'entrée
    const test = await prisma.testInscription.findUnique({ where: { id } });
    if (!test) return NextResponse.json({ error: "Test non trouvé" }, { status: 404 });
    // 2. Supprimer les fichiers du storage
    if (test.document) await del(new URL(test.document).pathname.slice(1));
    if (test.audio) await del(new URL(test.audio).pathname.slice(1));
    // 3. Supprimer l'entrée en base
    await prisma.testInscription.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Test non trouvé ou erreur serveur" }, { status: 404 });
  }
}