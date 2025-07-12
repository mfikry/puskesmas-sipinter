/*
  Warnings:

  - You are about to drop the column `imunHPV1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `imunTd2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `imunTd5` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "imunHPV1",
DROP COLUMN "imunTd2",
DROP COLUMN "imunTd5",
ADD COLUMN     "imunHPV5" TEXT,
ADD COLUMN     "imunTD" TEXT,
ADD COLUMN     "imunTd" TEXT;
