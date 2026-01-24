import { boardStats } from "../constants/boardStats"
import { BoardDifficulty } from "../types/boardTypes"
import { generateEmptyBoard } from "./generateEmptyBoard"
import { isOnFirstClickRange } from "./isOnFirstClickRange"
import { randomCoordenate } from "./randomCoordenate"

export function generateBoard(difficulty: BoardDifficulty, coord: number[]) {
  const { numberOfBombs, size } = boardStats[difficulty]

  const board = generateEmptyBoard(size)

  let count = 0
  while (count < numberOfBombs) {
    const [x, y] = randomCoordenate(size)
    if (board[x][y] === -1 || isOnFirstClickRange([x, y], coord)) continue

    board[x][y] = -1
    count++
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === -1) continue

      const topMiddle = board?.[i + 1]?.[j] === -1 ? 1 : 0
      const topLeft = board?.[i + 1]?.[j - 1] === -1 ? 1 : 0
      const topRight = board?.[i + 1]?.[j + 1] === -1 ? 1 : 0
      const left = board?.[i]?.[j - 1] === -1 ? 1 : 0
      const right = board?.[i]?.[j + 1] === -1 ? 1 : 0
      const bottomMiddle = board?.[i - 1]?.[j] === -1 ? 1 : 0
      const bottomLeft = board?.[i - 1]?.[j - 1] === -1 ? 1 : 0
      const bottomRight = board?.[i - 1]?.[j + 1] === -1 ? 1 : 0

      const count =
        topMiddle +
        topLeft +
        topRight +
        left +
        right +
        bottomLeft +
        bottomMiddle +
        bottomRight

      board[i][j] = count
    }
  }

  return board
}
