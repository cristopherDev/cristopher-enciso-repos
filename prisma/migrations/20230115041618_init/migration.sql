/*
  Warnings:

  - You are about to drop the column `id_repository` on the `repository` table. All the data in the column will be lost.
  - Added the required column `id_tribe` to the `repository` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "repository" DROP CONSTRAINT "repository_id_repository_fkey";

-- AlterTable
ALTER TABLE "repository" DROP COLUMN "id_repository";
ALTER TABLE "repository" ADD COLUMN     "id_tribe" INT4 NOT NULL;

-- AddForeignKey
ALTER TABLE "repository" ADD CONSTRAINT "repository_id_tribe_fkey" FOREIGN KEY ("id_tribe") REFERENCES "tribe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
