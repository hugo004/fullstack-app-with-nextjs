/*
  Warnings:

  - The primary key for the `DailyCost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `DailyCost` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Changed the type of `cost` on the `DailyCost` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `name` on table `DailyCost` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DailyCost" DROP CONSTRAINT "DailyCost_pkey",
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedDate" TIMESTAMP(3),
ADD COLUMN     "updatedDate" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "cost",
ADD COLUMN     "cost" MONEY NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "DailyCost_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DailyCost_id_seq";
