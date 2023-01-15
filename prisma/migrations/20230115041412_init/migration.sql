-- CreateTable
CREATE TABLE "repository" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "id_repository" INT4 NOT NULL,
    "name" STRING NOT NULL,
    "state" STRING NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" STRING NOT NULL,

    CONSTRAINT "repository_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "repository" ADD CONSTRAINT "repository_id_repository_fkey" FOREIGN KEY ("id_repository") REFERENCES "tribe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
