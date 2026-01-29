"use-client"

import { BombIcon } from "@/app/icons/bomb"
import { CellViewProps } from "./cell.types"
import { motion } from "framer-motion"
import { FlagIcon } from "@/app/icons/flag"
import { cn } from "@/app/utils/cn"

const numberColors: Record<number, string> = {
  1: "text-blue-600",
  2: "text-green-600",
  3: "text-red-600",
  4: "text-purple-600",
  5: "text-yellow-600",
  6: "text-teal-600",
  7: "text-pink-600",
  8: "text-gray-600",
  [-1]: "bg-red-800",
}

const backgroundColors: Record<number, string> = {
  0: "bg-zinc-800",
  1: "bg-zinc-800",
  2: "bg-zinc-800",
  3: "bg-zinc-800",
  4: "bg-zinc-800",
  5: "bg-zinc-800",
  6: "bg-zinc-800",
  7: "bg-zinc-800",
  8: "bg-zinc-800",
  [-1]: "bg-red-900",
}

export function CellView({
  isOpened,
  cell,
  handleMarkCell,
  isMarked,
  handleClick,
  canOpenNumberCell,
  openNumberCell,
  canMarkRoundCells,
  markRoundCells,
}: CellViewProps) {
  if (isOpened) {
    return (
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`w-8 h-8 flex text-center justify-center items-center select-none bg-zinc-900 box-border aspect-square ring-1 ring-inset ring-zinc-700  ${
          backgroundColors[cell.value] || "bg-zinc-900"
        }`}
      >
        {cell.value === -1 ? (
          <BombIcon width={20} height={20} />
        ) : (
          <button
            className={cn(
              `text-center flex items-center justify-center h-full font-medium w-full`,
              numberColors[cell.value] || "text-zinc-50",
              cell.value === 0 && "pointer-events-none", // só desabilita se for 0
              (canOpenNumberCell || canMarkRoundCells) && "cursor-pointer",
            )}
            onClick={() => {
              // Só verifica se pode abrir quando o usuário clica
              if (canOpenNumberCell) {
                openNumberCell([cell.i, cell.j])
              }
            }}
            onContextMenu={(e) => {
              e.preventDefault() // impede o menu do navegador
              if (canMarkRoundCells) {
                markRoundCells([cell.i, cell.j])
              }
            }}
          >
            {cell.value === 0 ? "" : cell.value}
          </button>
        )}
      </motion.div>
    )
  }

  return (
    <div>
      <button
        onClick={handleClick}
        onContextMenu={(e) => {
          e.preventDefault() // impede o menu do navegador
          handleMarkCell([cell.i, cell.j])
        }}
        className={
          "flex w-8 h-8 items-center justify-center bg-zinc-300 cursor-pointer box-border aspect-square ring-1 ring-inset ring-zinc-500"
        }
      >
        {isMarked ? <FlagIcon width={20} height={20} /> : ""}
      </button>
    </div>
  )
}
