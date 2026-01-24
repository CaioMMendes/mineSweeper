"use-client"

import { Modal } from "../modal"
import { VictoryModalViewProps } from "./victoryModal.types"

export function VictoryModalView({
  victoryModalOpen,
  handleCloseVictoryModal,
  seconds,
  min,
}: VictoryModalViewProps) {
  return (
    <>
      {victoryModalOpen ? (
        <Modal
          open={victoryModalOpen}
          onClose={handleCloseVictoryModal}
          className="flex items-center justify-center flex-col"
        >
          <h2 className="text-2xl font-bold mb-4">🎉 Você venceu!</h2>
          <p>Parabéns! Continue jogando para melhorar seu score.</p>
          <p>
            Você terminou em{" "}
            <span className="font-semibold">
              {min > 0 ? `${min} minuto${min > 1 ? "s" : ""}` : ""}{" "}
              {seconds > 0 ? `${seconds} segundo${seconds > 1 && "s"}` : ""}
            </span>
          </p>
          <button
            onClick={handleCloseVictoryModal}
            className="px-10 py-2 bg-green-600 text-white rounded mt-4"
          >
            Fechar
          </button>
        </Modal>
      ) : (
        <></>
      )}
    </>
  )
}
