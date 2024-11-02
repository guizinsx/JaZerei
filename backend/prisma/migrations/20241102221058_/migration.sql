/*
  Warnings:

  - You are about to drop the column `gameId` on the `usergames` table. All the data in the column will be lost.
  - You are about to drop the `game_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `games` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,steamGameId]` on the table `usergames` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `steamGameId` to the `usergames` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "usergames" DROP CONSTRAINT "usergames_gameId_fkey";

-- DropIndex
DROP INDEX "usergames_userId_gameId_key";

-- AlterTable
ALTER TABLE "usergames" DROP COLUMN "gameId",
ADD COLUMN     "steamGameId" TEXT NOT NULL;

-- DropTable
DROP TABLE "game_categories";

-- DropTable
DROP TABLE "games";

-- CreateIndex
CREATE UNIQUE INDEX "usergames_userId_steamGameId_key" ON "usergames"("userId", "steamGameId");
