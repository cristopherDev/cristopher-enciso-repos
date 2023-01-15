-- CreateTable
CREATE TABLE "organization" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);
