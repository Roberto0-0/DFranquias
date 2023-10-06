-- CreateTable
CREATE TABLE `Cattle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `amount_milk` DOUBLE NOT NULL,
    `amount_food` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `birth` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cattle_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
