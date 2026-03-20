"use-client"
import { Modal } from "../modal"
import { LoseModalViewProps } from "./loseModal.types"

export function LoseModalView({
  handleCloseLoseModal,
  loseModalOpen,
}: LoseModalViewProps) {
  return (
    <>
      {loseModalOpen ? (
        <Modal
          open={loseModalOpen}
          onClose={handleCloseLoseModal}
          className="flex items-center justify-center flex-col"
        >
          <h2 className="text-2xl font-bold mb-4 text-red-600">💥 Game Over</h2>

          <p className="mb-4 text-center">
            Você clicou em uma bomba 😢 Que tal tentar novamente?
          </p>

          <button
            onClick={handleCloseLoseModal}
            className="px-10 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
          >
            Tentar novamente
          </button>
        </Modal>
      ) : (
        <></>
      )}
    </>
  )
}
