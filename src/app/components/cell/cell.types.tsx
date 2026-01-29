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
  canMarkRoundCells: boolean
  openNumberCell: ([i, j]: number[]) => void
  markRoundCells: (coord: number[]) => void
}

export type UseCellModelProps = {
  cell: CellType
  isMarked: boolean
  openCell: (coord: number[]) => void
  checkCanOpenNumberCell: (coord: number[]) => boolean
  checkCanMarkRoundCells: (coord: number[]) => boolean
}

export type CellProps = {
  cell: CellType
  isOpened: boolean
  isMarked: boolean
  openCell: (coord: number[]) => void
  handleMarkCell: ([i, j]: number[]) => void
  checkCanOpenNumberCell: (coord: number[]) => boolean
  openNumberCell: ([i, j]: number[]) => void
  markRoundCells: (coord: number[]) => void
  checkCanMarkRoundCells: (coord: number[]) => boolean
}
