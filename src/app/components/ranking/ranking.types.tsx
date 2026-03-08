export type DifficultyTab = "easy" | "medium" | "hard"
export type DifficultyType = "EASY" | "MEDIUM" | "HARD"

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
export const DIFFICULTY_MAP: Record<DifficultyTab, DifficultyType> = {
  easy: "EASY",
  medium: "MEDIUM",
  hard: "HARD",
}
