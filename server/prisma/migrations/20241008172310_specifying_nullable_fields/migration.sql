/*
  Warnings:

  - You are about to alter the column `f_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `l_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Card` DROP FOREIGN KEY `Card_id_book_fkey`;

-- DropForeignKey
ALTER TABLE `Card` DROP FOREIGN KEY `Card_id_user_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `f_name` VARCHAR(50) NULL,
    MODIFY `l_name` VARCHAR(50) NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `image` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Card`;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_book` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_id_book_fkey` FOREIGN KEY (`id_book`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
