"use-client"

import { cn } from "@/app/utils/cn"
import { Button } from "../button"
import { Cell } from "../cell"
import { LoseModal } from "../loseModal"
import { VictoryModal } from "../victoryModal"
import { BoardViewProps } from "./board.types"
import { redirect } from "next/navigation"

export function BoardView({
  board,
  difficulty,
  resetGame,
  win,
  opened,
  marked,
  bombsLeft,
  handleMarkCell,
  handleBoardContextMenu,
  min,
  seconds,
  usedTime,
  openCell,
  isEndGame,
  colClass,
  checkCanOpenNumberCell,
  openNumberCell,
  checkCanMarkRoundCells,
  markRoundCells,
}: BoardViewProps) {
  return (
    <main className="flex flex-col mx-auto gap-4  items-center justify-center">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <p className="text-lg font-medium"> Dificuldade</p>
        <div className="flex gap-2 items-center">
          <Button
            variant={difficulty === "easy" ? "selected" : undefined}
            onClick={() => redirect("/easy")}
          >
            Fácil
          </Button>
          <Button
            variant={difficulty === "medium" ? "selected" : undefined}
            onClick={() => redirect("/medium")}
          >
            Médio
          </Button>
          <Button
            variant={difficulty === "hard" ? "selected" : undefined}
            onClick={() => redirect("/hard")}
          >
            Difícil
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Button onClick={resetGame}>Reiniciar</Button>
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex justify-center">
          <p>{min}</p>:
          <p className="min-w-6">{seconds < 10 ? `0${seconds}` : seconds}</p>
        </div>

        <div>
          Restam {bombsLeft} Bomba
          {bombsLeft === 1 || bombsLeft === -1 ? "" : "s"}
        </div>
      </div>
      <div
        className={cn(
          `grid ${colClass} w-fit mx-auto gap-0 p-0 bg-zinc-900 ring-1 ring-zinc-700 mt-3 rounded-sm overflow-hidden`,
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
                checkCanMarkRoundCells={checkCanMarkRoundCells}
                markRoundCells={markRoundCells}
              />
            )
          })
        })}
      </div>
      <VictoryModal win={win} usedTime={usedTime} difficulty={difficulty} />
      <LoseModal isEndGame={isEndGame} win={win} />
    </main>
  )
}
