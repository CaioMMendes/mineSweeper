"use client"

import { useBoardModel } from "./board.model"
import { BoardView } from "./board.view"

export function Board() {
  const { ...props } = useBoardModel()

  return <BoardView {...props} />
}
