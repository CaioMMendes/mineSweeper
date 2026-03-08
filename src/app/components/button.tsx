import { ButtonHTMLAttributes } from "react"
import { cn } from "../utils/cn"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "selected"
}

export function Button({ variant, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        `px-4 py-2 rounded-md cursor-pointer bg-zinc-600 text-zinc-50`,
        variant === "selected" &&
          "bg-zinc-800 ring ring-zinc-600 cursor-default pointer-events-none",
      )}
      {...rest}
    ></button>
  )
}
