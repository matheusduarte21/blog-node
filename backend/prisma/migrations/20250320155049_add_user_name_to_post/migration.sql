/*
  Warnings:

  - Made the column `subtitle` on table `post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imgUrl` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `subtitle` VARCHAR(191) NOT NULL,
    MODIFY `imgUrl` LONGBLOB NOT NULL;
