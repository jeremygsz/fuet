-- CreateTable
CREATE TABLE "Rsvp" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "mairie" INTEGER NOT NULL DEFAULT 0,
    "afterMairie" INTEGER NOT NULL DEFAULT 0,
    "houppa" INTEGER NOT NULL DEFAULT 0,
    "petitDejeuner" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rsvp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rsvp_firstName_lastName_key" ON "Rsvp"("firstName", "lastName");
