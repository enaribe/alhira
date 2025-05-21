-- CreateTable
CREATE TABLE "TestInscription" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "niveau" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'En attente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestInscription_pkey" PRIMARY KEY ("id")
);
