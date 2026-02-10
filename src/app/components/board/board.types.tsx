import { BoardDifficulty } from "@/app/hooks/useBoard/types/boardTypes"
import { useBoardModel } from "./board.model"

export type BoardViewProps = ReturnType<typeof useBoardModel>

export type BoardProps = {
  difficulty: BoardDifficulty
}
