import { useEffect, useEffectEvent, useRef, useState } from "react"
import { Modal } from "./modal"

interface VictoryModalProps {
  win: boolean | null
}

export function VictoryModal({ win }: VictoryModalProps) {
  const [victoryModalOpen, setVictoryModalOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const openModal = useEffectEvent(() => {
    if (win === true && victoryModalOpen === false) {
      setVictoryModalOpen(true)
      audioRef.current?.play().catch((error) => {
        console.log("error: ", error)
      })
    }
  })
  useEffect(() => {
    audioRef.current = new Audio("/victory.mp3")
    audioRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    openModal()
  }, [win])

  return (
    <>
      {victoryModalOpen ? (
        <Modal
          open={victoryModalOpen}
          onClose={() => setVictoryModalOpen(false)}
          className="flex items-center justify-center flex-col"
        >
          <h2 className="text-2xl font-bold mb-4">🎉 Você venceu!</h2>
          <p className="mb-4">
            Parabéns! Continue jogando para melhorar seu score.
          </p>
          <button
            onClick={() => setVictoryModalOpen(false)}
            className="px-10 py-2 bg-green-600 text-white rounded"
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
