import { $Enums } from "@prisma/client"

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
export const DIFFICULTY_MAP: Record<DifficultyTab, $Enums.Difficulty> = {
  easy: $Enums.Difficulty.EASY,
  medium: $Enums.Difficulty.MEDIUM,
  hard: $Enums.Difficulty.HARD,
}
