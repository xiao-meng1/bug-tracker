/*
  Warnings:

  - Made the column `updatedAt` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "updatedAt" SET NOT NULL;
