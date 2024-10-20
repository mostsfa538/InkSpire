/*
  Warnings:

  - The values [cancel] on the enum `Order_order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `order_status` ENUM('pending', 'delivering', 'completed') NOT NULL;
