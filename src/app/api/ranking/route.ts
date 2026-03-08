import { DifficultyType } from "@/app/components/ranking/ranking.types"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const difficulty = searchParams.get("difficulty") as DifficultyType
  const version = searchParams.get("version")

  const ranking = await prisma.score.findMany({
    where: {
      difficulty,
      gameVersion: version!,
    },
    orderBy: {
      timeMs: "asc",
    },
    take: 10,
    select: {
      playerName: true,
      timeMs: true,
    },
  })

  return Response.json(ranking)
}
