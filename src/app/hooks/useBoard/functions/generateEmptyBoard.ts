export function generateEmptyBoard(size: number) {
  const board: number[][] = []
  for (let i = 0; i < size; i++) {
    const array = []
    for (let j = 0; j < size; j++) {
      array.push(0)
    }
    board.push(array)
  }
  return board
}
