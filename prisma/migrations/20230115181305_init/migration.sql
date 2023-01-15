/*
  Warnings:

  - Changed the type of `name` on the `organization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `repository` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `state` on the `repository` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `repository` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `tribe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "organization" DROP COLUMN "name";
ALTER TABLE "organization" ADD COLUMN     "name" STRING(50) NOT NULL;

-- AlterTable
ALTER TABLE "repository" DROP COLUMN "name";
ALTER TABLE "repository" ADD COLUMN     "name" STRING(50) NOT NULL;
ALTER TABLE "repository" DROP COLUMN "state";
ALTER TABLE "repository" ADD COLUMN     "state" STRING(1) NOT NULL;
ALTER TABLE "repository" DROP COLUMN "status";
ALTER TABLE "repository" ADD COLUMN     "status" STRING(1) NOT NULL;

-- AlterTable
ALTER TABLE "tribe" DROP COLUMN "name";
ALTER TABLE "tribe" ADD COLUMN     "name" STRING(50) NOT NULL;
