-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `data_de_publicacao` DATETIME(3) NOT NULL,
    `data_de_conclusao` DATETIME(3) NULL,
    `matricula_cliente` VARCHAR(191) NOT NULL,
    `matricula_publicador` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `matricula` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `whatsApp` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,

    UNIQUE INDEX `User_nome_key`(`nome`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_matricula_cliente_fkey` FOREIGN KEY (`matricula_cliente`) REFERENCES `User`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_matricula_publicador_fkey` FOREIGN KEY (`matricula_publicador`) REFERENCES `User`(`matricula`) ON DELETE SET NULL ON UPDATE CASCADE;
