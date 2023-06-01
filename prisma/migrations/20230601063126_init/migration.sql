-- CreateTable
CREATE TABLE "DailyCost" (
    "id" SERIAL NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "name" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyCost_pkey" PRIMARY KEY ("id")
);
