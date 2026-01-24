"use-client"

import { cn } from "@/app/utils/cn"
import { ModalViewProps } from "./modal.types"
import { motion } from "framer-motion"

export function ModalView({
  open,
  handleOutsideClick,
  children,
  className,
}: ModalViewProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5"
      onClick={handleOutsideClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
        }}
      >
        <div
          className={cn(
            "bg-zinc-700 rounded-xl p-8 shadow-xl max-w-lg w-full",
            className,
          )}
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}
