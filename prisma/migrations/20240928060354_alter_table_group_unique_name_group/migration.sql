/*
  Warnings:

  - You are about to drop the column `name` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameGroup]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameGroup` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serialGroup` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "name",
ADD COLUMN     "nameGroup" TEXT NOT NULL,
ADD COLUMN     "serialGroup" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_nameGroup_key" ON "Group"("nameGroup");
