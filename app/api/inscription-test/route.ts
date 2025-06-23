import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const nom = formData.get("nom") as string;
    const numero = formData.get("numero") as string;
    const niveau = formData.get("niveau") as string;

    // Déterminer le format du test
    const isInteractiveTest = niveau === "debutant" || niveau === "intermediaire" || niveau === "avance";
    const testFormat = isInteractiveTest ? "interactive" : "classic";

    let audioUrl: string | null = null;
    let documentUrl: string | null = null;
    let reponses: any = {};

    if (isInteractiveTest) {
      // Nouveau format interactif (niveau 2, 3, etc.)
      const adresseMail = formData.get("adresseMail") as string;
      const localite = formData.get("localite") as string;
      const objectifsApprentissage = formData.get("objectifsApprentissage") as string;
      
      // Upload audio si présent (niveau 2)
      const audioFile = formData.get("audioFile") as File;
      if (audioFile) {
        const uniqueId = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const audioExt = audioFile.name.split('.').pop();
        const audioUniqueName = `${niveau}-audio-${uniqueId}.${audioExt}`;
        
        const { url } = await put(
          `audios/${audioUniqueName}`, 
          Buffer.from(await audioFile.arrayBuffer()), 
          { access: 'public' }
        );
        audioUrl = url;
      }

      // Collecter toutes les réponses selon le niveau
      if (niveau === "debutant") {
        // Réponses niveau 1 (débutant)
        reponses = {
          // Partie Arabe
          lettresConnues: JSON.parse(formData.get("lettresConnues") as string || "[]"),
          syllabesSimples: JSON.parse(formData.get("syllabesSimples") as string || "{}"),
          // Partie Fiqh
          etapesWudu: JSON.parse(formData.get("etapesWudu") as string || "[]"),
          ordreWudu: JSON.parse(formData.get("ordreWudu") as string || "{}"),
          prieresObligatoires: formData.get("prieresObligatoires") as string,
          associationPrieres: JSON.parse(formData.get("associationPrieres") as string || "{}"),
        };
      } else if (niveau === "intermediaire") {
        // Réponses niveau 2
        reponses = {
          // Test de Fiqh
          ablutionInvalides: JSON.parse(formData.get("ablutionInvalides") as string || "[]"),
          fardSunnahDifference: formData.get("fardSunnahDifference") as string,
          fardWudu: JSON.parse(formData.get("fardWudu") as string || "[]"),
          conditionsPriere: JSON.parse(formData.get("conditionsPriere") as string || "[]"),
          oubliPilier: formData.get("oubliPilier") as string,
          pilierSunnaDifference: formData.get("pilierSunnaDifference") as string,
          prieresSupererogatoires: formData.get("prieresSupererogatoires") as string,
          // Questions Tajwid
          tajwidRule1: formData.get("tajwidRule1") as string,
          tajwidTechnique1: formData.get("tajwidTechnique1") as string,
          tajwidNoun1: formData.get("tajwidNoun1") as string,
          ghunnaWords: JSON.parse(formData.get("ghunnaWords") as string || "[]"),
        };
      } else if (niveau === "avance") {
        // Réponses niveau 3
        reponses = {
          // Étape 2 - Règles du Tajwid
          idghamTypes: formData.get("idghamTypes") as string,
          idghamDifference: formData.get("idghamDifference") as string,
          idghamMutamatil: formData.get("idghamMutamatil") as string,
          idhharLetters: formData.get("idhharLetters") as string,
          idhharExamples: formData.get("idhharExamples") as string,
          manAmanaRule: formData.get("manAmanaRule") as string,
          ikhfaDefinition: formData.get("ikhfaDefinition") as string,
          ikhfaExamples: formData.get("ikhfaExamples") as string,
          iqlabLetter: formData.get("iqlabLetter") as string,
          maddDifference: formData.get("maddDifference") as string,
          maddTabiiHarakat: formData.get("maddTabiiHarakat") as string,
          maddMufassilHarakat: formData.get("maddMufassilHarakat") as string,
          maddMuttasilHarakat: formData.get("maddMuttasilHarakat") as string,
          maddLazimHarakat: formData.get("maddLazimHarakat") as string,
          // Étape 3 - Fiqh
          wudouObligations: formData.get("wudouObligations") as string,
          wudouSunnaFard: formData.get("wudouSunnaFard") as string,
          wudouDoubt: formData.get("wudouDoubt") as string,
          permanentExcuse: formData.get("permanentExcuse") as string,
        };
      }

      // Enregistrement test interactif
      const test = await prisma.testInscription.create({
        data: {
          nom,
          numero,
          niveau,
          adresseMail: adresseMail || undefined,
          localite: localite || undefined,
          objectifsApprentissage: objectifsApprentissage || undefined,
          audio: audioUrl || undefined,
          testFormat: "interactive",
          reponses,
        },
      });

      return NextResponse.json(test);
    } else {
      // Format classique (débutant, supérieur, spéciales)
      const prenom = formData.get("prenom") as string;
      const document = formData.get("document") as File;
      const audio = formData.get("audio") as File;

      if (!document || !audio) {
        return NextResponse.json({ error: "Document et audio requis" }, { status: 400 });
      }

      // Upload des fichiers
      const uniqueId = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const docExt = document.name.split('.').pop();
      const audioExt = audio.name.split('.').pop();
      const docUniqueName = `document-${uniqueId}.${docExt}`;
      const audioUniqueName = `audio-${uniqueId}.${audioExt}`;

      const { url: docUrl } = await put(
        `documents/${docUniqueName}`, 
        Buffer.from(await document.arrayBuffer()), 
        { access: 'public' }
      );
      const { url: audioUrlClassic } = await put(
        `audios/${audioUniqueName}`, 
        Buffer.from(await audio.arrayBuffer()), 
        { access: 'public' }
      );

      // Enregistrement test classique  
      const test = await prisma.testInscription.create({
        data: {
          nom,
          prenom,
          numero,
          niveau,
          document: docUrl,
          audio: audioUrlClassic,
          testFormat: "classic",
        },
      });

      return NextResponse.json(test);
    }
  } catch (error) {
    console.error("Erreur lors de la soumission:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Récupérer tous les tests avec le nouveau système unifié
    const tests = await prisma.testInscription.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tests);
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    
    // Retourner un tableau vide en cas d'erreur pour éviter les erreurs côté client
    return NextResponse.json([]);
  }
}