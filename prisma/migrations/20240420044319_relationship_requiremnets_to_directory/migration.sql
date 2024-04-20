/*
  Warnings:

  - You are about to drop the column `requirementId` on the `Document` table. All the data in the column will be lost.
  - Added the required column `requirementId` to the `Directory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_requirementId_fkey";

-- AlterTable
ALTER TABLE "Directory" ADD COLUMN     "requirementId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "requirementId";

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
