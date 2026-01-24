import { RefObject } from "react"
import { useVictoryModalModel } from "./victoryModal.model"

export type VictoryModalModelProps = {
  win: boolean | null
  usedTime: RefObject<number>
}

export type VictoryModalProps = {
  win: boolean | null
  usedTime: RefObject<number>
}

export type VictoryModalViewProps = ReturnType<typeof useVictoryModalModel>
