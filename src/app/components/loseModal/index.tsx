import { useLoseModalModel } from "./loseModal.model"
import { LoseModalProps } from "./loseModal.types"
import { LoseModalView } from "./loseModal.view"

export function LoseModal({ isEndGame, win }: LoseModalProps) {
  const { handleCloseLoseModal, loseModalOpen } = useLoseModalModel({
    win,
    isEndGame,
  })

  return (
    <LoseModalView
      handleCloseLoseModal={handleCloseLoseModal}
      loseModalOpen={loseModalOpen}
    />
  )
}
