/*
  Warnings:

  - You are about to drop the column `prenom` on the `TestNiveau2` table. All the data in the column will be lost.
  - Added the required column `adresseMail` to the `TestNiveau2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localite` to the `TestNiveau2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestNiveau2" DROP COLUMN "prenom",
ADD COLUMN     "adresseMail" TEXT NOT NULL,
ADD COLUMN     "localite" TEXT NOT NULL,
ADD COLUMN     "objectifsApprentissage" TEXT;
