-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
