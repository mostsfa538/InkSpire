/*
  Warnings:

  - You are about to drop the column `quantity` on the `Book` table. All the data in the column will be lost.
  - Added the required column `available` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Book` DROP COLUMN `quantity`,
    ADD COLUMN `available` INTEGER NOT NULL,
    ADD COLUMN `sold` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `CartItem` MODIFY `quantity` INTEGER NOT NULL DEFAULT 1;
