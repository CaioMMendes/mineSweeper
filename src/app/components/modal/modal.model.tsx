import { ModalModelProps } from "./modal.types"

export function useModalModel({ onClose }: ModalModelProps) {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // se clicar no fundo (backdrop)
    if (e.target === e.currentTarget) onClose()
  }

  return {
    handleOutsideClick,
  }
}
