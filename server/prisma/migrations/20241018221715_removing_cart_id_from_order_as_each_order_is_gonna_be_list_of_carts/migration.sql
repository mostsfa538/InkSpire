/*
  Warnings:

  - You are about to drop the column `cart_id` on the `Order` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Order_cart_id_key` ON `Order`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `cart_id`;
