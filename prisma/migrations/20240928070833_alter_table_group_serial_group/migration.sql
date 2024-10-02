/*
  Warnings:

  - A unique constraint covering the columns `[serialGroup]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Group_nameGroup_key";

-- CreateIndex
CREATE UNIQUE INDEX "Group_serialGroup_key" ON "Group"("serialGroup");
