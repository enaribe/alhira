-- CreateTable
CREATE TABLE "TestNiveau2" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "niveau" TEXT NOT NULL DEFAULT 'intermediaire',
    "audioUrl" TEXT NOT NULL,
    "tajwidRule1" TEXT,
    "tajwidTechnique1" TEXT,
    "tajwidNoun1" TEXT,
    "ghunnaWords" TEXT[],
    "statut" TEXT NOT NULL DEFAULT 'En attente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestNiveau2_pkey" PRIMARY KEY ("id")
);
