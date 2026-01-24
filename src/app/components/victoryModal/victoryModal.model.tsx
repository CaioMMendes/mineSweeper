import useVolumeStore from "@/app/stores/volume-store"
import { formatTimeMinSeconds } from "@/app/utils/formatTimeMinSeconds"
import { useEffect, useEffectEvent, useRef, useState } from "react"
import { VictoryModalModelProps } from "./victoryModal.types"

export function useVictoryModalModel({
  win,
  usedTime,
}: VictoryModalModelProps) {
  const [victoryModalOpen, setVictoryModalOpen] = useState(false)
  const { volume } = useVolumeStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { min, seconds } = formatTimeMinSeconds(usedTime.current)

  function handleCloseVictoryModal() {
    setVictoryModalOpen(false)
  }

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

  return {
    min,
    seconds,
    victoryModalOpen,
    handleCloseVictoryModal,
  }
}
