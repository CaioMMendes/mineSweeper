import { ReactNode } from "react"

export type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export type ModalViewProps = {
  children: ReactNode
  className?: string
  handleOutsideClick: (e: React.MouseEvent<HTMLDivElement>) => void
  open: boolean
}

export type ModalModelProps = {
  onClose: () => void
}
