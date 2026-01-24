import useVolumeStore from "@/app/stores/volume-store"
import { useEffect, useEffectEvent, useRef, useState } from "react"
import { LoseModalModelProps } from "./loseModal.types"

export function useLoseModalModel({ win, isEndGame }: LoseModalModelProps) {
  const [loseModalOpen, setLoseModalOpen] = useState(false)
  const { volume } = useVolumeStore()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  function handleCloseLoseModal() {
    setLoseModalOpen(false)
  }

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

  return {
    handleCloseLoseModal,
    loseModalOpen,
  }
}
