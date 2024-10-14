/*
  Warnings:

  - You are about to drop the column `id_user` on the `Order` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_id_user_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `id_user`,
    ADD COLUMN `deliveryDate` DATETIME(3) NULL,
    ADD COLUMN `pendingTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
