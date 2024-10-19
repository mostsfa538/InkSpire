-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_cart_id_fkey`;

-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `order_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Order` MODIFY `payementMethod` ENUM('cash', 'visa', 'paypal') NOT NULL DEFAULT 'visa';

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
