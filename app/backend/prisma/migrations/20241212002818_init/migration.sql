/*
  Warnings:

  - You are about to drop the column `matricula_cliente` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `matricula_publicador` on the `Book` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `matricula` on the `User` table. All the data in the column will be lost.
  - Added the required column `email_cliente` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_matricula_cliente_fkey`;

-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_matricula_publicador_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `matricula_cliente`,
    DROP COLUMN `matricula_publicador`,
    ADD COLUMN `email_cliente` VARCHAR(191) NOT NULL,
    ADD COLUMN `email_publicador` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `matricula`,
    ADD PRIMARY KEY (`email`);

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_email_cliente_fkey` FOREIGN KEY (`email_cliente`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_email_publicador_fkey` FOREIGN KEY (`email_publicador`) REFERENCES `User`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
