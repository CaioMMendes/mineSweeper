import { create } from "zustand"
import { persist } from "zustand/middleware"

interface VolumeStore {
  volume: number
  setVolume: (volume: number) => void
  setHasHydrated: (state: boolean) => void
  hasHydrated: boolean
}

const useVolumeStore = create<VolumeStore>()(
  persist(
    (set) => ({
      volume: 0,
      hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          hasHydrated: state,
        })
      },
      setVolume: (volume) => set({ volume }),
    }),
    {
      name: "volume-storage",
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      },
    }
  )
)

export default useVolumeStore
