import { useBoard } from "../hooks/useBoard"
import { cn } from "../utils/cn"
import { Button } from "./button"
import { Cell } from "./cell"
import { LoseModal } from "./loseModal"
import { VictoryModal } from "./victoryModal"

export function Board() {
  const {
    board,
    opened,
    openCell,
    resetGame,
    marked,
    handleMarkCell,
    win,
    isEndGame,
  } = useBoard("hard")

  const colsClass: Record<number, string> = {
    5: "grid-cols-5",
    7: "grid-cols-[repeat(7,minmax(0,1fr))]",
    9: "grid-cols-[repeat(9,minmax(0,1fr))]",
  }
  const colClass = colsClass[board.length] ?? 5
  const handleBoardContextMenu = (e: React.MouseEvent) => {
    e.preventDefault() // bloqueia menu direito global
  }
  console.log(win)
  return (
    <main className="flex flex-col mx-auto">
      <div>
        <Button onClick={resetGame}>Reiniciar</Button>
      </div>
      <div
        className={cn(
          `grid ${colClass} gap-0 p-0 bg-zinc-900 ring-1 ring-zinc-700 rounded-sm overflow-hidden`,
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
