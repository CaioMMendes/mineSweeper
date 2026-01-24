import { boardStats } from "../constants/boardStats"
import { BoardDifficulty } from "../types/boardTypes"

export function generateOpenedCells(difficulty: BoardDifficulty) {
  const { size } = boardStats[difficulty]
  const openList: Record<string, boolean> = {}

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      openList[`${i}-${j}`] = false
    }
  }
  return openList
}
