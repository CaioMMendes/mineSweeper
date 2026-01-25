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
  openNumberCell,
}: CellProps) {
  const { handleClick, canOpenNumberCell } = useCellModel({
    isMarked,
    openCell,
    cell,
    checkCanOpenNumberCell,
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
    />
  )
}
