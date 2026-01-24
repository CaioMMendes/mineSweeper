"use-client"

import { cn } from "@/app/utils/cn"
import { ChangeVolumeViewProps } from "./changeVolume.types"

export function ChangeVolumeView({
  volume,
  hasHydrated,
  handleMuteAndDismute,
  handleChangeVolume,
}: ChangeVolumeViewProps) {
  if (!hasHydrated) return <></>

  return (
    <div className="absolute right-5 top-5 flex flex-col justify-center items-center group">
      <span
        className="select-none cursor-pointer text-lg"
        onClick={handleMuteAndDismute}
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
        onChange={handleChangeVolume}
      />
    </div>
  )
}
