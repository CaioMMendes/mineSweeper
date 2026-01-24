import { useVictoryModalModel } from "./victoryModal.model"
import { VictoryModalProps } from "./victoryModal.types"
import { VictoryModalView } from "./victoryModal.view"

export function VictoryModal({ win, usedTime }: VictoryModalProps) {
  const { handleCloseVictoryModal, min, seconds, victoryModalOpen } =
    useVictoryModalModel({ win, usedTime })

  return (
    <VictoryModalView
      handleCloseVictoryModal={handleCloseVictoryModal}
      min={min}
      seconds={seconds}
      victoryModalOpen={victoryModalOpen}
    />
  )
}
