import { BoardDifficulty } from "@/app/hooks/useBoard/types/boardTypes"
import { useBoard } from "@/app/hooks/useBoard/useBoard"
import { formatTimeMinSeconds } from "@/app/utils/formatTimeMinSeconds"

export function useBoardModel(difficulty: BoardDifficulty) {
  //todo colocar para pegar a dificuldade pela url, assim da pra mandar link com a dificuldade certa

  const {
    board,
    opened,
    marked,
    win,
    isEndGame,
    timeLeft,
    usedTime,
    stats,
    openCell,
    resetGame,
    handleMarkCell,
    checkCanOpenNumberCell,
    openNumberCell,
    checkCanMarkRoundCells,
    markRoundCells,
  } = useBoard(difficulty)
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

  const numberOfMarked = Object.values(marked).filter((val) => val).length
  const bombsLeft = stats.numberOfBombs - numberOfMarked

  return {
    board,
    opened,
    marked,
    win,
    isEndGame,
    timeLeft,
    usedTime,
    min,
    seconds,
    colClass,
    bombsLeft,
    openCell,
    resetGame,
    handleMarkCell,
    handleBoardContextMenu,
    checkCanOpenNumberCell,
    openNumberCell,
    checkCanMarkRoundCells,
    markRoundCells,
  }
}
