"use client"

import { UseCellModelProps } from "./cell.types"

export function useCellModel({
  isMarked,
  openCell,
  cell,
  checkCanOpenNumberCell,
}: UseCellModelProps) {
  function handleClick() {
    //todo tem que ver se tem
    if (!isMarked) openCell([cell.i, cell.j])
  }

  const canOpenNumberCell = checkCanOpenNumberCell([cell.i, cell.j])

  return {
    handleClick,
    canOpenNumberCell,
  }
}
