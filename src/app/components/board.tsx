import { useState } from "react"
import { BoardDifficulty, useBoard } from "../hooks/useBoard"
import { cn } from "../utils/cn"
import { Button } from "./button"
import { Cell } from "./cell"
import { LoseModal } from "./loseModal"
import { VictoryModal } from "./victoryModal"

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
  } = useBoard(dificulty)

  const colsClass: Record<number, string> = {
    5: "grid-cols-5",
    7: "grid-cols-[repeat(7,minmax(0,1fr))]",
    9: "grid-cols-[repeat(9,minmax(0,1fr))]",
  }
  const colClass = colsClass[board.length] ?? 5
  const handleBoardContextMenu = (e: React.MouseEvent) => {
    e.preventDefault() // bloqueia menu direito global
  }
  console.log(board.length)
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
      <VictoryModal win={win} />
      <LoseModal isEndGame={isEndGame} win={win} />
    </main>
  )
}
