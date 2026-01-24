export function isOnFirstClickRange(cell: number[], coord: number[]) {
  return Math.abs(cell[0] - coord[0]) <= 1 && Math.abs(cell[1] - coord[1]) <= 1
}
