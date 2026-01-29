import { useCellModel } from "./cell.model"
import { CellProps } from "./cell.types"
import { CellView } from "./cell.view"

export function Cell({
  cell,
  isOpened,
  isMarked,
  openCell,
  handleMarkCell,
  checkCanOpenNumberCell,
  checkCanMarkRoundCells,
  openNumberCell,
  markRoundCells,
}: CellProps) {
  const { handleClick, canOpenNumberCell, canMarkRoundCells } = useCellModel({
    isMarked,
    openCell,
    cell,
    checkCanOpenNumberCell,
    checkCanMarkRoundCells,
  })

  return (
    <CellView
      cell={cell}
      handleMarkCell={handleMarkCell}
      isMarked={isMarked}
      isOpened={isOpened}
      openCell={openCell}
      handleClick={handleClick}
      canOpenNumberCell={canOpenNumberCell}
      openNumberCell={openNumberCell}
      canMarkRoundCells={canMarkRoundCells}
      markRoundCells={markRoundCells}
    />
  )
}
