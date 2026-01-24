import { UseCellModelProps } from "./cell.types"

export function useCellModel({ isMarked, openCell, cell }: UseCellModelProps) {
  function handleClick() {
    if (!isMarked) openCell([cell.i, cell.j])
  }

  return {
    handleClick,
  }
}
