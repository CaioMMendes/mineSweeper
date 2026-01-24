import { Board } from "../components/board"
import { ChangeVolume } from "../components/changeVolume"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center text-zinc-50 font-sans bg-zinc-800">
      <div className="flex relative min-h-screen w-full max-w-7xl flex-col py-10 px-10 gap-10 text-zinc-50 bg-zinc-800 sm:items-start">
        <ChangeVolume />
        <h1 className="text-3xl font-semibold w-full text-center">
          Minesweeper
        </h1>
        <Board />
      </div>
    </div>
  )
}
