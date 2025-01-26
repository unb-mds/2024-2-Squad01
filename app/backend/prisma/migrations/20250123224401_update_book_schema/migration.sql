/*
  Warnings:

  - Made the column `email_publicador` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_email_cliente_fkey`;

-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_email_publicador_fkey`;

-- AlterTable
ALTER TABLE `Book` MODIFY `email_cliente` VARCHAR(191) NULL,
    MODIFY `email_publicador` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_email_cliente_fkey` FOREIGN KEY (`email_cliente`) REFERENCES `User`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_email_publicador_fkey` FOREIGN KEY (`email_publicador`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
