-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "timeMs" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "gameVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Score_gameVersion_difficulty_timeMs_idx" ON "Score"("gameVersion", "difficulty", "timeMs");
