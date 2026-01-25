export function countNumberOfOpenedCellsRounding(
  coord: number[],
  opened: Record<string, boolean>,
) {
  let count = 0

  const [i, j] = coord

  if (opened[`${i + 1}-${j}`]) count++
  if (opened[`${i - 1}-${j}`]) count++
  if (opened[`${i + 1}-${j - 1}`]) count++
  if (opened[`${i + 1}-${j + 1}`]) count++
  if (opened[`${i - 1}-${j + 1}`]) count++
  if (opened[`${i - 1}-${j - 1}`]) count++
  if (opened[`${i}-${j - 1}`]) count++
  if (opened[`${i}-${j + 1}`]) count++

  return count
}
