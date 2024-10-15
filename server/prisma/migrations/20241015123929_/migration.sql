/*
  Warnings:

  - You are about to alter the column `total_price` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `total_price` DECIMAL(10, 2) NOT NULL;
