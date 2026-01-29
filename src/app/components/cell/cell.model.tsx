"use client"

import { UseCellModelProps } from "./cell.types"

export function useCellModel({
  isMarked,
  openCell,
  cell,
  checkCanOpenNumberCell,
  checkCanMarkRoundCells,
}: UseCellModelProps) {
  function handleClick() {
    if (!isMarked) openCell([cell.i, cell.j])
  }

  const canOpenNumberCell = checkCanOpenNumberCell([cell.i, cell.j])
  const canMarkRoundCells = checkCanMarkRoundCells([cell.i, cell.j])

  return {
    handleClick,
    canOpenNumberCell,
    canMarkRoundCells,
  }
}
