/*
  Warnings:

  - You are about to drop the column `organizationId` on the `tribe` table. All the data in the column will be lost.
  - Added the required column `id_organization` to the `tribe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tribe" DROP CONSTRAINT "tribe_organizationId_fkey";

-- AlterTable
ALTER TABLE "tribe" DROP COLUMN "organizationId";
ALTER TABLE "tribe" ADD COLUMN     "id_organization" INT4 NOT NULL;

-- AddForeignKey
ALTER TABLE "tribe" ADD CONSTRAINT "tribe_id_organization_fkey" FOREIGN KEY ("id_organization") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
