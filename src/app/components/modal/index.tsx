import { useModalModel } from "./modal.model"
import { ModalProps } from "./modal.types"
import { ModalView } from "./modal.view"

export function Modal({ open, onClose, children, className }: ModalProps) {
  const { handleOutsideClick } = useModalModel({ onClose })

  return (
    <ModalView
      open={open}
      handleOutsideClick={handleOutsideClick}
      className={className}
    >
      {children}
    </ModalView>
  )
}
