import { Difficulty } from "@prisma/client"

export type DifficultyTab = "easy" | "medium" | "hard"

export type ScoreEntry = {
  playerName: string
  timeMs: number
}

export type RankingViewProps = {
  scores: ScoreEntry[]
}

export type RankingProps = {
  difficulty: DifficultyTab
}

// Mapeia DifficultyTab para o enum do Prisma
export const DIFFICULTY_MAP: Record<DifficultyTab, Difficulty> = {
  easy: Difficulty.EASY,
  medium: Difficulty.MEDIUM,
  hard: Difficulty.HARD,
}
