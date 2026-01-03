import { ButtonHTMLAttributes } from "react"

export function Button({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-md cursor-pointer bg-zinc-600 text-zinc-50`}
      {...rest}
    ></button>
  )
}
