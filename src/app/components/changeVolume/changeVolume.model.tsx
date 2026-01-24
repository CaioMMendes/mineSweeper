import useVolumeStore from "@/app/stores/volume-store"
import { ChangeEvent } from "react"

export function useChangeVolumeModel() {
  const { volume, setVolume, hasHydrated } = useVolumeStore()

  function handleMuteAndDismute() {
    setVolume(volume > 0 ? 0 : 1)
  }

  function handleChangeVolume(e: ChangeEvent<HTMLInputElement>) {
    setVolume(Number(e.target.value))
  }

  return {
    volume,
    hasHydrated,
    handleMuteAndDismute,
    handleChangeVolume,
  }
}
