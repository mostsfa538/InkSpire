/*
  Warnings:

  - The values [cancelled] on the enum `Order_order_status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[cart_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `payementMethod` ENUM('cash', 'visa') NOT NULL DEFAULT 'visa',
    MODIFY `order_status` ENUM('pending', 'delivering', 'completed') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_cart_id_key` ON `Order`(`cart_id`);
