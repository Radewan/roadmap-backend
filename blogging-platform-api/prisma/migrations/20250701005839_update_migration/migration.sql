/*
  Warnings:

  - You are about to drop the `_post_tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_post_tag` DROP FOREIGN KEY `_post_tag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_post_tag` DROP FOREIGN KEY `_post_tag_B_fkey`;

-- DropTable
DROP TABLE `_post_tag`;

-- CreateTable
CREATE TABLE `_PostToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostToTag_AB_unique`(`A`, `B`),
    INDEX `_PostToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PostToTag` ADD CONSTRAINT `_PostToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToTag` ADD CONSTRAINT `_PostToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
