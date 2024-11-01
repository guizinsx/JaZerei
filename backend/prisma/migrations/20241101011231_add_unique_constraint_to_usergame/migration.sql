/*
  Warnings:

  - A unique constraint covering the columns `[userId,gameId]` on the table `usergames` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "usergames_userId_gameId_key" ON "usergames"("userId", "gameId");
