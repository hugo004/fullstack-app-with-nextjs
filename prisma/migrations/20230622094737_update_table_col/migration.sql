/*
  Warnings:

  - You are about to drop the column `createdDate` on the `DailyCost` table. All the data in the column will be lost.
  - You are about to drop the column `deletedDate` on the `DailyCost` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `DailyCost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyCost" DROP COLUMN "createdDate",
DROP COLUMN "deletedDate",
DROP COLUMN "updatedDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);
