import { Suspense } from "react"
import { Board } from "../components/board"
import { ChangeVolume } from "../components/changeVolume"
import { DifficultyType } from "../types/difficultyType"
import { parseDifficulty } from "../utils/parseDifficulty"
import { Ranking } from "../components/ranking"

type Props = {
  params: {
    difficulty: DifficultyType
  }
}

function RankingSkeleton() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-3 animate-pulse">
      <div className="h-6 w-60 bg-zinc-700 rounded mx-auto" />
      <div className="rounded border border-zinc-700 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-9 bg-zinc-700/30 border-t border-zinc-700/50"
          />
        ))}
      </div>
    </div>
  )
}

export default async function Page({ params }: Props) {
  const { difficulty } = await params
  const parsedDifficulty = parseDifficulty(difficulty)

  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-zinc-50 font-sans bg-zinc-800">
      <div className="flex relative w-full flex-1 flex-col py-10 px-10 gap-10 text-zinc-50 bg-zinc-800 sm:items-start sm:flex-row sm:justify-center">
        <ChangeVolume />

        <div className="flex flex-col gap-10 items-center w-full sm:w-auto">
          <h1 className="text-3xl font-semibold w-full text-center">
            Minesweeper
          </h1>
          <Board difficulty={parsedDifficulty} />
          <div className="flex flex-col items-center w-full sm:w-auto">
            <Suspense fallback={<RankingSkeleton />}>
              <Ranking difficulty={difficulty} />
              {/* <RankingSkeleton /> */}
            </Suspense>
          </div>
        </div>
      </div>

      <footer className="w-full flex items-center justify-end p-5">
        <p>V {process.env.NEXT_PUBLIC_GAME_VERSION ?? "1.0.0"}</p>
      </footer>
    </div>
  )
}
