"use client"

import { useBoardModel } from "./board.model"
import { BoardProps } from "./board.types"
import { BoardView } from "./board.view"

export function Board({ difficulty }: BoardProps) {
  const { ...props } = useBoardModel(difficulty)

  return <BoardView {...props} />
}
