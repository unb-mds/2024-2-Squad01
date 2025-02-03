/*
  Warnings:

  - Added the required column `objetivo` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Book` ADD COLUMN `objetivo` VARCHAR(191) NOT NULL;
