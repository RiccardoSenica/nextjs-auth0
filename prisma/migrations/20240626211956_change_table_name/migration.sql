/*
  Warnings:

  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CustomerFormType" AS ENUM ('TYPE1', 'TYPE2', 'TYPE3');

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_createdById_fkey";

-- DropTable
DROP TABLE "Module";

-- DropEnum
DROP TYPE "ModuleType";

-- CreateTable
CREATE TABLE "CustomerForm" (
    "id" DOUBLE PRECISION NOT NULL,
    "type" "CustomerFormType" NOT NULL,
    "text" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerForm_id_key" ON "CustomerForm"("id");

-- AddForeignKey
ALTER TABLE "CustomerForm" ADD CONSTRAINT "CustomerForm_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
