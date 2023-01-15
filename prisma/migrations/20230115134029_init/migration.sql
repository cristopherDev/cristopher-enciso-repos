/*
  Warnings:

  - You are about to alter the column `id` on the `organization` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - Changed the type of `id_organization` on the `tribe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "tribe" DROP CONSTRAINT "tribe_id_organization_fkey";

-- AlterTable
ALTER TABLE "tribe" DROP COLUMN "id_organization";
ALTER TABLE "tribe" ADD COLUMN     "id_organization" INT8 NOT NULL;

-- RedefineTables
CREATE TABLE "_prisma_new_organization" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_organization" ("id","name","status") SELECT "id","name","status" FROM "organization";
DROP TABLE "organization" CASCADE;
ALTER TABLE "_prisma_new_organization" RENAME TO "organization";

-- AddForeignKey
ALTER TABLE "tribe" ADD CONSTRAINT "tribe_id_organization_fkey" FOREIGN KEY ("id_organization") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
