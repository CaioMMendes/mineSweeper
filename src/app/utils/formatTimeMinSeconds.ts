export function formatTimeMinSeconds(time: number) {
  const min = Math.floor(time / 60)
  const seconds = time % 60

  return { min, seconds }
}
