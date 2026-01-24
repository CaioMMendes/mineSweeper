import { RefObject, useEffect, useEffectEvent, useRef, useState } from "react"

import useVolumeStore from "../../stores/volume-store"
import { formatTimeMinSeconds } from "../../utils/formatTimeMinSeconds"
import { Modal } from "../modal"

interface VictoryModalProps {
  win: boolean | null
  usedTime: RefObject<number>
}

export function VictoryModal({ win, usedTime }: VictoryModalProps) {
  const [victoryModalOpen, setVictoryModalOpen] = useState(false)
  const { volume } = useVolumeStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { min, seconds } = formatTimeMinSeconds(usedTime.current)

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
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])

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
          <p>Parabéns! Continue jogando para melhorar seu score.</p>
          <p>
            Você terminou em{" "}
            <span className="font-semibold">
              {min > 0 ? `${min} minuto${min > 1 ? "s" : ""}` : ""}{" "}
              {seconds > 0 ? `${seconds} segundo${seconds > 1 && "s"}` : ""}
            </span>
          </p>
          <button
            onClick={() => setVictoryModalOpen(false)}
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
