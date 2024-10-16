-- AlterTable
ALTER TABLE `Order` MODIFY `order_status` ENUM('pending', 'cancel', 'delivering', 'completed') NOT NULL;
