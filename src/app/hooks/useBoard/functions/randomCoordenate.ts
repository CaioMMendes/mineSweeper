export function randomCoordenate(size: number) {
  const randomX = Math.floor(Math.random() * size)
  const randomY = Math.floor(Math.random() * size)
  return [randomX, randomY]
}
