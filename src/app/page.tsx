"use client"
import { Board } from "./components/board"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center text-zinc-50 font-sans bg-zinc-800">
      <div className="flex min-h-screen w-full max-w-7xl flex-col justify-center items-center py-10 px-10 gap-10 text-zinc-50 bg-zinc-800 sm:items-start">
        <h1 className="text-2xl font-semi w-full text-center">Minesweeper</h1>
        <Board />
      </div>
    </div>
  )
}
