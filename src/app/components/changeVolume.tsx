"use-client"

import useVolumeStore from "../stores/volume-store"
import { cn } from "../utils/cn"

export function ChangeVolume() {
  const { volume, setVolume, hasHydrated } = useVolumeStore()

  if (!hasHydrated) return <></>

  return (
    <div className="absolute right-5 top-5 flex flex-col justify-center items-center group">
      <span
        className="select-none cursor-pointer text-lg"
        onClick={() => setVolume(volume > 0 ? 0 : 1)}
      >
        {volume === 0 ? "🔇" : "🔉"}
      </span>
      <input
        type="range"
        className={cn("invisible group-hover:visible")}
        min={0}
        max={1}
        step={0.1}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
    </div>
  )
}
