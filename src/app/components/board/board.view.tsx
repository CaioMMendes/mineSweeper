"use-client"

import { cn } from "@/app/utils/cn"
import { Button } from "../button"
import { Cell } from "../cell"
import { LoseModal } from "../loseModal"
import { VictoryModal } from "../victoryModal"
import { BoardViewProps } from "./board.types"

export function BoardView({
  board,
  resetGame,
  win,
  opened,
  marked,
  handleMarkCell,
  handleBoardContextMenu,
  min,
  seconds,
  usedTime,
  openCell,
  isEndGame,
  colClass,
  setDificulty,
  checkCanOpenNumberCell,
  openNumberCell,
}: BoardViewProps) {
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
          (win || isEndGame) && "pointer-events-none",
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
                checkCanOpenNumberCell={checkCanOpenNumberCell}
                openNumberCell={openNumberCell}
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
