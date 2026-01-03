import { ReactNode } from "react"
import { cn } from "../utils/cn"

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  if (!open) return null

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // se clicar no fundo (backdrop)
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        className={cn(
          "bg-zinc-700 rounded-xl p-8 shadow-xl max-w-lg w-full",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
