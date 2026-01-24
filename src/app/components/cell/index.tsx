import { useCellModel } from "./cell.model"
import { CellProps } from "./cell.types"
import { CellView } from "./cell.view"

export function Cell({
  cell,
  isOpened,
  isMarked,
  openCell,
  handleMarkCell,
}: CellProps) {
  const { handleClick } = useCellModel({ isMarked, openCell, cell })

  return (
    <CellView
      cell={cell}
      handleMarkCell={handleMarkCell}
      isMarked={isMarked}
      isOpened={isOpened}
      openCell={openCell}
      handleClick={handleClick}
    />
  )
}
