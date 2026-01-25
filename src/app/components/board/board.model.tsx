import { BoardDifficulty } from "@/app/hooks/useBoard/types/boardTypes"
import { useBoard } from "@/app/hooks/useBoard/useBoard"
import { formatTimeMinSeconds } from "@/app/utils/formatTimeMinSeconds"
import { useState } from "react"

export function useBoardModel() {
  const [dificulty, setDificulty] = useState<BoardDifficulty>("medium")

  //todo colocar para pegar a dificuldade pela url, assim da pra mandar link com a dificuldade certa

  const {
    board,
    opened,
    openCell,
    resetGame,
    marked,
    handleMarkCell,
    win,
    isEndGame,
    timeLeft,
    usedTime,
    checkCanOpenNumberCell,
    openNumberCell,
  } = useBoard(dificulty)
  const { min, seconds } = formatTimeMinSeconds(timeLeft)

  const colsClass: Record<number, string> = {
    5: "grid-cols-5",
    7: "grid-cols-[repeat(7,minmax(0,1fr))]",
    9: "grid-cols-[repeat(9,minmax(0,1fr))]",
  }
  const colClass = colsClass[board.length] ?? 5
  const handleBoardContextMenu = (e: React.MouseEvent) => {
    e.preventDefault() // bloqueia menu direito global
  }

  return {
    board,
    opened,
    openCell,
    resetGame,
    marked,
    handleMarkCell,
    win,
    isEndGame,
    timeLeft,
    usedTime,
    min,
    seconds,
    colClass,
    handleBoardContextMenu,
    setDificulty,
    checkCanOpenNumberCell,
    openNumberCell,
  }
}
