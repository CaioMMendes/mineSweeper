import { Dispatch, RefObject, SetStateAction } from "react"

export function checkWin(
  numberOfBombs: number,
  size: number,
  openedCount: RefObject<number>,
  setIsEndGame: Dispatch<SetStateAction<boolean>>,
  setWin: Dispatch<SetStateAction<boolean | null>>,
  pauseTimer: () => void,
) {
  if (numberOfBombs === size ** 2 - openedCount.current) {
    setIsEndGame(true)
    setWin(true)
    pauseTimer()
    return
  }
}
