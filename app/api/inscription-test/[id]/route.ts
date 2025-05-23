import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { del } from "@vercel/blob";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  try {
    const test = await prisma.testInscription.findUnique({ where: { id } });
    if (!test) return NextResponse.json({ error: "Test non trouvé" }, { status: 404 });
    // Suppression des fichiers du storage ici si besoin
    await prisma.testInscription.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Test non trouvé ou erreur serveur" }, { status: 404 });
  }
}

export async function PATCH(req: NextRequest, { params }) {
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