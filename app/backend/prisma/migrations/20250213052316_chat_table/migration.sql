-- AlterTable
ALTER TABLE `Book` MODIFY `descricao` LONGTEXT NULL;

-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` LONGTEXT NOT NULL,
    `initDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `senderEmail` VARCHAR(191) NOT NULL,
    `receiverEmail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_senderEmail_fkey` FOREIGN KEY (`senderEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_receiverEmail_fkey` FOREIGN KEY (`receiverEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
