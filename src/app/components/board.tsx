import { useState } from "react"
import { BoardDifficulty, useBoard } from "../hooks/useBoard"
import { cn } from "../utils/cn"
import { Button } from "./button"
import { Cell } from "./cell"
import { LoseModal } from "./loseModal"
import { VictoryModal } from "./victoryModal"
import { formatTimeMinSeconds } from "../utils/formatTimeMinSeconds"

export function Board() {
  const [dificulty, setDificulty] = useState<BoardDifficulty>("medium")

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

  return (
    <main className="flex flex-col mx-auto gap-4  items-center justify-center">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <p className="text-lg font-medium"> Dificuldade</p>
        <div className="flex gap-2 items-center">
          <Button onClick={() => setDificulty("easy")}>Fácil</Button>
          <Button onClick={() => setDificulty("medium")}>Médio</Button>
          <Button onClick={() => setDificulty("hard")}>Difícil</Button>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Button onClick={resetGame}>Reiniciar</Button>
      </div>

      <div className="flex">
        <p>{min}</p>:
        <p className="min-w-6">{seconds < 10 ? `0${seconds}` : seconds}</p>
      </div>
      <div
        className={cn(
          `grid ${colClass} w-fit mx-auto gap-0 p-0 bg-zinc-900 ring-1 ring-zinc-700 mt-5 rounded-sm overflow-hidden`,
          win && "pointer-events-none"
        )}
        onContextMenu={handleBoardContextMenu}
      >
        {board.map((row, i) => {
          return row.map((cell, j) => {
            return (
              <Cell
                key={`${i}${j}`}
                cell={{ value: cell, i, j }}
                isOpened={opened[`${i}-${j}`]}
                isMarked={marked[`${i}-${j}`]}
                handleMarkCell={handleMarkCell}
                openCell={openCell}
              />
            )
          })
        })}
      </div>
      <VictoryModal win={win} usedTime={usedTime} />
      <LoseModal isEndGame={isEndGame} win={win} />
    </main>
  )
}
