export function countNumberOfHideCellsRounding(
  coord: number[],
  opened: Record<string, boolean>,
  size: number,
) {
  let count = 0
  const [i, j] = coord

  const neighbors = [
    [i + 1, j],
    [i - 1, j],
    [i, j + 1],
    [i, j - 1],
    [i + 1, j + 1],
    [i + 1, j - 1],
    [i - 1, j + 1],
    [i - 1, j - 1],
  ]

  neighbors.forEach(([x, y]) => {
    if (x >= 0 && x < size && y >= 0 && y < size && !opened[`${x}-${y}`]) {
      count++
    }
  })

  return count
}
