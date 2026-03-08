import { RefObject } from "react"
import { useVictoryModalModel } from "./victoryModal.model"
import { DifficultyType } from "@/app/types/difficultyType"

export type VictoryModalModelProps = {
  win: boolean | null
  usedTime: RefObject<number>
  difficulty: DifficultyType
}

export type VictoryModalProps = {
  win: boolean | null
  usedTime: RefObject<number>
  difficulty: DifficultyType
}

export type VictoryModalViewProps = ReturnType<typeof useVictoryModalModel>
