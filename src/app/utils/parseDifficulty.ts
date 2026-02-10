import { BoardDifficulty } from "@/app/hooks/useBoard/types/boardTypes"

export function parseDifficulty(value: string): BoardDifficulty {
  if (value === "easy" || value === "medium" || value === "hard") {
    return value
  }

  return "medium" // fallback seguro
}
