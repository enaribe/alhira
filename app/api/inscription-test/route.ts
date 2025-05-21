import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../../generated/prisma";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const nom = formData.get("nom") as string;
  const prenom = formData.get("prenom") as string;
  const numero = formData.get("numero") as string;
  const niveau = formData.get("niveau") as string;
  const document = formData.get("document") as File;
  const audio = formData.get("audio") as File;

  // Générer des noms de fichiers uniques
  const uniqueId = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const docExt = document.name.split('.').pop();
  const audioExt = audio.name.split('.').pop();
  const docUniqueName = `document-${uniqueId}.${docExt}`;
  const audioUniqueName = `audio-${uniqueId}.${audioExt}`;

  // Sauvegarde des fichiers
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const docPath = path.join(uploadsDir, docUniqueName);
  const audioPath = path.join(uploadsDir, audioUniqueName);

  await writeFile(docPath, Buffer.from(await document.arrayBuffer()));
  await writeFile(audioPath, Buffer.from(await audio.arrayBuffer()));

  // Enregistrement en base
  const test = await prisma.testInscription.create({
    data: {
      nom,
      prenom,
      numero,
      niveau,
      document: `/uploads/${docUniqueName}`,
      audio: `/uploads/${audioUniqueName}`,
    },
  });

  return NextResponse.json(test);
}

export async function GET() {
  const tests = await prisma.testInscription.findMany({
    orderBy: { id: "desc" }
  });
  return NextResponse.json(tests);
}