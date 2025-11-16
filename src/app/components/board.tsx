import { useBoard } from "../hooks/useBoard"
import { Button } from "./button"
import { Cell } from "./cell"

export function Board() {
  const { board, opened, openCell, resetGame, marked, handleMarkCell } =
    useBoard("hard")
  const colsClass: Record<number, string> = {
    5: "grid-cols-5",
    7: "grid-cols-[repeat(7,minmax(0,1fr))]",
    9: "grid-cols-[repeat(9,minmax(0,1fr))]",
  }
  console.log(board.length)
  const colClass = colsClass[board.length] ?? 5
  const handleBoardContextMenu = (e: React.MouseEvent) => {
    e.preventDefault() // bloqueia menu direito global
  }
  return (
    <main className="flex flex-col mx-auto">
      <div>
        <Button onClick={resetGame}>Reiniciar</Button>
      </div>
      <div
        className={`grid ${colClass} gap-0 p-0 bg-zinc-900 ring-1 ring-zinc-700 rounded-sm overflow-hidden`}
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
    </main>
  )
}
