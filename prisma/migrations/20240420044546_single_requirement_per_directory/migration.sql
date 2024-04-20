/*
  Warnings:

  - A unique constraint covering the columns `[requirementId]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Directory_requirementId_key" ON "Directory"("requirementId");
