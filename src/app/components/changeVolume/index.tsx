import { useChangeVolumeModel } from "./changeVolume.model"
import { ChangeVolumeView } from "./changeVolume.view"

export function ChangeVolume() {
  const { handleChangeVolume, handleMuteAndDismute, hasHydrated, volume } =
    useChangeVolumeModel()

  return (
    <ChangeVolumeView
      handleChangeVolume={handleChangeVolume}
      handleMuteAndDismute={handleMuteAndDismute}
      hasHydrated={hasHydrated}
      volume={volume}
    />
  )
}
