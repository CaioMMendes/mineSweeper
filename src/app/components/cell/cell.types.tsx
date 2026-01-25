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
  canOpenNumberCell: boolean
  openNumberCell: ([i, j]: number[]) => void
}

export type UseCellModelProps = {
  cell: CellType
  isMarked: boolean
  openCell: (coord: number[]) => void
  checkCanOpenNumberCell: (coord: number[]) => boolean
}

export type CellProps = {
  cell: CellType
  isOpened: boolean
  isMarked: boolean
  openCell: (coord: number[]) => void
  handleMarkCell: ([i, j]: number[]) => void
  checkCanOpenNumberCell: (coord: number[]) => boolean
  openNumberCell: ([i, j]: number[]) => void
}
