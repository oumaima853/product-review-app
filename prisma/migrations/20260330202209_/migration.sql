-- AlterTable
ALTER TABLE `review` ADD COLUMN `status` ENUM('approved', 'flagged') NOT NULL DEFAULT 'approved';
