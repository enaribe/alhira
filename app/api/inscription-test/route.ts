import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

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

  // Upload to Vercel Blob Storage
  const { url: docUrl } = await put(`documents/${docUniqueName}`, Buffer.from(await document.arrayBuffer()), { access: 'public' });
  const { url: audioUrl } = await put(`audios/${audioUniqueName}`, Buffer.from(await audio.arrayBuffer()), { access: 'public' });

  // Enregistrement en base
  const test = await prisma.testInscription.create({
    data: {
      nom,
      prenom,
      numero,
      niveau,
      document: docUrl,
      audio: audioUrl,
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