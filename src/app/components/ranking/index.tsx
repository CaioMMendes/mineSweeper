import { prisma } from "@/lib/prisma"
import { DIFFICULTY_MAP, RankingProps, ScoreEntry } from "./ranking.types"
import { RankingView } from "./ranking.view"
import { RANKING_LIMIT } from "@/app/constants/rankingLimitConstant"

const VERSION = process.env.NEXT_PUBLIC_GAME_VERSION ?? "1.0.0"

async function fetchRanking(
  difficulty: RankingProps["difficulty"],
): Promise<ScoreEntry[]> {
  return prisma.score.findMany({
    where: {
      difficulty: DIFFICULTY_MAP[difficulty],
      gameVersion: VERSION,
    },
    orderBy: { timeMs: "asc" },
    take: RANKING_LIMIT,
    select: { playerName: true, timeMs: true },
  })
}

export async function Ranking({ difficulty }: RankingProps) {
  const scores = await fetchRanking(difficulty)
  return <RankingView scores={scores} />
}
