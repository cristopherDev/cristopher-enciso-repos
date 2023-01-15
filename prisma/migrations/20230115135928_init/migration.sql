/*
  Warnings:

  - You are about to alter the column `id` on the `repository` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id_tribe` on the `repository` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `tribe` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id_repository` on the `metrics` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_repository" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "id_tribe" INT8 NOT NULL,
    "name" STRING NOT NULL,
    "state" STRING NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" STRING NOT NULL,

    CONSTRAINT "repository_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_repository" ("create_time","id","id_tribe","name","state","status") SELECT "create_time","id","id_tribe","name","state","status" FROM "repository";
DROP TABLE "repository" CASCADE;
ALTER TABLE "_prisma_new_repository" RENAME TO "repository";
ALTER TABLE "repository" ADD CONSTRAINT "repository_id_tribe_fkey" FOREIGN KEY ("id_tribe") REFERENCES "tribe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_tribe" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "id_organization" INT8 NOT NULL,
    "name" STRING NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "tribe_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_tribe" ("id","id_organization","name","status") SELECT "id","id_organization","name","status" FROM "tribe";
DROP TABLE "tribe" CASCADE;
ALTER TABLE "_prisma_new_tribe" RENAME TO "tribe";
ALTER TABLE "tribe" ADD CONSTRAINT "tribe_id_organization_fkey" FOREIGN KEY ("id_organization") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_metrics" (
    "id_repository" INT8 NOT NULL DEFAULT unique_rowid(),
    "coverage" FLOAT8 NOT NULL,
    "bugs" INT4 NOT NULL,
    "vulnerabilities" INT4 NOT NULL,
    "hotspot" INT4 NOT NULL,
    "code_smells" INT4 NOT NULL,

    CONSTRAINT "metrics_pkey" PRIMARY KEY ("id_repository")
);
INSERT INTO "_prisma_new_metrics" ("bugs","code_smells","coverage","hotspot","id_repository","vulnerabilities") SELECT "bugs","code_smells","coverage","hotspot","id_repository","vulnerabilities" FROM "metrics";
DROP TABLE "metrics" CASCADE;
ALTER TABLE "_prisma_new_metrics" RENAME TO "metrics";
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_id_repository_fkey" FOREIGN KEY ("id_repository") REFERENCES "repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
