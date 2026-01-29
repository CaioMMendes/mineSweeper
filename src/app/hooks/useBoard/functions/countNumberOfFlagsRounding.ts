export function countNumberOfFlagsRounding(
  coord: number[],
  marked: Record<string, boolean>,
) {
  let count = 0

  const [i, j] = coord

  if (!!marked[`${i + 1}-${j}`]) count++
  if (!!marked[`${i - 1}-${j}`]) count++
  if (!!marked[`${i + 1}-${j - 1}`]) count++
  if (!!marked[`${i + 1}-${j + 1}`]) count++
  if (!!marked[`${i - 1}-${j + 1}`]) count++
  if (!!marked[`${i - 1}-${j - 1}`]) count++
  if (!!marked[`${i}-${j - 1}`]) count++
  if (!!marked[`${i}-${j + 1}`]) count++

  return count
}
