import { boardStats } from "../constants/boardStats"
import { BoardDifficulty } from "../types/boardTypes"

export function generateMarkedCells(difficulty: BoardDifficulty) {
  const { size } = boardStats[difficulty]
  const markedList: Record<string, boolean> = {}

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      markedList[`${i}-${j}`] = false
    }
  }

  return markedList
}
