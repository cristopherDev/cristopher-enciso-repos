-- CreateTable
CREATE TABLE "metrics" (
    "id_repository" INT4 NOT NULL DEFAULT unique_rowid(),
    "coverage" FLOAT8 NOT NULL,
    "bugs" INT4 NOT NULL,
    "vulnerabilities" INT4 NOT NULL,
    "hotspot" INT4 NOT NULL,
    "code_smells" INT4 NOT NULL,

    CONSTRAINT "metrics_pkey" PRIMARY KEY ("id_repository")
);

-- AddForeignKey
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_id_repository_fkey" FOREIGN KEY ("id_repository") REFERENCES "repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
