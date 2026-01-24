import { useLoseModalModel } from "./loseModal.model"

export type LoseModalModelProps = {
  win: boolean | null
  isEndGame: boolean
}

export type LoseModalViewProps = ReturnType<typeof useLoseModalModel>

export type LoseModalProps = {
  win: boolean | null
  isEndGame: boolean
}
