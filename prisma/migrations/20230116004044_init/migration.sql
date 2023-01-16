-- DropForeignKey
ALTER TABLE "metrics" DROP CONSTRAINT "metrics_id_repository_fkey";

-- DropForeignKey
ALTER TABLE "repository" DROP CONSTRAINT "repository_id_tribe_fkey";

-- DropForeignKey
ALTER TABLE "tribe" DROP CONSTRAINT "tribe_id_organization_fkey";

-- AddForeignKey
ALTER TABLE "tribe" ADD CONSTRAINT "tribe_id_organization_fkey" FOREIGN KEY ("id_organization") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repository" ADD CONSTRAINT "repository_id_tribe_fkey" FOREIGN KEY ("id_tribe") REFERENCES "tribe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_id_repository_fkey" FOREIGN KEY ("id_repository") REFERENCES "repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
