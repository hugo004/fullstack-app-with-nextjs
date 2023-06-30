-- CreateEnum
CREATE TYPE "CostType" AS ENUM ('unknown', 'meal', 'transportation', 'rental', 'entertainment');

-- AlterTable
ALTER TABLE "DailyCost" ADD COLUMN     "type" "CostType" NOT NULL DEFAULT 'unknown';
