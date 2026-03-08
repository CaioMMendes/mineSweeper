import { DifficultyType } from "@/app/components/ranking/ranking.types"
import { RANKING_LIMIT } from "@/app/constants/rankingLimitConstant"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  const score = await prisma.score.create({
    data: {
      playerName: body.playerName,
      timeMs: body.timeMs,
      difficulty: body.difficulty as DifficultyType,
      gameVersion: body.version,
    },
  })

  return Response.json(score)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const difficulty = searchParams.get("difficulty") as DifficultyType
  const version = searchParams.get("version")
  const limit = Number(searchParams.get("limit") ?? RANKING_LIMIT)

  const ranking = await prisma.score.findMany({
    where: {
      difficulty,
      gameVersion: version!,
    },
    orderBy: {
      timeMs: "asc",
    },
    take: limit,
    select: {
      playerName: true,
      timeMs: true,
    },
  })

  return Response.json(ranking)
}
