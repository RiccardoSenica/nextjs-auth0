/*
  Warnings:

  - The primary key for the `CustomerForm` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "CustomerForm_id_key";

-- AlterTable
ALTER TABLE "CustomerForm" DROP CONSTRAINT "CustomerForm_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CustomerForm_pkey" PRIMARY KEY ("id");
