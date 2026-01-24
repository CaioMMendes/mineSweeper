import { useEffect, useEffectEvent, useRef, useState } from "react"
import useVolumeStore from "../../stores/volume-store"
import { Modal } from "../modal"

interface LoseModalProps {
  win: boolean | null
  isEndGame: boolean
}

export function LoseModal({ win, isEndGame }: LoseModalProps) {
  const [loseModalOpen, setLoseModalOpen] = useState(false)
  const { volume } = useVolumeStore()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const openModal = useEffectEvent(() => {
    if (win === false && loseModalOpen === false && isEndGame === true) {
      setLoseModalOpen(true)
      audioRef.current?.play().catch((error) => {
        console.log("error: ", error)
      })
    }
  })

  useEffect(() => {
    audioRef.current = new Audio("/explosion.mp3")
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    openModal()
  }, [win])

  useEffect(() => {}, [])

  return (
    <>
      {loseModalOpen ? (
        <Modal
          open={loseModalOpen}
          onClose={() => setLoseModalOpen(false)}
          className="flex items-center justify-center flex-col"
        >
          <h2 className="text-2xl font-bold mb-4 text-red-600">💥 Game Over</h2>

          <p className="mb-4 text-center">
            Você clicou em uma bomba 😢 Que tal tentar novamente?
          </p>

          <button
            onClick={() => setLoseModalOpen(false)}
            className="px-10 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
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
