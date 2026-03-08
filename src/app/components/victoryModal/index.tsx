"use client"

import { useVictoryModalModel } from "./victoryModal.model"
import { VictoryModalProps } from "./victoryModal.types"
import { VictoryModalView } from "./victoryModal.view"

export function VictoryModal({ win, usedTime, difficulty }: VictoryModalProps) {
  const { ...rest } = useVictoryModalModel({ win, usedTime, difficulty })

  return <VictoryModalView {...rest} />
}
