-- CreateTable
CREATE TABLE "tribe" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "organizationId" INT4 NOT NULL,
    "name" STRING NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "tribe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tribe" ADD CONSTRAINT "tribe_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
