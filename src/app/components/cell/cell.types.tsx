type CellType = {
  value: number
  i: number
  j: number
}

export type CellViewProps = {
  cell: CellType
  isOpened: boolean
  isMarked: boolean
  openCell: (coord: number[]) => void
  handleMarkCell: ([i, j]: number[]) => void
  handleClick: () => void
}

export type UseCellModelProps = {
  cell: CellType
  isMarked: boolean
  openCell: (coord: number[]) => void
}

export type CellProps = {
  cell: CellType
  isOpened: boolean
  isMarked: boolean
  openCell: (coord: number[]) => void
  handleMarkCell: ([i, j]: number[]) => void
}
