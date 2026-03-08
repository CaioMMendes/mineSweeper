"use client"

import { RankingViewProps } from "./ranking.types"
import { formatTimeMinSeconds } from "@/app/utils/formatTimeMinSeconds"

const MEDALS: Record<number, string> = {
  0: "🥇",
  1: "🥈",
  2: "🥉",
}

export function RankingView({ scores }: RankingViewProps) {
  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      <h2 className="text-lg font-semibold tracking-wide text-zinc-300 text-center uppercase">
        🏆 Ranking
      </h2>

      <div className="rounded border border-zinc-700 overflow-hidden">
        {scores.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center py-6 px-4">
            Nenhum registro ainda.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-700/60 text-zinc-400 text-xs uppercase tracking-wider">
                <th className="py-2 px-3 text-left w-8">#</th>
                <th className="py-2 px-3 text-left">Jogador</th>
                <th className="py-2 px-3 text-right">Tempo</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, i) => {
                const { min, seconds } = formatTimeMinSeconds(score.timeMs)
                return (
                  <tr
                    key={i}
                    className={`border-t border-zinc-700/50 transition-colors ${
                      i === 0
                        ? "bg-yellow-500/5 text-yellow-300"
                        : i === 1
                          ? "bg-zinc-400/5 text-zinc-300"
                          : i === 2
                            ? "bg-orange-500/5 text-orange-300"
                            : "text-zinc-400"
                    }`}
                  >
                    <td className="py-2 px-3 text-center text-base leading-none">
                      {MEDALS[i] ?? (
                        <span className="text-xs text-zinc-500">{i + 1}</span>
                      )}
                    </td>
                    <td className="py-2 px-3 font-medium truncate max-w-[140px]">
                      {score.playerName}
                    </td>
                    <td className="py-2 px-3 text-right font-mono tabular-nums">
                      {min > 0 ? `${min}m ` : ""}
                      {`${seconds}s`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
