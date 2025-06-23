/*
  Warnings:

  - You are about to drop the `TestInscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestNiveau2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TestInscription";

-- DropTable
DROP TABLE "TestNiveau2";

-- CreateTable
CREATE TABLE "test_inscriptions" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "niveau" TEXT NOT NULL,
    "prenom" TEXT,
    "adresseMail" TEXT,
    "localite" TEXT,
    "objectifsApprentissage" TEXT,
    "document" TEXT,
    "audio" TEXT,
    "testFormat" TEXT NOT NULL DEFAULT 'classic',
    "reponses" JSONB,
    "statut" TEXT NOT NULL DEFAULT 'En attente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_inscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_etapes" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "etapeNumero" INTEGER NOT NULL,
    "titre" TEXT NOT NULL,
    "reponses" JSONB NOT NULL,
    "completee" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_etapes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "test_etapes" ADD CONSTRAINT "test_etapes_testId_fkey" FOREIGN KEY ("testId") REFERENCES "test_inscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
